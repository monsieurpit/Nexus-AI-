// PitCode for VS Code: underlines mistakes as you type, and runs the current file.
const vscode = require("vscode");
const core = require("./pitcode-core.js");

/** @param {vscode.ExtensionContext} context */
function activate(context) {
  const diagnostics = vscode.languages.createDiagnosticCollection("pitcode");
  context.subscriptions.push(diagnostics);
  const timers = new Map();

  const checkDocument = (doc) => {
    if (doc.languageId !== "pitcode") return;
    const problem = core.check(doc.getText());
    if (!problem) {
      diagnostics.delete(doc.uri);
      return;
    }
    const line = Math.max(0, problem.line - 1);
    const col = Math.max(0, problem.col - 1);
    const text = doc.lineAt(Math.min(line, doc.lineCount - 1)).text;
    const word = /^[\p{L}\p{N}_]+/u.exec(text.slice(col))?.[0] ?? " ";
    const range = new vscode.Range(line, col, line, col + word.length);
    const diagnostic = new vscode.Diagnostic(range, problem.message, vscode.DiagnosticSeverity.Error);
    diagnostic.source = `PitCode ${problem.kind}`;
    diagnostics.set(doc.uri, [diagnostic]);
  };

  const later = (doc) => {
    clearTimeout(timers.get(doc.uri.toString()));
    timers.set(doc.uri.toString(), setTimeout(() => checkDocument(doc), 300));
  };

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(checkDocument),
    vscode.workspace.onDidChangeTextDocument((e) => later(e.document)),
    vscode.workspace.onDidCloseTextDocument((doc) => diagnostics.delete(doc.uri)),
    vscode.commands.registerCommand("pitcode.run", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "pitcode") {
        vscode.window.showInformationMessage("Open a .pit file to run it.");
        return;
      }
      await editor.document.save();
      const terminal = vscode.window.terminals.find((t) => t.name === "PitCode") ?? vscode.window.createTerminal("PitCode");
      terminal.show(true);
      terminal.sendText(`pitcode "${editor.document.fileName}"`);
    }),
  );
  vscode.workspace.textDocuments.forEach(checkDocument);
}

function deactivate() {}

module.exports = { activate, deactivate };
