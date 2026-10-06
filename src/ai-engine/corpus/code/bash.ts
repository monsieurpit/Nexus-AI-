import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('bash', slug, title, keywords, content);

export const CODE_BASH = [
  c('scripting', 'Bash scripting: variables, quoting, conditionals, loops, functions, arguments, exit codes', ['bash script', 'shell script', 'bash variables', 'bash if statement', 'bash for loop', 'bash functions', 'bash arguments', 'set -euo pipefail', 'bash quoting', 'shebang'],
    `#!/usr/bin/env bash
set -euo pipefail          # stop on errors, unset variables, failed pipes
name="\${1:-world}"        # first argument with a default
echo "Hello, $name"
Run: chmod +x script.sh && ./script.sh arg, or bash script.sh. Check scripts with shellcheck.
Variables: x=5 (no spaces around =); use "$x" — always quote expansions (spaces/globs break unquoted ones). $(command) captures output; $((a + b)) arithmetic; readonly, local (in functions), export VAR (to child processes). Single quotes are literal; double quotes expand $vars.
Parameters: $0 script, $1..$9, "$@" all args (quoted, separately), $# count, $? last exit code, $$ PID, shift. Defaults/manipulation: \${var:-default}, \${var:?error}, \${#var} length, \${var%.txt} strip suffix, \${var#prefix}, \${var//old/new}, \${var,,} lowercase.
Conditionals: if [[ -f "$file" ]]; then ...; elif [[ "$a" == "yes" ]]; then ...; else ...; fi — [[ ]] tests: -f file, -d dir, -e exists, -z empty string, -n non-empty, ==, !=, =~ regex, numbers -eq -ne -lt -le -gt -ge or (( a > b )). && / || chains: mkdir -p out && cd out.
case "$1" in start) ...;; stop|halt) ...;; *) echo "usage"; exit 1;; esac
Loops: for f in *.jpg; do echo "$f"; done; for i in {1..10}; do; for ((i=0; i<5; i++)); do; while IFS= read -r line; do echo "$line"; done < file.txt; until cmd; do sleep 1; done; break/continue.
Arrays: arr=(a b "c d"); "\${arr[@]}"; \${#arr[@]}; arr+=(e); associative: declare -A m; m[key]=val.
Functions: greet() { local who="$1"; echo "Hi $who"; return 0; } greet "Ana"; return codes 0 = success, non-zero = failure; output via echo and capture with $( ).
Exit codes: exit 1 on errors; cmd || { echo "failed" >&2; exit 1; }; trap 'rm -f "$tmp"' EXIT for cleanup; tmp=$(mktemp).
Redirection: > overwrite, >> append, 2> errors, &> both, 2>&1, < input, | pipe, here-doc: cat <<EOF ... EOF, /dev/null to discard.
Read input: read -rp "Name: " name. Colors: echo -e "\\e[32mOK\\e[0m" or tput setaf 2.`),

  c('commands', 'Essential shell/terminal commands: files, text processing, processes, networking, permissions (macOS/Linux)', ['terminal commands', 'linux commands', 'grep', 'find command', 'sed awk', 'chmod', 'ps kill', 'curl command', 'tar zip', 'ssh scp', 'xargs', 'du df', 'cron'],
    `Navigation/files: pwd, ls -la, cd -, mkdir -p a/b, touch, cp -r src dst, mv, rm -r (no undo! avoid rm -rf with variables), ln -s target link, cat, less, head -n 20, tail -f log (follow), wc -l, tree, file, stat, open . (macOS) / xdg-open.
Find: find . -name "*.log" -mtime +7 -type f; find . -name node_modules -prune -o -name "*.js" -print; -exec cmd {} +; fd is a faster alternative.
Search text: grep -rn "TODO" src/ (recursive, line numbers), -i (ignore case), -v (invert), -E (regex), -l (files only), -C 3 (context), --include="*.ts"; ripgrep rg "pattern" is faster.
Text processing: sort, sort -u, uniq -c, cut -d, -f2, tr 'a-z' 'A-Z', sed 's/old/new/g' file (sed -i '' on macOS vs sed -i on Linux to edit in place), awk '{ print $1 }', awk -F, '{ sum += $3 } END { print sum }', jq '.items[].name' (JSON), xargs (cmd | xargs -n1 echo), tee, diff -u, column -t.
Processes: ps aux | grep node, top/htop, kill PID (kill -9 as a last resort), lsof -i :3000 (who uses a port), jobs/bg/fg, cmd & (background), nohup, Ctrl+C (stop), Ctrl+Z (suspend), time cmd.
Disk/system: df -h, du -sh *, free -h (Linux), uname -a, whoami, env, which cmd, history, alias ll='ls -la' in ~/.zshrc or ~/.bashrc then source it, echo $PATH, export PATH="$HOME/bin:$PATH".
Permissions: chmod +x file, chmod 644 file (rw-r--r--), chmod 755 (rwxr-xr-x), chown user:group file, sudo (admin — be careful).
Archives: tar -czf out.tar.gz dir/, tar -xzf file.tar.gz, zip -r out.zip dir, unzip file.zip.
Network: curl -s https://api.x.com | jq ., curl -X POST -H "Content-Type: application/json" -d '{"a":1}' url, curl -o file url, wget, ping, dig/nslookup, ssh user@host, scp file user@host:/path, rsync -avz src/ host:dst/, ssh-keygen -t ed25519.
Scheduling: crontab -e → */5 * * * * /path/script.sh (min hour day month weekday); launchd on macOS, systemd timers on Linux.
Package managers: brew (macOS), apt (Debian/Ubuntu), dnf, pacman; winget/choco on Windows. Windows: PowerShell equivalents (Get-ChildItem, Select-String, Get-Process, Stop-Process) or WSL for real bash.`),
];
