{ $HDR$}
{**********************************************************************}
{ Unit archived using Team Coherence                                   }
{ Team Coherence is Copyright 2002 by Quality Software Components      }

{ For further information / comments, visit our WEB site at            }
{ http://www.TeamCoherence.com                                         }
{**********************************************************************}

// $Log:  22939: MainForm.pas

//   Rev 1.0    09/10/2003 3:08:58 PM  Jeremy Darling
{ Project Checked into TC for the first time
}
{***************************************************************
* Project : <This is the name of your project>
* Unit Name: <This is the name of this unit>
* Purpose : <This is a description of the project>
* Author : <Your Name>
* Date : <Date submitted to indy demo team>
* Other Info : <Anything else>
* History :
*           <History list>
****************************************************************}

unit MainForm;

{$mode Delphi}

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
  CheckLst,
  ComCtrls,
  StdCtrls,
  ExtCtrls,
  IniFiles,
  //IdBaseComponent,
  IdComponent,
  IdTCPServer,
  IdContext,
  //IdScheduler,
  //IdSchedulerOfThread,
  IdSchedulerOfThreadDefault,
  IdDsnCoreResourceStrings,
  IdStack,
  IdSocketHandle,
  IdGlobal,
  //IdAntiFreezeBase,
  IdAntiFreeze,
  IdCustomTCPServer,
  IdStackWindows;

type
  TfrmMain = class (TForm)
    Server: TIdTCPServer;
    pnlButtonBar: TPanel;
    pcMain: TPageControl;
    tsSettings: TTabSheet;
    Label2: TLabel;
    Label3: TLabel;
    Label4: TLabel;
    IPsListBox: TCheckListBox;
    PortsComboBox: TComboBox;
    PortEdit: TEdit;
    tsProcessLog: TTabSheet;
    ProcessesListBox: TListBox;
    StartStopButton: TButton;
    IdAntiFreeze1: TIdAntiFreeze;
    IdSchedulerOfThreadDefault1: TIdSchedulerOfThreadDefault;
    procedure StartStopButtonClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
    procedure ProcessesListBoxDrawItem(Control: TWinControl; Index: Integer; Rect: TRect; State: TOwnerDrawState);
    procedure ServerStatus(ASender: TObject; const AStatus: TIdStatus; const AStatusText: string);
    procedure ServerException(AContext: TIdContext; AException: Exception);
    procedure FormActivate(Sender: TObject);
    procedure ServerExecute(AContext: TIdContext);
    procedure ServerConnect(AContext: TIdContext);
    procedure ServerDisconnect(AContext: TIdContext);
    procedure PortEditKeyPress(Sender: TObject; var Key: char);
  private
    { Private declarations }
    function CheckStartOk: Boolean;

    function StartServer: Boolean;
    function StopServer: Boolean;

    procedure PopulateIPAddresses;
    function PortDescription(const PortNumber: Integer): string;

    procedure LoadDefaultValues;
    procedure SaveDefaultValues;

    procedure CheckOptions;
    function GetServerOnline: Boolean;

    function InternalServerBeforeStart: Boolean;
    procedure InternalServerAfterStart;

    function InternalServerBeforeStop: Boolean;
    procedure InternalServerAfterStop;

    procedure Log(Msg: string; AColor: TColor = clBlack);
    procedure SetControls;
  public
    { Public declarations }
    property ServerOnline: Boolean read GetServerOnline;
  end;

var
  frmMain: TfrmMain;
  Ini: TIniFile;

implementation

{$R *.lfm}


var
  _GIdPorts: TIdPortList = nil;


procedure TfrmMain.StartStopButtonClick(Sender: TObject);
begin
  // This procedure should never change.
  if ServerOnline then
    StopServer
  else
    StartServer;
end;

function TfrmMain.CheckStartOk: Boolean;
var
  i, c: Integer;
begin
  // This section should stay the same, add your new code below
  i := 0;
  for c := 0 to IPsListBox.Items.Count - 1 do
  begin
    if IPsListBox.Checked[c] then
      Inc(i);
  end;
  Result := i > 0;
  if not Result then
  begin
    Log('Can''t start server until you select at least one IP to bind to.', clRed);
    MessageDlg('Can''t start server until you select at least one IP to bind to.', mtError, [mbOK], 0);
  end;
  // Add your code after this comment
end;

function GetPorts: TIdPortList;
var
  s: string;
  idx, iPosSlash:
  {$IFDEF BYTE_COMPARE_SETS}
Byte
  {$ELSE}
  Integer
  {$ENDIF}
  ;
  i:
  {$IFDEF HAS_GENERICS_TList}
Integer
  {$ELSE}
  PtrInt
  {$ENDIF}
  ;
  iPrev: PtrInt;
  sl: TStringList;
begin
  if _GIdPorts = nil then
  begin
    _GIdPorts := TIdPortList.Create;
    sl := TStringList.Create;
    try
      // TODO: use TStreamReader instead, on versions that support it
      sl.LoadFromFile(ServicesFilePath);  {do not localize}
      iPrev := 0;
      for idx := 0 to sl.Count - 1 do
      begin
        s := sl[idx];
        iPosSlash := IndyPos('/', s);   {do not localize}
        if (iPosSlash > 0) and (not (IndyPos('#', s) in [1..iPosSlash])) then {do not localize}
        begin // presumably found a port number that isn't commented    {Do not Localize}
          i := iPosSlash;
          repeat
            Dec(i);
            if i = 0 then
              raise EIdCorruptServicesFile.CreateFmt('%s is corrupt.', [ServicesFilePath]); {do not localize}
            //TODO: Make Whitespace a function to elim warning
          until Ord(s[i]) in IdWhiteSpace;
          i := IndyStrToInt(Copy(s, i + 1, iPosSlash - i - 1));
          if i <> iPrev then
            _GIdPorts.Add(Pointer(i));
          iPrev := i;
        end;
      end;
    finally
      sl.Free;
    end;
  end;
  Result := _GIdPorts;
end;

procedure TfrmMain.PopulateIPAddresses;
var
  i: Integer;
begin
  // Again this section should not change
  with IPsListBox do
    begin
      Clear;
      Items := GStack.LocalAddresses;
      Items.Insert(0, '127.0.0.1');
    end;
  try
    PortsComboBox.Items.Add(RSBindingAny);
    PortsComboBox.Items.BeginUpdate;
    for i := 0 to GetPorts.Count - 1 do
      PortsComboBox.Items.Add(PortDescription(Integer(GetPorts[i])));
  finally
    PortsComboBox.Items.EndUpdate;
  end;
end;

function TfrmMain.PortDescription(const PortNumber: Integer): string;
var
  StrList: TStringList;
begin
  // Guess what more code that shouldn't change
  StrList := TStringList.Create;
{$IFDEF WINDOWS}
  TIdStackWindows(GStack).AddServByPortToList(PortNumber, StrList);
  with StrList do
  // method WSGetServByPort deprecated
  //with TIdStackWindows(GStack).WSGetServByPort(PortNumber) do
{$ELSE}
  {$STOP Only for Windows }
{$ENDIF}
    try
      if PortNumber = 0 then
        begin
          Result := Format('%d: %s', [PortNumber, RSBindingAny]);
        end
      else
        begin
          Result := '';    {Do not Localize}
          if Count > 0 then
            begin
              Result := Format('%d: %s', [PortNumber, CommaText]);    {Do not Localize}
            end;
        end;
    finally
      //Free;
      StrList.Free;
    end;
end;

function TfrmMain.StartServer: Boolean;
var
  Binding: TIdSocketHandle;
  i: Integer;
  SL: TStringList;
begin
  // This code starts the server up and posts back information about
  // the server starting up.
  // You should place your pre and post startup code in InternalServerBeforeStart
  // and InternalServerAfterStart accordingly.
  Result := False;
  if not CheckStartOk then
    Exit;

  SL := TStringList.Create;

  if not StopServer then
    begin
      Log('Error stopping server', clRed);
      Result := False;
      Exit;
    end;

  // bindings cannot be cleared until TServer is inactive
  Server.Bindings.Clear;
  try
    try
      Server.DefaultPort := StrToInt(PortEdit.Text);
      for i := 0 to IPsListBox.Items.Count - 1 do
        if IPsListBox.Checked[i] then
          begin
            Binding := Server.Bindings.Add;
            Binding.IP := IPsListBox.Items.Strings[i];
            Binding.Port := StrToInt(PortEdit.Text);
            Log('Server bound to IP ' + Binding.IP + ' on port ' + PortEdit.Text);
          end;

      if InternalServerBeforeStart then
        begin
          Server.Active := True;
          Result := Server.Active;

          InternalServerAfterStart;
          if ServerOnline then
            begin
              Log('Server started', clGreen);
              StartStopButton.Caption := 'Stop Server';
              SetControls;
            end;
        end;
    except
      on E: Exception do
      begin
        Log('Server not started', clRed);
        Log(E.Message, clRed);
        Result := False;
      end;
    end;
  finally
    FreeAndNil(SL);
  end;
end;

function TfrmMain.StopServer: Boolean;
var
  b: Boolean;
begin
  // This code stops the server and posts back information about
  // the server shutting down.
  // You should place your pre and post shutdown code in InternalServerBeforeStop
  // and InternalServerAfterStop accordingly.

  Result := False;

  b := Server.Active;

  if InternalServerBeforeStop then
    begin
      Server.Active := False;
      Server.Bindings.Clear;
      Result := not Server.Active;

      if Result then
        begin
          if b then
            Log('Server stopped', clGreen);
        end
      else
        begin
          Log('Server not stopped', clRed);
        end;

      InternalServerAfterStop;
      StartStopButton.Caption := 'Start Server';
      SetControls;
    end
  else
    Log('Server not stopped', clRed);
end;

procedure TfrmMain.FormCreate(Sender: TObject);
begin
  // Initialization routines.  You should find the appropriate procedure
  // to initialize your stuff below.  The form create should hardly ever
  // need to be changed.
  Ini := TIniFile.Create(ChangeFileExt(ParamStr(0), '.ini'));
  pcMain.ActivePageIndex := 0;
  pcMain.Align := alClient;
  PopulateIPAddresses;
  StopServer;
  LoadDefaultValues;
  CheckOptions;
end;

procedure TfrmMain.FormDestroy(Sender: TObject);
begin
  // If you created anything in form create or in one of the other
  // initialization routines then get rid of it here.
  StopServer;
  SaveDefaultValues;
  Ini.Free;
end;

procedure TfrmMain.LoadDefaultValues;
var
  i: Integer;
  c: Integer;
  s: string;
begin
  // This is were you get the chance to load values from the global
  // Ini file.  The section for ports and IP's has been added in here
  // for you by default.
  PortEdit.Text := Ini.ReadString('Settings', 'Port', PortEdit.Text);
  c := Ini.ReadInteger('Settings', 'IPs', 0);
  for i := 1 to c do
    begin
      s := Ini.ReadString('Settings', 'IP' + IntToStr(i), '');
      if IPsListBox.Items.IndexOf(s) > -1 then
        IPsListBox.Checked[IPsListBox.Items.IndexOf(s)] := True;
    end;
end;

procedure TfrmMain.SaveDefaultValues;
var
  i: Integer;
  c: Integer;
begin
  // This is were you get the chance to save values to the global
  // Ini file.  The section for ports and IP's has been added in here
  // for you by default.
  Ini.WriteString('Settings', 'Port', PortEdit.Text);
  c := 0;
  for i := 0 to IPsListBox.Items.Count - 1 do
    if IPsListBox.Checked[i] then
    begin
      Inc(c);
      Ini.WriteString('Settings', 'IP' + IntToStr(c), IPsListBox.Items[i]);
    end;
  Ini.WriteInteger('Settings', 'IPs', c);
  Ini.WriteInteger('Placement', 'Top', Top);
  Ini.WriteInteger('Placement', 'Left', Left);
end;

procedure TfrmMain.CheckOptions;
var
  i: Integer;
  opt: string;
  bDoAutoStart: Boolean;

  function OptName: string;
  begin
    if pos('=', opt) > 0 then
    begin
      Result := copy(opt, 1, Pos('=', opt) - 1);
      if Result[1] in ['-', '/', '\'] then
        Result := copy(Result, 2, Length(Result));
    end
    else
      Result := opt;
  end;

  function OptValue: string;
  begin
    if pos('=', opt) > 0 then
      Result := copy(opt, Pos('=', opt) + 1, Length(opt))
    else
      Result := opt;
  end;

begin
  // The check options procedure should be used to check commandline options
  // if you wish to support command line options then please add it here.
  // By default port and autostart are supported.
  bDoAutoStart := False;
  for i := 1 to ParamCount do
  begin
    opt := LowerCase(ParamStr(i));

    if OptName = 'port' then
      PortEdit.Text := OptValue;

    if OptName = 'autostart' then
      bDoAutoStart := True;
  end;

  if bDoAutoStart then
    StartServer;
end;

function TfrmMain.GetServerOnline: Boolean;
begin
  // Just a faster way then checking server.active for some
  Result := Server.Active;
end;

procedure TfrmMain.ProcessesListBoxDrawItem(Control: TWinControl; Index: Integer; Rect: TRect; State: TOwnerDrawState);
begin
  // This draws the items in the Process Log in colors to allow quick visual inspection
  with Control as TListBox do
    begin
      Canvas.Brush.Color := Color;

      Canvas.FillRect(Rect);
      Canvas.Font.Color := TColor(Items.Objects[Index]);
      Canvas.TextOut(Rect.Left + 2, Rect.Top, Items[Index]);
    end;
end;

procedure TfrmMain.Log(Msg: string; AColor: TColor);
begin
  // Simply adds a new item to the process log and then makes it the
  // currently selected item.
  ProcessesListBox.Items.AddObject(Msg, Pointer(AColor));
  ProcessesListBox.ItemIndex := ProcessesListBox.Items.Count - 1;
end;

procedure TfrmMain.ServerStatus(ASender: TObject; const AStatus: TIdStatus; const AStatusText: string);
begin
  // Logs any ServerStatus messages to the Process Log
  Log(AStatusText);
end;

procedure TfrmMain.ServerException(AContext: TIdContext; AException: Exception);
begin
  // Logs any server exceptions to the Process Log
  Log(AException.Message, clRed);
end;

function TfrmMain.InternalServerBeforeStart: Boolean;
begin
  // Preform your startup code here.  If you do not wish the server to start
  // then simply return False from this function and report back the proper
  // error by calling Log(YourMessage, clRed);
  Result := True;
end;

procedure TfrmMain.InternalServerAfterStart;
begin
  // Your code should go here.  At this point the server is active.
  // So if you need to stop it then you should call StopServer
  // or for a hard halt call Server.Active := False;
end;

procedure TfrmMain.InternalServerAfterStop;
begin
  // Your code should go here.  At this point the server has been stoped.
  // So if you need to start it then you should call StartServer
  // or for a force start call Server.Active := True;
end;

function TfrmMain.InternalServerBeforeStop: Boolean;
begin
  // Preform your shutdown code here.  If you do not wish the server to stop
  // then simply return false from this function and report back the proper
  // error by calling Log(YourMessage, clRed);
  Result := True;
end;

procedure TfrmMain.SetControls;
begin
  // Sets up the UI controls to either be enabled or disabled based upon
  // the current server state.  See below for examples.
  IPsListBox.Enabled := not ServerOnline;
  PortEdit.Enabled := not ServerOnline;
  PortsComboBox.Enabled := not ServerOnline;
end;

procedure TfrmMain.FormActivate(Sender: TObject);
begin
  Top := Ini.ReadInteger('Placement', 'Top', Top);
  Left := Ini.ReadInteger('Placement', 'Left', Left);
end;

procedure TfrmMain.ServerExecute(AContext: TIdContext);
begin
  // Your stuff for OnExecute goes here.

end;

procedure TfrmMain.ServerConnect(AContext: TIdContext);
begin
  Log('Client connection established from ip: ' + AContext.Connection.Socket.Host, clBlue);
end;

procedure TfrmMain.ServerDisconnect(AContext: TIdContext);
begin
  Log('Client connection removed from ip: ' + AContext.Connection.Socket.Host, clBlue);
end;

procedure TfrmMain.PortEditKeyPress(Sender: TObject; var Key: char);
begin
  if not (Key in ['0', '1'..'9', #8]) then
    Key := #0;
end;

end.
