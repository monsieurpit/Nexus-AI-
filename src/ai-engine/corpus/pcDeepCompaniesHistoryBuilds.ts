import { KnowledgeItem } from '../../types';

/**
 * PC_DEEP_COMPANIES_HISTORY_BUILDS — expansion of the 'pc-building' category (2026-10-01): company profiles,
 * PC history, GPU/CPU performance tiers, consoles/handhelds/laptops/Macs vs PCs, special builds. Company facts are
 * well-established history; the few recent corporate events are hedged ("reported").
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_DEEP_COMPANIES_HISTORY_BUILDS: KnowledgeItem[] = [
  // ------------------------------------------------------------------ companies
  k(
    'kb-pc-co-nvidia',
    'Nvidia: history, products and why it dominates GPUs and AI',
    [
      'who founded nvidia', 'nvidia history', 'jensen huang', 'what is cuda', 'geforce 256 first gpu', 'nvidia market cap', 'nvidia mellanox arm deal', 'nvidia vs amd history', 'why is nvidia so valuable', 'nvidia rtx history',
      'when was nvidia founded',
    ],
    `Nvidia was founded in April 1993 by Jensen Huang, Chris Malachowsky and Curtis Priem, and is based in Santa Clara, California (Huang is still CEO). It coined "GPU" with the GeForce 256 in 1999, launched CUDA in 2006 (letting GPUs run general-purpose and AI math, the foundation of its AI dominance), introduced RTX with real-time ray tracing and DLSS in 2018, and bought Mellanox (networking) in 2020; its attempted Arm acquisition was abandoned in 2022. Today it makes GeForce gaming GPUs, RTX Pro workstation GPUs, data-center AI accelerators (H100, B200, GB200) with NVLink and InfiniBand networking, the Shield/Tegra line (Nintendo Switch chips) and software (DLSS, Reflex, Omniverse). Its data-center business made it one of the most valuable companies in the world (it passed $4 trillion in market value in 2025). It designs chips but TSMC manufactures them.`
  ),
  k(
    'kb-pc-co-amd',
    'AMD: history, Ryzen, Radeon and consoles',
    [
      'who founded amd', 'amd history', 'lisa su', 'when did ryzen come out', 'amd ati acquisition', 'amd xilinx', 'amd zen history', 'amd athlon 64 history', 'amd console chips playstation', 'amd comeback story',
      'what does amd make',
    ],
    `AMD (Advanced Micro Devices) was founded in 1969 by Jerry Sanders and colleagues and is based in Santa Clara, California; Lisa Su has been CEO since 2014. History: AMD made x86-compatible chips from the 1980s, beat Intel to 1 GHz with the Athlon (2000), launched the first 64-bit x86 chip (Athlon 64, 2003), bought graphics company ATI in 2006 (the Radeon brand), struggled in the 2010s with Bulldozer/FX, then had its comeback with the Zen architecture and Ryzen in 2017, Zen 2 (2019), Zen 3 (2020), Zen 4 on AM5 (2022), Zen 5 (2024) and the X3D gaming chips. It also bought Xilinx (FPGAs) in 2022. Products: Ryzen CPUs, Threadripper, EPYC server CPUs, Radeon GPUs (RX 9000 / RDNA 4), Instinct AI GPUs, and the custom chips inside PlayStation 4/5, Xbox One/Series and Steam Deck. AMD is fabless: TSMC manufactures its chips.`
  ),
  k(
    'kb-pc-co-intel',
    'Intel: history, x86, Core, Arc and recent changes',
    [
      'who founded intel', 'intel history', 'what was the first microprocessor', 'intel 4004 8086 pentium', 'intel core history', 'intel foundry future', 'intel ceo lip-bu tan', 'intel us government stake', 'intel nvidia investment', 'intel 13th 14th gen problem',
      'when was intel founded',
    ],
    `Intel was founded in 1968 by Robert Noyce and Gordon Moore (of Moore's law) and is based in Santa Clara, California. It made the first commercial microprocessor (4004, 1971), the 8086 (1978, the origin of the x86 architecture), the Pentium (1993) and the Core line (2006 onward), and led CPUs for decades while running its own chip factories. Problems in the 2010s (delayed 10 nm manufacturing), AMD's Ryzen comeback and the 13th/14th-gen Raptor Lake instability issue (fixed by 2024 microcode) hurt its position. Intel entered discrete graphics with Arc (Alchemist 2022, Battlemage 2024). Reported in 2025: Lip-Bu Tan became CEO in March 2025, the US government took an equity stake in August 2025, and Nvidia announced a $5 billion investment in September 2025 with joint products planned. Intel Foundry (18A process) aims to make chips for Intel and outside customers; Intel also uses TSMC for some tiles. Current desktop: Core Ultra 200S (Arrow Lake) and the "Plus" refresh; next is Nova Lake.`
  ),
  k(
    'kb-pc-co-tsmc-samsung-memory',
    'TSMC, Samsung, SK hynix, Micron, Kioxia, SanDisk and other chip and memory makers',
    [
      'who is tsmc', 'what does tsmc do', 'samsung foundry vs tsmc', 'sk hynix history', 'micron history crucial', 'kioxia toshiba memory', 'sandisk wd spin off', 'cxmt ymtc china memory', 'asml euv machines', 'who makes dram and nand',
      'taiwan chip dependence',
    ],
    `TSMC (Taiwan Semiconductor Manufacturing Company, founded 1987 by Morris Chang, based in Hsinchu, Taiwan) is the world's biggest contract chip maker, manufacturing nearly all leading-edge chips for AMD, Nvidia, Apple and Qualcomm (it is also building fabs in Arizona, Japan and Germany). Samsung (Korea) is a top DRAM, NAND, display and phone maker and runs Samsung Foundry; SK hynix (Korea) is a top DRAM/HBM supplier (the main HBM provider for Nvidia) and owns Solidigm (ex-Intel NAND); Micron (founded 1978, Boise, Idaho) makes DRAM/NAND and owned the Crucial consumer brand (announced in Dec 2025 that it would wind it down in early 2026 to focus on AI customers). Kioxia (spun out of Toshiba as Toshiba Memory in 2018, renamed in 2019) makes NAND; SanDisk (acquired by Western Digital in 2016, spun off again in February 2025) makes NAND/SSDs; China's CXMT (DRAM) and YMTC (NAND) are growing. ASML (Netherlands) makes the EUV lithography machines the newest nodes need. Chips are fabless-designed (AMD, Nvidia, Apple) and made by foundries (TSMC, Samsung, Intel Foundry), a concentration in Taiwan that is a supply-chain risk.`
  ),
  k(
    'kb-pc-co-motherboard-gpu-partners',
    'ASUS, MSI, Gigabyte, ASRock, EVGA and Zotac: who they are',
    [
      'who owns asrock', 'asus rog history', 'msi vs gigabyte vs asus', 'what happened to evga', 'where is gigabyte from', 'zotac company', 'best motherboard brand', 'asus warranty reputation', 'gigabyte b650 bios problem', 'msi history',
      'asus vs asrock',
    ],
    `ASUS (ASUSTeK, founded 1989 in Taipei, Taiwan) makes motherboards, GPUs, laptops and phones; its ROG (Republic of Gamers, 2006) line is premium gaming, TUF is rugged mid-range, Prime/ProArt are workhorse/creator. MSI (Micro-Star International, founded 1986, Taiwan) makes boards, GPUs (Gaming/Suprim/Ventus), laptops and PSUs (MAG/MPG/MEG lines). Gigabyte (founded 1986, Taiwan) makes boards (Aorus, Gaming, Eagle), GPUs and PSUs. ASRock was spun out of ASUS in 2002 and is known for good-value boards and AMD GPUs. EVGA (founded 1999, California) was a favorite GPU/PSU brand but exited the GPU business in 2022 after disagreements with Nvidia, and still makes PSUs and peripherals. Zotac (Hong Kong) and PNY, Palit, Gainward, Inno3D and Colorful are Nvidia partners; Sapphire, PowerColor, XFX are AMD partners. Quality varies by model, not just brand: read reviews of the exact board (VRM, BIOS support, price). Warranty and RMA experience differs by region.`
  ),
  k(
    'kb-pc-co-corsair-gskill-kingston',
    'Corsair, G.Skill, Kingston, TeamGroup, Crucial and other RAM and component brands',
    [
      'who owns corsair', 'g.skill history', 'kingston hyperx history', 'teamgroup t-force', 'crucial micron brand', 'adata xpg', 'patriot memory', 'corsair history fremont', 'hyperx sold to hp', 'best brands for pc parts',
      'who makes kingston fury',
    ],
    `Corsair (founded 1994, Fremont, California) makes RAM, PSUs, cases, coolers, peripherals and Elgato (streaming) gear. G.Skill (Taiwan, 1989) is an enthusiast RAM maker (Trident Z5, Ripjaws, Flare X5 for AMD). Kingston (founded 1987 by John Tu and David Sun, Fountain Valley, California) is a major memory/SSD maker (Fury Beast/Renegade RAM, KC3000/NV3 SSDs); its HyperX gaming brand was sold to HP in 2021 (RAM is now Kingston Fury). TeamGroup (T-Force) and ADATA (XPG) are Taiwanese RAM/SSD brands; Patriot and Lexar are other value brands. Crucial was Micron's consumer brand (being wound down from early 2026). Module makers buy DRAM chips from Samsung, SK hynix or Micron, so the chip (A-die/M-die, etc.) matters more than the sticker.`
  ),
  k(
    'kb-pc-co-case-cooler-psu-brands',
    'Lian Li, NZXT, Fractal Design, Noctua, be quiet!, Seasonic, Thermalright, Arctic and other case, cooler and PSU brands',
    [
      'who makes noctua', 'where is fractal design from', 'lian li company', 'nzxt reputation', 'be quiet brand germany', 'seasonic oem', 'thermalright vs deepcool', 'arctic company', 'cooler master history', 'phanteks montech',
      'best pc case brands',
    ],
    `Case/cooler/PSU makers: Lian Li (Taiwan, 1983, aluminum cases like the O11 and Lancool lines, Uni Fan), NZXT (founded 2004, California, H-series cases, Kraken coolers, Player prebuilts), Fractal Design (Sweden, 2007, Define/North/Torrent cases, clean design), Phanteks and Montech (value airflow cases), Corsair and Cooler Master (a broad lineup, Cooler Master since 1992), Noctua (Austria, 2005, famously quiet premium fans and coolers with long warranties), be quiet! (Germany, 2002, quiet PSUs, coolers, cases), Arctic (founded 2001, Swiss roots, value fans and Liquid Freezer AIOs), Thermalright (Taiwan, value coolers like the Peerless Assassin), Deepcool (China, coolers and cases), Seasonic (Taiwan, 1975, makes many of the best PSUs and supplies other brands), Super Flower, FSP, Silverstone (small-form-factor cases and SFX PSUs), Hyte, SSUPD and Cooler Master (ITX).`
  ),
  k(
    'kb-pc-co-peripherals-brands',
    'Logitech, Razer, SteelSeries, Wooting, HyperX and other peripheral brands',
    [
      'who owns logitech', 'razer history', 'steelseries company', 'wooting keyboard company', 'logitech g pro', 'best gaming mouse brands', 'razer vs logitech', 'pulsar vaxee lamzu', 'sennheiser beyerdynamic audio', 'elgato company',
      'who makes the best gaming headset',
    ],
    `Logitech (founded 1981 in Switzerland, with a US base) makes the G line (G Pro X Superlight mice, G915 keyboards), webcams and the Brio. Razer (founded 1998, HQ Singapore/Irvine) makes mice, keyboards (Huntsman, BlackWidow), headsets and the Blade laptops. SteelSeries (Denmark, 2001) makes Arctis headsets, Apex keyboards and Aerox mice. Corsair (and its Elgato brand for capture/streaming) and HyperX (sold to HP in 2021) are big names; Wooting (Netherlands) pioneered Hall-effect rapid-trigger keyboards; Pulsar, Lamzu, VAXEE, Finalmouse and Zowie (BenQ) are popular among esports players. Audio: Sennheiser, Beyerdynamic, Audio-Technica, HiFiMan; mics: Shure, Rode, Samson, Blue (Logitech). Many peripherals share the same sensors (PixArt) and switches, so spec sheets are similar; shape, weight and comfort decide.`
  ),
  k(
    'kb-pc-co-oems-valve-microsoft',
    'Dell, HP, Lenovo, Acer, Valve, Microsoft and Apple in the PC world',
    [
      'dell vs hp vs lenovo', 'alienware vs omen vs legion', 'who makes steam deck', 'valve steam machine', 'microsoft windows xbox pc', 'apple silicon vs pc', 'acer predator', 'what is an oem pc', 'framework laptop company', 'minisforum beelink mini pc',
      'is a mac a pc',
    ],
    `OEMs (system builders): Dell (Alienware gaming), HP (Omen, Victus), Lenovo (Legion; also the world's biggest PC maker by volume), Acer (Predator, Nitro), ASUS (ROG, TUF), MSI, Gigabyte, Framework (modular, repairable laptops) and Minisforum/Beelink/GMKtec (mini PCs). OEM prebuilts often use proprietary motherboards and PSUs, which limits upgrades. Valve runs Steam and makes the Steam Deck (2022, an AMD-based handheld PC running SteamOS/Linux); it also announced the Steam Machine, Steam Frame headset and a new Steam Controller in November 2025 for 2026. Microsoft makes Windows (the main PC OS), Xbox, Surface and DirectX. Apple uses its own ARM-based M-series chips in Macs (strong efficiency and unified memory, limited game support and no upgrades); a Mac is technically a personal computer but not an x86 Windows "gaming PC". Android and ChromeOS are other platforms.`
  ),

  // ------------------------------------------------------------------ history
  k(
    'kb-pc-history-timeline',
    'PC history timeline: IBM PC, x86, GPUs, Ryzen, SSDs, DDR5 and the AI era',
    [
      'history of the pc', 'when was the first pc', 'history of graphics cards', 'moores law explained', 'timeline of cpu history', 'when did ssds become popular', 'when did ddr5 come out', 'first 1ghz cpu', 'history of the gpu',
      'when did rtx come out', 'when did apple silicon launch',
    ],
    `Timeline: 1965 Moore's law (transistor counts double about every two years); 1971 Intel 4004; 1978 Intel 8086 (x86); 1981 IBM PC 5150 (x86, MS-DOS) starts the PC era; 1985 Windows 1.0; 1993 Intel Pentium; 1995 Windows 95; 1996 3dfx Voodoo starts consumer 3D; 1999 Nvidia GeForce 256 ("first GPU"); 2000 AMD Athlon hits 1 GHz; 2003 AMD Athlon 64 (64-bit x86); 2005 first dual-core CPUs; 2006 Intel Core 2, AMD buys ATI, Nvidia CUDA; 2009 Windows 7; 2010s SSDs become mainstream, GTX 10 (2016); 2017 AMD Ryzen (Zen) brings back competition; 2018 Nvidia RTX (ray tracing, DLSS); 2020 Apple M1, RTX 30 and the GPU shortage (crypto mining + pandemic); 2021 Windows 11, DDR5 arrives with Intel 12th gen; 2022 AM5 and Ryzen 7000, RTX 40, Ethereum moves off mining; 2023 the AI boom lifts Nvidia; 2024 AMD Zen 5, Intel Core Ultra 200S, Windows 10 end-of-support announced; 2025 RTX 50, RX 9000, Intel Battlemage, the DRAM/NAND shortage begins; 2026 record RAM/SSD prices, AI data-center demand squeezes gamers.`
  ),
  k(
    'kb-pc-history-mining-crashes-shortages',
    'GPU shortages through history: crypto mining 2017, 2020-2022 and AI 2025-2026',
    [
      'gpu shortage 2020 crypto', 'ethereum mining gpu price', 'why were gpus so expensive in 2021', 'lhr gpus', 'scalpers bots gpu launch', 'ethereum merge gpu prices crash', 'ai demand vs crypto demand gpus', 'is the gpu shortage like 2021',
      'how long did the gpu shortage last',
    ],
    `Graphics-card shortages repeat: in 2017-2018 crypto mining (Ethereum, Bitcoin) emptied shelves; in 2020-2022 the pandemic, chip shortages and Ethereum mining pushed RTX 30 and RX 6000 cards to 2-3x MSRP, with scalper bots and Nvidia's LHR (Lite Hash Rate) cards; in September 2022 Ethereum moved to proof-of-stake ("the Merge"), mining stopped and prices crashed. In 2025-2026 a new squeeze came from AI: the same TSMC capacity and memory (GDDR7, HBM) used for data-center GPUs, plus rising DRAM prices, kept RTX 50 and, to a lesser extent, RX 9000 cards above MSRP, with the RTX 5090 especially scarce. Unlike mining, AI demand comes from large corporations with huge budgets, so analysts expect a longer tightness. Tips: avoid scalper prices, use stock alerts and price trackers, and consider last-generation or used cards if prices are inflated.`
  ),

  // ------------------------------------------------------------------ tiers and comparisons
  k(
    'kb-pc-tier-gpu-hierarchy',
    'GPU performance tiers (approximate, 2026): which cards compare to which',
    [
      'gpu hierarchy 2026', 'how does rx 9070 xt compare to rtx 5070 ti', 'rtx 5070 vs rtx 4070 super', 'what is equal to rtx 4090', 'rtx 5060 ti vs rx 9060 xt', 'is the rtx 3060 still good', 'gpu comparison chart', 'rtx 4060 vs arc b580', 'rtx 5080 vs rtx 4090',
      'which gpu is faster rtx 4080 or rx 7900 xtx',
    ],
    `Approximate raster performance tiers (relative, for 1440p; real results vary by game and settings): Top: RTX 5090 (clearly fastest), then RTX 4090 and RTX 5080 (roughly 4090-minus, close to a 4080 Super+). High: RTX 4080 Super, RX 7900 XTX, RTX 5070 Ti, RX 9070 XT (the 9070 XT is about RTX 5070 Ti / 4070 Ti Super level in raster, with weaker ray tracing). Upper mid: RTX 5070 and RX 9070 (about RTX 4070 Super / 4070 Ti class), RX 7900 GRE, RX 7800 XT. Mid: RTX 5060 Ti and RX 9060 XT (about RTX 4060 Ti 16GB to 4070 class), RTX 4060 Ti, RX 7700 XT. Entry: RTX 5060, RTX 4060, Intel Arc B580 (close to a 4060 with more VRAM), RX 7600, RTX 5050 and 3060-class cards. Older but usable: RTX 3070/3080 (1440p), RTX 2070 Super/GTX 1080 Ti (1080p). Use these as a rough guide, then check independent review benchmarks for your games; VRAM (8GB vs 12/16GB) can flip rankings in newer titles.`
  ),
  k(
    'kb-pc-tier-resolution-fps-targets',
    'What hardware for which resolution and fps target (1080p, 1440p, 4K)',
    [
      'what gpu for 1440p 144hz', 'can i play 4k with an rtx 5070', 'what cpu for 240hz gaming', 'hardware needed for 4k 120', 'is 1080p still good in 2026', 'fps target for single player vs competitive', '1440p vs 4k which should i choose', 'ultrawide gpu requirements', 'what pc for 144 fps in warzone',
      'minimum specs for modern games 2026',
    ],
    `Targets: 1080p 144-240 fps (esports, budget): GPU RTX 5060 / RX 9060 XT, CPU Ryzen 5 7600/9600X. 1440p 100-165 fps high settings (the sweet spot): RTX 5070 / RX 9070 / RX 9070 XT / RTX 5070 Ti, CPU Ryzen 7 7800X3D/9700X or an X3D. 4K 60-120 fps with upscaling: RTX 5080 or RTX 5090 (RX 9070 XT can do 4K 60 with FSR), CPU 9800X3D, 32GB RAM. Ultrawide 3440x1440 needs about 25% more GPU than 1440p. Competitive 240-360 fps: a strong CPU (X3D) and low settings matter more than the GPU. Single-player AAA at 60 fps: GPU first, CPU second. Ray tracing/path tracing: add one GPU tier up. Minimum for modern AAA in 2026: 6-8 core CPU, 16GB RAM (32GB comfortable), 8-12GB VRAM, an SSD. Always pair the monitor with the GPU: a 4K monitor with a 1080p-class GPU wastes the monitor.`
  ),
  k(
    'kb-pc-tier-cpu-hierarchy',
    'CPU performance tiers for gaming and productivity (2026, approximate)',
    [
      'cpu hierarchy 2026', 'best gaming cpu tier list', 'is 7800x3d faster than 9700x', '9800x3d vs 14900k', 'ryzen 5 9600x vs core ultra 5 245k', '7800x3d vs 9800x3d', 'is the 5800x3d still good', 'best cpu for productivity 2026', 'ryzen 9 9950x vs core ultra 9 285k',
      'gaming cpu ranking',
    ],
    `Gaming tiers (rough): S: Ryzen 7 9800X3D (and 9850X3D), then Ryzen 9 9950X3D / 7800X3D. A: Ryzen 7 7800X3D, Ryzen 9 7950X3D, Ryzen 7 9700X, Core Ultra 9 285K / Ultra 7 265K, Core i9-14900K. B: Ryzen 5 9600X / 7600X / 7600, Core i7-14700K, Core Ultra 5 245K, Ryzen 7 5800X3D. C: Ryzen 5 5600 / 5700X3D, Core i5-12600K / 13400F / 14600K. Entry: Ryzen 5 3600, i5-12400F (still fine at 1080p). The 9800X3D leads the 14900K by roughly 20-30% in CPU-limited gaming at much lower power. Productivity (rendering, compiling): Ryzen 9 9950X and Core Ultra 9 285K lead, Threadripper above them; Ryzen 9 9950X3D adds gaming. Efficiency: AMD Zen 5 and Intel Arrow Lake run cooler than 13th/14th gen. Pick by your workload; for pure gaming, buy X3D or spend the savings on a better GPU.`
  ),

  // ------------------------------------------------------------------ platforms comparison
  k(
    'kb-pc-vs-console-handheld',
    'PC vs console vs handheld PC: costs, performance and trade-offs',
    [
      'pc or console', 'is a gaming pc worth it vs ps5', 'steam deck vs rog ally', 'ps5 pro vs gaming pc', 'xbox series x vs pc', 'handheld gaming pc worth it', 'switch 2 vs steam deck', 'pc games cheaper than console', 'console vs pc 2026 prices', 'steam machine',
    ],
    `Console (PS5, PS5 Pro, Xbox Series X|S, Nintendo Switch 2): a fixed spec, simple, optimized, cheaper upfront, exclusives, couch play, but paid online (PlayStation Plus/Xbox Game Pass, Nintendo Switch Online) and fewer mods. PC: more flexible (mods, emulation, any store: Steam, Epic, GOG, Game Pass), higher ceiling (4K 120+ fps), cheaper long-term games (sales, free games), also a work/creative machine, but a bigger upfront cost, especially during the 2025-2026 RAM/GPU price surge. A PS5-class PC costs roughly $900-1,200 today. Handheld PCs (Steam Deck, ROG Ally X, Legion Go) are portable PCs with an AMD chip: great for indie and older titles at 800p-1080p, battery 1.5-3 hours in demanding games; the Steam Deck uses SteamOS (Linux) which is simple and great value. A living-room option: a small PC or a Steam Machine type device connected to the TV with a controller. Choose by where you play, your friends' platform and your budget.`
  ),
  k(
    'kb-pc-laptop-buying-guide',
    'Gaming laptop buying guide: GPU wattage, screens, cooling, naming and upgradeability',
    [
      'how to buy a gaming laptop', 'laptop rtx 5070 vs desktop', 'what is tgp laptop gpu', 'oled vs ips laptop gaming', 'mux switch laptop', 'laptop ram upgradeable', 'best gaming laptop brands', 'laptop thermal throttling', 'gaming laptop under 1500 specs', 'ryzen 9 hx laptop cpu',
      'laptop battery life gaming', 'is a laptop good for ai',
    ],
    `Laptop buying: the GPU's TGP (total graphics power, often 80-175W) matters more than the name: the same RTX 5070 Laptop can differ by 20-30% between a 60W thin-and-light and a 115W thick laptop. A MUX switch lets the GPU drive the screen directly (more fps). Look at: CPU (Ryzen HX / Core Ultra HX), RAM (16GB minimum, 32GB better; check if it is soldered LPDDR5X or upgradeable SO-DIMM), SSD slots, screen (1440p 165-240Hz IPS or OLED, 100% sRGB/DCI-P3), cooling (reviews of thermals/noise), battery (gaming on battery is slow; plug in), keyboard and ports, and weight. Brands: ASUS ROG Strix/Zephyrus, Lenovo Legion, MSI, Acer Predator/Nitro, Razer Blade, HP Omen/Victus, Framework (repairable). VRAM on laptops is smaller (8GB on a laptop 5070, 12GB on 5070 Ti, 16GB on 5080, 24GB on 5090). For AI work, prefer more VRAM or a Mac with lots of unified memory. Laptops cost more per fps than a desktop and are harder to upgrade.`
  ),

  // ------------------------------------------------------------------ special builds
  k(
    'kb-pc-build-sff-mini-itx',
    'Small form factor (SFF) and mini-ITX builds: what to know',
    [
      'how to build a mini itx pc', 'best itx case', 'sff pc compatibility gpu length', 'sfx psu for itx', 'itx cooling tips', 'mini itx motherboard ram slots', 'small gaming pc build', 'm1 itx vs nr200p', 'is a small pc worth it', 'low profile cooler for itx',
    ],
    `SFF (small form factor) builds fit a full gaming PC in a 10-20 liter case. Rules: use a mini-ITX board (2 RAM slots, 1 PCIe slot, fewer M.2 slots, more expensive), an SFX or SFX-L PSU (Corsair SF, Cooler Master V SFX, Silverstone, Seasonic), a GPU that fits (check length and thickness: 2-2.5 slots), and a cooler with limited height (a low-profile air cooler or a 120/240mm AIO that the case supports). Cooling is the challenge: pick mesh-sided cases with good intake (Fractal Terra/Ridge, Cooler Master NR200P, Lian Li A4-H2O, Sliger, Ghost S1), undervolt the CPU/GPU, and avoid hot 16-core CPUs. A 9800X3D plus RTX 5070/RX 9070 XT is a great SFF combo. Build order differs: plan cable routing, install the PSU and cooler first, and mount the GPU last. Expect to pay a premium for the board, case and PSU.`
  ),
  k(
    'kb-pc-build-white-aesthetic-rgb',
    'White PCs, aesthetics, RGB and cable management tips',
    [
      'white gaming pc build parts', 'best white case 2026', 'rgb vs argb software', 'openrgb signalrgb icue conflict', 'clean cable management tips', 'back connect motherboard', 'asus btf project zero', 'how to make a pc look good', 'tempered glass side panel', 'aio vs air for aesthetics',
    ],
    `Looks: pick a case first (Lian Li O11 Dynamic EVO white, Fractal North/Pop/Meshify, NZXT H6 Flow, Hyte Y60/Y70, Corsair 3500X). White parts: white boards (ASUS Prime/ROG Strix white, MSI MAG PRO white, Gigabyte Aorus Pro Ice), white GPUs (ASUS Prime/TUF white, MSI Ventus white, Gigabyte Aero), white RAM (G.Skill Trident Z5 Neo white), white fans (Lian Li Uni Fan, Arctic P12 white), white coolers (Thermalright Peerless Assassin white, NZXT Kraken White). RGB lighting is controlled by motherboard software (ASUS Aura, MSI Mystic Light, Gigabyte RGB Fusion), Corsair iCUE, or free OpenRGB/SignalRGB; avoid running several RGB programs at once (they conflict and eat CPU). Back-connect boards (ASUS BTF, MSI Project Zero, Gigabyte Stealth) hide cables behind the board. Cable management: velcro straps, PSU cable combs, sleeved extensions, keep a clean path for airflow. Do not sacrifice airflow for looks: a glass front case needs strong fans.`
  ),
  k(
    'kb-pc-build-streaming-creator-2pc',
    'Streaming and content creation PC builds, capture cards and 2-PC setups',
    [
      'pc build for streaming and gaming', 'how to stream on twitch with one pc', 'obs bitrate settings 1080p60', 'nvenc vs x264 quality', 'do i need a capture card', 'dual pc streaming setup', 'best webcam and mic setup', 'av1 streaming support', 'obs settings for low end pc',
      'best cpu for streaming', 'how to record gameplay without lag',
    ],
    `Single-PC streaming: Nvidia NVENC (RTX 40/50: AV1, HEVC, H.264), AMD VCN (RX 9000 good H.264/AV1) or Intel QuickSync/Arc AV1 encode video on the GPU with only 3-10% fps loss; x264 on the CPU needs a 12-16 core chip. OBS settings: 1080p60 at 6,000-8,000 kbps H.264 for Twitch (YouTube/Kick allow higher, AV1 where supported), keyframe interval 2s, "NVENC (new)" at P5/P6 quality, a separate drive or fast SSD for recordings, and record at a higher bitrate than you stream. Hardware: 32GB RAM, a 8-16 core CPU (Ryzen 7 9700X/9800X3D or 9950X), RTX 5070+ or RX 9070 XT, and a 2.5G Ethernet line with upload above 10 Mbps. A capture card (Elgato HD60 X/4K X, AVerMedia) brings console or a second PC into OBS; a 2-PC setup (gaming PC + streaming PC with a capture card) isolates stream performance but costs more and is rarely needed now. Add a good mic (Shure MV7, Samson Q2U) and soft lighting.`
  ),
  k(
    'kb-pc-build-am4-budget-dd4',
    'Budget AM4 and DDR4 builds in 2026: still worth it?',
    [
      'is am4 still worth it 2026', 'ryzen 5 5600 build', '5700x3d build', 'ddr4 build budget', 'best budget gaming pc am4', 'b550 motherboard best', 'upgrade am4 to 5800x3d', 'cheap build rx 7600 5600', 'used am4 parts', 'is ddr4 dead',
    ],
    `AM4 is still a strong budget platform in 2026: Ryzen 5 5600 (6 cores, great value), Ryzen 7 5700X3D / 5800X3D (X3D gaming chips that beat many newer CPUs in games), B550/X570 boards (PCIe 4.0), DDR4-3600 CL16 RAM. Pair with an RX 7600 XT / RX 9060 XT / RTX 5060 / Arc B580 for 1080p high. Drawbacks: no PCIe 5.0, a dead-end socket (no upgrades beyond 5000 series), DDR4 supply is shrinking and its price also rose in the 2025-2026 shortage, and new AAA games like CPUs with more recent architectures. Do the math: a 5700X3D + B550 + 32GB DDR4 is often $100-250 cheaper than an equivalent AM5 setup, but AM5 gives a long upgrade path (Zen 6 expected). If you already own AM4, upgrading only the CPU (5700X3D/5800X3D) and the GPU is the cheapest big win; if you are building from zero, choose AM5 unless the price gap is large.`
  ),

  // ------------------------------------------------------------------ BIOS settings & misc
  k(
    'kb-pc-bios-settings-glossary',
    'BIOS settings explained: EXPO, Resizable BAR, PBO, C-states, SVM/virtualization, fast boot, ErP, XMP profiles',
    [
      'what is svm mode', 'what is above 4g decoding', 'bios c-states disable', 'what is erp ready bios', 'enable virtualization intel vt-x', 'what does ai overclock tuner do', 'what is csm support bios', 'what is global c-state control', 'bios optimized defaults',
      'what is cpu core ratio', 'what is load line calibration',
    ],
    `Common BIOS settings: EXPO/XMP/DOCP (apply the RAM kit's rated speed/timings: turn on), Resizable BAR + Above 4G Decoding (lets the CPU access all GPU memory at once: turn on, needs UEFI mode), SVM Mode (AMD) / VT-x (Intel) (CPU virtualization for VMs and Android emulators), PBO/Curve Optimizer (AMD boost tuning), C-states (idle power saving; leave on unless troubleshooting), Fast Boot (skips some checks, quicker start), CSM (legacy boot support; disable for Windows 11 and Secure Boot), TPM/PTT/fTPM (needed for Windows 11), ErP Ready (deep power-off saving; disables wake from USB when on), Load-Line Calibration (offsets voltage drop under load; high settings run hotter, leave on Auto), Restore AC Power Loss (what the PC does after a power cut), fan control and temperature targets, and Boot priority. "Optimized defaults" resets everything to safe settings. Change one thing at a time and write it down; if the PC will not start, clear the CMOS.`
  ),
  k(
    'kb-pc-lifespans-upgrade-timeline',
    'How long PC parts last and when to upgrade each one',
    [
      'how long do gpus last', 'how long do graphics cards last', 'how long will my pc last',
      'how often should i upgrade my pc', 'how long does a gpu last', 'how long do cpus last', 'when to replace an old psu', 'how long do ssds last', 'how long should a pc last', 'upgrade timeline pc parts', 'should i upgrade or rebuild', 'when is my pc obsolete', 'future proof pc 2026',
    ],
    `Typical lifespans for a well-cared PC: CPU 8-10+ years of working life (you replace it for speed after 4-6 years), motherboard 6-10 years, RAM 8-10+ years (capacity needs rise), GPU 4-6 years in a relevant tier (you upgrade after 3-5), SSD 5-10 years (check health), HDD 3-6 years, PSU 7-12 years (match the warranty), case/fans/coolers 5-10 years (fans wear out in 3-6 years; AIO pumps 5-7 years), monitors 7-10 years. Upgrade order when the PC feels slow: GPU, RAM capacity, SSD, then CPU/motherboard together. "Future-proofing" is partly a myth: buy for what you need now and a sensible upgrade path (AM5 board, a good PSU with headroom, a case with room), not for 8 years of top settings. Rebuild instead of upgrading when the platform is dead (e.g. an AM4/LGA1200 board with a DDR4 only upgrade path) and the CPU is the bottleneck. In 2026's expensive market, extending the life of a working PC with a GPU or SSD upgrade is often smarter than a full rebuild.`
  ),
];
