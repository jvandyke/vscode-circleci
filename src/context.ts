let context;

export function setContext(c: vscode.ExtensionContext) {
  context = c;
}

export function getContext(): vscode.ExtensionContext {
  return context;
}

export function setCurrentBuild(build: CircleCIBuild) {
  getContext().workspaceState.update("currentBuild", build);
}

export function getCurrentBuild(): CircleCIBuild {
  return <CircleCIBuild>getContext().workspaceState.get("currentBuild");
}