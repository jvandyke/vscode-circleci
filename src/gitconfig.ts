import * as vscode from 'vscode';
var gitBranch = require('git-branch');
var gitUsername = require('git-username');
var gitRepoName = require('git-repo-name');

function getUsername(): string {
  let username = gitUsername(vscode.workspace.rootPath);
  return username.split(":")[1] || username;
}

function getBranch(): string {
  return gitBranch.sync(vscode.workspace.rootPath);
}

function getRepoName(): string {
  return gitRepoName.sync(vscode.workspace.rootPath);
}

let gitconfig = {
  'username': getUsername(),
  'branch': getBranch(),
  'repo': getRepoName(),
};

console.log("gitconfig", gitconfig);


export default gitconfig; 
