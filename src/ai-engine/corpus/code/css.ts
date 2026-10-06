import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('css', slug, title, keywords, content);

export const CODE_CSS = [
  c('selectors-cascade', 'CSS selectors, specificity, cascade, inheritance, pseudo-classes, units', ['css selectors', 'css specificity', 'css cascade', 'pseudo class', 'pseudo element', 'css units rem em', 'css not working', 'important css', 'has selector', 'css variables'],
    `Selectors: element (p), .class, #id, * , [attr], [type="email"], [href^="https"], [href$=".pdf"], [class*="btn"]; combinators: A B (descendant), A > B (child), A + B (next sibling), A ~ B (later siblings); grouping a, b.
Pseudo-classes: :hover, :focus, :focus-visible, :active, :visited, :checked, :disabled, :required, :invalid, :user-invalid, :placeholder-shown, :first-child, :last-child, :nth-child(2n+1), :nth-of-type, :not(.x), :is(h1, h2), :where() (zero specificity), :has() (parent selector: .card:has(img), form:has(:invalid)), :root, :empty, :target.
Pseudo-elements: ::before / ::after (need content: ''), ::placeholder, ::selection, ::marker, ::first-letter, ::file-selector-button.
Specificity (highest wins): inline style > #id (1,0,0) > .class/[attr]/:pseudo-class (0,1,0) > element/::pseudo-element (0,0,1). Equal specificity → the later rule wins. !important beats all (avoid; fix specificity instead). Cascade layers: @layer reset, base, components; later layers win regardless of specificity.
Inheritance: text properties inherit (color, font, line-height, text-align); box properties don't (margin, border, background). Keywords: inherit, initial, unset, revert.
"My CSS doesn't apply": check the selector matches (DevTools → Elements → Styles shows crossed-out overridden rules), specificity, typos, file linked/cached, the property is valid for that display type (width on inline elements does nothing).
Units: px (absolute), rem (relative to root font size — use for font sizes/spacing), em (relative to the element's font size), % (of parent), vw/vh (viewport; dvh/svh for mobile browser bars), ch (character width — max-width: 65ch for readable text), fr (grid fraction). clamp(1rem, 2.5vw, 2rem) for fluid sizes; calc(100% - 2rem); min()/max().
Custom properties (variables): :root { --brand: #5865f2; --radius: 12px; } .btn { background: var(--brand); border-radius: var(--radius, 8px); } — inherit, can change in media queries/themes/JS (el.style.setProperty('--brand', 'red')).
Colours: #rrggbb(aa), rgb(0 0 0 / 50%), hsl(220 90% 60%), oklch(70% 0.15 250) (perceptually even), color-mix(in oklch, var(--brand) 70%, white), currentColor, transparent.`),

  c('box-model-layout', 'CSS box model, display, positioning, z-index, overflow, centering', ['css box model', 'box sizing border box', 'margin padding', 'position absolute relative', 'z-index not working', 'center a div', 'overflow hidden', 'sticky header', 'display none vs visibility'],
    `Box model: content + padding + border + margin. Always: *, *::before, *::after { box-sizing: border-box; } (width includes padding and border).
Margins: vertical margins of adjacent blocks collapse (the larger wins); margin: 0 auto centres a block with a width; negative margins pull. Use gap in flex/grid instead of margins between items.
Shorthands: margin: top right bottom left (clockwise) / vertical horizontal; logical properties for i18n: margin-inline, padding-block, inset-inline-start.
display: block, inline (ignores width/height/vertical margins), inline-block, flex, inline-flex, grid, none (removed from layout; visibility: hidden keeps the space; opacity: 0 keeps it clickable), contents.
position: static (default); relative (offset from itself, and becomes the reference for absolute children); absolute (removed from flow, positioned against the nearest positioned ancestor); fixed (against the viewport — breaks inside transformed ancestors); sticky (sticks while scrolling: position: sticky; top: 0 — fails if an ancestor has overflow hidden/auto). inset: 0 = top/right/bottom/left 0.
z-index only works on positioned (non-static) elements or flex/grid items; it's scoped by stacking contexts (created by opacity < 1, transform, filter, position + z-index, isolation: isolate…) — a child can't escape its parent's context.
overflow: visible | hidden | scroll | auto | clip; text-overflow: ellipsis needs white-space: nowrap + overflow: hidden (+ a width). Multi-line clamp: display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden (or line-clamp: 3).
Centre anything: .parent { display: grid; place-items: center; } or display: flex; justify-content: center; align-items: center; — absolute: top: 50%; left: 50%; translate: -50% -50%. Text: text-align: center.
Sizing: width/height, min-/max- (max-width: 100% on images), aspect-ratio: 16 / 9, object-fit: cover (images filling a box), fit-content, min-content, max-content.
Full-height page: body { min-height: 100dvh; } ; sticky footer: body { display: grid; grid-template-rows: auto 1fr auto; }.`),

  c('flexbox', 'CSS Flexbox: container and item properties, common layouts', ['flexbox', 'display flex', 'justify content', 'align items', 'flex wrap', 'flex grow shrink basis', 'flex gap', 'flex direction column', 'navbar flexbox'],
    `One-dimensional layout (a row or a column).
Container: display: flex; flex-direction: row | column | row-reverse | column-reverse; flex-wrap: wrap; gap: 1rem (row-gap/column-gap);
justify-content (main axis): flex-start | center | flex-end | space-between | space-around | space-evenly;
align-items (cross axis, per line): stretch (default) | center | flex-start | flex-end | baseline;
align-content (multiple wrapped lines). Main axis = the direction; in column mode justify-content is vertical.
Items: flex: 1 (= 1 1 0%: grow to share space equally); flex: 0 0 200px (fixed); flex-grow, flex-shrink (0 = don't squash), flex-basis (starting size); align-self; order; margin-left: auto pushes an item (and everything after it) to the end.
Recipes:
- Navbar: nav { display: flex; align-items: center; gap: 1rem; } .logo { margin-right: auto; }
- Wrapping cards: .cards { display: flex; flex-wrap: wrap; gap: 1rem; } .card { flex: 1 1 250px; }
- Sidebar: .layout { display: flex; } aside { flex: 0 0 260px; } main { flex: 1; min-width: 0; }
- Media object: .row { display: flex; gap: .75rem; align-items: flex-start; } img { flex-shrink: 0; }
- Footer at bottom of a card: .card { display: flex; flex-direction: column; } .card .actions { margin-top: auto; }
Gotcha: flex items have min-width: auto, so long text/code overflows — set min-width: 0 (or overflow: hidden) on the item. Images in flex rows stretch — align-items: center/flex-start or align-self.`),

  c('grid', 'CSS Grid: templates, areas, auto-fit responsive grids, placement', ['css grid', 'grid template columns', 'grid template areas', 'auto fit minmax', 'grid gap', 'grid span', 'responsive grid', 'grid vs flexbox', 'subgrid'],
    `Two-dimensional layout (rows and columns).
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; } — fr = share of free space; mix: 200px 1fr auto; minmax(200px, 1fr).
Responsive cards without media queries: grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); (auto-fit stretches items to fill; auto-fill keeps empty tracks).
Placement: .item { grid-column: 1 / 3; } (lines 1 to 3) or span 2; grid-row: 1 / -1 (full height); -1 = last line.
Named areas:
.page { display: grid; grid-template-columns: 240px 1fr; grid-template-rows: auto 1fr auto; grid-template-areas: "header header" "sidebar main" "footer footer"; min-height: 100dvh; }
header { grid-area: header; } aside { grid-area: sidebar; } main { grid-area: main; } footer { grid-area: footer; }
@media (max-width: 700px) { .page { grid-template-columns: 1fr; grid-template-areas: "header" "main" "sidebar" "footer"; } }
Alignment: justify-items/align-items (inside cells), place-items: center; justify-content/align-content (the whole grid); per item justify-self/align-self.
grid-auto-rows: minmax(100px, auto); grid-auto-flow: dense (fill holes); implicit tracks for extra items.
subgrid: .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; } aligns card parts across siblings.
Grid vs flex: grid for page/2D layouts and aligned cards; flex for one row/column of things (navbars, toolbars, centring). They combine fine. Use 1fr columns with minmax(0, 1fr) to avoid overflow from long content.`),

  c('responsive-typography', 'Responsive CSS: media queries, container queries, mobile-first, typography, fonts', ['media query', 'responsive design css', 'mobile first', 'container queries', 'css breakpoints', 'font family', 'google fonts', 'line height', 'dark mode css', 'prefers color scheme'],
    `Mobile-first: write base styles for small screens, add @media (min-width: 768px) { ... } for bigger ones. Common breakpoints: 640, 768, 1024, 1280px — but choose where your content breaks. Range syntax: @media (width >= 768px).
Container queries (component responds to its container, not the viewport): .card-wrap { container-type: inline-size; } @container (min-width: 400px) { .card { display: flex; } } units cqw/cqi.
Feature/preference queries: @media (hover: hover) (real hover), (pointer: coarse) (touch), (prefers-reduced-motion: reduce), (prefers-color-scheme: dark), (orientation: landscape), print. @supports (display: grid) { }.
Dark mode: :root { --bg: #fff; --text: #111; color-scheme: light dark; } @media (prefers-color-scheme: dark) { :root { --bg: #111; --text: #eee; } } or a [data-theme="dark"] class toggled by JS; light-dark(#fff, #111) function.
Responsive images/media: img, video { max-width: 100%; height: auto; display: block; }.
Typography: body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 1rem; line-height: 1.5; } headings line-height ~1.2; max-width: 65ch for paragraphs; fluid sizes: font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem); letter-spacing, text-wrap: balance (headings) / pretty; font-weight, font-style, text-transform, text-decoration-thickness, text-underline-offset; word-break: break-word / overflow-wrap: anywhere for long URLs; hyphens: auto.
Web fonts: <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"> or self-host: @font-face { font-family: "Inter"; src: url(/fonts/inter.woff2) format("woff2"); font-display: swap; font-weight: 100 900; } (variable fonts = one file, all weights).
Don't set html font-size to 62.5% hacks unless needed; never disable zoom (user-scalable=no).`),

  c('effects-animation', 'CSS visual effects and animation: transitions, keyframes, transforms, shadows, gradients, filters', ['css animation', 'css transition', 'keyframes', 'transform rotate scale', 'box shadow', 'gradient css', 'hover effect', 'backdrop filter blur', 'glassmorphism', 'css loading spinner'],
    `Transitions: .btn { transition: transform 200ms ease, background-color 200ms; } .btn:hover { transform: translateY(-2px); } — transition specific properties (not all). Timing: ease, ease-in-out, linear, cubic-bezier(.2,.8,.2,1), steps(4). Can't transition display/height: auto (use grid-template-rows: 0fr → 1fr, interpolate-size: allow-keywords, or transition-behavior: allow-discrete + @starting-style for entry animations).
Keyframes: @keyframes spin { to { rotate: 360deg; } } .spinner { width: 32px; aspect-ratio: 1; border: 4px solid #ddd; border-top-color: var(--brand); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes fade-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } } .card { animation: fade-in 300ms ease-out both; animation-delay: calc(var(--i) * 60ms); }
animation shorthand: name duration timing delay iteration-count direction fill-mode play-state. Scroll-driven: animation-timeline: view() / scroll().
Transforms (GPU-friendly, don't affect layout): translate, rotate, scale individual properties or transform: translate(-50%, -50%) rotate(45deg) scale(1.1) skew(); transform-origin; perspective + rotateY for 3D (backface-visibility: hidden for card flips). Animate transform and opacity for smooth 60fps; avoid animating width/top/left.
Respect motion preferences: @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
Shadows: box-shadow: 0 1px 2px rgb(0 0 0 / .1), 0 8px 24px rgb(0 0 0 / .12); inset shadows; text-shadow; filter: drop-shadow() (follows PNG/SVG shape).
Gradients: linear-gradient(135deg, #5865f2, #eb459e); radial-gradient(circle at top, ...); conic-gradient (pie charts); gradient text: background: linear-gradient(...); background-clip: text; color: transparent.
Backgrounds: background: url(img.jpg) center / cover no-repeat; multiple layers; background-attachment: fixed (parallax, poor on mobile).
Filters: filter: blur(4px) grayscale(1) brightness(.8) contrast(1.2) saturate(); glass effect: background: rgb(255 255 255 / .15); backdrop-filter: blur(12px); border: 1px solid rgb(255 255 255 / .3). mix-blend-mode, clip-path: polygon(...) / circle(), mask-image.
Borders: border-radius (50% = circle), outline (doesn't take space; use for focus), border-image. Cursor: pointer, not-allowed. accent-color for checkboxes/radios; scroll-behavior: smooth; scroll-snap-type / scroll-snap-align for carousels.`),

  c('architecture-tools', 'Organising CSS and tools: naming (BEM), resets, Tailwind, Sass, CSS modules, nesting', ['tailwind css', 'sass scss', 'bem naming', 'css reset', 'css modules', 'css nesting', 'postcss', 'css framework', 'bootstrap'],
    `Modern reset essentials: *,*::before,*::after{box-sizing:border-box} body{margin:0} img,picture,svg,video{display:block;max-width:100%} input,button,textarea,select{font:inherit} p,h1,h2,h3{overflow-wrap:break-word}.
Naming: BEM — .card, .card__title (element), .card--featured (modifier); keep specificity low and flat (single classes); utility classes for one-offs.
Native nesting (all modern browsers): .card { padding: 1rem; & h2 { margin: 0; } &:hover { box-shadow: ...; } @media (width > 600px) { padding: 2rem; } }
Sass/SCSS (preprocessor): $variables, nesting, @mixin/@include, @use 'partials', functions, loops; compile with sass or Vite. Much of it is now native CSS (variables, nesting, color-mix).
Tailwind CSS (utility-first): <button class="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 disabled:opacity-50 md:px-6 dark:bg-indigo-500">. Layout: flex items-center justify-between gap-4, grid grid-cols-1 md:grid-cols-3, w-full max-w-3xl mx-auto, p-4 mt-8, text-sm/lg/2xl, font-bold, rounded-lg, shadow-md, hidden md:block. Arbitrary values: w-[37px], bg-[#5865f2]. v4 config in CSS: @import "tailwindcss"; @theme { --color-brand: #5865f2; }. Combine conditional classes with clsx + tailwind-merge (cn()).
CSS Modules (scoped class names, React/Vite/Next): import styles from './Button.module.css'; <button className={styles.primary}>.
Frameworks/component kits: Bootstrap, Bulma, Pico (classless), DaisyUI/shadcn (Tailwind-based).
PostCSS + autoprefixer adds vendor prefixes; Lightning CSS minifies/transpiles. Stylelint for linting.
Debugging: DevTools (box model view, flex/grid overlays, computed styles, toggle states :hover), outline: 1px solid red on * to see boxes.`),
];
