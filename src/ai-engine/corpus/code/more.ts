import { code } from './_k';

// Smaller language categories: Dart/Flutter, Vue, Svelte, R, PowerShell.
export const CODE_DART = [
  code('dart', 'flutter', 'Dart and Flutter: syntax, null safety, async, widgets, state, layout, navigation', ['dart', 'flutter', 'flutter widget', 'stateless stateful widget', 'flutter setstate', 'flutter layout row column', 'flutter navigation', 'dart async await', 'flutter listview', 'pubspec'],
    `Dart: void main() { final name = 'Ana'; var count = 0; const pi = 3.14; print('Hi $name, \${name.length} letters'); } — final (set once), const (compile-time), late (initialised later). Null safety: String? may be null; name ?? 'anon', user?.name, ! asserts non-null. Collections: List<int> nums = [1, 2]; nums.add(3); nums.map((n) => n * 2).where((n) => n > 2).toList(); Map<String, int> ages = {'Ana': 20}; Set. Functions: int add(int a, [int b = 0]) => a + b; named params void greet({required String name, int age = 0}). Classes: class User { final String name; User(this.name); } named constructors, factory, extends/implements/with (mixins), records (int, String), pattern matching switch expressions, sealed classes.
Async: Future<String> load() async { final res = await http.get(Uri.parse(url)); return res.body; } try/catch; Stream with await for / StreamBuilder. JSON: jsonDecode(res.body) as Map<String, dynamic>; fromJson factories (json_serializable).
Flutter (UI = a tree of widgets): flutter create app; flutter run; hot reload with r.
import 'package:flutter/material.dart';
void main() => runApp(const MaterialApp(home: Counter()));
class Counter extends StatefulWidget { const Counter({super.key}); @override State<Counter> createState() => _CounterState(); }
class _CounterState extends State<Counter> {
  int count = 0;
  @override Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Counter')),
    body: Center(child: Text('$count', style: Theme.of(context).textTheme.headlineLarge)),
    floatingActionButton: FloatingActionButton(onPressed: () => setState(() => count++), child: const Icon(Icons.add)),
  );
}
StatelessWidget (no state) vs StatefulWidget (setState rebuilds). Layout: Column/Row (mainAxisAlignment, crossAxisAlignment), Stack, Expanded/Flexible, Padding, SizedBox (spacing), Container (decoration: BoxDecoration(borderRadius: BorderRadius.circular(12))), ListView.builder(itemCount:, itemBuilder:), GridView, SingleChildScrollView, SafeArea. Input: TextField(controller:) + TextEditingController (dispose it), ElevatedButton, GestureDetector/InkWell. Navigation: Navigator.push(context, MaterialPageRoute(builder: (_) => Detail())) / Navigator.pop; go_router for URLs. FutureBuilder for async data. State management: Provider, Riverpod, Bloc, or setState for local state. Packages in pubspec.yaml (flutter pub add http).
Common errors: "RenderFlex overflowed by N pixels" (wrap in Expanded/Flexible or a scroll view), "Vertical viewport was given unbounded height" (ListView inside Column → wrap in Expanded or shrinkWrap), "setState() called after dispose()" (check mounted), "Null check operator used on a null value" (a ! on null).`),
];

export const CODE_VUE = [
  code('vue', 'vue3', 'Vue 3: single-file components, Composition API, reactivity, directives, props/emits, Pinia, Vue Router, Nuxt', ['vue', 'vue 3', 'vue composition api', 'vue ref reactive', 'v-for v-if', 'vue props emit', 'pinia', 'vue router', 'nuxt', 'vue computed watch'],
    `npm create vue@latest. Single-file component (Counter.vue):
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
const props = defineProps<{ start?: number }>()
const emit = defineEmits<{ changed: [value: number] }>()
const count = ref(props.start ?? 0)                  // ref → .value in script, auto-unwrapped in the template
const double = computed(() => count.value * 2)
watch(count, (v) => emit('changed', v))
onMounted(() => console.log('mounted'))
</script>
<template>
  <button @click="count++">Clicked {{ count }} times ({{ double }})</button>
</template>
<style scoped> button { padding: .5rem 1rem; } </style>
Reactivity: ref (any value), reactive (objects; don't destructure it — use toRefs), computed (cached derived values), watch/watchEffect (side effects). Directives: {{ }} interpolation, v-bind:href / :href, v-on:click / @click (.prevent, .stop modifiers), v-model (two-way on inputs and components: defineModel()), v-if/v-else-if/v-else (removes), v-show (CSS display), v-for="item in items" :key="item.id", v-html (XSS risk), :class="{ active: isActive }", :style. Slots: <slot /> and named slots <template #header>. provide/inject for deep data. Composables (useFetch, useMouse) = Vue's custom hooks (VueUse library).
Pinia store: export const useCart = defineStore('cart', () => { const items = ref([]); const total = computed(() => items.value.reduce((s, i) => s + i.price, 0)); function add(i) { items.value.push(i) } return { items, total, add } }).
Vue Router: routes [{ path: '/users/:id', component: User }], <RouterLink to="/">, <RouterView />, useRoute().params.id, useRouter().push('/').
Nuxt: file-based routing (pages/), server routes (server/api), useFetch/useAsyncData, SSR/SSG. Common gotchas: forgetting .value in script, losing reactivity by destructuring reactive/props, mutating props (emit an event instead), missing :key in v-for, v-if with v-for on the same element.`),
];

export const CODE_SVELTE = [
  code('svelte', 'svelte5', 'Svelte 5 and SvelteKit: runes ($state, $derived, $effect, $props), templates, events, stores, routing, load functions', ['svelte', 'sveltekit', 'svelte runes', 'svelte state', 'svelte props', 'svelte each block', 'svelte store', 'sveltekit load', 'svelte bind'],
    `npx sv create my-app. Component (Counter.svelte):
<script lang="ts">
  let { start = 0, onchange }: { start?: number; onchange?: (v: number) => void } = $props();
  let count = $state(start);
  let double = $derived(count * 2);
  $effect(() => { onchange?.(count); });          // runs when count changes
</script>
<button onclick={() => count++}>Clicked {count} times ({double})</button>
<style> button { padding: .5rem 1rem; } </style>   <!-- scoped to the component -->
Template: {expression}, {#if cond}...{:else if x}...{:else}...{/if}, {#each items as item (item.id)}...{:else}empty{/each}, {#await promise}loading{:then data}...{:catch e}...{/await}, {@html raw} (XSS risk), bind:value={name}, bind:checked, bind:this={el}, class:active={on}, style:color={c}, snippets {#snippet row(x)}...{/snippet} {@render row(item)} (replace slots), transitions transition:fade.
Svelte 4 syntax (older code): let count = 0 (reactive by assignment), $: double = count * 2, export let prop, on:click, createEventDispatcher, slots. Stores: writable/readable/derived from 'svelte/store', $store auto-subscription — in Svelte 5 prefer $state in .svelte.ts modules for shared state.
SvelteKit: file routing src/routes/+page.svelte, +layout.svelte, [slug] params, +page.ts / +page.server.ts export async function load({ params, fetch }) { return { post: await getPost(params.slug) } } → let { data } = $props(); form actions in +page.server.ts (export const actions = { default: async ({ request }) => { const form = await request.formData(); } }), +server.ts API endpoints (export function GET() { return json(data) }), hooks.server.ts, adapters (node, vercel, static).`),
];

export const CODE_R = [
  code('r', 'data', 'R for data analysis: vectors, data frames, tidyverse (dplyr, ggplot2), stats, reading files', ['r programming', 'r language', 'dplyr', 'ggplot2', 'tidyverse', 'r data frame', 'r vector', 'r statistics', 'rstudio', 'read csv r'],
    `Basics: x <- c(1, 2, 3) (vectors; indexing starts at 1: x[1]); vectorised maths x * 2, sum(x), mean(x), length(x); seq(1, 10, by = 2), 1:10, rep("a", 3); logical filtering x[x > 1]; NA for missing (mean(x, na.rm = TRUE)); lists list(a = 1, b = "x"); factors for categories; functions: square <- function(n) n^2; if/else, for (i in 1:5), sapply/lapply/purrr::map; paste0("a", 1), sprintf, nchar, toupper, grepl("x", s), gsub.
Data frames: df <- data.frame(name = c("Ana", "Ben"), age = c(20, 31)); df$age; df[df$age > 25, ]; nrow, ncol, str(df), summary(df), head(df).
Read/write: readr::read_csv("data.csv"), write_csv(df, "out.csv"), readxl::read_excel, jsonlite::fromJSON.
dplyr (library(tidyverse)): df |> filter(age > 18) |> select(name, age) |> mutate(decade = age %/% 10 * 10) |> group_by(country) |> summarise(n = n(), avg = mean(age, na.rm = TRUE)) |> arrange(desc(avg)); joins left_join(a, b, by = "id"); tidyr pivot_longer/pivot_wider; stringr, lubridate (dates), forcats.
ggplot2: ggplot(df, aes(x = age, y = income, colour = country)) + geom_point() + geom_smooth(method = "lm") + labs(title = "Income by age", x = "Age", y = "Income") + theme_minimal(); geom_histogram(bins = 30), geom_bar / geom_col, geom_line, geom_boxplot, facet_wrap(~ group); ggsave("plot.png", width = 8, height = 5).
Stats: t.test(a, b), cor(x, y), lm(y ~ x + z, data = df) |> summary(), glm(family = binomial), chisq.test, aov; set.seed(42); sample, rnorm, runif.
Tools: RStudio/Positron, install.packages("pkg"), library(pkg), R Markdown / Quarto reports, Shiny for interactive apps.`),
];

export const CODE_POWERSHELL = [
  code('powershell', 'scripting', 'PowerShell and Windows command line: cmdlets, pipeline, variables, scripts, files, processes, execution policy', ['powershell', 'windows terminal commands', 'powershell script', 'cmd commands', 'get-childitem', 'execution policy', 'ps1 script', 'batch file', 'windows command prompt'],
    `Cmdlets are Verb-Noun and pass OBJECTS through the pipeline: Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU.
Discover: Get-Command *service*, Get-Help Get-Process -Examples, Get-Member (properties of an object). Aliases: ls/dir = Get-ChildItem, cd = Set-Location, cat = Get-Content, rm = Remove-Item, cp, mv, echo = Write-Output.
Variables: $name = "Ana"; "Hi $name" (double quotes expand), 'literal'; arrays @(1, 2, 3); hashtables @{ Name = "Ana"; Age = 20 }; $env:PATH, $env:USERPROFILE; comparison operators -eq -ne -gt -lt -like "*.txt" -match "regex" -contains; logical -and -or -not.
Control: if ($x -gt 5) { } elseif () { } else { }; foreach ($f in Get-ChildItem *.log) { }; ForEach-Object { $_.Name } in pipelines; switch; try { } catch { Write-Error $_ } finally { }; functions: function Get-Square([int]$n) { $n * $n }; param() blocks for script arguments.
Files: Get-ChildItem -Recurse -Filter *.jpg; Get-Content file.txt -Tail 20 -Wait; Set-Content / Add-Content; New-Item -ItemType Directory -Force; Copy-Item -Recurse; Remove-Item -Recurse -Force (careful); Test-Path; Select-String -Pattern "error" -Path *.log (grep); Import-Csv / Export-Csv -NoTypeInformation; ConvertTo-Json / ConvertFrom-Json; Compress-Archive / Expand-Archive.
Processes/system: Get-Process, Stop-Process -Id 1234, Start-Process app.exe -Verb RunAs (admin), Get-Service, Restart-Service, Get-NetTCPConnection -LocalPort 3000, Test-Connection google.com, Invoke-RestMethod https://api.x.com (parses JSON), Invoke-WebRequest -OutFile; winget install / upgrade --all.
Scripts: save as script.ps1; "running scripts is disabled on this system" → Set-ExecutionPolicy -Scope CurrentUser RemoteSigned. PowerShell 7 (pwsh) is cross-platform; Windows PowerShell 5.1 is built in.
cmd.exe / .bat basics: dir, cd, copy, del, mkdir, set VAR=value, %VAR%, echo off, if exist file (...), for %%f in (*.txt) do echo %%f, ipconfig, ping, tasklist, taskkill /PID 1234 /F, netstat -ano | findstr :3000, sfc /scannow, chkdsk.`),
];
