'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as format from './format';
import * as openUrl from './open-url';
import * as extContext from './context';

// Commands we'll use
import getBranchBuilds from './commands/getBranchBuilds';
import * as setStatusBar from './commands/setStatusBar';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.getCommands().then((commands) => {
    commands.forEach((command) => {
      if (/git/.test(command)) {
        console.log(command);
      }
    })
  });
  
  extContext.setContext(context);
  openUrl.registerCommands();
  setStatusBar.startUpdate();

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.branchBuilds', getBranchBuilds)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
  setStatusBar.stopUpdate();
}