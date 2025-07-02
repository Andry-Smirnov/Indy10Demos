{**********************************************************************}
{ Unit archived using Team Coherence                                   }
{ Team Coherence is Copyright 2002 by Quality Software Components      }
{                                                                      }
{ For further information / comments, visit our WEB site at            }
{ http://www.TeamCoherence.com                                         }
{**********************************************************************}
{}
//{ $Log:  22991: MainForm.pas 
//{
//{   Rev 1.0    09/10/2003 3:17:42 PM  Jeremy Darling
{ Project uploaded for the first time
}
{-----------------------------------------------------------------------------
 Demo Name: fMain
 Author:    Allen O'Neill
 Purpose:   Basic TCP client demo
 History:
 Date:      13/07/2002 00:55:23
-----------------------------------------------------------------------------

  Notes:

  Demonstrates the following functions:

  (1) ReadLn, WriteLn, ReadInteger
  (2) Using the OnConnect and OnDisconnect events

}


unit MainForm;

{$MODE Delphi}

interface

uses
  LCLIntf,
  LCLType,
  SysUtils,
  Classes,
  Graphics,
  Controls,
  Forms,
  Dialogs,
  ExtCtrls,
  StdCtrls,
  IdComponent,
  IdTCPConnection,
  IdTCPClient
  ;

type
  TfrmMain = class(TForm)
    Label2: TLabel;
    edHost: TEdit;
    Label3: TLabel;
    edPort: TEdit;
    btnConnect: TButton;
    Bevel1: TBevel;
    memMsgs: TMemo;
    Panel1: TPanel;
    edMsg: TEdit;
    Client: TIdTCPClient;
    Timer1: TTimer;
    procedure btnConnectClick(Sender: TObject);
    procedure ClientConnect(Sender: TObject);
    procedure ClientDisconnect(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormCloseQuery(Sender: TObject; var CanClose: Boolean);
    procedure edMsgKeyPress(Sender: TObject; var Key: Char);
    procedure Timer1Timer(Sender: TObject);
    procedure ClientConnected(Sender: TObject);
    procedure ClientDisconnected(Sender: TObject);
  private
  public
  end;

var
  frmMain: TfrmMain;

implementation

{$R *.lfm}


const
  S_DISCONNECT = 'Disconnect';
  S_CONNECT = 'Connect';
  S_CONNECTING = 'Connecting...';
  S_ERROR_NO_CONNECTION = '>>> Time out. No connection';

  CONNECTING_TIMEOUT = 500;


procedure TfrmMain.btnConnectClick(Sender: TObject);
begin
  if Client.Connected then
    Client.Disconnect
  else
    begin
      Client.Host := edHost.Text;
      Client.Port := StrToIntDef(edPort.Text, 8800);
      edPort.Text := IntToStr(Client.Port);
      memMsgs.Lines.Clear;
      Client.ConnectTimeout := CONNECTING_TIMEOUT;
      btnConnect.Caption := S_CONNECTING;
      btnConnect.Update;
      try
        Client.Connect;
      except
        memMsgs.Lines.add(S_ERROR_NO_CONNECTION);
        btnConnect.Caption := S_CONNECT;
        btnConnect.Update;
      end;
    end;
end;

procedure TfrmMain.ClientConnect(Sender: TObject);
begin
  edPort.Enabled := False;
  edHost.Enabled := False;
  btnConnect.Caption := S_DISCONNECT;
end;

procedure TfrmMain.ClientDisconnect(Sender: TObject);
begin
  edPort.Enabled := True;
  edHost.Enabled := True;
  btnConnect.Caption := S_CONNECT;
end;

procedure TfrmMain.FormCreate(Sender: TObject);
begin
  memMsgs.Align := alClient;
  memMsgs.Lines.Clear;
  edMsg.Text := '';
end;

procedure TfrmMain.FormCloseQuery(Sender: TObject; var CanClose: Boolean);
begin
  Client.Disconnect;
  CanClose := not Client.Connected;
end;

procedure TfrmMain.edMsgKeyPress(Sender: TObject; var Key: Char);
var
  s : String;
begin
  if Key = #13 then
    begin
      s := edMsg.Text + #10#13;
      Key := #0;
      edMsg.Text := '';
      Client.IOHandler.Write(s);
    end;
end;

procedure TfrmMain.Timer1Timer(Sender: TObject);
var
  i : Integer;
  s : String;
begin
  if not Client.Connected then
    Exit;

  s := '';
  I := Client.IOHandler.InputBuffer.Size;
  if I > 0 then
    begin
      SetLength(s, i);
      s := Client.IOHandler.ReadString(i);
      memMsgs.Lines.add(Copy(s, 1, Length(s) -2));
    end;
end;

procedure TfrmMain.ClientConnected(Sender: TObject);
begin
  btnConnect.Caption := S_DISCONNECT;
end;

procedure TfrmMain.ClientDisconnected(Sender: TObject);
begin
  btnConnect.Caption := S_CONNECT;
end;

end.
