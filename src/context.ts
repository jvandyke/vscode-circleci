let context;

export function setContext(c: vscode.ExtensionContext) {
  context = c;
}

export function getContext(): vscode.ExtensionContext {
  return context;
}

export function setCurrentBuild(build) {
  console.log("setCurrentBuild", build);
  
  getContext().workspaceState.update("currentBuild", build);
}

export function getCurrentBuild() {
  return getContext().workspaceState.get("currentBuild");
}