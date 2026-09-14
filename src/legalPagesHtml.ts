// Standalone legal pages — Privacy Policy and Disclaimer — served directly by this server (same
// pattern as BANC_HTML in bancHtml.ts: plain template-literal HTML, no build step, no React/SPA
// state involved) so they're stable, directly linkable URLs independent of the chat app's own
// client-side view state. Styled to match the real site's dark theme (the --nx-* tokens from
// src/index.css) rather than the separate Noémie banc's palette.

const SHARED_STYLE = `
  :root {
    color-scheme: dark;
    --bg: #090a0e; --surface: #131519; --elevated: #1b1e25; --border: #2b2f39;
    --text: #f2f3f7; --text-muted: #a4a7b4; --text-faint: #6d7180;
    --accent: #7c6cf6; --warn: #f5b83d;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: var(--text);
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.65;
  }
  .wrap { max-width: 760px; margin: 0 auto; padding: 56px 24px 96px; }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  h1 { font-size: 1.75rem; font-weight: 700; margin: 0 0 6px; }
  .updated { color: var(--text-faint); font-size: 0.85rem; margin: 0 0 40px; }
  h2 { font-size: 1.15rem; font-weight: 600; margin: 40px 0 12px; padding-top: 4px; border-top: 1px solid var(--border); padding-top: 20px; }
  h2:first-of-type { border-top: none; padding-top: 0; }
  p, li { color: var(--text-muted); font-size: 0.95rem; }
  ul { padding-left: 1.3em; }
  li { margin-bottom: 8px; }
  .callout {
    background: rgba(245, 184, 61, 0.08); border: 1px solid rgba(245, 184, 61, 0.3);
    border-radius: 10px; padding: 16px 18px; margin: 24px 0; color: var(--text);
  }
  .callout strong { color: var(--warn); }
  .nav { display: flex; gap: 16px; margin-bottom: 32px; font-size: 0.85rem; }
  footer { margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--border); color: var(--text-faint); font-size: 0.8rem; }
`;

export const PRIVACY_POLICY_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy — Nexus AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>${SHARED_STYLE}</style>
</head>
<body>
<div class="wrap">
  <div class="nav"><a href="/">← Back to Nexus AI</a><a href="/disclaimer">Disclaimer →</a></div>
  <h1>Privacy Policy</h1>
  <p class="updated">Last updated: September 2026</p>

  <p>This page explains what happens to your data when you use Nexus AI (this website) and the
  related Nexus Discord bot family. It's written to be genuinely accurate to how this independently-run,
  personal project actually works — not generic boilerplate.</p>

  <h2>What's stored, and where</h2>
  <ul>
    <li><strong>On this website:</strong> your conversations, any custom knowledge you add, memories,
    and settings are stored <strong>only in your own browser's local storage</strong>. Nothing about
    your chat history is saved on a server-side database that we control — clearing your browser data
    for this site deletes it completely and permanently, on your device only.</li>
    <li><strong>Message processing:</strong> when you send a message, its content is transmitted to our
    server to generate a response (via a locally-hosted AI model) and is not permanently logged or
    retained server-side beyond what's needed to process that one request.</li>
    <li><strong>The Discord bot:</strong> messages sent to the bot are processed to generate a reply.
    A limited set of data — your Discord user ID and, if you've shared something worth remembering
    across conversations, a short extracted fact — may be stored so the bot can maintain continuity.
    You can ask the bot to forget what it knows about you at any time.</li>
    <li><strong>"Nexus Code" (GitHub repo editing):</strong> your GitHub token is used only in memory,
    for the single request that needs it, and is never written to disk or any database. It is discarded
    immediately after that request completes.</li>
  </ul>

  <h2>What we don't do</h2>
  <ul>
    <li>We do not sell, rent, or share your personal data with third parties.</li>
    <li>We do not run advertising trackers or third-party analytics/tracking pixels on this site.</li>
    <li>We do not build advertising profiles from your conversations.</li>
  </ul>

  <h2>Third-party services</h2>
  <p>This site loads fonts from Google Fonts, which may log IP addresses per Google's own privacy
  policy — this is standard for essentially any website using web fonts. The site is hosted on
  Railway, whose infrastructure may keep standard web server request logs (IP address, timestamp,
  requested path) for operational and security purposes, per their own policies.</p>

  <h2>Children's privacy</h2>
  <div class="callout">
    <strong>This is not a service designed or marketed for children.</strong> The AI persona uses
    intentionally crude and profane language as a stylistic choice (see the <a href="/disclaimer">Disclaimer</a>).
    If you are a parent or guardian and believe a child has used this service, you're welcome to
    contact us to request that any associated stored data be deleted.
  </div>

  <h2>Your choices</h2>
  <ul>
    <li>Clear your browser's local storage for this site at any time to permanently delete your
    website conversation history, custom knowledge, and settings.</li>
    <li>Ask the Discord bot to delete any data it has stored about you.</li>
    <li>Simply stop using the service — nothing further is retained beyond what's described above.</li>
  </ul>

  <h2>Changes to this policy</h2>
  <p>This policy may be updated as the project changes. Continued use of the service after an update
  means you accept the revised policy. Check back here periodically.</p>

  <footer>Nexus AI is an independently operated personal project, not a registered company. This
  policy is provided on a good-faith, best-effort basis.</footer>
</div>
</body>
</html>`;

export const DISCLAIMER_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Disclaimer — Nexus AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>${SHARED_STYLE}</style>
</head>
<body>
<div class="wrap">
  <div class="nav"><a href="/">← Back to Nexus AI</a><a href="/privacy">Privacy Policy →</a></div>
  <h1>Disclaimer</h1>
  <p class="updated">Last updated: September 2026</p>

  <p>By using Nexus AI (this website) or the related Nexus Discord bot, you acknowledge and agree
  to the following.</p>

  <h2>AI-generated content</h2>
  <p>Responses are generated by an AI model and can be inaccurate, incomplete, outdated, or
  outright wrong. Nothing Nexus says is professional advice — medical, legal, financial, or
  otherwise. Always verify important information independently before relying on it.</p>

  <h2>Language and persona</h2>
  <div class="callout">
    <strong>Nexus's default persona swears heavily and can be deliberately crude.</strong> This is
    an intentional stylistic and entertainment choice, not a bug and not something we apologize for
    — but it also means the content isn't appropriate for every audience or context. Opinions,
    jokes, or attitude expressed by the persona are character content, not the factual or personal
    views of the people who built or operate it.
  </div>

  <h2>A small, local AI model</h2>
  <p>Nexus runs on limited local hardware, not a large commercial cloud model. It <strong>will</strong>
  make mistakes — sometimes obvious ones, sometimes subtle ones — especially on complex, technical,
  or safety-critical topics. Treat every response as a starting point, not a final answer.</p>

  <h2>"Nexus Code" — repo editing</h2>
  <p>The Nexus Code feature only proposes changes to a GitHub repository that <strong>you</strong>
  connect with your own token, and only pushes after you explicitly review the diff and approve it.
  You are responsible for reviewing every line of any proposed change before approving it. We are
  not responsible for anything that goes wrong with your repository as a result of using this
  feature, including but not limited to incorrect code, broken builds, or data loss.</p>

  <h2>Third-party platforms</h2>
  <p>Use of Discord, GitHub, or any other third-party platform integrated with this service is
  governed by that platform's own terms of service — we don't control and aren't responsible for
  how those platforms operate.</p>

  <h2>No warranty, limitation of liability</h2>
  <p>This service is provided "as is" and "as available," without warranties of any kind, express
  or implied. To the fullest extent permitted by law, we are not liable for any damages — direct,
  indirect, incidental, or consequential — arising from your use of, or inability to use, this
  service.</p>

  <h2>Independent personal project</h2>
  <p>Nexus AI is built and operated as an independent personal project, not a registered company or
  commercial product with dedicated legal or support staff. It's offered on a best-effort basis with
  no guarantee of uptime, continuity, or support.</p>

  <h2>Changes</h2>
  <p>This disclaimer may be updated as the project evolves. Continued use after an update means you
  accept the revised terms.</p>

  <footer>See also our <a href="/privacy">Privacy Policy</a>.</footer>
</div>
</body>
</html>`;
