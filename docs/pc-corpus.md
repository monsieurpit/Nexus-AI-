# PC corpus (`pc-building`)

Nine files, ~210 entries in the category `pc-building` (all registered in `knowledgeBase.ts`):
`pcBuildingComplete.ts` (core guide + dated market snapshots), `pcDeepCpuGpuRam.ts`, `pcDeepStorageBoardPsuCooling.ts`,
`pcDeepPeripheralsSoftwareFixes.ts`, `pcDeepCompaniesHistoryBuilds.ts`, `pcModelCatalog.ts` (every CPU/GPU/board/RAM/SSD/PSU/
cooler/case/monitor/peripheral model with specs and launch MSRP) and `pcBestPartsBuilds.ts` (best part per category and tier,
"infinite money" gaming and workstation builds, builds from $500 to $10,000+), `pcExtraGamesPlatforms.ts` (game system
requirements, consoles/handhelds/laptops/Macs/ARM, OS editions, Linux distros, Nvidia/AMD/Intel software features, game
streaming) and `pcExtraStandardsSecurityMisc.ts` (dimensions and port versions, chipset tables, known hardware issues, PC
security, home lab/NAS, emulation, trusted review sources, scams, accessories, power and temperature tables, future tech
roadmap, FAQs).


`src/ai-engine/corpus/pcBuildingComplete.ts` — about 50 entries so Nexus can teach PC building: how to build and assemble,
compatibility rules, first boot/BIOS, troubleshooting, CPUs (AMD/Intel, sockets, naming), GPUs (Nvidia RTX 50, AMD RX 9000,
Intel Arc, older generations, upscalers), RAM, storage, motherboards, PSU, cooling, cases, monitors, cables, peripherals,
OS/software, overclocking, bottlenecks, prebuilt vs DIY, used parts, sample builds (budget / 1440p / 4K / creator+AI),
laptops, companies, why AI demand raises PC prices, and a glossary.

## Two kinds of facts
- **Stable** (sockets, chipsets, compatibility, how parts work): safe to leave as is.
- **Market snapshots** (RAM crisis, GPU/SSD street prices, upcoming launches, `kb-pc-ram-crisis-*`, `kb-pc-gpu-market-2026`,
  `kb-pc-storage-price-crisis`, `kb-pc-upcoming-cpu-gpu`, the sample-build totals): written from several tech-press and
  market-tracker reports as of **Sept/Oct 2026**, with rounded price ranges because sources disagreed. Re-check and update
  these every few months, then re-run `OLLAMA_BASE_URL=http://127.0.0.1:11434 bun run scripts/generateEmbeddings.ts`
  (only new/changed entries are embedded).

## How questions reach it
- `detectQueryIntent` sends any question that mentions PC hardware (`PC_TOPIC_RE`) to the corpus-grounded path.
- "teach me how to build a PC" / "recommend parts" (`PC_BUILD_REQUEST_RE`) get a dedicated lesson path in
  `reasoningEngine.ts`: top PC entries are put in the prompt, the answer gets a 650-token budget and a 6-sentence cap.
- PC-topic answers get a 4-sentence cap instead of the 2-sentence chat cap.
