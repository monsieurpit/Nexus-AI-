// Phone-friendly review page for the learning system, served at GET /api/v1/learning/admin (the
// gateway forwards /api/* to the engine). The page holds no data or secrets itself: it asks for the
// admin token (~/.nexus-learning/admin-token) once, keeps it in this browser's localStorage, and
// every read/action goes through the token-protected JSON API in admin.ts.

export const LEARNING_ADMIN_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nexus learning</title>
<style>
  :root { --bg:#0f1115; --card:#181b22; --text:#e8e8ea; --muted:#9aa0aa; --line:#2a2f3a; --ok:#3fb950; --bad:#f85149; --warn:#d29922; --accent:#58a6ff; }
  @media (prefers-color-scheme: light) { :root { --bg:#f6f7f9; --card:#fff; --text:#15171c; --muted:#5d6470; --line:#dde1e7; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font:15px/1.45 system-ui,-apple-system,sans-serif; padding:16px; max-width:760px; margin-inline:auto; }
  h1 { font-size:20px; margin:0 0 4px; } h2 { font-size:15px; margin:22px 0 8px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:12px; margin-bottom:8px; }
  .claim { font-weight:600; } .meta { color:var(--muted); font-size:13px; margin-top:4px; word-break:break-word; }
  .row { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
  button { font:inherit; border:1px solid var(--line); background:transparent; color:var(--text); border-radius:8px; padding:7px 12px; cursor:pointer; }
  button.ok { border-color:var(--ok); color:var(--ok); } button.bad { border-color:var(--bad); color:var(--bad); }
  input { font:inherit; width:100%; padding:9px; border-radius:8px; border:1px solid var(--line); background:var(--card); color:var(--text); }
  .pill { display:inline-block; font-size:12px; padding:1px 7px; border-radius:99px; border:1px solid var(--line); color:var(--muted); margin-right:4px; }
  .empty { color:var(--muted); font-size:14px; } #status { color:var(--muted); font-size:13px; min-height:18px; }
</style>
</head>
<body>
<h1>Nexus learning</h1>
<div id="status"></div>
<div id="login" class="card" hidden>
  <div>Admin token (on the Mac: <code>cat ~/.nexus-learning/admin-token</code>)</div>
  <div class="row"><input id="token" type="password" autocomplete="off"><button class="ok" id="save">Open</button></div>
</div>
<div id="app" hidden>
  <h2>Waiting for your OK</h2><div id="review"></div>
  <h2>Learned</h2><div id="learned"></div>
  <h2>Waiting for more people</h2><div id="waiting"></div>
  <h2>Questions he couldn't answer</h2><div id="gaps"></div>
  <h2>Recent decisions</h2><div id="recent"></div>
  <h2>Undo</h2>
  <div class="card">Forget everything learned since:
    <div class="row"><input id="since" type="datetime-local"><button class="bad" id="rollback">Roll back</button></div>
  </div>
</div>
<script>
const $ = (id) => document.getElementById(id);
let token = '';
try { token = localStorage.getItem('nexus-learning-token') || ''; } catch {}
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const when = (ms) => new Date(ms).toLocaleString();
async function api(path, opts = {}) {
  const res = await fetch('/api/v1/learning' + path, { ...opts, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token, ...(opts.headers || {}) } });
  if (res.status === 401) { showLogin('Wrong or missing token.'); throw new Error('401'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.status);
  return data;
}
function showLogin(msg) { $('app').hidden = true; $('login').hidden = false; $('status').textContent = msg || ''; }
function card(inner) { return '<div class="card">' + inner + '</div>'; }
function list(el, items, render) { $(el).innerHTML = items.length ? items.map(render).join('') : '<div class="empty">Nothing here.</div>'; }
async function load() {
  if (!token) return showLogin();
  $('status').textContent = 'Loading…';
  const d = await api('');
  $('login').hidden = true; $('app').hidden = false;
  $('status').textContent = d.enabled ? 'Learning is ON' : 'Learning is OFF (NEXUS_LEARNING=off)';
  list('review', d.waitingForReview, (c) => card('<div class="claim">' + esc(c.claim) + '</div><div class="meta">' + esc(c.statusReason) + ' · ' + when(c.createdAt) + '</div><div class="row"><button class="ok" data-approve="' + c.id + '">Learn it</button><button class="bad" data-reject="' + c.id + '">No</button></div>'));
  list('learned', d.learned.filter((f) => f.active), (f) => card('<div class="claim">' + esc(f.claim) + '</div><div class="meta"><span class="pill">' + esc(f.verification) + '</span><span class="pill">' + esc(f.scope) + '</span>' + esc(f.evidence) + ' · ' + when(f.createdAt) + '</div><div class="row"><button class="bad" data-forget="' + esc(f.id) + '">Forget</button></div>'));
  list('waiting', d.waitingForPeople, (c) => card('<div class="claim">' + esc(c.claim) + '</div><div class="meta">' + esc(c.statusReason) + '</div><div class="row"><button class="ok" data-approve="' + c.id + '">Learn it now</button><button class="bad" data-reject="' + c.id + '">No</button></div>'));
  const gapState = { 0: 'will search when idle', 1: 'answer found, verifying', 6: 'no answer found online' };
  list('gaps', (d.gaps || []).slice(0, 30), (g) => card('<div>' + esc(g.userText) + '</div><div class="meta">' + esc(gapState[g.processed] || 'processed') + ' · ' + when(g.createdAt) + '</div>'));
  list('recent', d.recentCandidates.slice(0, 40), (c) => card('<div>' + (c.claim ? esc(c.claim) : '<i>(no claim)</i>') + '</div><div class="meta"><span class="pill">' + esc(c.status) + '</span>' + esc(c.statusReason) + '</div>'));
}
document.addEventListener('click', async (e) => {
  const t = e.target;
  try {
    if (t.dataset.approve) { await api('/approve', { method: 'POST', body: JSON.stringify({ candidateId: Number(t.dataset.approve) }) }); }
    else if (t.dataset.reject) { await api('/reject', { method: 'POST', body: JSON.stringify({ candidateId: Number(t.dataset.reject), reason: 'rejected from admin page' }) }); }
    else if (t.dataset.forget) { if (!confirm('Forget this fact?')) return; await api('/learned/' + encodeURIComponent(t.dataset.forget), { method: 'DELETE', body: JSON.stringify({ reason: 'removed from admin page' }) }); }
    else return;
    await load();
  } catch (err) { if (String(err.message) !== '401') $('status').textContent = 'Error: ' + err.message; }
});
$('save').onclick = () => { token = $('token').value.trim(); try { localStorage.setItem('nexus-learning-token', token); } catch {} load().catch(() => {}); };
$('rollback').onclick = async () => {
  const v = $('since').value; if (!v) return;
  if (!confirm('Forget everything learned since ' + new Date(v).toLocaleString() + '?')) return;
  try { const r = await api('/rollback', { method: 'POST', body: JSON.stringify({ since: new Date(v).getTime(), reason: 'admin page rollback' }) }); $('status').textContent = r.removed + ' fact(s) forgotten'; await load(); } catch (err) { $('status').textContent = 'Error: ' + err.message; }
};
load().catch(() => {});
</script>
</body>
</html>`;
