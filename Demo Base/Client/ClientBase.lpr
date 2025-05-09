{ $HDR$}
{**********************************************************************}
{ Unit archived using Team Coherence                                   }
{ Team Coherence is Copyright 2002 by Quality Software Components      }
{                                                                      }
{ For further information / comments, visit our WEB site at            }
{ http://www.TeamCoherence.com                                         }
{**********************************************************************}
{}
// $Log:  22950: ClientBase.dpr
//
//   Rev 1.0    09/10/2003 3:10:06 PM  Jeremy Darling
{ Project Checked into TC for the first time
}
program ClientBase;

{$IFDEF WINDOWS}
  {$APPTYPE GUI}
{$ENDIF}
{$mode ObjFPC}{$H+}

uses
  Forms, Interfaces,
  MainForm in 'Forms\MainForm.pas' {frmMain},
  ClientThread in 'Units\ClientThread.pas';

{$R *.res}

begin
  Application.Scaled:=True;
  Application.Initialize;
  Application.CreateForm(TfrmMain, frmMain);
  Application.Run;
end.
