// Builds dist/web/playground.html: one file with the PitCode bundle and examples inside.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const examples = {
  "Welcome tour": read("web/welcome.pit"),
  "Lists and maps": read("examples/lists_and_maps.pit"),
  "Kinds (objects)": read("examples/kinds.pit"),
  "Errors": read("examples/errors.pit"),
  "Generators (give)": read("examples/generators.pit"),
  "Waiting (async)": read("examples/async.pit"),
  "Questions (ask)": read("web/ask.pit"),
  "Dive calculator": read("examples/dive.pit"),
  "Closures": read("examples/closures.pit"),
  "Fibonacci": read("examples/fibonacci.pit"),
  "FizzBuzz": read("examples/fizzbuzz.pit"),
};

// A "</script" inside the inlined code would end the script tag early.
const safe = (js) => js.replace(/<\/script/gi, "<\\/script");
const bundle = safe(read("dist/web/pitcode.js"));
const html = read("web/playground.html")
  .replace("/*PITCODE_BUNDLE*/", () => bundle)
  .replace("/*PITCODE_EXAMPLES*/", () => safe(JSON.stringify(examples, null, 1)));

fs.mkdirSync(path.join(root, "dist/web"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/web/playground.html"), html);
console.log(`dist/web/playground.html (${Math.round(html.length / 1024)} KB)`);
