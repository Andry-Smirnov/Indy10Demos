{ $HDR$}
{**********************************************************************}
{ Unit archived using Team Coherence                                   }
{ Team Coherence is Copyright 2002 by Quality Software Components      }

{ For further information / comments, visit our WEB site at            }
{ http://www.TeamCoherence.com                                         }
{**********************************************************************}
//
// $Log:  22956: ClientThread.pas
//
//   Rev 1.0    09/10/2003 3:10:54 PM  Jeremy Darling
//   Rev 1.1    20.01.2025 14:56       Andry Smirnov
{ Project Checked into TC for the first time
}
unit ClientThread;

{$mode Delphi}

interface

uses
  IdTCPClient,
  IdStack,
  ComCtrls,
  Classes,
  SysUtils,
  LCLIntf;

type
  TClientThread = class (TThread)
  private
    FClient: TIdTCPClient;
    FListItem: TListItem;
    FLastTick: Cardinal;
    FSleepTime: Integer;
    FState: Integer;
    FStatusText: string;
    procedure SetListItem(const Value: TListItem);
    procedure SetSleepTime(const Value: integer);
    procedure SetState(const Value: integer);
    procedure SetStatusText(const Value: string);
    //
    procedure SetListItemSubItems0;
    procedure FreeListItem;
  public
    destructor Destroy; override;
    procedure AssignClient(AClient: TIdTCPClient);
    procedure Execute; override;

    property Client: TIdTCPClient read FClient;
    property ListItem: TListItem read FListItem write SetListItem;
    property SleepTime: Integer read FSleepTime write SetSleepTime;
    property State: integer read FState write SetState;
    property StatusText: string read FStatusText write SetStatusText;
  end;


implementation


procedure TClientThread.AssignClient(AClient: TIdTCPClient);
begin
  if not Assigned(FClient) then
    FClient := TIdTCPClient.Create(nil);
  with FClient do
    begin
      Port := AClient.Port;
      Host := AClient.Host;
      IOHandler := AClient.IOHandler;
      OnConnected := AClient.OnConnected;
      OnDisconnected := AClient.OnDisconnected;
      OnStatus := AClient.OnStatus;
      OnWork := AClient.OnWork;
      OnWorkBegin := AClient.OnWorkBegin;
      OnWorkEnd := AClient.OnWorkEnd;
    end;
end;


procedure TClientThread.FreeListItem;
begin
  ListItem.Free;
end;


destructor TClientThread.Destroy;
begin
  Synchronize(FreeListItem);
  FClient.Free;
  inherited;
end;

procedure TClientThread.Execute;
begin
  while not Terminated do
    begin
      if (not FClient.Connected) and (State = -2) then
        begin
          State := -1;
          try
            FClient.Connect;
          except
            //on E: EIdSocketError do
              begin
                FreeOnTerminate := True;
                Terminate;
              end;
          end;
          FLastTick := GetTickCount64;
        end
      else
        begin
          if State <> -1 then
            begin
              if GetTickCount64 - FLastTick > 1000 then
                begin
                  State := State + 1;
                  FLastTick := GetTickCount64;
                  if State > SleepTime then
                    begin
                      State := -3;
                      FClient.Disconnect;
                    end;
                end
              else
                Sleep(500);
            end;
        end;
    end;
end;

procedure TClientThread.SetListItem(const Value: TListItem);
begin
  FListItem := Value;
end;

procedure TClientThread.SetSleepTime(const Value: integer);
begin
  FSleepTime := Value;
end;

procedure TClientThread.SetState(const Value: integer);
begin
  FState := Value;
  case Value of
    -3: StatusText := 'Disconnecting';
    -2: StatusText := 'Creating';
    -1: StatusText := 'Connecting';
    else
      StatusText := 'Sleeping [' + IntToStr(Value) + '/' + IntToStr(SleepTime) + '] while connected';
  end;
end;


procedure TClientThread.SetListItemSubItems0;
begin
  FListItem.SubItems[0] := FStatusText;
end;


procedure TClientThread.SetStatusText(const Value: string);
begin
  FStatusText := Value;
  Synchronize(SetListItemSubItems0);
end;


end.
