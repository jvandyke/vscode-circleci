import * as vscode from 'vscode';
let gitBranch = require('git-branch');
let gitUsername = require('git-username');
let gitRepoName = require('git-repo-name');

export function getUsername(): string {
  let username = gitUsername(vscode.workspace.rootPath);
  return username.split(":")[1] || username;
}

export function getBranch(): string {
  return gitBranch.sync(vscode.workspace.rootPath);
}

export function getRepoName(): string {
  return gitRepoName.sync(vscode.workspace.rootPath);
}
