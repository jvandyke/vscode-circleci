/// <reference path="../typings/vscode-typings.d.ts"/>
let context;

export function setContext(c) {
  context = c;
}

export function getContext() {
  return context;
}

export function setCurrentBuild(build: CircleCIBuild) {
  getContext().workspaceState.update("currentBuild", build);
}

export function getCurrentBuild(): CircleCIBuild {
  return <CircleCIBuild>getContext().workspaceState.get("currentBuild");
}
