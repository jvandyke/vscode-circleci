'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as format from './format';

// Commands we'll use
import getBranchBuilds from './commands/getBranchBuilds';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('extension.branchBuilds', getBranchBuilds);


  // let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  // item.text = "Checking";
  // item.show();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('extension.addStatus', () => {
  //   let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  //   item.text = "Checking";
  // });

  // context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}