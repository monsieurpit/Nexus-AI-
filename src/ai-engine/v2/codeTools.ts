// v2code (2026-10-05, Patrick: "massively expand his coding skills... make a v2code thing so he codes better").
// The code specialist's tools:
//   - detectCodeLang: which language they want (named, ```fence tag, file extension or the code's look);
//   - extractCodeBlocks: the ``` blocks of a reply;
//   - checkCode: a REAL syntax check with the language's own parser/compiler — never runs the code:
//       JS/JSX/TS/TSX/Node (Bun's transpiler), Python (py_compile), C/C++ (clang -fsyntax-only), Swift (swiftc -parse),
//       Ruby (ruby -c), Bash (bash -n), JSON (parser). Errors go back to the model for a fix (pipeline.ts).
// Languages without a checker on this Mac (Go, Rust, Lua, PHP, Java — no JDK) are reviewed by the model only.

import { execFile } from 'child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { BUILTIN_KNOWLEDGE } from '../knowledgeBase';
import { CODE_REFERENCE } from '../corpus/code';
import type { KnowledgeItem } from '../../types';

export type CodeLang =
  | 'javascript' | 'typescript' | 'node' | 'react' | 'html' | 'css' | 'python' | 'cpp' | 'c' | 'csharp' | 'java' | 'go'
  | 'rust' | 'lua' | 'sql' | 'bash' | 'php' | 'swift' | 'kotlin' | 'ruby' | 'discordjs' | 'discordpy' | 'git' | 'regex' | 'json'
  | 'dart' | 'vue' | 'svelte' | 'r' | 'powershell'
  | 'scala' | 'haskell' | 'elixir' | 'assembly' | 'perl' | 'julia' | 'matlab' | 'objectivec' | 'clojure' | 'devops';

export const LANG_LABEL: Record<CodeLang, string> = {
  javascript: 'JavaScript', typescript: 'TypeScript', node: 'Node.js', react: 'React (JSX/TSX)', html: 'HTML', css: 'CSS',
  python: 'Python', cpp: 'C++', c: 'C', csharp: 'C#', java: 'Java', go: 'Go', rust: 'Rust', lua: 'Lua / Luau (Roblox)',
  sql: 'SQL', bash: 'Bash / shell', php: 'PHP', swift: 'Swift', kotlin: 'Kotlin', ruby: 'Ruby', discordjs: 'discord.js',
  discordpy: 'discord.py', git: 'Git', regex: 'Regular expressions', json: 'JSON / YAML',
  dart: 'Dart / Flutter', vue: 'Vue', svelte: 'Svelte', r: 'R', powershell: 'PowerShell / Windows command line',
  scala: 'Scala', haskell: 'Haskell', elixir: 'Elixir', assembly: 'Assembly', perl: 'Perl', julia: 'Julia', matlab: 'MATLAB / Octave',
  objectivec: 'Objective-C', clojure: 'Clojure', devops: 'DevOps (Docker, CI/CD, servers)',
};

// Order matters: the more specific first (discord.js before javascript, tsx before typescript, c++ before c).
const LANG_CUES: Array<[CodeLang, RegExp]> = [
  ['devops', /\bdocker(?:file)?\b|\bdocker[\s-]compose\b|\bkubernetes\b|\bk8s\b|\bgithub\s+actions\b|\bci\s*\/\s*cd\b|\bnginx\b|\breverse\s+proxy\b|\bsystemd\b|\bterraform\b/i],
  ['objectivec', /\bobjective[\s-]?c\b|\bobjc\b|\bNSString\b|@interface\s+\w+\s*:/i],
  ['scala', /\bscala\b|\bsbt\b|\bcase\s+class\b/i],
  ['haskell', /\bhaskell\b|\bghci?\b|\bcabal\b|::\s*IO\s*\(\)/i],
  ['elixir', /\belixir\b|\bphoenix\s+(?:framework|liveview|app)\b|\bliveview\b|\bgenserver\b|\bdefmodule\b/i],
  ['clojure', /\bclojure(?:script)?\b|\bleiningen\b|\(defn\s/i],
  ['assembly', /\bassembly\s+(?:language|code|program|lang)\b|\bin\s+assembly\b|\basm\b|\bnasm\b|\bx86(?:-64)?\b|\baarch64\b|\barm64\s+assembly\b/i],
  ['perl', /\bperl\b|\bcpan\b/i],
  ['julia', /\bjulia\s+(?:code|language|lang|script|programming)\b|\bin\s+julia\b/i],
  ['matlab', /\bmatlab\b|\boctave\b|\bsimulink\b/i],
  ['discordjs', /\bdiscord\.?js\b|\bdjs\b|\bslash\s+commands?\b.*\b(?:js|javascript|node)\b|\b(?:js|javascript|node)\b.*\bdiscord\s+bot\b/i],
  ['discordpy', /\bdiscord\.?py\b|\bpycord\b|\bnextcord\b|\b(?:python|py)\b.*\bdiscord\s+bot\b|\bdiscord\s+bot\b.*\b(?:python|py)\b/i],
  ['vue', /\bvue(?:\.?js)?\b|\bnuxt\b|\bpinia\b|<script\s+setup\b|\bv-(?:for|if|model)\b/i],
  ['svelte', /\bsvelte(?:kit)?\b|\$state\(|\$derived\(/i],
  ['react', /\breact\b|\bjsx\b|\btsx\b|\bnext\.?js\b|\buse(?:State|Effect|Ref|Memo|Callback|Context)\b|\bcomponent\b.*\b(?:props|state)\b/i],
  ['typescript', /\btypescript\b|\b\.ts\b|\bts\s+(?:code|file|type)|\binterface\s+\w+\s*\{|\btype\s+\w+\s*=|:\s*(?:string|number|boolean)\b/i],
  ['node', /\bnode(?:\.?js)?\b|\bnpm\b|\bexpress\b|\brequire\(\s*['"](?:fs|path|http|express)['"]\)|\bprocess\.env\b/i],
  ['javascript', /\bjavascript\b|\bjs\b|\bvanilla\s+js\b|\becmascript\b|\bconsole\.log\b|\bdocument\.\w+|\b(?:const|let)\s+\w+\s*=/i],
  ['python', /\bpython\d?\b|\bpy\b|\bpip\b|\bdjango\b|\bflask\b|\bfastapi\b|\bpandas\b|\bnumpy\b|\bdef\s+\w+\(|\bimport\s+\w+\s*$|\bprint\(/im],
  ['cpp', /\bc\+\+|\bcpp\b|\bstd::|#include\s*<(?:iostream|vector|string|map|algorithm)>|\bcout\s*<</i],
  ['csharp', /\bc#|\bc\s?sharp\b|\b\.net\b|\bunity\b.*\bscript\b|\bmonobehaviour\b|\busing\s+System\b|\bConsole\.WriteLine\b/i],
  ['c', /\bc\s+(?:code|program|language|lang)\b|\bin\s+c\b|\bprintf\s*\(|#include\s*<(?:stdio|stdlib|string)\.h>|\bmalloc\s*\(/i],
  ['java', /\bjava\b(?!script)|\bspring\s+boot\b|\bpublic\s+static\s+void\s+main\b|\bSystem\.out\.println\b/i],
  ['go', /\bgolang\b|\bgo\s+(?:code|program|lang|func|http|web|api|backend|struct|module|cli)\b|\bgoroutines?\b|\bgo\.mod\b|\bin\s+go\b|\bfunc\s+main\s*\(\)|\bfmt\.Print/i],
  ['rust', /\brust\b|\bcargo\b|\bfn\s+main\s*\(\)|\blet\s+mut\b|\bprintln!\(/i],
  ['lua', /\blua\b|\bluau\b|\broblox\b|\broblox\s+studio\b|\blocal\s+function\b|\bgame:GetService\b/i],
  ['sql', /\bsql\b|\bmysql\b|\bpostgres(?:ql)?\b|\bsqlite\b|\bselect\s+.+\s+from\b|\binsert\s+into\b|\bcreate\s+table\b/i],
  ['powershell', /\bpowershell\b|\bpwsh\b|\.ps1\b|\bcmd(?:\.exe)?\b|\bbatch\s+file\b|\bcommand\s+prompt\b|\b(?:Get|Set|New|Remove)-[A-Z]\w+/i],
  ['bash', /\bbash\b|\bshell\s+script\b|\bzsh\b|\bterminal\s+command\b|\b\.sh\b|#!\/bin\/(?:ba)?sh|\bchmod\b|\bgrep\b/i],
  ['php', /\bphp\b|\blaravel\b|<\?php|\becho\s+\$\w+/i],
  ['dart', /\bdart\b|\bflutter\b|\bpubspec\b|\bstatelesswidget\b|\bstatefulwidget\b/i],
  ['swift', /\bswift\b|\bswiftui\b|\bxcode\b|\bios\s+app\b|\bfunc\s+\w+\(.*\)\s*->/i],
  ['kotlin', /\bkotlin\b|\bjetpack\s+compose\b|\bfun\s+main\s*\(/i],
  ['r', /\bin\s+r\b|\br\s+(?:code|language|script|programming)\b|\brstudio\b|\bggplot2?\b|\bdplyr\b|\btidyverse\b|\bdata\.frame\(/i],
  ['ruby', /\bruby\b|\brails\b|\bputs\s+["']/i],
  ['html', /\bhtml\b|\bwebsite\b|\bweb\s*page\b|\blanding\s+page\b|<\/?(?:div|body|head|html)\b/i],
  ['css', /\bcss\b|\bflexbox\b|\bgrid\s+layout\b|\btailwind\b|\bcenter\s+a\s+div\b|\bstylesheet\b/i],
  ['git', /\bgit\b|\bgithub\b|\bcommit\b|\bmerge\s+conflict\b|\brebase\b|\bpull\s+request\b/i],
  ['regex', /\bregex\b|\bregexp\b|\bregular\s+expression\b/i],
  ['json', /\bjson\b|\byaml\b|\byml\b/i],
];

const FENCE_LANG: Record<string, CodeLang> = {
  js: 'javascript', javascript: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'react', tsx: 'react', ts: 'typescript',
  typescript: 'typescript', py: 'python', python: 'python', cpp: 'cpp', 'c++': 'cpp', cc: 'cpp', hpp: 'cpp', c: 'c', h: 'c',
  cs: 'csharp', csharp: 'csharp', java: 'java', go: 'go', rs: 'rust', rust: 'rust', lua: 'lua', luau: 'lua', sql: 'sql',
  sh: 'bash', bash: 'bash', zsh: 'bash', shell: 'bash', php: 'php', swift: 'swift', kt: 'kotlin', kotlin: 'kotlin', rb: 'ruby',
  ruby: 'ruby', html: 'html', css: 'css', scss: 'css', json: 'json', yaml: 'json', yml: 'json',
  dart: 'dart', vue: 'vue', svelte: 'svelte', r: 'r', ps1: 'powershell', powershell: 'powershell', pwsh: 'powershell', bat: 'powershell', cmd: 'powershell',
  scala: 'scala', hs: 'haskell', haskell: 'haskell', ex: 'elixir', exs: 'elixir', elixir: 'elixir', asm: 'assembly', nasm: 'assembly',
  s: 'assembly', pl: 'perl', perl: 'perl', jl: 'julia', julia: 'julia', matlab: 'matlab', m: 'objectivec', objc: 'objectivec',
  'objective-c': 'objectivec', clj: 'clojure', clojure: 'clojure', dockerfile: 'devops', docker: 'devops', nginx: 'devops',
};

export function detectCodeLang(text: string): CodeLang | null {
  const fence = text.match(/```([\w+#-]+)/);
  if (fence && FENCE_LANG[fence[1].toLowerCase()]) return FENCE_LANG[fence[1].toLowerCase()];
  for (const [lang, re] of LANG_CUES) if (re.test(text)) return lang;
  return null;
}

export interface CodeBlock {
  tag: string;
  code: string;
}

export function extractCodeBlocks(reply: string): CodeBlock[] {
  return [...reply.matchAll(/```([\w+#.-]*)[^\n]*\n([\s\S]*?)```/g)].map((m) => ({ tag: m[1].toLowerCase(), code: m[2] }));
}

function run(cmd: string, args: string[], cwd: string): Promise<{ code: number; out: string }> {
  return new Promise((resolve) => {
    execFile(cmd, args, { cwd, timeout: 20000, maxBuffer: 4 * 1024 * 1024 }, (err, stdout, stderr) => {
      resolve({ code: err ? 1 : 0, out: `${stdout}\n${stderr}`.trim() });
    });
  });
}

export interface CheckResult {
  checked: boolean; // false = no checker for this language
  ok: boolean;
  checker: string;
  errors: string; // compiler output, trimmed
}

const BUN = process.env.BUN_PATH || 'bun';

// A syntax/compile check only — the code is never executed.
export async function checkCode(lang: CodeLang | null, tag: string, code: string): Promise<CheckResult> {
  const kind = FENCE_LANG[tag] || lang;
  if (!kind || !code.trim()) return { checked: false, ok: true, checker: '', errors: '' };
  const dir = mkdtempSync(join(tmpdir(), 'nexus-code-'));
  const file = (ext: string) => {
    const p = join(dir, `snippet.${ext}`);
    writeFileSync(p, code);
    return p;
  };
  try {
    let r: { code: number; out: string };
    let checker = '';
    switch (kind) {
      case 'javascript':
      case 'node':
      case 'discordjs':
      case 'typescript':
      case 'react': {
        const ext = kind === 'react' ? (/:\s*\w+|interface\s|<\w+>\(/.test(code) || tag === 'tsx' ? 'tsx' : 'jsx') : kind === 'typescript' || tag === 'ts' ? 'ts' : 'js';
        checker = `bun parser (.${ext})`;
        r = await run(BUN, ['build', '--no-bundle', file(ext), '--outdir', join(dir, 'out')], dir);
        break;
      }
      case 'python':
      case 'discordpy':
        checker = 'python3 py_compile';
        r = await run('python3', ['-m', 'py_compile', file('py')], dir);
        break;
      case 'cpp':
        checker = 'clang++ -std=c++20 -fsyntax-only';
        r = await run('clang++', ['-std=c++20', '-fsyntax-only', file('cpp')], dir);
        break;
      case 'c':
        checker = 'clang -std=c17 -fsyntax-only';
        r = await run('clang', ['-std=c17', '-fsyntax-only', file('c')], dir);
        break;
      case 'swift':
        checker = 'swiftc -parse';
        r = await run('swiftc', ['-parse', file('swift')], dir);
        break;
      case 'ruby':
        checker = 'ruby -c';
        r = await run('ruby', ['-c', file('rb')], dir);
        break;
      case 'bash':
        if (/^\s*(?:\$\s|npm |git |cd |ls |pip )/m.test(code) && !/^#!/.test(code)) return { checked: false, ok: true, checker: '', errors: '' }; // terminal commands, not a script
        checker = 'bash -n';
        r = await run('bash', ['-n', file('sh')], dir);
        break;
      case 'json':
        try {
          JSON.parse(code);
          return { checked: true, ok: true, checker: 'JSON.parse', errors: '' };
        } catch (e: any) {
          return /^\s*[\w-]+\s*:/m.test(code) ? { checked: false, ok: true, checker: '', errors: '' } : { checked: true, ok: false, checker: 'JSON.parse', errors: String(e.message) };
        }
      default:
        return { checked: false, ok: true, checker: '', errors: '' };
    }
    // Missing third-party headers/packages are not the model's syntax mistakes (we don't have their libraries here).
    const errors = r.out
      .split('\n')
      .filter((l) => l.trim() && !/file not found|No such module|cannot find module|Could not resolve/i.test(l))
      .join('\n')
      .replace(new RegExp(dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
      .slice(0, 1500);
    const failed = r.code !== 0 && /error|SyntaxError|unexpected|expected/i.test(errors);
    return { checked: true, ok: !failed, checker, errors: failed ? errors : '' };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// ── Language reference (corpus/code: one `code-<lang>` category per language) ──
const CODE_REF_CATEGORIES: Partial<Record<CodeLang, CodeLang[]>> = {
  node: ['node', 'javascript'], discordjs: ['discordjs', 'node', 'javascript'], react: ['react', 'typescript', 'javascript'],
  typescript: ['typescript', 'javascript'], discordpy: ['discordpy', 'python'], html: ['html', 'css'], css: ['css', 'html'],
  vue: ['vue', 'javascript'], svelte: ['svelte', 'javascript'], powershell: ['powershell', 'bash'], objectivec: ['objectivec', 'c'],
};
// Algorithms, data structures and design apply to every language: one such doc joins the reference when the question is about them.
const ALGO_RE = /\b(?:algorithms?|big\s*o|complexity|data\s+structures?|sort(?:ing)?|binary\s+search|recursi(?:on|ve)|dfs|bfs|graph|tree|linked\s+list|heap|stack|queue|hash\s*map|dynamic\s+programming|dp|memoi[sz]|greedy|backtracking|dijkstra|path\s*finding|leetcode|interview|two\s+pointers?|sliding\s+window|clean\s+code|design\s+patterns?|solid|refactor|architecture|debug(?:ging)?|unit\s+tests?|best\s+practices?)\b/i;
// A long doc is cut to the lines that share the most words with the question (kept in their original order),
// so the part they need survives instead of only the first 1800 chars.
const REF_STOP = new Set(['the', 'a', 'an', 'to', 'in', 'of', 'and', 'or', 'for', 'my', 'me', 'how', 'do', 'i', 'it', 'is', 'with', 'make', 'write', 'can', 'you', 'please', 'code', 'nexus', 'what', 'that', 'this']);
export function refExcerpt(content: string, query: string, max: number): string {
  if (content.length <= max) return content;
  const words = new Set((query.toLowerCase().match(/[a-z0-9_+#.]{2,}/g) || []).filter((w) => !REF_STOP.has(w)));
  const lines = content.split('\n');
  const scored = lines.map((l, i) => {
    const lw = l.toLowerCase();
    let score = 0;
    for (const w of words) if (lw.includes(w)) score += 1;
    return { i, l, score: score + (i === 0 ? 0.5 : 0) }; // the opening line usually sets up the essentials
  });
  const keep = new Set<number>();
  let used = 0;
  for (const s of [...scored].sort((a, b) => b.score - a.score || a.i - b.i)) {
    if (used + s.l.length + 1 > max) continue;
    keep.add(s.i);
    used += s.l.length + 1;
  }
  return lines.filter((_, i) => keep.has(i)).join('\n');
}
// Docs are ranked INSIDE the language's own categories (a corpus-wide search let C++ docs fall out of the top results):
// words of the question found in a doc's keywords count most, then its title, then its content.
function refTokens(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9_+#]{2,}/g) || []).filter((w) => !REF_STOP.has(w)).map((w) => (w.length > 4 ? w.replace(/(?:es|s)$/, '') : w));
}
function scoreDoc(d: KnowledgeItem, words: string[]): number {
  const kw = d.keywords.join(' ').toLowerCase();
  const title = d.title.toLowerCase();
  const body = d.content.toLowerCase();
  let score = 0;
  for (const w of words) score += (kw.includes(w) ? 3 : 0) + (title.includes(w) ? 2 : 0) + (body.includes(w) ? 1 : 0);
  return score;
}
export function codeReference(lang: CodeLang | null, query: string): { text: string; titles: string[] } {
  const algo = ALGO_RE.test(query);
  if (!lang && !algo) return { text: '', titles: [] };
  const words = refTokens(query);
  const order = lang ? (CODE_REF_CATEGORIES[lang] || [lang]).map((l) => `code-${l}`) : [];
  const rank = (pool: KnowledgeItem[], bonus: (d: KnowledgeItem) => number = () => 0) =>
    pool.map((d) => ({ d, s: scoreDoc(d, words) + bonus(d) })).sort((a, b) => b.s - a.s).map((x) => x.d);
  // The language itself first, related ones (javascript for node, python for discord.py) after.
  const langDocs = rank(CODE_REFERENCE.filter((d) => order.includes(d.category)), (d) => (order.length - order.indexOf(d.category)) * 0.5);
  const algoDoc = algo ? rank(CODE_REFERENCE.filter((d) => d.category === 'code-algorithms'))[0] : undefined;
  let docs = [...langDocs.slice(0, algoDoc ? 1 : 3), ...(algoDoc ? [algoDoc] : [])];
  // A language with few dedicated docs is topped up with the older general "Programming" docs that name it.
  if (docs.length < 3 && lang) {
    const name = LANG_LABEL[lang].split(/[\s/(]/)[0].toLowerCase();
    docs = [...docs, ...rank(BUILTIN_KNOWLEDGE.filter((d) => d.category === 'Programming' && d.title.toLowerCase().includes(name))).slice(0, 3 - docs.length)];
  }
  return {
    text: docs.map((d) => `### ${d.title}\n${refExcerpt(d.content, query, 1800)}`).join('\n\n'),
    titles: docs.map((d) => d.title),
  };
}
