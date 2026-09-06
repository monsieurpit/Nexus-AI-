// Test-bench page for the /api/v1/roleplay endpoint, served at GET /banc. It's served BY this
// server so the browser calls the API same-origin (a Claude Artifact can't — its CSP blocks all
// external fetch). Plain static string, no build step.

export const BANC_HTML = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Noémie · Banc d'essai</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap">
<style>
  :root {
    color-scheme: light;
    --bg: #eef0ee; --surface: #ffffff; --surface-2: #f6f7f6;
    --ink: #17201d; --muted: #64726c; --line: #d9ddda;
    --accent: #0e9c8b;
    --user-bubble: #0e9c8b; --user-ink: #ffffff;
    --her-bubble: #e7e9e7; --her-ink: #17201d;
    --ok: #0e9c8b; --warn: #b7791f; --bad: #c0453b;
    --mono: "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      color-scheme: dark;
      --bg: #10130f; --surface: #191d17; --surface-2: #21261f;
      --ink: #e8ede9; --muted: #8b9a92; --line: #2c332a;
      --accent: #2fd3bd;
      --user-bubble: #1c7c70; --user-ink: #eafffb;
      --her-bubble: #262b23; --her-ink: #e8ede9;
      --ok: #2fd3bd; --warn: #d99a3a; --bad: #e2685c;
    }
  }
  :root[data-theme="dark"] {
    color-scheme: dark;
    --bg: #10130f; --surface: #191d17; --surface-2: #21261f;
    --ink: #e8ede9; --muted: #8b9a92; --line: #2c332a;
    --accent: #2fd3bd;
    --user-bubble: #1c7c70; --user-ink: #eafffb;
    --her-bubble: #262b23; --her-ink: #e8ede9;
    --ok: #2fd3bd; --warn: #d99a3a; --bad: #e2685c;
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0; background: var(--bg); color: var(--ink);
    font-family: var(--sans); line-height: 1.45;
    display: flex; justify-content: center;
  }
  .app {
    width: 100%; max-width: 580px; height: 100dvh;
    display: flex; flex-direction: column;
    background: var(--surface);
    border-left: 1px solid var(--line); border-right: 1px solid var(--line);
  }
  header { flex: none; background: var(--surface); border-bottom: 1px solid var(--line); }
  .rig { display: flex; align-items: center; gap: 10px; padding: 10px 14px; }
  .rig h1 {
    font-family: var(--mono); font-size: 13px; font-weight: 700;
    letter-spacing: 0.02em; margin: 0; flex: 1; text-wrap: balance;
  }
  .rig h1 span { color: var(--muted); font-weight: 400; }
  .status {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--mono); font-size: 11px; color: var(--muted); white-space: nowrap;
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); flex: none; }
  .dot.ok { background: var(--ok); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ok) 25%, transparent); }
  .dot.warn { background: var(--warn); box-shadow: 0 0 0 3px color-mix(in srgb, var(--warn) 25%, transparent); }
  .dot.bad { background: var(--bad); box-shadow: 0 0 0 3px color-mix(in srgb, var(--bad) 25%, transparent); }
  .gear {
    border: 1px solid var(--line); background: var(--surface-2); color: var(--muted);
    font-family: var(--mono); font-size: 11px; padding: 4px 8px; border-radius: 7px; cursor: pointer;
  }
  .gear:hover { color: var(--ink); border-color: var(--muted); }
  .settings {
    border-top: 1px solid var(--line); padding: 12px 14px 14px;
    background: var(--surface-2); display: flex; align-items: end; justify-content: space-between; gap: 12px;
  }
  .settings label {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 5px;
  }
  .seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .seg button {
    font-family: var(--mono); font-size: 11px; padding: 7px 12px;
    border: 0; background: var(--surface); color: var(--muted); cursor: pointer;
  }
  .seg button[aria-pressed="true"] { background: var(--accent); color: var(--user-ink); }
  .seg button + button { border-left: 1px solid var(--line); }
  .link-btn {
    font-family: var(--mono); font-size: 11px; background: none; border: 0;
    color: var(--bad); cursor: pointer; padding: 7px 4px;
  }
  .link-btn:hover { text-decoration: underline; }
  .thread {
    flex: 1; overflow-y: auto; padding: 18px 14px 8px;
    display: flex; flex-direction: column; gap: 3px;
  }
  .msg {
    max-width: 78%; padding: 8px 13px; border-radius: 18px; font-size: 15px;
    word-wrap: break-word; white-space: pre-wrap;
  }
  .msg.them { align-self: flex-start; background: var(--her-bubble); color: var(--her-ink); border-bottom-left-radius: 5px; }
  .msg.me { align-self: flex-end; background: var(--user-bubble); color: var(--user-ink); border-bottom-right-radius: 5px; }
  .msg.me + .msg.them, .msg.them + .msg.me { margin-top: 12px; }
  .sys {
    align-self: center; max-width: 90%; text-align: center;
    font-family: var(--mono); font-size: 11px; line-height: 1.5; color: var(--warn);
    border: 1px dashed color-mix(in srgb, var(--warn) 45%, var(--line));
    border-radius: 10px; padding: 9px 12px; margin: 10px 0;
  }
  .sys.bad { color: var(--bad); border-color: color-mix(in srgb, var(--bad) 45%, var(--line)); }
  .sys.muted { color: var(--muted); border-color: var(--line); }
  .typing {
    align-self: flex-start; background: var(--her-bubble);
    border-radius: 18px; border-bottom-left-radius: 5px; padding: 12px 15px;
    display: inline-flex; gap: 4px;
  }
  .typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--muted); animation: bob 1.2s infinite ease-in-out; }
  .typing i:nth-child(2) { animation-delay: 0.15s; }
  .typing i:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bob { 0%, 60%, 100% { opacity: 0.35; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
  @media (prefers-reduced-motion: reduce) { .typing i { animation: none; } }
  .meta {
    flex: none; padding: 0 16px 8px; font-family: var(--mono);
    font-size: 10px; color: var(--muted); letter-spacing: 0.03em;
  }
  .composer {
    flex: none; border-top: 1px solid var(--line);
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
    display: flex; gap: 8px; align-items: flex-end; background: var(--surface);
  }
  .composer textarea {
    flex: 1; resize: none; font-family: var(--sans); font-size: 15px;
    padding: 9px 13px; border: 1px solid var(--line); border-radius: 19px;
    background: var(--surface-2); color: var(--ink); max-height: 120px; line-height: 1.4;
  }
  .composer textarea:focus-visible, .seg button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .send {
    flex: none; width: 38px; height: 38px; border-radius: 50%; border: 0;
    background: var(--accent); color: var(--user-ink); font-size: 18px;
    cursor: pointer; display: grid; place-items: center;
  }
  .send:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
</head>
<body>
<div class="app">
  <header>
    <div class="rig">
      <h1>banc d'essai <span>· noémie de secours</span></h1>
      <span class="status"><span class="dot" id="dot"></span><span id="statusText">prêt</span></span>
      <button class="gear" id="gearBtn" aria-expanded="false" type="button">options</button>
    </div>
    <div class="settings" id="settings" hidden>
      <div>
        <label for="persona">persona</label>
        <div class="seg" id="persona" role="group" aria-label="persona">
          <button type="button" data-p="noemie" aria-pressed="true">noémie</button>
          <button type="button" data-p="crashout" aria-pressed="false">crashout</button>
        </div>
      </div>
      <button class="link-btn" id="clearBtn" type="button">effacer la conversation</button>
    </div>
  </header>
  <div class="thread" id="thread"></div>
  <div class="meta" id="modelMeta"></div>
  <form class="composer" id="form">
    <textarea id="input" rows="1" placeholder="écris à noémie…" autocapitalize="sentences"></textarea>
    <button class="send" id="send" type="submit" aria-label="envoyer">&#8593;</button>
  </form>
</div>
<script>
(function () {
  "use strict";
  var LS = { persona: "banc_persona", thread: function (p) { return "banc_thread_" + p; } };
  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var state = { persona: get(LS.persona, "noemie"), thread: [], busy: false };
  try { state.thread = JSON.parse(get(LS.thread(state.persona), "[]")) || []; } catch (e) { state.thread = []; }

  var $ = function (id) { return document.getElementById(id); };
  var threadEl = $("thread"), inputEl = $("input"), sendEl = $("send"), formEl = $("form");
  var dotEl = $("dot"), statusEl = $("statusText"), metaEl = $("modelMeta");

  document.querySelectorAll("#persona button").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b.dataset.p === state.persona));
  });
  inputEl.placeholder = state.persona === "noemie" ? "écris à noémie…" : "écris à nexus…";

  function setStatus(kind, text) { dotEl.className = "dot" + (kind ? " " + kind : ""); statusEl.textContent = text; }
  function saveThread() { set(LS.thread(state.persona), JSON.stringify(state.thread.slice(-40))); }
  function timeNow() { var d = new Date(); return d.getHours() + "h" + String(d.getMinutes()).padStart(2, "0"); }

  function render() {
    threadEl.innerHTML = "";
    if (state.thread.length === 0) {
      var s = document.createElement("div");
      s.className = "sys muted";
      s.textContent = state.persona === "noemie"
        ? "écris à noémie comme dans message-app. c'est gemma3:4b en local (le secours) qui répond. juge si la voix tient."
        : "écris à nexus. voix crashout condensée, gemma3:4b local.";
      threadEl.appendChild(s);
    }
    state.thread.forEach(function (m) {
      if (m.role === "system") {
        var sys = document.createElement("div");
        sys.className = "sys" + (m.bad ? " bad" : "");
        sys.textContent = m.content;
        threadEl.appendChild(sys);
        return;
      }
      var el = document.createElement("div");
      el.className = "msg " + (m.role === "assistant" ? "them" : "me");
      el.textContent = m.content;
      threadEl.appendChild(el);
    });
    threadEl.scrollTop = threadEl.scrollHeight;
  }

  function showTyping() {
    var t = document.createElement("div");
    t.className = "typing"; t.id = "typing";
    t.innerHTML = "<i></i><i></i><i></i>";
    threadEl.appendChild(t);
    threadEl.scrollTop = threadEl.scrollHeight;
  }
  function hideTyping() { var t = $("typing"); if (t) t.remove(); }

  function apiHistory() {
    return state.thread
      .filter(function (m) { return m.role === "user" || m.role === "assistant"; })
      .slice(-16).map(function (m) { return { role: m.role, content: m.content }; });
  }

  async function send(text) {
    if (state.busy || !text.trim()) return;
    state.busy = true; sendEl.disabled = true;
    state.thread.push({ role: "user", content: text.trim() });
    saveThread(); render(); showTyping();
    setStatus("warn", state.persona === "noemie" ? "noémie écrit…" : "nexus écrit…");

    var started = Date.now();
    try {
      var res = await fetch("/api/v1/roleplay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona: state.persona, message: text.trim(), history: apiHistory().slice(0, -1) })
      });
      hideTyping();
      if (res.status === 503) {
        var b = await res.json().catch(function () { return {}; });
        state.thread.push({ role: "system", bad: true, content: "modèle local injoignable (" + (b.reason || "?") + ")\\nton mac est éteint, en veille, ou le tunnel cloudflare est down." });
        setStatus("bad", "mac hors ligne");
      } else if (res.status === 429) {
        state.thread.push({ role: "system", content: "trop de requêtes d'un coup — attends 30 s." });
        setStatus("warn", "ralenti");
      } else if (!res.ok) {
        state.thread.push({ role: "system", bad: true, content: "erreur serveur " + res.status + "." });
        setStatus("bad", "erreur " + res.status);
      } else {
        var data = await res.json();
        var bubbles = Array.isArray(data.bubbles) && data.bubbles.length ? data.bubbles : [data.reply || "…"];
        for (var i = 0; i < bubbles.length; i++) state.thread.push({ role: "assistant", content: String(bubbles[i]) });
        var ms = data.latencyMs || (Date.now() - started);
        metaEl.textContent = (data.model || "gemma3:4b") + "  ·  " + (ms / 1000).toFixed(1) + " s  ·  " + timeNow();
        setStatus("ok", "connecté");
      }
    } catch (e) {
      hideTyping();
      state.thread.push({ role: "system", bad: true, content: "connexion impossible.\\nton serveur railway est peut-être en train de redéployer, ou down." });
      setStatus("bad", "pas de connexion");
    }
    saveThread(); render();
    state.busy = false; sendEl.disabled = false; inputEl.focus();
  }

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = inputEl.value; inputEl.value = ""; inputEl.style.height = "auto";
    send(v);
  });
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); formEl.requestSubmit(); }
  });
  inputEl.addEventListener("input", function () {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
  });
  $("gearBtn").addEventListener("click", function () {
    var s = $("settings"); var open = s.hasAttribute("hidden");
    if (open) s.removeAttribute("hidden"); else s.setAttribute("hidden", "");
    this.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("#persona button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (state.persona === b.dataset.p) return;
      state.persona = b.dataset.p; set(LS.persona, state.persona);
      document.querySelectorAll("#persona button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      try { state.thread = JSON.parse(get(LS.thread(state.persona), "[]")) || []; } catch (e) { state.thread = []; }
      inputEl.placeholder = state.persona === "noemie" ? "écris à noémie…" : "écris à nexus…";
      metaEl.textContent = ""; render();
    });
  });
  $("clearBtn").addEventListener("click", function () {
    state.thread = []; saveThread(); metaEl.textContent = ""; render();
  });

  render();
  setStatus("", "prêt — envoie un message");
})();
</script>
</body>
</html>`;
