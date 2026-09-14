import { KnowledgeItem } from '../../types';

// Batch 314 corpus fixes — coding-priority batch (2026-09-14). 14/25 misses.
// Topic: git branching workflows and strategies (Gitflow vs trunk-based development, feature vs
// release vs hotfix branches, forking vs shared-repository workflow, origin vs upstream, fast-
// forward vs three-way merge, squash merge vs merge commit, detached HEAD, git rm --cached, semver
// tags vs release branches) — chosen because grep confirmed zero prior corpus coverage of any of
// these specific git-workflow terms (git merge/rebase/cherry-pick/reset/revert/stash/tag basics
// were already covered elsewhere, but nothing on branching strategy or team workflow existed).
// One severe wrong-domain hallucination: "detached HEAD state vs normal branch checkout" answered
// about the British "head of state" / constitutional monarchy (King Charles III), never touching
// git at all. A second severe wrong-domain hallucination: "trunk-based development vs long-lived
// feature branches" answered about PHP vs Node.js request-handling models. Three factual errors/
// inversions: "origin vs upstream" claimed they're "just different names for the same concept"
// (they're distinct remotes — origin is your fork, upstream is the original repo); "tag vs branch"
// claimed tags live in .git/refs/heads/ alongside branches (they live in .git/refs/tags/); "feature
// branch vs release branch in Gitflow" said feature branches spin off "main" (in Gitflow they
// branch from and merge back into "develop", not main); "gitignore vs git rm --cached" had the
// mechanism backwards, claiming rm --cached deletes the file from the working directory but keeps
// it in the repo (it's the reverse: the file stays on disk, it's removed from Git's tracking/index).
// Many one-sided cutoffs, cut off right as the second half of the comparison should start: squash
// merge vs merge commit (only explained regular merge), hotfix vs feature branch (cut off right as
// it started defining hotfix), forking vs shared workflow (only explained shared), fast-forward vs
// three-way merge (cut off right as three-way merge started), pull --rebase vs plain pull (only
// explained plain pull), merge conflict vs rebase conflict (only explained merge conflicts, then
// trailed into an unrelated oversharing aside about a neighbor's dog), semver tags vs release
// branches (only explained semver, never touched release branches). "Gitflow vs trunk-based
// development" dodged by describing Gitflow's own branches and treating "trunk" as just Gitflow's
// main branch, never explaining trunk-based development as a distinct alternative model.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const GIT_WORKFLOWS_BRANCHING_GAPS: KnowledgeItem[] = [
  k(
    'kb-code-squash-merge-vs-merge-commit',
    'Squash merge vs regular merge commit',
    ['squash merge vs merge commit', 'squash and merge git', 'what does squash merge do'],
    "A regular merge commit brings in every individual commit from the feature branch exactly as it happened, plus one new commit that ties the two branch tips together — the full, sometimes messy, step-by-step history (every \"wip\", every \"fix typo\") is preserved forever in the target branch's log, and the graph shows both branches converging. A SQUASH merge instead takes all the commits on the feature branch and collapses them into a single new commit applied on top of the target branch — none of the individual intermediate commits are kept, only one commit with one combined diff and one message (usually the PR title/description) lands on the target branch, and the branch's own commit history is discarded from that log entirely (though it can still be seen if you look at the original now-merged branch/PR before it's deleted). Squashing keeps the main branch's history clean and readable — one commit per feature/PR — at the cost of losing the fine-grained \"how did we get there\" trail; a regular merge preserves that trail but makes the history noisier, especially with branches that had lots of small back-and-forth commits. The key difference: a merge commit keeps every original commit plus adds a tying-together commit, while a squash merge throws away the individual commits and replaces them all with exactly one new commit on the target branch.",
  ),
  k(
    'kb-code-gitflow-vs-trunk-based',
    'Gitflow vs trunk-based development',
    ['gitflow vs trunk-based development', 'trunk based development vs gitflow', 'what is trunk-based development'],
    "Gitflow is a heavyweight branching model with several long-lived, purpose-specific branches: \"main\"/\"master\" holds only released production code, \"develop\" is the ongoing integration branch, \"feature/*\" branches come off develop for new work, \"release/*\" branches stabilize a version before it ships, and \"hotfix/*\" branches patch production urgently. Work can live on a feature branch for days or weeks before it's integrated anywhere else. TRUNK-BASED DEVELOPMENT is the opposite philosophy: there is effectively just ONE long-lived shared branch (the \"trunk\", usually main), and everyone commits to it directly or merges very short-lived branches (often living less than a day) back into it constantly — multiple times a day per developer. Instead of long feature branches hiding half-finished work, unfinished features are hidden behind feature flags/toggles so incomplete code can still be merged to trunk safely without being shown to users. Trunk-based development avoids Gitflow's painful, large, infrequent merges (since everyone integrates constantly, conflicts are small and caught early) and pairs naturally with continuous integration/continuous deployment, where trunk is always kept in a releasable state. Gitflow suits projects with scheduled, versioned releases and a real need to maintain multiple release lines at once (e.g. shipped desktop software); trunk-based development suits fast-moving, continuously-deployed web services. The key difference: Gitflow isolates work on multiple long-lived branches per purpose and integrates it in big batches, while trunk-based development keeps almost everyone working directly against one shared trunk with only short-lived branches, using feature flags instead of branches to hide incomplete work.",
  ),
  k(
    'kb-code-feature-vs-release-branch-gitflow',
    'Feature branch vs release branch (Gitflow)',
    ['feature branch vs release branch gitflow', 'gitflow branch types'],
    "In the Gitflow model, a FEATURE branch (feature/*) is where active development of one new piece of functionality happens: it is branched off \"develop\" (NOT off \"main\" — main in Gitflow is reserved for released code only), the developer commits freely and experimentally there, and when the feature is done it is merged back into develop, where it joins everyone else's finished features. A RELEASE branch (release/*) is created from develop once develop has accumulated enough finished features to ship a version — it is a stabilization/staging area where only bug fixes, documentation, and release-prep chores (bumping the version number, etc.) happen, deliberately no new features. When the release branch is fully tested and ready, it is merged into BOTH main (tagged with the version number, becoming the actual release) and back into develop (so the release-branch bug fixes aren't lost from ongoing development). The key difference: a feature branch is where new functionality is actively built and branches off/merges back into develop, while a release branch is a feature-frozen staging area that finalizes an already-built set of features and merges into both main and develop.",
  ),
  k(
    'kb-code-hotfix-vs-feature-branch',
    'Hotfix branch vs feature branch',
    ['hotfix branch vs feature branch', 'what is a hotfix branch in git'],
    "A feature branch is for planned, non-urgent new work: it branches off develop, can live for a while, and follows the normal review/merge process before reaching production. A HOTFIX branch is an emergency-repair branch: it is created directly off \"main\"/production (not off develop), because it needs to patch a critical bug that is live in production RIGHT NOW and can't wait for the next scheduled release. A developer branches off main, makes the minimal fix, and once verified, merges the hotfix into BOTH main (tagged as a new patch release, e.g. bumping v2.3.1 to v2.3.2, and deployed immediately) and develop/any active release branch (so the fix isn't lost and doesn't get silently reverted by the next normal release). The key difference: a feature branch builds new functionality off develop on a normal timeline, while a hotfix branch patches an urgent production bug directly off main and ships as fast as possible, merging back into both main and develop.",
  ),
  k(
    'kb-code-detached-head-state',
    'Detached HEAD state vs normal branch checkout',
    ['detached head state git', 'what does detached head mean in git', 'not a head of state'],
    "This is a Git term, not \"head of state\"/monarchy. Normally, Git's HEAD is a pointer that points at a BRANCH name (like main), and that branch name in turn points at the latest commit — so when you make a new commit, the branch pointer automatically moves forward to include it, and your work is safely attached to a branch. A DETACHED HEAD happens when you check out something that is NOT a branch name — a specific commit hash, a tag, or a remote branch directly (e.g. `git checkout a1b2c3d` or `git checkout v1.2.0`) — so HEAD now points directly at that one commit instead of at a branch. You can still look around and even make new commits while detached, but those new commits aren't remembered by any branch — if you switch to another branch afterward, Git may garbage-collect those orphaned commits and they can be lost (Git will warn you about this). Detached HEAD is normal and useful for briefly inspecting old code, testing a specific commit, or building from a tag; the fix if you want to KEEP work done there is to immediately create a real branch from that point with `git switch -c new-branch-name` before moving away. The key difference: a normal checkout points HEAD at a branch that moves forward with new commits, while detached HEAD points it directly at one fixed commit, so new commits there aren't attached to any branch and can be lost.",
  ),
  k(
    'kb-code-tag-vs-branch',
    'Git tag vs git branch (and where they live)',
    ['git tag vs branch', 'what is a git tag'],
    "A branch is a MOVING pointer to a commit: every time you commit while on that branch, the branch's pointer automatically advances to the new commit, and branches are meant to be worked on and extended over time. A tag is (by default) a FIXED pointer to one specific commit that never moves on its own — it's used to permanently mark a meaningful point in history, almost always a release (v1.0.0, v2.3.1), so you can always jump back to exactly what was shipped at that version. Under the hood, branch references are stored as files under `.git/refs/heads/`, while tag references are stored separately under `.git/refs/tags/` — they are NOT stored in the same location. Tags come in two flavors: lightweight (just a name pointing at a commit, nothing more) and annotated (a full object with its own message, author, and date, and cryptographically signable — the recommended kind for real releases). The key difference: a branch is a pointer that moves forward as you commit and lives in `.git/refs/heads/`, while a tag is a pointer that stays fixed at one commit to mark a release and lives in `.git/refs/tags/`.",
  ),
  k(
    'kb-code-forking-vs-shared-workflow',
    'Forking workflow vs shared repository workflow',
    ['forking workflow vs shared repository workflow', 'fork and pull request workflow'],
    "In the SHARED REPOSITORY workflow, every contributor has push access directly to one single central repository: everyone clones the same remote, creates branches within it, and opens pull requests between branches of that same repo. It's simple and works well for a trusted team (e.g. co-workers at the same company). In the FORKING workflow, contributors do NOT have push access to the original (\"upstream\") repository at all — instead, each person creates their own personal server-side copy (a \"fork\") of it on GitHub/GitLab, clones THEIR fork locally, makes changes and pushes them to their own fork, and then opens a pull request FROM their fork's branch TO the original upstream repository, where a maintainer reviews and merges it in. This is the standard model for open-source projects, since it lets anyone propose changes without needing to be trusted with write access to the real repository up front — the maintainers stay in full control of what actually lands in main. The key difference: the shared workflow has everyone pushing branches into one common repository, while the forking workflow has each contributor pushing to their own separate copy and proposing changes back via a pull request to the original.",
  ),
  k(
    'kb-code-origin-vs-upstream',
    'Origin vs upstream in git',
    ['origin vs upstream git', 'what is upstream in git'],
    "\"origin\" and \"upstream\" are both just names (remote aliases) for a remote repository URL — but they are NOT the same thing and NOT interchangeable; a repo commonly has both set up as two DIFFERENT remotes pointing at two different URLs. \"origin\" is the default name Git gives to the remote you cloned FROM — in the forking workflow, that's YOUR OWN fork (e.g. github.com/you/project.git), the one you have push access to. \"upstream\" is a remote you add manually, pointing at the ORIGINAL repository you forked from (e.g. github.com/original-owner/project.git) — you typically only have read access to it, not push access. You add it with `git remote add upstream <url>` specifically so you can periodically run `git fetch upstream` and merge/rebase upstream's latest main into your fork, keeping your fork up to date with changes other contributors have made, since `git pull` alone (which defaults to origin) would only ever sync with your own fork. The key difference: origin is the remote you clone from and push your own work to (your fork), while upstream is the separate original repository you pull updates from to stay current — they point at different URLs, not the same one.",
  ),
  k(
    'kb-code-fast-forward-vs-three-way-merge',
    'Fast-forward merge vs three-way merge',
    ['fast-forward merge vs three-way merge', 'what is a three way merge'],
    "A FAST-FORWARD merge happens when the branch being merged in is simply \"ahead\" of the target branch with no new commits on the target side since they diverged — the target branch never moved independently, so Git doesn't need to combine anything; it just slides (\"fast-forwards\") the target branch's pointer straight up to the tip of the other branch. No new merge commit is created, and the history stays perfectly linear, as if you'd been committing on the target branch the whole time. A THREE-WAY merge happens when BOTH branches have new, independent commits since they diverged — so Git can't just move a pointer, it has to actually combine two different histories. It looks at three points: the tip of your current branch, the tip of the branch being merged in, and their common ancestor commit (the point where they diverged) — comparing changes on both sides against that shared ancestor to figure out what changed and automatically combine them (flagging real conflicts where both sides changed the same lines for you to resolve by hand), then creates a new MERGE COMMIT with two parents recording that combination. The key difference: a fast-forward merge just moves a pointer forward with no divergent history and no new commit, while a three-way merge combines genuinely diverged histories using a common-ancestor comparison and produces a new merge commit with two parents.",
  ),
  k(
    'kb-code-pull-rebase-vs-plain-pull',
    'git pull --rebase vs plain git pull',
    ['git pull --rebase vs git pull', 'what does pull rebase do'],
    "A plain `git pull` is shorthand for `git fetch` (download new commits from the remote) followed by `git merge` (a normal three-way merge of the remote's new commits into your current branch) — if you have local commits the remote doesn't have, this creates a new merge commit tying your local work and the remote's new work together, which is fine but adds an extra merge commit to the history every time your local and remote branches diverged even slightly. `git pull --rebase` instead does `git fetch` followed by `git rebase` — it temporarily sets your local commits aside, fast-forwards your branch to match the remote's latest tip, and then REPLAYS your local commits one by one on top of that new tip, giving you new commit hashes for your local work but a clean, linear history with no extra merge commit. The trade-off: rebasing rewrites your local commits (which is safe as long as you haven't already pushed/shared them), and if the same lines were touched on both sides you resolve conflicts one commit at a time during the replay rather than in one combined merge conflict. Many teams set `git pull --rebase` (or `git config pull.rebase true`) as their default specifically to keep history linear and avoid a clutter of routine \"merge branch main into feature\" commits. The key difference: plain `git pull` merges the remote's changes in with a merge commit, while `git pull --rebase` replays your local commits on top of the remote's latest changes instead, keeping history linear with no merge commit.",
  ),
  k(
    'kb-code-merge-conflict-vs-rebase-conflict',
    'Merge conflict vs rebase conflict',
    ['merge conflict vs rebase conflict', 'resolving conflicts during rebase'],
    "Both happen when Git can't automatically combine changes because the same lines of a file were modified differently on both sides — but they differ in WHEN and HOW OFTEN you resolve them. In a MERGE, Git compares the two branch tips against their common ancestor ONE TIME and surfaces ALL the conflicts across every differing commit at once, in a single combined diff; you resolve every conflicting file, then make ONE merge commit, and you're done — one resolution pass covers the whole set of changes together. In a REBASE, your commits are replayed onto the new base ONE COMMIT AT A TIME, in their original order — so a conflict can surface, get resolved with `git rebase --continue`, and then the VERY SAME LINES can conflict again on the next commit in the sequence if multiple of your commits touched that area, meaning you might have to resolve conceptually the same conflict multiple times across several separate replay steps rather than once. Rebase conflicts are generally considered fiddlier for this reason, though each individual conflict is often smaller and easier to reason about since it's tied to one specific commit's intent rather than the whole branch's combined diff; you can bail out of either with `git merge --abort` or `git rebase --abort` if it gets too messy. The key difference: a merge conflict is resolved once across the combined diff of the whole merge, while a rebase conflict can recur commit-by-commit as each original commit is individually replayed onto the new base.",
  ),
  k(
    'kb-code-gitignore-vs-rm-cached',
    '.gitignore vs git rm --cached',
    ['gitignore vs git rm --cached', 'stop tracking a file without deleting it'],
    "`.gitignore` is a plain text file listing patterns (file names, extensions, folders like node_modules/, *.log, .env) that tells Git to never START tracking those files in the first place — it only affects UNTRACKED files; if a file is already being tracked (already committed at some point), adding it to .gitignore afterward does nothing to stop it, since .gitignore only prevents new/untracked files from being picked up by `git add .` or shown as untracked in `git status`. `git rm --cached <file>` is what you use to untrack a file that IS already being tracked: it removes the file from Git's INDEX (staging area) so it will no longer be tracked/committed going forward — crucially, it does NOT delete the actual file from your working directory/disk; the physical file stays exactly where it is, you just stop committing changes to it. The normal fix for \"I accidentally committed my .env file\" is to run `git rm --cached .env` (to stop tracking it, keeping the local file), THEN add .env to .gitignore (so it isn't re-added by accident next time), then commit that change. The key difference: .gitignore prevents never-tracked files from being tracked in the first place, while git rm --cached stops tracking an already-tracked file going forward while leaving the actual file on disk untouched.",
  ),
  k(
    'kb-code-semver-tags-vs-release-branches',
    'Semantic versioning tags vs release branches for managing versions',
    ['semver tags vs release branches', 'version tags vs release branches'],
    "Both are ways of marking versions, but they solve different problems and are often used together. A SEMVER TAG (like v2.4.1, following MAJOR.MINOR.PATCH — major for breaking changes, minor for backward-compatible new features, patch for backward-compatible bug fixes) is a lightweight, permanent, point-in-time LABEL on a single commit: it marks \"this exact commit is what we shipped as version 2.4.1\" and never moves. Tags are cheap to create, take essentially no ongoing maintenance, and are perfect when a project only ever needs to support its latest version going forward (most web apps/services: tag each deploy, move on). A RELEASE BRANCH (release/2.4.x, or a long-lived branch per major version) is a living, ongoing line of development that can keep receiving its OWN commits after it's created — needed when a project must maintain and patch MULTIPLE versions in parallel, e.g. shipped desktop software where some customers are still on v1.x and need security patches even after v2.0 has shipped on the main line; you cherry-pick or independently commit fixes onto the release/1.x branch and tag new patch releases (v1.9.1, v1.9.2) from points along it, separately from ongoing v2.x development on main. The key difference: a semver tag is a static label marking one commit as a specific version with no further life of its own, while a release branch is an actively maintained line of development that can keep receiving new patch commits long after it was created, used when multiple version lines need to be supported at once.",
  ),
];
