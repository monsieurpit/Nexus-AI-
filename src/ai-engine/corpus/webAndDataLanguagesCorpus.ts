import { KnowledgeItem } from '../../types';

// Code knowledge expansion (2026-09-14) — web and data languages: HTML, CSS, SQL, Bash/shell.
// Plain neutral educational content covering markup fundamentals, layout systems, query
// language basics, and common shell scripting patterns.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Programming',
  keywords,
  content,
  createdAt: now,
});

export const WEB_AND_DATA_LANGUAGES_CORPUS: KnowledgeItem[] = [
  k(
    'kb-code-html-semantic-tags',
    'Semantic HTML tags',
    ['html semantic tags', 'semantic html', 'html5 elements'],
    "Semantic HTML tags describe the MEANING of their content, not just its visual appearance, unlike a generic `<div>` or `<span>` which carries no inherent meaning. HTML5 introduced tags like `<header>` (introductory content, often navigation and titles), `<nav>` (navigation links), `<main>` (the primary content of the page, used once), `<article>` (a self-contained piece of content, like a blog post), `<section>` (a thematic grouping of content), `<aside>` (content tangentially related to the main content, like a sidebar), and `<footer>` (closing content, often copyright/contact info). Using semantic tags instead of a `<div>` for everything has real benefits: screen readers and other assistive technology can navigate a page more meaningfully for users with disabilities, search engines can better understand page structure for SEO, and the code itself is more readable to other developers, since the tag name documents its purpose. A `<div>` remains appropriate for purely presentational grouping that has no semantic meaning of its own.",
  ),
  k(
    'kb-code-html-forms',
    'HTML forms basics',
    ['html forms', 'html input types', 'html form submission'],
    "An HTML form, wrapped in a `<form>` element, collects user input and sends it to a server. Key attributes: `action` specifies the URL to submit to, and `method` specifies the HTTP method (`GET` appends data as URL query parameters, visible and bookmarkable but size-limited and unsuitable for sensitive data; `POST` sends data in the request body, suitable for larger or sensitive data and for actions that change server state). Input fields use `<input>` with a `type` attribute controlling behavior and built-in validation: `text`, `email` (browser validates it looks like an email), `password` (masks characters), `number`, `checkbox`, `radio`, `date`, and more. Each input needs a `name` attribute, which becomes the key when the data is submitted. `<label>` elements, ideally linked to an input via a matching `for`/`id` pair, improve accessibility and let clicking the label text focus/toggle the associated input. `required` on an input prevents form submission until it's filled in, enforced by the browser without needing JavaScript.",
  ),
  k(
    'kb-code-html-dom',
    'The DOM (Document Object Model)',
    ['html dom', 'document object model', 'javascript dom manipulation'],
    "The DOM (Document Object Model) is the browser's in-memory, tree-structured representation of an HTML page, where every HTML element becomes a \"node\" object that JavaScript can read and modify. When a browser loads HTML, it parses the markup and builds this tree; JavaScript then interacts with it via the global `document` object, e.g. `document.getElementById(\"myDiv\")` retrieves a specific element node, `document.querySelector(\".my-class\")` retrieves the first element matching a CSS selector, and `document.querySelectorAll(...)` retrieves all matches. Once you have a reference to a node, you can read/change its content (`element.textContent = \"new text\"`, or `element.innerHTML` for HTML content), modify its attributes (`element.setAttribute(\"src\", url)`), change its styling (`element.style.color = \"red\"`), and attach event listeners (`element.addEventListener(\"click\", handler)`). Changing the DOM triggers the browser to re-render the affected part of the page — this is fundamentally what every interactive web page does, whether written in plain JavaScript or through a framework like React that manages DOM updates on your behalf.",
  ),
  k(
    'kb-code-css-box-model',
    'The CSS box model',
    ['css box model', 'css padding margin border'],
    "Every element in CSS is rendered as a rectangular box made of four nested layers, from innermost to outermost: content (the actual text/image/etc), padding (space between the content and the border, inside the element's background), border (a visible or invisible line around the padding), and margin (space outside the border, separating the element from its neighbors — margins are not part of the element's own background/border, so they're transparent). By default (`box-sizing: content-box`, the CSS default), setting `width: 200px` sets only the CONTENT width — padding and border are added on top, making the element's total rendered width larger than 200px, which often surprises beginners doing layout math. Setting `box-sizing: border-box` instead makes `width` include padding and border within that 200px, which most modern CSS resets apply globally (`* { box-sizing: border-box; }`) because it's much more intuitive for sizing elements predictably.",
  ),
  k(
    'kb-code-css-flexbox',
    'CSS Flexbox',
    ['css flexbox', 'css flex layout'],
    "Flexbox is a one-dimensional CSS layout system (arranging items in a single row OR column, not both simultaneously the way Grid can) designed for distributing space among items and aligning them within a container. Applying `display: flex` to a container turns its direct children into flex items. `flex-direction: row` (default) or `column` sets the main axis. `justify-content` aligns items along the main axis (`flex-start`, `center`, `space-between`, `space-around`), while `align-items` aligns items along the cross (perpendicular) axis (`flex-start`, `center`, `stretch`). Individual flex items can be given `flex-grow` (how much extra space an item should take relative to siblings), `flex-shrink` (how much an item should shrink when space is tight), and `flex-basis` (an item's initial size before growing/shrinking) — commonly combined into the shorthand `flex: 1` meaning \"grow to fill available space equally.\" Flexbox is the go-to tool for common UI patterns like navigation bars, centering content both horizontally and vertically, and evenly spacing a row of cards.",
  ),
  k(
    'kb-code-css-grid',
    'CSS Grid',
    ['css grid', 'css grid layout'],
    "CSS Grid is a two-dimensional layout system, letting you control rows AND columns simultaneously, which makes it well suited for overall page layouts (as opposed to Flexbox's one-dimensional, single-row-or-column strength, often used together with Grid for layout within individual sections). Applying `display: grid` to a container, then `grid-template-columns` and `grid-template-rows` define the size of each column/row track: `grid-template-columns: 200px 1fr 1fr;` creates three columns, a fixed 200px one and two equal flexible ones sharing remaining space (`fr` is a fractional unit specific to Grid). `gap` (or `row-gap`/`column-gap`) sets spacing between grid cells without needing margins on individual items. Individual grid items can be explicitly placed with `grid-column`/`grid-row` (e.g. `grid-column: 1 / 3;` spans an item across the first two columns), or grid areas can be named with `grid-template-areas` for a visual, readable layout definition directly in the CSS. `repeat(3, 1fr)` is common shorthand for three equal columns instead of writing `1fr 1fr 1fr`.",
  ),
  k(
    'kb-code-css-specificity',
    'CSS specificity',
    ['css specificity', 'css selector priority', 'css cascade'],
    "CSS specificity determines which rule \"wins\" when multiple CSS rules target the same element with conflicting property values. Specificity is calculated by counting selector types, roughly in this priority order from highest to lowest: inline styles (written directly in a `style=\"\"` attribute) beat everything; ID selectors (`#header`) beat class selectors; class selectors (`.button`), attribute selectors (`[type=\"text\"]`), and pseudo-classes (`:hover`) are all equal specificity and beat element selectors; element/type selectors (`div`, `p`) and pseudo-elements (`::before`) have the lowest specificity. When two rules have equal specificity, the one that appears LATER in the stylesheet (or is loaded later) wins — this is the \"cascade\" part of Cascading Style Sheets. The `!important` flag overrides normal specificity entirely for that declaration, but is generally considered a last resort/code smell since it makes styles harder to override predictably later and can force other rules to also use `!important` just to compete with it, escalating over time.",
  ),
  k(
    'kb-code-css-selectors',
    'CSS selectors',
    ['css selectors', 'css selector types'],
    "CSS selectors determine which HTML elements a rule applies to. A type/element selector (`p { }`) targets all elements of that tag. A class selector (`.highlight { }`) targets any element with `class=\"highlight\"` (an element can have multiple classes, space-separated). An ID selector (`#header { }`) targets the single element with `id=\"header\"` (IDs should be unique per page). Combinators express relationships: a descendant combinator (`div p { }`, a space) targets any `<p>` nested anywhere inside a `<div>`, at any depth; a child combinator (`div > p { }`) targets only direct children; an adjacent sibling combinator (`h1 + p { }`) targets a `<p>` immediately following an `<h1>`. Pseudo-classes select elements based on state or position rather than the DOM structure alone: `:hover` (while the mouse is over it), `:first-child`, `:nth-child(2n)` (every second element). Attribute selectors (`[type=\"submit\"]`) target elements by an attribute's presence or value. Multiple selectors can be combined for precision, e.g. `.card:hover .title { }`.",
  ),
  k(
    'kb-code-sql-select',
    'SQL SELECT basics',
    ['sql select', 'sql where clause', 'sql query basics'],
    "The `SELECT` statement retrieves data from a SQL database table. `SELECT column1, column2 FROM table_name;` returns specific columns; `SELECT * FROM table_name;` returns all columns (fine for exploration, generally discouraged in production code since it fetches unneeded data and breaks if the table's columns change). `WHERE` filters which rows are returned based on a condition: `SELECT * FROM users WHERE age >= 18;`. Conditions can be combined with `AND`/`OR`, and negated with `NOT`. `ORDER BY column [ASC|DESC]` sorts the result set (`ASC` ascending is the default). `LIMIT n` restricts how many rows are returned, commonly used with `ORDER BY` for \"top N\" queries. `DISTINCT` after `SELECT` removes duplicate rows from the result. Aggregate functions like `COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()` compute a single summary value across matching rows, e.g. `SELECT COUNT(*) FROM users WHERE active = true;` counts active users without returning every row individually.",
  ),
  k(
    'kb-code-sql-joins',
    'SQL JOIN types',
    ['sql joins', 'sql inner join left join', 'sql join types'],
    "A SQL `JOIN` combines rows from two or more tables based on a related column between them, most commonly a foreign key. An `INNER JOIN` (often just called `JOIN`) returns only rows that have a matching value in BOTH tables — if a row in one table has no match in the other, it's excluded entirely: `SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.id;`. A `LEFT JOIN` (or `LEFT OUTER JOIN`) returns ALL rows from the left (first-listed) table, plus matching data from the right table where it exists — rows from the left table with no match get `NULL` for all the right table's columns, rather than being dropped, which is useful for finding records that DON'T have a related match (by filtering for `NULL` afterward). A `RIGHT JOIN` is the mirror image, keeping all rows from the right table. A `FULL OUTER JOIN` (not supported by all databases, e.g. MySQL lacks it directly) keeps all rows from both tables, matching where possible and filling with `NULL` where not. Choosing the right join type is essential — an `INNER JOIN` used where a `LEFT JOIN` was needed silently drops rows that should have appeared.",
  ),
  k(
    'kb-code-sql-group-by',
    'SQL GROUP BY',
    ['sql group by', 'sql aggregate grouping'],
    "`GROUP BY` collapses multiple rows sharing the same value in specified column(s) into a single summary row per group, typically used together with an aggregate function to compute a value per group: `SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id;` returns one row per unique customer, with a count of how many orders each one has. Every column in the `SELECT` list that isn't wrapped in an aggregate function must appear in the `GROUP BY` clause (this is enforced strictly by most databases), since otherwise the database wouldn't know which specific row's value to show for a column that varies within a group. `HAVING` filters groups AFTER aggregation, analogous to `WHERE` but for aggregated results, since `WHERE` runs before grouping and can't reference an aggregate value: `SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 5;` only keeps customers with more than 5 orders. The typical logical processing order is `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`, even though it's written differently.",
  ),
  k(
    'kb-code-sql-indexes',
    'SQL indexes',
    ['sql index', 'database index', 'sql query performance'],
    "A database index is a separate data structure (commonly a B-tree) that stores a sorted copy of one or more columns' values along with pointers back to the corresponding full table rows, allowing the database to find matching rows much faster than scanning the entire table row by row (a \"full table scan\"). Without an index on a column used in a `WHERE` clause or `JOIN` condition, the database must check every single row to find matches, which becomes very slow on large tables; with an appropriate index, it can jump almost directly to matching rows, similar in spirit to using a book's index instead of reading every page. Indexes aren't free, though: they take up additional disk space, and every `INSERT`, `UPDATE`, or `DELETE` on the table must also update the index, which adds write overhead — so indexes are a tradeoff, typically added on columns frequently used for filtering, joining, or sorting, but not blindly added to every column. Primary keys are automatically indexed by virtually all databases, since uniqueness enforcement and fast lookup by primary key are both extremely common needs.",
  ),
  k(
    'kb-code-sql-normalization',
    'Database normalization basics',
    ['sql normalization', 'database normal forms', '1nf 2nf 3nf'],
    "Database normalization is the process of organizing tables to reduce data redundancy and prevent update anomalies (where the same fact, stored in multiple places, could become inconsistent if only one copy is updated). First Normal Form (1NF) requires each column to hold a single, atomic value — no comma-separated lists or repeating groups crammed into one field. Second Normal Form (2NF) requires 1NF plus that every non-key column depends on the ENTIRE primary key, not just part of it (relevant for tables with a composite/multi-column primary key). Third Normal Form (3NF) requires 2NF plus that every non-key column depends ONLY on the primary key, not on another non-key column (eliminating \"transitive\" dependencies) — for example, storing both a `customer_id` and that customer's `customer_name` directly on an `orders` table violates 3NF, since `customer_name` really depends on `customer_id`, not on the order itself; it should live only in a separate `customers` table, referenced by `customer_id`. Normalization reduces redundancy but can require more JOINs to reassemble related data, which is why some read-heavy systems deliberately \"denormalize\" certain data for performance, accepting some redundancy as a tradeoff.",
  ),
  k(
    'kb-code-bash-variables',
    'Bash variables and basic scripting',
    ['bash variables', 'bash scripting basics', 'shell variables'],
    "In Bash, a variable is assigned with NO spaces around the equals sign: `name=\"Alex\"` (spaces would make Bash try to run `name` as a command with `=\"Alex\"` as an argument, causing an error). A variable's value is accessed by prefixing it with `$`, e.g. `echo $name` or, more safely (especially when a value might contain spaces), `echo \"$name\"` with quotes to prevent word-splitting. Curly braces (`${name}`) disambiguate a variable name from surrounding text, e.g. `\"${name}_file.txt\"` vs the ambiguous `\"$name_file.txt\"` (which would look for a variable literally named `name_file`). Command substitution captures a command's output into a variable: `current_dir=$(pwd)`. Environment variables like `$HOME`, `$PATH`, and `$USER` are set by the shell/OS and inherited by child processes; `export MY_VAR=value` makes a variable available to any programs the script subsequently launches, not just the script itself. A basic script starts with a \"shebang\" line, `#!/bin/bash`, telling the OS which interpreter to run the file with.",
  ),
  k(
    'kb-code-bash-pipes-redirection',
    'Bash pipes and redirection',
    ['bash pipes', 'bash redirection', 'bash stdout stderr'],
    "Every process in a Unix-like shell has three standard streams: stdin (input, file descriptor 0), stdout (normal output, descriptor 1), and stderr (error output, descriptor 2) — separating normal output from errors even though both usually print to the terminal by default. A pipe (`|`) connects one command's stdout directly to the next command's stdin, chaining tools together: `cat file.txt | grep \"error\" | wc -l` counts lines containing \"error\" by piping the file's contents through a filter and then a counter, without creating intermediate files. Redirection sends a stream to/from a file instead of the terminal: `>` overwrites a file with stdout (`echo hi > out.txt`), `>>` appends instead of overwriting, `<` feeds a file's contents in as stdin, and `2>` redirects stderr specifically (`command 2> errors.log`). `2>&1` redirects stderr to wherever stdout is currently going, commonly used as `command > all_output.log 2>&1` to capture both streams into one file. `/dev/null` is a special \"discard\" destination, used as `command 2> /dev/null` to silently suppress error messages.",
  ),
  k(
    'kb-code-bash-common-commands',
    'Common Bash/Unix commands',
    ['bash commands', 'unix commands basics', 'linux command line basics'],
    "A handful of Unix command-line tools cover most everyday shell tasks. `ls` lists directory contents (`ls -la` shows hidden files and detailed info). `cd` changes the current directory (`cd ..` goes up one level, `cd ~` goes to the home directory). `pwd` prints the current working directory's full path. `mkdir`/`rmdir` create/remove empty directories; `rm -r` removes a directory and its contents recursively (dangerous — there's no undo, no trash bin). `cp`/`mv` copy or move/rename files. `grep pattern file` searches for lines matching a pattern (regular expressions supported), and `grep -r` searches recursively through a directory. `find . -name \"*.txt\"` searches for files matching a pattern starting from the current directory. `chmod` changes file permissions (e.g. `chmod +x script.sh` makes a script executable). `ps` lists running processes, and `kill <pid>` terminates one by its process ID. `man command` opens a command's manual page for detailed documentation on its flags and behavior.",
  ),
  k(
    'kb-code-html-vs-css-vs-js',
    'The roles of HTML, CSS, and JavaScript',
    ['html css javascript roles', 'web development basics three layers'],
    "The three core technologies of the web split cleanly by responsibility, often called \"separation of concerns.\" HTML (HyperText Markup Language) defines a page's STRUCTURE and CONTENT — the actual text, images, headings, links, and form fields present, along with their semantic meaning (a heading, a paragraph, a list). CSS (Cascading Style Sheets) defines PRESENTATION — colors, fonts, spacing, layout, and responsiveness across screen sizes — without changing the underlying content or structure. JavaScript defines BEHAVIOR and interactivity — responding to clicks, fetching data from a server, validating a form before submission, dynamically updating what's shown without reloading the page. A page with only HTML is readable but static and unstyled; adding CSS makes it look intentional; adding JavaScript makes it interactive. Modern frontend frameworks like React or Vue blur this separation somewhat by mixing structure/content generation into JavaScript (JSX, templates), but the underlying three-layer concept — what it is, how it looks, how it behaves — still holds conceptually.",
  ),
];
