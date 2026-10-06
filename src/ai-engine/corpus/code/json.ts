import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('json', slug, title, keywords, content);

export const CODE_JSON = [
  c('json-yaml-formats', 'JSON, YAML, TOML and config formats: syntax rules, common errors, schemas, conversion', ['json syntax', 'json error', 'unexpected token json', 'yaml syntax', 'yaml indentation', 'toml', 'json schema', 'json vs yaml', 'parse json', 'docker compose yaml', 'github actions yaml'],
    `JSON rules: double quotes only for keys and strings ("name": "Ana"); no trailing commas; no comments; values: string, number (no leading zeros, no NaN/Infinity), true/false, null, object {}, array []; escape \\" \\\\ \\n \\t \\uXXXX. The root can be any value. UTF-8.
{ "name": "Nexus", "version": 2, "tags": ["bot", "ai"], "owner": { "id": "123", "active": true }, "notes": null }
Common parse errors: "Unexpected token ' in JSON" (single quotes), "Unexpected token } " (trailing comma), "Unexpected token < in JSON at position 0" (the server returned HTML — an error page/404 — not JSON; check the URL and response.status), "Unexpected end of JSON input" (empty/truncated body), big integers losing precision (Discord IDs > 2^53 — keep them as strings).
JS: JSON.parse(text) (wrap in try/catch), JSON.stringify(obj, null, 2) (pretty), replacer/reviver functions; Dates become strings; undefined/functions are dropped; circular references throw. Python: json.loads / json.dumps(obj, indent=2, ensure_ascii=False); json.load(f) / json.dump(obj, f). CLI: jq '.users[] | select(.age > 18) | .name' file.json.
JSONC (comments allowed: tsconfig.json, VS Code settings) and JSON5 are supersets — not valid plain JSON. JSON Lines (.jsonl): one JSON object per line (logs, datasets).
JSON Schema validates structure ({ "type": "object", "required": ["name"], "properties": { "name": { "type": "string" } } }); in code: zod (TS), pydantic (Python), ajv.
YAML: indentation with spaces (never tabs) defines nesting; key: value; lists with "- "; comments #; strings usually unquoted but quote when they contain : # or look like other types; multi-line | (keep newlines) and > (fold); anchors &base and aliases *base / <<: *base.
Gotchas: the Norway problem (NO, yes, on, off may become booleans in YAML 1.1 — quote them), version: 1.10 becomes 1.1 (quote), leading zeros, inconsistent indentation ("mapping values are not allowed here", "did not find expected key").
services:
  web:
    image: node:22-alpine
    ports: ["3000:3000"]
    environment:
      - NODE_ENV=production
GitHub Actions: on: [push]; jobs: build: runs-on: ubuntu-latest; steps: - uses: actions/checkout@v4 - run: npm ci && npm test.
TOML (Cargo.toml, pyproject.toml): [section], key = "value", arrays [1, 2], [[array.of.tables]]. INI/.env: KEY=value lines (quote values with spaces).
XML: <user id="1"><name>Ana</name></user> (tags must close; one root; escape &lt; &amp;). CSV: quote fields with commas/quotes ("a ""quoted"" word"); use a CSV library, not split(',').
Convert: yq (YAML ⇄ JSON), python -c 'import yaml, json, sys; print(json.dumps(yaml.safe_load(sys.stdin)))'. Load YAML safely (yaml.safe_load, not yaml.load) — untrusted YAML can execute code in some loaders.`),
];
