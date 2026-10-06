import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('node', slug, title, keywords, content);

export const CODE_NODE = [
  c('basics', 'Node.js basics: runtime, globals, process, running scripts, npm scripts', ['node js basics', 'what is node', 'run javascript file node', 'process argv', 'process env', 'node repl', 'node version', 'nvm'],
    `Node.js runs JavaScript outside the browser (V8 engine + libuv event loop + built-in modules). No DOM/window — instead: globalThis, process, Buffer, __dirname/__filename (CommonJS only), setTimeout/setInterval/setImmediate, fetch (Node 18+), URL, AbortController, structuredClone, crypto.randomUUID, console.
Run: node app.js; node --watch app.js (auto-restart, Node 18.11+); REPL: node; check version: node -v (use the LTS line); manage versions with nvm/fnm/volta.
process: process.argv (['node', 'script', ...args] → process.argv.slice(2)), process.env.PORT ?? 3000, process.exit(1), process.cwd(), process.platform, process.memoryUsage(), process.on('SIGINT', cleanup), process.stdout.write('no newline'), process.nextTick.
.env files: node --env-file=.env app.js (Node 20.6+) or the dotenv package (import 'dotenv/config'). Never commit .env; provide .env.example.
Import built-ins with the node: prefix: import fs from 'node:fs/promises'; import path from 'node:path'.
package.json scripts: "start": "node src/index.js", "dev": "node --watch src/index.js", "test": "node --test". Run with npm run dev.
Built-in test runner: import test from 'node:test'; import assert from 'node:assert/strict'; test('adds', () => { assert.equal(add(1, 2), 3); }); run node --test.
Single-threaded JS + async I/O: great for network servers, CLIs, bots, real-time apps; CPU-heavy work blocks everything (use worker_threads or another service).
Alternatives: Bun (fast runtime + bundler + test runner, mostly Node-compatible), Deno (secure by default, TS built in).`),

  c('fs-path', 'Node.js file system and paths: fs/promises, reading/writing files, streams, path module', ['node fs', 'read file node', 'write file node', 'fs promises', 'path join', 'node streams', 'readdir', 'mkdir recursive', 'file exists node', '__dirname esm'],
    `Promise API (preferred): import { readFile, writeFile, appendFile, readdir, mkdir, rm, stat, rename, copyFile, access } from 'node:fs/promises';
const text = await readFile('data.txt', 'utf8');
await writeFile('out.json', JSON.stringify(obj, null, 2));
await mkdir('logs/2026', { recursive: true });
const entries = await readdir('src', { withFileTypes: true }); entries.filter((e) => e.isFile()).map((e) => e.name); recursive listing: readdir(dir, { recursive: true }) (Node 20+).
Exists check: try { await access(p); } catch { /* missing */ } — or just try the operation and handle ENOENT (err.code === 'ENOENT'). Delete folder: await rm(dir, { recursive: true, force: true }).
Sync versions (readFileSync...) are fine in startup scripts/CLIs, never inside a request handler. Callback versions (fs.readFile(p, cb)) are legacy.
Paths: import path from 'node:path'; path.join(a, 'b', 'c.txt') (OS separators), path.resolve('rel') (absolute from cwd), path.basename(p, '.txt'), path.extname(p), path.dirname(p), path.parse(p), path.relative(from, to), path.sep. In ES modules: const __dirname = path.dirname(fileURLToPath(import.meta.url)) (import { fileURLToPath } from 'node:url') or import.meta.dirname (Node 20.11+). Paths relative to the script, not the cwd: path.join(__dirname, 'data.json').
Streams for big files (constant memory): import { createReadStream, createWriteStream } from 'node:fs'; import { pipeline } from 'node:stream/promises'; await pipeline(createReadStream('big.csv'), transform, createWriteStream('out.csv')). Read lines: import readline from 'node:readline'; for await (const line of readline.createInterface({ input: createReadStream(p) })) { }.
Watch: fs.watch(dir, (event, file) => ...) or chokidar. JSON config: JSON.parse(await readFile(p, 'utf8')). Security: never join user input into paths without checking it stays inside a base folder (path.resolve(base, input).startsWith(base + path.sep)).`),

  c('http-express', 'Node.js web servers: http module, Express routes, middleware, JSON APIs', ['express js', 'node http server', 'express routes', 'express middleware', 'rest api node', 'express json body', 'express static files', 'express error handler', 'cors express', 'express router'],
    `Express (most common): npm i express
import express from 'express';
const app = express();
app.use(express.json());                       // parse JSON bodies → req.body
app.use(express.static('public'));            // serve files
app.get('/api/items', (req, res) => { res.json(items); });
app.get('/api/items/:id', (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});
app.post('/api/items', (req, res) => {
  const { name } = req.body ?? {};
  if (!name) return res.status(400).json({ error: 'name is required' });
  const item = { id: Date.now(), name }; items.push(item); res.status(201).json(item);
});
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'Internal error' }); }); // 4 args = error handler (last)
app.listen(process.env.PORT ?? 3000, () => console.log('listening'));
req: params, query (?page=2 → req.query.page, a string), body, headers, get('header'), ip, cookies (cookie-parser). res: json, send, status, sendStatus, redirect, set, cookie, sendFile (absolute path).
Middleware = (req, res, next) => { ...; next(); } — logging, auth (check a token, set req.user), validation (zod), rate limiting (express-rate-limit), security headers (helmet), CORS (cors: app.use(cors({ origin: 'https://site.com' }))).
Routers: const router = express.Router(); router.get('/', ...); app.use('/api/users', router).
Async handlers: Express 5 forwards rejected promises to the error handler; in Express 4 wrap them (try/catch → next(err)).
Plain http: import http from 'node:http'; http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: true })); }).listen(3000).
Alternatives: Fastify (faster, schema validation), Hono (tiny, runs everywhere), NestJS (structured, decorators), Next.js API routes.`),

  c('async-events-streams', 'Node.js async patterns: EventEmitter, streams, timers, worker threads, child processes', ['node eventemitter', 'node events', 'node streams pipe', 'worker threads', 'child process exec', 'spawn node', 'node async', 'util promisify'],
    `EventEmitter (pub/sub inside a process): import { EventEmitter, once } from 'node:events'; class Bus extends EventEmitter {} const bus = new Bus(); bus.on('order', (o) => ...); bus.once('ready', fn); bus.emit('order', { id: 1 }); bus.off('order', fn); await once(bus, 'ready'). Always listen for 'error' events (an unhandled 'error' throws). setMaxListeners if you legitimately need many.
Streams: Readable, Writable, Duplex, Transform; pipe with pipeline() from 'node:stream/promises' (handles errors and cleanup). Async-iterate readables: for await (const chunk of readable). Create from iterables: Readable.from(generator()). Backpressure is handled by pipeline.
Timers: setTimeout/clearTimeout, setInterval, setImmediate; promise versions: import { setTimeout as sleep } from 'node:timers/promises'; await sleep(1000); for await (const _ of setInterval(1000)) {}.
promisify callback APIs: import { promisify } from 'node:util'; const execAsync = promisify(exec).
Child processes: import { execFile, spawn } from 'node:child_process'; execFile('git', ['status'], (err, stdout) => ...) (no shell — safe with arguments); spawn('ffmpeg', args, { stdio: 'inherit' }) for long-running/streaming output; exec runs through a shell — never with user input (command injection).
Worker threads (CPU-heavy JS in parallel): import { Worker } from 'node:worker_threads'; new Worker(new URL('./heavy.js', import.meta.url), { workerData }); worker.on('message', ...); inside: parentPort.postMessage(result). Pools: piscina.
Cluster / multiple processes: node:cluster or a process manager (pm2) to use all CPU cores for a web server.
AbortController works with fetch, timers, fs and events (signal option).`),

  c('npm-packages', 'npm and Node packages: package.json, dependencies, semver, publishing, popular packages', ['npm', 'package json', 'npm install save dev', 'semver caret', 'npm scripts', 'publish npm package', 'popular node packages', 'package lock', 'npx'],
    `npm init -y creates package.json. npm i pkg (dependency), npm i -D pkg (dev-only: tools/tests), npm i -g pkg (global CLI — prefer npx pkg), npm uninstall pkg, npm ci (exact install from package-lock.json — CI/servers), npm outdated, npm update, npm audit (fix), npm ls pkg (why is it installed), npm run (list scripts).
Versions: "express": "^4.19.2" (minor/patch updates), "~4.19.2" (patch only), "4.19.2" (exact). Lockfile pins the whole tree — commit it. node_modules goes in .gitignore.
package.json essentials: name, version, type ("module"), main/exports (entry points, conditional exports for import/require), bin (CLI commands), scripts, engines ({ "node": ">=20" }), files (what gets published).
Popular packages: express/fastify/hono (servers), axios/undici/ky (HTTP; fetch is built in), zod (validation), dotenv (env), prisma/drizzle/sequelize/mongoose (databases), pg/mysql2/better-sqlite3 (drivers), jsonwebtoken/jose (JWT), bcrypt/argon2 (password hashing), cors/helmet (security), multer (uploads), socket.io/ws (websockets), discord.js (Discord bots), node-cron (scheduling), winston/pino (logging), commander/yargs (CLIs), chalk (colors), dayjs/date-fns (dates), lodash (utilities — mostly replaceable by modern JS), sharp (images), puppeteer/playwright (browser automation), nodemailer (email), vitest/jest (tests), eslint/prettier, typescript/tsx, nodemon (restart — node --watch replaces it).
Publishing: npm login; set name (scoped: @me/pkg), version (npm version patch|minor|major), files/exports; npm publish --access public.
Monorepos: npm/pnpm workspaces ("workspaces": ["packages/*"]).
Security: check package popularity/maintenance, use npm audit, avoid typo-squatted names, pin versions in production.`),

  c('databases', 'Node.js databases: SQLite, PostgreSQL, MongoDB, Prisma, connection handling', ['node database', 'sqlite node', 'postgres node', 'mongodb node', 'prisma', 'sql injection node', 'mongoose', 'database connection pool'],
    `SQLite (zero setup, a file): built-in node:sqlite (Node 22.5+, experimental) or better-sqlite3 (sync, fast):
import Database from 'better-sqlite3';
const db = new Database('app.db');
db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE)');
const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)'); insert.run('Ana', 'ana@x.com');
const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email); db.prepare('SELECT * FROM users').all();
PostgreSQL with pg (pool):
import pg from 'pg'; const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
ALWAYS use placeholders (?, $1) — never build SQL with template strings (SQL injection). Reuse one pool per app; transactions: const client = await pool.connect(); await client.query('BEGIN'); ... 'COMMIT' / 'ROLLBACK' in finally client.release().
Prisma ORM (typed): npx prisma init; schema.prisma models; npx prisma migrate dev; const users = await prisma.user.findMany({ where: { active: true }, include: { posts: true } }); prisma.user.create({ data }). Drizzle is a lighter typed alternative.
MongoDB: mongodb driver (await client.db('app').collection('users').findOne({ email })) or mongoose (schemas: const User = mongoose.model('User', new Schema({ name: String, email: { type: String, unique: true } }))). Sanitise query objects from users (operator injection like { $gt: '' }).
Redis (cache, sessions, rate limits, queues): ioredis / redis.
Store passwords hashed (bcrypt/argon2), never plain. Keep credentials in env vars. Migrations versioned in git.`),

  c('auth-security', 'Node.js security and auth: JWT, sessions, password hashing, input validation, common vulnerabilities', ['node authentication', 'jwt node', 'bcrypt', 'password hashing node', 'express session', 'node security best practices', 'helmet', 'rate limiting', 'validate input node'],
    `Passwords: hash with bcrypt (await bcrypt.hash(pw, 12); await bcrypt.compare(pw, hash)) or argon2. Never store or log plain passwords; never roll your own crypto.
Sessions vs JWT: server sessions (express-session + a store like Redis; httpOnly, secure, sameSite cookies) are simplest for websites; JWTs (jose / jsonwebtoken) suit APIs/mobile: sign short-lived access tokens (15 min) + refresh tokens, verify on each request, keep the secret in env vars, don't put sensitive data in the payload (it's only base64), store in httpOnly cookies rather than localStorage when possible.
Auth middleware: function requireAuth(req, res, next) { const token = req.headers.authorization?.replace('Bearer ', ''); try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch { res.status(401).json({ error: 'Unauthorized' }); } }
Validate every input (zod/joi/express-validator): types, lengths, formats; reject unknown fields.
Common vulnerabilities: SQL/NoSQL injection (use parameterised queries), command injection (execFile with argument arrays, never exec with user strings), path traversal (resolve and check paths), XSS (escape output, set Content-Security-Policy), SSRF (don't fetch arbitrary user URLs; block private IPs), prototype pollution (don't merge untrusted objects), ReDoS (bad regexes), mass assignment (pick allowed fields), open redirects, insecure deserialisation, leaking stack traces in production responses.
Hardening: helmet (security headers), express-rate-limit (brute force), cors with an explicit origin list, HTTPS, keep Node and dependencies updated (npm audit), least-privilege DB users, secrets in env/secret managers, log security events, set NODE_ENV=production.
OAuth/social login: passport.js, Auth.js, or a provider (Auth0, Clerk, Supabase Auth). Discord OAuth2: redirect to the authorize URL, exchange the code for a token server-side.`),

  c('cli-tools', 'Building CLI tools with Node.js: arguments, prompts, colors, executables', ['node cli', 'command line tool node', 'process argv parse', 'commander js', 'readline input node', 'shebang node', 'npm bin', 'parseArgs'],
    `Make a file executable as a command: first line #!/usr/bin/env node, then in package.json "bin": { "mytool": "./bin/mytool.js" }; npm link (local) or publish; chmod +x on Unix.
Arguments: built-in util.parseArgs (Node 18.3+):
import { parseArgs } from 'node:util';
const { values, positionals } = parseArgs({ options: { out: { type: 'string', short: 'o' }, verbose: { type: 'boolean', short: 'v' } }, allowPositionals: true });
Or commander (program.option('-o, --out <file>').argument('<input>').action(fn).parse()) / yargs.
Questions: import readline from 'node:readline/promises'; const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); const name = await rl.question('Name? '); rl.close(); — or @inquirer/prompts / prompts for menus and confirmations.
Output: console.log/error (stderr for errors), process.exitCode = 1 (instead of process.exit, lets output flush), colors via util.styleText (Node 21.7+) or chalk/picocolors, spinners (ora), progress bars (cli-progress), tables (console.table).
Read piped input: for await (const chunk of process.stdin) data += chunk; check process.stdin.isTTY.
Example — count lines in files: for (const f of positionals) { const n = (await readFile(f, 'utf8')).split('\\n').length; console.log(\`\${f}: \${n} lines\`); }
Config: cosmiconfig or a JSON file in the home dir (os.homedir()). Distribute: npm, or single executables (Node SEA, bun build --compile, pkg).`),

  c('websockets-realtime', 'Real-time Node.js: WebSockets with ws and Socket.IO, server-sent events', ['websocket node', 'socket io', 'ws library', 'real time chat node', 'server sent events node', 'broadcast websocket'],
    `ws (low-level, fast):
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws, req) => {
  ws.on('message', (data) => { for (const client of wss.clients) if (client.readyState === 1) client.send(data.toString()); });
  ws.on('close', () => {}); ws.send(JSON.stringify({ type: 'welcome' }));
});
Browser: const ws = new WebSocket('ws://localhost:8080'); ws.onmessage = (e) => console.log(JSON.parse(e.data)); ws.send(JSON.stringify(msg)); — use wss:// in production; implement reconnection and heartbeats (ping/pong) yourself.
Socket.IO (rooms, auto-reconnect, fallbacks, acknowledgements):
import { Server } from 'socket.io'; const io = new Server(httpServer, { cors: { origin: 'https://site.com' } });
io.on('connection', (socket) => { socket.join('room1'); socket.on('chat', (msg, ack) => { io.to('room1').emit('chat', msg); ack?.('ok'); }); });
Client: import { io } from 'socket.io-client'; const socket = io(url); socket.emit('chat', 'hi'). Note: Socket.IO clients only talk to Socket.IO servers (not plain ws).
Server-Sent Events (one-way server → browser, simple, works over HTTP): res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' }); res.write(\`data: \${JSON.stringify(ev)}\\n\\n\`); browser: new EventSource('/events').onmessage.
Scaling beyond one process: Redis adapter / pub-sub so all instances share rooms; sticky sessions behind a load balancer. Authenticate the connection (token in the handshake/auth option), validate every message.`),

  c('deploy-production', 'Deploying Node.js apps: environment, process managers, Docker, hosting (Railway, Render, VPS)', ['deploy node app', 'node production', 'pm2', 'docker node', 'railway deploy', 'node environment variables production', 'heroku render vercel', 'graceful shutdown'],
    `Production checklist: NODE_ENV=production, config from env vars (validated at startup), listen on process.env.PORT, structured logging (pino), error handler that hides stack traces, health endpoint (GET /health), graceful shutdown (process.on('SIGTERM', () => server.close(() => db.end()))), npm ci --omit=dev, pinned Node version ("engines" + .nvmrc), HTTPS via the platform or a reverse proxy (nginx/Caddy), rate limiting and helmet.
Hosting: Railway / Render / Fly.io (git push or Docker, env vars in the dashboard, auto-deploy on push), Vercel/Netlify (frontends + serverless functions, not long-running bots/websockets), a VPS (Ubuntu + Node + pm2 + nginx) for full control, Cloudflare Workers (edge, not full Node).
Discord bots and websocket servers need an always-on process (Railway, a VPS), not serverless.
pm2: pm2 start dist/index.js --name api -i max (cluster mode); pm2 logs; pm2 restart api; pm2 save && pm2 startup (start on boot).
Dockerfile (small, cached):
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
USER node
CMD ["node", "src/index.js"]
Memory limits: small containers (512 MB-1 GB) crash on big startup work or leaks — watch memory, stream large files, set --max-old-space-size if needed.
Monitoring: uptime checks, logs (Railway/Render log viewer, Better Stack), error tracking (Sentry), metrics. Zero-downtime deploys: health checks + rolling restarts.`),

  c('debug-performance', 'Debugging and profiling Node.js: inspector, memory leaks, common errors', ['debug node js', 'node inspect', 'node memory leak', 'node error eaddrinuse', 'cannot find module node', 'unhandled promise rejection', 'node profiling', 'heap out of memory'],
    `Debugging: node --inspect app.js (or --inspect-brk to stop on line 1) then open chrome://inspect or use VS Code's debugger (breakpoints, watch, call stack). console.log with JSON.stringify(obj, null, 2); util.inspect(obj, { depth: null }); debugger statements.
Common errors:
- EADDRINUSE: port already in use → another process/your old server: lsof -i :3000 then kill it, or use another PORT.
- Cannot find module 'x' → npm install it, wrong path/extension (ESM needs './file.js'), or wrong working directory.
- ERR_REQUIRE_ESM / "require() of ES Module not supported" → use import (and "type": "module") or dynamic import(); "Cannot use import statement outside a module" → add "type": "module".
- UnhandledPromiseRejection → a promise rejected with no catch; Node crashes by default — add try/catch/await or .catch.
- ECONNREFUSED → the service (DB, API) isn't running/listening there; ENOTFOUND → bad hostname/DNS.
- ENOENT → file path wrong (relative to cwd, not to the script).
- "JavaScript heap out of memory" → leak or loading too much at once; stream data, raise --max-old-space-size temporarily, find the leak.
- EMFILE: too many open files → limit concurrency, close streams.
Memory leaks: growing caches/maps, listeners never removed (MaxListenersExceededWarning), timers not cleared, closures holding big data. Take heap snapshots (DevTools Memory tab via --inspect) and compare; process.memoryUsage().heapUsed over time.
CPU profiling: node --cpu-prof app.js (open the .cpuprofile in DevTools), clinic.js (doctor/flame), 0x. Event loop delay: perf_hooks.monitorEventLoopDelay(). Blocking sync calls (readFileSync, JSON.parse of huge strings, heavy loops) in request handlers are the classic cause of slowness.`),
];
