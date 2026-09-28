# PitCode for Visual Studio Code

- **Colors** for `.pit` files
- **Mistakes underlined as you type**: unknown names (with "did you mean"), syntax errors, changing a `lock`...
- **Run** the current file with the ▶ button in the editor title bar, or Ctrl+Shift+Enter (Cmd+Shift+Enter on a Mac). It needs the `pitcode` command (run `npm link` in the PitCode folder once).
- **Snippets**, bracket matching and comment toggling

## Install

From the PitCode folder, build the checker once, then copy this folder into your VS Code extensions folder and restart VS Code:

```sh
npm run build:vscode
cp -r editors/vscode ~/.vscode/extensions/pitcode        # macOS / Linux
```

On Windows, copy it to `%USERPROFILE%\.vscode\extensions\pitcode`.

## Snippets

Type one of these and press Tab: `fn`, `when`, `whenother`, `loop`, `loopin`, `looprange`, `kind`, `kindfrom`, `match`, `attempt`, `use`.
