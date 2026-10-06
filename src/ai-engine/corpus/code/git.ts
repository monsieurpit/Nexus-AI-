import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('git', slug, title, keywords, content);

export const CODE_GIT = [
  c('everyday', 'Git everyday workflow: init, clone, status, add, commit, push, pull, branches, merge, .gitignore', ['git basics', 'git commit', 'git push', 'git pull', 'git branch', 'git merge', 'gitignore', 'git clone', 'git status', 'github workflow', 'pull request'],
    `Setup: git config --global user.name "Name"; git config --global user.email "me@x.com"; git config --global init.defaultBranch main.
Start: git init (new repo) or git clone https://github.com/user/repo.git; connect a remote: git remote add origin URL; git push -u origin main (first push).
Daily loop: git status → git add file (or git add . / git add -p to pick hunks) → git commit -m "feat: add login form" → git pull --rebase (get others' work) → git push.
Inspect: git log --oneline --graph --all; git diff (unstaged), git diff --staged; git show <commit>; git blame file; git log -p file; git log -S "text" (find when text appeared).
Branches: git switch -c feature/login (create + switch; older: git checkout -b), git switch main, git branch (list), git branch -d name (delete merged), git push -u origin feature/login. Merge: git switch main && git merge feature/login. Rebase onto latest main: git switch feature && git rebase main (rewrites your branch's commits — don't rebase shared branches).
Pull requests (GitHub/GitLab): push the branch → open a PR → review → merge (merge commit, squash, or rebase) → delete the branch. gh pr create (GitHub CLI).
.gitignore: node_modules/, .env, dist/, build/, *.log, .DS_Store, __pycache__/, .venv/. Already-tracked files keep being tracked — untrack: git rm --cached file (then commit). Never commit secrets; if you did, rotate them (history keeps them).
Commit messages: imperative and specific ("Fix crash when cart is empty"); conventional commits (feat:, fix:, docs:, refactor:, chore:). Small, focused commits.
Tags/releases: git tag v1.2.0 && git push --tags. Stash work in progress: git stash, git stash pop, git stash list.`),

  c('fixing-mistakes', 'Git fixing mistakes: undo commits, reset, revert, restore, merge conflicts, detached HEAD, force push', ['git undo commit', 'git reset', 'git revert', 'git restore', 'merge conflict', 'git amend', 'detached head', 'git force push', 'git reflog', 'git cherry pick', 'rejected non fast forward'],
    `Discard local changes to a file: git restore file (unstage: git restore --staged file).
Fix the last commit (not pushed yet): git commit --amend -m "new message" (add forgotten files: git add f && git commit --amend --no-edit).
Undo commits:
- Keep the changes, remove the commit: git reset --soft HEAD~1 (staged) / git reset HEAD~1 (unstaged).
- Throw everything away: git reset --hard HEAD~1 (destructive; uncommitted work is lost).
- Already pushed/shared: git revert <commit> (creates a new commit that undoes it — safe for shared history).
Recover "lost" commits after a bad reset/rebase: git reflog → git reset --hard HEAD@{2} or git branch rescue <sha>.
Merge conflicts: Git marks files with <<<<<<< HEAD (yours) ======= (theirs) >>>>>>> branch. Edit to the final content, remove the markers, git add file, then git commit (merge) or git rebase --continue. Abort: git merge --abort / git rebase --abort. Editors (VS Code) show Accept Current/Incoming/Both buttons.
"Updates were rejected (non-fast-forward)" → the remote has commits you don't: git pull --rebase then push. Only force-push your own branches: git push --force-with-lease (safer than --force, refuses if someone else pushed).
Detached HEAD (checked out a commit/tag): git switch -c new-branch to keep work, or git switch main.
Committed to the wrong branch: git branch correct-branch (keeps the commit there) → git reset --hard HEAD~1 on the wrong one → git switch correct-branch. Or cherry-pick: git cherry-pick <sha>.
Squash commits before a PR: git rebase -i HEAD~3 (pick/squash/fixup/reword) or squash-merge on GitHub.
Remove a secret from history: rotate the secret first, then git filter-repo or BFG; force-push; tell collaborators.
Large files: Git LFS (git lfs track "*.psd"). Line endings: .gitattributes (* text=auto).
"fatal: not a git repository" → wrong folder (cd into it) or git init. "Permission denied (publickey)" → set up SSH keys (ssh-keygen -t ed25519, add to GitHub) or use HTTPS with a token. "refusing to merge unrelated histories" → git pull origin main --allow-unrelated-histories (when the remote was created with a README).
Bisect a regression: git bisect start; git bisect bad; git bisect good v1.0; test each step; git bisect reset.`),
];
