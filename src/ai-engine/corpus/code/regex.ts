import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('regex', slug, title, keywords, content);

export const CODE_REGEX = [
  c('syntax-recipes', 'Regular expressions: syntax, groups, lookarounds, flags, common recipes in JS/Python', ['regex', 'regular expression', 'regex email', 'regex groups', 'lookahead', 'regex cheat sheet', 'regex phone number', 'regex flags', 'greedy lazy regex', 'regex url'],
    `Characters: . any char (not newline), \\d digit, \\w word char [A-Za-z0-9_], \\s whitespace, \\D \\W \\S negations, \\b word boundary, ^ start, $ end (per line with m flag), escape specials with \\ ( . * + ? ( ) [ ] { } | ^ $ \\ / ).
Classes: [abc], [a-z0-9], [^aeiou] (not), [.] (literal dot inside brackets). Unicode: \\p{L} letters, \\p{Emoji} (JS needs the u flag).
Quantifiers: * (0+), + (1+), ? (0-1), {3}, {2,5}, {2,}; greedy by default — add ? for lazy: <.+?> matches one tag instead of the longest run.
Groups: (abc) capturing, (?:abc) non-capturing, (?<year>\\d{4}) named (Python: (?P<year>...)), backreferences \\1 / \\k<year>, alternation cat|dog (group it: (cat|dog)s).
Lookarounds (match without consuming): (?=...) followed by, (?!...) not followed by, (?<=...) preceded by, (?<!...) not preceded by. Password check: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$.
Flags: g (all matches), i (ignore case), m (multiline ^ $), s (dot matches newline), u (Unicode), y (sticky); Python: re.I, re.M, re.S, re.X (verbose, comments).
JavaScript: /\\d+/g.test(s) (careful: g + test keeps lastIndex state); s.match(/(\\d+)-(\\d+)/) → groups; [...s.matchAll(/(?<n>\\d+)/g)].map((m) => m.groups.n); s.replace(/(\\w+) (\\w+)/, '$2 $1'); s.replaceAll(/a/g, 'b'); s.split(/\\s*,\\s*/); new RegExp(escaped, 'gi') for dynamic patterns (escape user input: str.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')).
Python: import re; re.search(p, s) (anywhere), re.match (start), re.fullmatch (whole string), re.findall, re.finditer, re.sub(p, repl, s), re.split, re.compile(p); use raw strings r"\\d+"; m.group(1) / m["name"].
Recipes (pragmatic, not RFC-perfect):
- Email: ^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$
- URL: https?:\\/\\/[^\\s/$.?#].[^\\s]*
- Integer/decimal: ^-?\\d+(\\.\\d+)?$
- Hex colour: ^#(?:[0-9a-fA-F]{3}){1,2}$
- Date YYYY-MM-DD: ^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$
- North American phone: ^\\+?1?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$
- Canadian postal code: ^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$
- Discord invite: (?:discord\\.gg|discord(?:app)?\\.com\\/invite)\\/([\\w-]+)
- Discord mention: <@!?(\\d{17,20})>
- Trim extra spaces: replace \\s+ with ' '; strip HTML tags (rough): <[^>]*>
- IPv4: ^(25[0-5]|2[0-4]\\d|1?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}$
Pitfalls: catastrophic backtracking/ReDoS with nested quantifiers like (a+)+ on untrusted input; forgetting ^$ anchors in validation; . not matching newlines; validating emails/HTML fully with regex (use a parser/library). Test on regex101.com (explains each part).`),
];
