import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('html', slug, title, keywords, content);

export const CODE_HTML = [
  c('document-structure', 'HTML document structure, head, meta tags, SEO, linking CSS/JS', ['html boilerplate', 'html structure', 'html head meta', 'viewport meta', 'link css html', 'script defer', 'favicon', 'open graph tags', 'seo html'],
    `Boilerplate:
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page title (50-60 chars, shown in tabs/search)</title>
  <meta name="description" content="150-character summary for search results" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="styles.css" />
  <script src="app.js" defer></script>
</head>
<body>
  ...
</body>
</html>
Scripts: defer (download in parallel, run in order after parsing — the default choice), async (run as soon as downloaded, any order — analytics), type="module" (ES modules, deferred by default). Inline <script> at the end of body is the old pattern.
Social previews (Open Graph / Twitter / Discord embeds): <meta property="og:title" content="..." />, og:description, og:image (absolute URL, 1200x630), og:url, og:type="website"; <meta name="twitter:card" content="summary_large_image" />; <meta name="theme-color" content="#5865F2" /> (Discord embed colour).
SEO: one <h1> per page, logical heading order, descriptive titles, canonical link (<link rel="canonical" href="...">), alt text, semantic markup, fast load, sitemap.xml, robots.txt, structured data (<script type="application/ld+json">).
Other head items: <link rel="preconnect" href="https://fonts.googleapis.com">, <link rel="preload" as="font" ...>, <base href>, <meta http-equiv="refresh"> (avoid), manifest.json for PWAs.
Comments: <!-- note -->. Entities: &lt; &gt; &amp; &quot; &nbsp; &copy;. Validate with validator.w3.org.`),

  c('elements-semantics', 'HTML elements and semantic layout: headings, text, links, lists, images, landmarks', ['html elements', 'semantic html', 'html tags list', 'header nav main footer', 'html link', 'html image', 'html list', 'div vs span', 'html table'],
    `Landmarks (semantic layout): <header> (site/section intro), <nav> (main links), <main> (one per page, the unique content), <article> (self-contained: post, card), <section> (thematic group with a heading), <aside> (sidebar), <footer>. Use <div>/<span> only when no semantic element fits (div = block container, span = inline).
Text: <h1>-<h6> (structure, not size), <p>, <strong> (importance) / <em> (emphasis) vs <b>/<i> (style only), <br> (line break inside content like addresses), <hr> (thematic break), <blockquote cite>, <q>, <code>, <pre> (preserves whitespace), <kbd>, <mark>, <small>, <sub>/<sup>, <abbr title>, <time datetime="2026-10-05">, <address>.
Links: <a href="https://site.com" target="_blank" rel="noopener noreferrer">, internal anchors <a href="#contact"> + id="contact", mailto:, tel:, download attribute. Link text should describe the destination (not "click here").
Lists: <ul><li> (unordered), <ol start="3" reversed><li>, <dl><dt>term</dt><dd>definition</dd></dl>.
Images: <img src="cat.jpg" alt="Grey cat sleeping on a laptop" width="800" height="600" loading="lazy" decoding="async" /> (alt="" for decorative images; width/height prevent layout shift). Responsive: srcset="cat-400.jpg 400w, cat-800.jpg 800w" sizes="(max-width: 600px) 100vw, 50vw"; art direction / modern formats: <picture><source srcset="cat.avif" type="image/avif"><img ...></picture>. <figure><img><figcaption>.
Media: <video src controls muted autoplay loop playsinline poster>, <audio controls>, <source>, <track kind="captions">, <iframe src title loading="lazy"> (YouTube embeds), <svg> inline, <canvas> (drawn with JS).
Tables (tabular data only, not layout): <table><caption>, <thead><tr><th scope="col">, <tbody><tr><td>, colspan/rowspan.
Interactive: <details><summary>More</summary>hidden content</details> (no-JS accordion), <dialog> (modal: dialog.showModal()), popover attribute (<div popover id="p"> + <button popovertarget="p">).
Block vs inline: block elements start on a new line and take full width (div, p, h1, section, ul); inline flow in text (span, a, strong, img). CSS display changes it.
Global attributes: id (unique), class, style, title, hidden, lang, dir, tabindex, data-* (custom data: data-user-id="7" → el.dataset.userId), contenteditable, draggable.`),

  c('forms', 'HTML forms: inputs, types, labels, validation, buttons', ['html form', 'input types', 'html label', 'form validation html', 'required pattern', 'select dropdown', 'textarea', 'radio checkbox html', 'submit button'],
    `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email" placeholder="you@example.com" />
  <label>Password <input name="password" type="password" minlength="8" required autocomplete="new-password" /></label>
  <fieldset><legend>Plan</legend>
    <label><input type="radio" name="plan" value="free" checked /> Free</label>
    <label><input type="radio" name="plan" value="pro" /> Pro</label>
  </fieldset>
  <label><input type="checkbox" name="terms" required /> I accept</label>
  <select name="country"><option value="">Choose…</option><optgroup label="North America"><option value="ca">Canada</option></optgroup></select>
  <textarea name="bio" rows="4" maxlength="500"></textarea>
  <button type="submit">Sign up</button>
</form>
Every input needs a label (for/id or wrapping) — clickable and read by screen readers. name is what gets submitted.
Input types: text, email, password, number (min/max/step), tel, url, search, date, time, datetime-local, month, week, color, range, file (accept="image/*" multiple), checkbox, radio, hidden, submit, reset. Mobile keyboards adapt; inputmode="numeric" for digit-only text.
Built-in validation: required, minlength/maxlength, min/max, step, pattern="[A-Za-z]{3,}" (regex for the whole value), type checks; style with :invalid/:valid/:user-invalid; custom messages with setCustomValidity; novalidate on the form to handle it in JS. Always validate again on the server.
Buttons: <button> defaults to type="submit" inside forms — use type="button" for JS-only buttons. formaction/formmethod override per button.
Other: <datalist> (suggestions), <output>, <progress value max>, <meter>, disabled vs readonly (disabled fields aren't submitted), autofocus, autocomplete values (name, email, current-password, one-time-code, street-address).
method="get" puts fields in the URL (searches); post for changes. File uploads need method="post" enctype="multipart/form-data".
JS: form.addEventListener('submit', (e) => { e.preventDefault(); const data = Object.fromEntries(new FormData(form)); fetch('/api', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }); });`),

  c('accessibility', 'Web accessibility (a11y) in HTML: ARIA, keyboard, alt text, contrast', ['accessibility html', 'a11y', 'aria label', 'screen reader', 'alt text', 'keyboard navigation', 'wcag', 'aria hidden', 'skip link'],
    `First rule of ARIA: use native HTML first (<button>, <a href>, <label>, <nav>, <dialog>) — they come with roles, focus and keyboard behaviour. A <div onclick> is not keyboard-accessible.
Essentials: lang on <html>; meaningful alt (alt="" for decorative); labels on every input; headings in order; link/button text that makes sense alone; colour contrast ≥ 4.5:1 for text (3:1 large text); don't rely on colour alone; visible focus styles (:focus-visible, never just outline: none); text resizable to 200%; captions for video; respect prefers-reduced-motion.
Keyboard: everything usable with Tab/Shift+Tab/Enter/Space/Escape/arrow keys; logical focus order (DOM order); tabindex="0" to make custom widgets focusable, tabindex="-1" for programmatic focus, never positive tabindex. Modals trap focus and return it on close (<dialog> does much of this).
Skip link: <a class="skip" href="#main">Skip to content</a> as the first element.
ARIA when needed: aria-label="Close" (icon-only button), aria-labelledby/aria-describedby (point to ids), aria-expanded (menus/accordions), aria-controls, aria-current="page" (active nav link), aria-live="polite" (announce dynamic updates like toasts/errors), aria-hidden="true" (hide decorative icons from screen readers — never on focusable things), aria-invalid + aria-describedby for form errors, role="alert", role="status". Visually hidden but readable text: .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }.
Test: keyboard-only pass, screen readers (VoiceOver: Cmd+F5 on Mac, NVDA on Windows), Lighthouse / axe DevTools, WAVE. Standard: WCAG 2.2 AA.`),

  c('apis-performance', 'HTML with JavaScript and performance: DOM hooks, templates, web components, loading speed', ['html template tag', 'web components', 'custom elements', 'html performance', 'lazy loading', 'core web vitals', 'html email', 'iframe sandbox'],
    `<template id="row"><li class="item"></li></template> → const node = document.getElementById('row').content.cloneNode(true); fill and append (safe with textContent).
Web components: class MyCard extends HTMLElement { connectedCallback() { this.attachShadow({ mode: 'open' }).innerHTML = '<style>p{color:red}</style><p><slot></slot></p>'; } } customElements.define('my-card', MyCard); → <my-card>Hi</my-card> (names need a hyphen; shadow DOM scopes styles; Lit simplifies it).
Performance (Core Web Vitals — LCP, INP, CLS): compress and size images (WebP/AVIF, srcset), width/height on media (no layout shift), loading="lazy" below the fold (but fetchpriority="high" on the hero image), defer scripts, inline critical CSS, preconnect to third-party origins, font-display: swap, minify, HTTP caching/CDN, avoid huge DOMs. Measure with Lighthouse / PageSpeed Insights.
Security: rel="noopener" with target="_blank" (default in modern browsers), sandbox on iframes from untrusted sources (<iframe sandbox="allow-scripts">), Content-Security-Policy header, never put user input into innerHTML.
HTML emails: tables for layout, inline styles, no JS, limited CSS, test with Litmus/Email on Acid or MJML.
Simple static site hosting: GitHub Pages, Netlify, Cloudflare Pages, Vercel (drag and drop or git push).`),
];
