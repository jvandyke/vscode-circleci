'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as format from './format';

let CircleCI = require('circleci');
var gitBranch = require('git-branch');
var gitUsername = require('git-username');
var gitRepoName = require('git-repo-name');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let apiKey = 'dd1e364e5f8bfd9a72646381e960206b1e0ddf1a';
    let ci = new CircleCI({
        auth: apiKey
    });
    let username = gitUsername(vscode.workspace.rootPath).split(":")[1];
    let branch = gitBranch.sync(vscode.workspace.rootPath);
    let repoName = gitRepoName.sync(vscode.workspace.rootPath);
    
    console.log("rootPath", vscode.workspace.rootPath);
    console.log("username", username);
    console.log("branch", branch);
    console.log("repoName", repoName);
    
    vscode.commands.registerCommand('extension.branchBuilds', () => {
        let buildsPromise = ci.getBranchBuilds({
            username: username,
            project: repoName,
            branch: branch,
        }).then((builds) => {
            console.log(builds[0]);
            return builds.map(format.quickPickItemFromBuild);
        }).catch((error) => {
            console.error(error);
        });
        vscode.window.showQuickPick(buildsPromise, {
            placeHolder: 'Select a build to open it in a browser',
            matchOnDescription: true,
            matchOnDetail: true
        });
    });
    

    // let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    // item.text = "Checking";
    // item.show();
    
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.addStatus', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        item.text = "Checking";
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}