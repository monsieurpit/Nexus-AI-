import { KnowledgeItem } from '../../types';

/**
 * PC_MODEL_CATALOG — Patrick (2026-10-01): "make that he knows every model of everything". A catalog of the actual
 * product models: CPUs, GPUs, motherboards, RAM kits, SSDs, PSUs, coolers, cases, monitors, peripherals.
 * Specs and launch prices (MSRP) are stable facts from the maker's launch; they are NOT today's street prices
 * (see kb-pc-gpu-market-2026 / kb-pc-ram-crisis-2026). Newer models may exist: when asked about a model not listed,
 * say so honestly instead of inventing specs.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_MODEL_CATALOG: KnowledgeItem[] = [
  // ------------------------------------------------------------------ CPUs
  k(
    'kb-pc-model-ryzen-9000',
    'AMD Ryzen 9000 series desktop CPUs (Zen 5, AM5): every model',
    [
      'ryzen 9 9950x3d specs', 'ryzen 9 9900x3d', 'ryzen 7 9800x3d specs', 'ryzen 7 9850x3d', 'ryzen 9 9950x', 'ryzen 9 9900x', 'ryzen 7 9700x', 'ryzen 5 9600x', 'ryzen 5 9600', 'ryzen 9000 lineup all models', 'ryzen 9000 specs cores boost cache',
      'ryzen 5 9500f', 'zen 5 desktop cpus list',
    ],
    `Ryzen 9000 (Zen 5, socket AM5, DDR5, 2024-2026). Launch MSRPs (USD): Ryzen 9 9950X3D: 16 cores/32 threads, up to 5.7 GHz boost, 128MB L3 (3D V-Cache on one CCD), 170W TDP, $699. Ryzen 9 9900X3D: 12c/24t, up to 5.5 GHz, 128MB L3, 120W, $599. Ryzen 7 9850X3D: 8c/16t, higher-clocked refresh of the 9800X3D (about 5.6 GHz boost, 96MB L3), launched early 2026, around $499 (reported). Ryzen 7 9800X3D: 8c/16t, up to 5.2 GHz, 96MB L3, 120W, $479 (the best gaming CPU for most people). Ryzen 9 9950X: 16c/32t, up to 5.7 GHz, 64MB L3, 170W, $649. Ryzen 9 9900X: 12c/24t, up to 5.6 GHz, 64MB L3, 120W, $499. Ryzen 7 9700X: 8c/16t, up to 5.5 GHz, 32MB L3, 65W (105W mode), $359 at launch. Ryzen 5 9600X: 6c/12t, up to 5.4 GHz, 32MB L3, 65W, $279 at launch. Ryzen 5 9600 (non-X) and Ryzen 5 9500F (6 cores, value chips). All have a small RDNA 2 iGPU (2 CUs) for display output, support PCIe 5.0 and DDR5-5600 officially (6000 EXPO is the sweet spot). Street prices differ from launch MSRP.`
  ),
  k(
    'kb-pc-model-ryzen-7000-8000g',
    'AMD Ryzen 7000 and 8000G series (Zen 4, AM5): every model',
    [
      'ryzen 7 7800x3d specs', 'ryzen 9 7950x3d', 'ryzen 9 7900x3d', 'ryzen 9 7950x', 'ryzen 9 7900x', 'ryzen 7 7700x', 'ryzen 7 7700', 'ryzen 5 7600x', 'ryzen 5 7600', 'ryzen 5 7500f', 'ryzen 7 8700g', 'ryzen 5 8600g', 'ryzen 5 8500g', 'ryzen 7000 lineup all models', 'zen 4 desktop cpus',
    ],
    `Ryzen 7000 (Zen 4, AM5, 2022-2023) with launch MSRPs: 7950X3D (16c/32t, up to 5.7 GHz, 128MB L3, $699), 7900X3D (12c/24t, up to 5.6 GHz, 128MB L3, $599), 7800X3D (8c/16t, up to 5.0 GHz, 96MB L3, 120W, $449: still near the top for gaming and very efficient), 7950X (16c, 5.7 GHz, $699 launch), 7900X (12c, 5.6 GHz, $549), 7700X (8c, 5.4 GHz, $399), 7700 (8c, 65W, $329), 7600X (6c, 5.3 GHz, $299), 7600 (6c, 65W, $229, a fantastic value gaming CPU), 7500F (6c, tray/China-first value chip). Ryzen 8000G APUs (AM5, strong integrated graphics): 8700G (8c/16t, Radeon 780M with 12 CUs, ~$329), 8600G (6c/12t, Radeon 760M, ~$229), 8500G (6c with Zen 4 + 4c cores, 740M), 8300G. They have no PCIe 5.0 for the GPU and a smaller cache but let you game on iGPU alone. Ryzen 7000 needs DDR5; EXPO 6000 CL30 is the sweet spot.`
  ),
  k(
    'kb-pc-model-ryzen-5000-4000',
    'AMD Ryzen 5000, 3000 and 4000 series (AM4): every model worth knowing',
    [
      'ryzen 7 5800x3d specs', 'ryzen 7 5700x3d', 'ryzen 5 5600 specs', 'ryzen 5 5600x', 'ryzen 9 5950x', 'ryzen 9 5900x', 'ryzen 7 5800x', 'ryzen 7 5700x', 'ryzen 5 5500', 'ryzen 5 3600', 'ryzen 7 3700x', 'ryzen 9 3900x', 'ryzen 5 4500', 'ryzen 5000 lineup', 'am4 cpu list',
    ],
    `AM4 (DDR4, 2016-2025). Ryzen 5000 (Zen 3, 2020-2024): 5950X (16c/32t, up to 4.9 GHz), 5900X (12c/24t, 4.8 GHz), 5800X3D (8c/16t, 96MB L3, 4.5 GHz, a 2022 gaming legend), 5700X3D (8c/16t, 96MB L3, 4.1 GHz, 2024: best AM4 gaming chip for the money), 5800X (8c, 4.7 GHz), 5700X (8c, 4.6 GHz, 65W), 5600X (6c/12t, 4.6 GHz), 5600 (6c/12t, up to 4.4 GHz, great budget CPU), 5600G/5700G (APUs with Vega graphics), 5500 (6c, smaller cache, budget). Ryzen 3000 (Zen 2, 2019): 3950X (16c), 3900X (12c), 3800X/3700X (8c), 3600/3600X (6c, still usable for 1080p with mid GPUs), 3400G. Ryzen 4000/4500 (Zen 2/3 mixes, budget: 4500 6c, 4600G). Boards: B450, B550 (PCIe 4.0, best value), X470, X570. Check the BIOS version before dropping in a newer CPU.`
  ),
  k(
    'kb-pc-model-intel-core-ultra-200s',
    'Intel Core Ultra 200S (Arrow Lake) desktop CPUs: every model',
    [
      'core ultra 9 285k specs', 'core ultra 7 265k specs', 'core ultra 5 245k specs', 'core ultra 5 225', 'core ultra 7 270k plus', 'core ultra 5 250k plus', 'arrow lake lineup all models', 'core ultra 200s list', 'core ultra 9 285', 'core ultra 7 265kf', 'lga1851 cpu list',
    ],
    `Core Ultra 200S "Arrow Lake" (LGA1851, DDR5-6400 official, Z890/B860/H810, Oct 2024): Core Ultra 9 285K: 24 cores (8 P + 16 E), no Hyper-Threading, up to 5.7 GHz, 36MB L3, 125W base/250W max turbo, $589. Core Ultra 7 265K/KF: 20 cores (8P+12E), up to 5.5 GHz, 30MB L3, 125W base, $394. Core Ultra 5 245K/KF: 14 cores (6P+8E), up to 5.2 GHz, 24MB L3, 125W, $309. Non-K models: 285, 265, 245 (65W), 235, 225 (6P+4E) for B860/H810 boards. The 2026 "Plus" refresh (reported March 2026): Core Ultra 7 270K Plus and Core Ultra 5 250K Plus with higher clocks and a faster die-to-die link on the same socket. All have an integrated Xe graphics tile and an NPU (AI engine). They are efficient and strong in productivity but trail the Ryzen X3D chips in gaming. Intel's next generation, Nova Lake (Core Ultra 400), uses a new socket (LGA1954) in early 2027.`
  ),
  k(
    'kb-pc-model-intel-14th-12th-gen',
    'Intel 12th, 13th and 14th gen Core CPUs (LGA1700): every model worth knowing',
    [
      'core i9 14900k specs', 'core i7 14700k specs', 'core i5 14600k specs', 'core i5 14400f', 'core i9 13900k', 'core i7 13700k', 'core i5 13600k', 'core i5 13400f', 'core i9 12900k', 'core i7 12700k', 'core i5 12600k', 'core i5 12400f', 'core i3 12100f', 'lga1700 cpu list',
    ],
    `LGA1700 (DDR4 or DDR5 depending on the board, 2021-2024). 14th gen Raptor Lake Refresh: Core i9-14900K (24 cores: 8P+16E, up to 6.0 GHz, 36MB, 125W/253W, $589), i7-14700K (20 cores: 8P+12E, up to 5.6 GHz, 33MB, $409), i5-14600K (14 cores: 6P+8E, up to 5.3 GHz, 24MB, $319), i5-14400F (10 cores: 6P+4E, up to 4.7 GHz, ~$196 value pick), i3-14100F (4 cores). 13th gen: i9-13900K (24c), i7-13700K (16c: 8P+8E), i5-13600K (14c), i5-13400F (10c: 6P+4E, great value). 12th gen Alder Lake: i9-12900K (16c: 8P+8E), i7-12700K (12c), i5-12600K (10c: 6P+4E), i5-12400F (6c, an old budget hero), i3-12100F (4c budget). K = unlocked, F = no iGPU. The 13900K/14900K and 13700K/14700K had a voltage/instability issue fixed by 2024 microcode (apply the BIOS update); these chips run hot and draw lots of power.`
  ),
  k(
    'kb-pc-model-threadripper-epyc-xeon',
    'Workstation and server CPU models: Threadripper 9000, Threadripper PRO, EPYC, Xeon',
    [
      'threadripper 9980x', 'threadripper 9970x', 'threadripper pro 9995wx', 'threadripper 7980x', 'threadripper 7960x', 'epyc 9005 turin', 'epyc 9965 192 cores', 'xeon w9 3495x', 'xeon 6 granite rapids', 'highest core count cpu', 'strix halo ryzen ai max plus 395', 'ryzen ai max 395 specs',
    ],
    `AMD Threadripper 9000 (Zen 5, socket sTR5, 2025): 9980X (64 cores), 9970X (32 cores) in the HEDT line, with quad-channel DDR5 and many PCIe 5.0 lanes; Threadripper PRO 9000 WX series (workstation, eight-channel memory, up to 96 cores in the 9995WX). Previous: Threadripper 7980X (64c), 7970X (32c), 7960X (24c) and PRO 7995WX (96c). EPYC 9005 "Turin" (Zen 5, server, up to 192 cores with EPYC 9965). Intel Xeon W (Xeon W9-3495X, 56 cores) for workstations and Xeon 6 (Granite Rapids) for servers. AMD Ryzen AI Max+ 395 "Strix Halo" (mobile/mini PC): 16 Zen 5 cores, a 40-CU Radeon 8060S iGPU and up to 128GB of unified LPDDR5X memory, a favorite for compact local-AI machines. These cost thousands and are slower than a Ryzen X3D for games; buy only for rendering, simulation, huge compile jobs or many VMs.`
  ),

  // ------------------------------------------------------------------ GPUs
  k(
    'kb-pc-model-rtx-50-specs',
    'Nvidia GeForce RTX 50 series (Blackwell): detailed specs for every model',
    [
      'rtx 5090 specs cuda cores', 'rtx 5080 specs', 'rtx 5070 ti specs', 'rtx 5070 specs', 'rtx 5060 ti specs', 'rtx 5060 specs', 'rtx 5050 specs', 'rtx 50 series power consumption tgp', 'rtx 5090 bus width', 'rtx 5070 vs 5070 ti', 'rtx 50 super specs rumored',
      'rtx 5090 d', 'rtx 5090 power connector',
    ],
    `GeForce RTX 50 (Blackwell, GDDR7 except the 5050): RTX 5090: 21,760 CUDA cores, 32GB GDDR7 on a 512-bit bus (1.79 TB/s), 575W TGP, 12V-2x6, $1,999. RTX 5080: 10,752 CUDA, 16GB GDDR7, 256-bit, 360W, $999. RTX 5070 Ti: 8,960 CUDA, 16GB GDDR7, 256-bit, 300W, $749. RTX 5070: 6,144 CUDA, 12GB GDDR7, 192-bit, 250W, $549. RTX 5060 Ti: 4,608 CUDA, 8GB or 16GB GDDR7, 128-bit, 180W, $379 / $429 (x8 PCIe). RTX 5060: 3,840 CUDA, 8GB GDDR7, 128-bit, 145W, $299. RTX 5050: 2,560 CUDA, 8GB GDDR6, 128-bit, 130W, $249. All have 5th-gen tensor cores and 4th-gen RT cores, DLSS 4 with Multi Frame Generation, PCIe 5.0 and AV1/HEVC encoders (9th-gen NVENC). The rumored RTX 50 Super refresh (with 3GB GDDR7 modules for 18-24GB variants like a 5080 Super 24GB and 5070 Super 18GB) was reported delayed or possibly cancelled. Street prices in late 2026 are far above these MSRPs (see the GPU market entry).`
  ),
  k(
    'kb-pc-model-rtx-40-30-specs',
    'Nvidia GeForce RTX 40 and RTX 30 series: every model with specs',
    [
      'rtx 4090 specs', 'rtx 4080 super specs', 'rtx 4070 ti super specs', 'rtx 4070 super specs', 'rtx 4070 specs', 'rtx 4060 ti 16gb', 'rtx 4060 specs', 'rtx 3090 specs', 'rtx 3080 specs', 'rtx 3070 specs', 'rtx 3060 ti', 'rtx 3060 12gb specs', 'rtx 3050 specs', 'rtx 40 series lineup', 'rtx 30 series lineup',
    ],
    `RTX 40 (Ada, 2022-2024, GDDR6X/GDDR6, DLSS 3): 4090 (16,384 CUDA, 24GB, 384-bit, 450W, $1,599), 4080 Super (10,240 CUDA, 16GB, $999), 4080 (9,728, 16GB, $1,199), 4070 Ti Super (8,448, 16GB, 256-bit, $799), 4070 Ti (7,680, 12GB, $799), 4070 Super (7,168, 12GB, $599), 4070 (5,888, 12GB, $599), 4060 Ti (4,352, 8GB or 16GB, 128-bit, $399/$499), 4060 (3,072, 8GB, 115W, $299). RTX 30 (Ampere, 2020-2022): 3090 Ti (10,752, 24GB), 3090 (10,496, 24GB, 350W, $1,499), 3080 Ti (12GB), 3080 (8,704, 10GB or 12GB, 320W, $699), 3070 Ti (8GB), 3070 (5,888, 8GB, $499), 3060 Ti (4,864, 8GB, $399), 3060 (3,584, 12GB, $329), 3050 (2,560, 8GB, $249). Used guide: 3060 12GB is a solid 1080p value, 3080/4070 class handles 1440p, the 3090 is a favorite for local AI (24GB) and the 4090 is still a top-tier card.`
  ),
  k(
    'kb-pc-model-radeon-rx-9000-7000-6000',
    'AMD Radeon RX 9000, 7000 and 6000 series: every model with specs',
    [
      'rx 9070 xt specs', 'rx 9070 specs', 'rx 9060 xt specs', 'rx 7900 xtx specs', 'rx 7900 xt specs', 'rx 7900 gre', 'rx 7800 xt specs', 'rx 7700 xt', 'rx 7600 xt', 'rx 7600', 'rx 6950 xt', 'rx 6800 xt specs', 'rx 6700 xt', 'rx 6600', 'radeon rx lineup all models',
    ],
    `RX 9000 (RDNA 4, 2025): RX 9070 XT (4,096 stream processors / 64 CUs, 16GB GDDR6, 256-bit, 304W, $599), RX 9070 (3,584 SP / 56 CUs, 16GB, 220W, $549), RX 9060 XT (2,048 SP / 32 CUs, 8GB or 16GB GDDR6, 128-bit, 160W, PCIe 5.0 x16, $299/$349). RX 7000 (RDNA 3, 2022-2024): 7900 XTX (6,144 SP, 24GB GDDR6, 384-bit, 355W, $999), 7900 XT (5,376 SP, 20GB, $899), 7900 GRE (5,120 SP, 16GB, $549), 7800 XT (3,840 SP, 16GB, 256-bit, 263W, $499), 7700 XT (3,456 SP, 12GB, $449), 7600 XT (2,048 SP, 16GB, $329), 7600 (2,048 SP, 8GB, $269). RX 6000 (RDNA 2, 2020-2022): 6950 XT, 6900 XT, 6800 XT (16GB), 6800 (16GB), 6750 XT, 6700 XT (12GB), 6700, 6650 XT, 6600 XT (8GB), 6600 (8GB), 6500 XT (4GB, avoid). FSR 4 is exclusive to RDNA 4 (RX 9000); older cards use FSR 3/3.1.`
  ),
  k(
    'kb-pc-model-intel-arc-all',
    'Intel Arc GPUs: every model (Alchemist and Battlemage)',
    [
      'arc b580 specs', 'arc b570 specs', 'arc a770 specs', 'arc a750 specs', 'arc a580', 'arc a380', 'arc a310', 'arc b770 rumor', 'intel arc lineup', 'arc pro b50', 'intel battlemage specs',
    ],
    `Intel Arc "Battlemage" (Xe2, 2024-2025): Arc B580 (20 Xe cores, 12GB GDDR6, 192-bit, 190W, $249), Arc B570 (18 Xe cores, 10GB, 160-bit, $219); a higher-end B770 was rumored but not confirmed. Arc Pro B50/B60 are workstation cards. "Alchemist" (Xe-HPG, 2022): A770 (32 Xe cores, 8GB or 16GB, $329/$349), A750 (28 Xe cores, 8GB, $289), A580 (24 Xe cores, 8GB, $179), A380 (8 Xe cores, 6GB, $139), A310 (4GB, tiny media card). Strengths: lots of VRAM for the price, good AV1 encode/decode, solid ray-tracing for the class. Weaknesses: needs Resizable BAR and a modern CPU, driver quality for older games, and efficiency at idle.`
  ),

  // ------------------------------------------------------------------ motherboards
  k(
    'kb-pc-model-am5-motherboards',
    'AM5 motherboard models by chipset: X870E, X870, B850, B840, A620, X670E, B650',
    [
      'best x870e motherboard', 'rog crosshair x870e hero', 'msi meg x870e godlike', 'gigabyte x870e aorus master', 'asrock x870e taichi', 'tuf gaming b850-plus wifi', 'msi mag b850 tomahawk max wifi', 'gigabyte b850 aorus elite', 'asrock b850 pro rs', 'best b850 motherboard', 'best b650 motherboard',
      'best am5 motherboard for 9800x3d', 'a620 motherboard list', 'asus rog strix b850-f', 'msi pro b840-p',
    ],
    `AM5 boards (examples by tier; models change, check current reviews). X870E (flagship: PCIe 5.0 for GPU and SSDs, USB4, Wi-Fi 7): ASUS ROG Crosshair X870E Hero / Dark Hero / Extreme, ROG Strix X870E-E Gaming WiFi, ProArt X870E-Creator WiFi; MSI MEG X870E Godlike / Ace, MPG X870E Carbon WiFi; Gigabyte X870E Aorus Master / Pro / Xtreme AI Top; ASRock X870E Taichi / Nova. X870 (similar, fewer extras): ASUS TUF Gaming X870-Plus WiFi, ROG Strix X870-A; MSI MAG X870 Tomahawk WiFi; Gigabyte X870 Aorus Elite WiFi7. B850 (the value sweet spot, PCIe 5.0 x16/M.2): ASUS TUF Gaming B850-Plus WiFi, ROG Strix B850-F Gaming WiFi, Prime B850-Plus; MSI MAG B850 Tomahawk Max WiFi, MPG B850 Edge TI WiFi; Gigabyte B850 Aorus Elite WiFi7, B850 Eagle WiFi6E; ASRock B850 Steel Legend WiFi, B850 Pro RS. B840 (entry): ASUS Prime B840-Plus, MSI PRO B840-P WiFi, Gigabyte B840 Gaming X. A620 (cheapest, no CPU overclock): ASRock A620M-HDV/M.2, MSI A620M-E, Gigabyte A620M Gaming X. Previous generation X670E/X670/B650E/B650 boards (ROG Crosshair X670E, MSI MPG B650 Carbon, Gigabyte B650 Aorus Elite, ASRock B650M Pro RS) are also excellent and often cheaper.`
  ),
  k(
    'kb-pc-model-intel-and-am4-motherboards',
    'Intel (Z890, B860, H810, Z790, B760) and AM4 (X570, B550, B450) motherboard models',
    [
      'best z890 motherboard', 'rog maximus z890 hero', 'msi meg z890 ace', 'gigabyte z890 aorus master', 'asrock z890 taichi', 'best b860 motherboard', 'best z790 motherboard', 'best b760 motherboard', 'best b550 motherboard', 'best x570 motherboard', 'asus tuf b550-plus', 'msi b550 tomahawk',
      'msi pro b760m', 'gigabyte b760m ds3h',
    ],
    `Intel LGA1851 (Core Ultra 200S): Z890 (overclocking): ASUS ROG Maximus Z890 Hero / Apex / Extreme, ROG Strix Z890-E / Z890-A / Z890-F, TUF Gaming Z890-Plus; MSI MEG Z890 Ace / Godlike, MPG Z890 Carbon WiFi, MAG Z890 Tomahawk WiFi; Gigabyte Z890 Aorus Master / Elite WiFi7 / Eagle; ASRock Z890 Taichi / Riptide / Steel Legend. B860 (value): ASUS TUF/Prime B860, MSI MAG B860 Tomahawk / PRO B860, Gigabyte B860 Aorus Elite, ASRock B860 Pro RS. H810 (entry). LGA1700 (12th-14th gen): Z790 (ROG Maximus Z790 Hero, MSI MEG Z790 Ace, Gigabyte Z790 Aorus Master, ASRock Z790 Taichi), B760 (MSI MAG B760 Tomahawk WiFi DDR4/DDR5, PRO B760M-A, ASUS TUF B760-Plus, Gigabyte B760M DS3H/Aorus Elite), H610. AM4: X570 (ASUS ROG Crosshair VIII Hero, MSI MEG X570 Ace, Gigabyte X570 Aorus Master), B550 (best value: ASUS TUF Gaming B550-Plus WiFi II, MSI MAG B550 Tomahawk, Gigabyte B550 Aorus Elite V2, ASRock B550 Steel Legend), B450 (older, needs a BIOS update for Ryzen 5000, e.g. MSI B450 Tomahawk Max II).`
  ),

  // ------------------------------------------------------------------ RAM / SSD
  k(
    'kb-pc-model-ram-kits',
    'RAM kit models: G.Skill, Corsair, Kingston, TeamGroup, Crucial, Patriot and the specs to buy',
    [
      'g.skill trident z5 neo rgb ddr5-6000 cl30', 'g.skill trident z5 royal', 'g.skill flare x5', 'corsair vengeance rgb ddr5 6000', 'corsair dominator titanium ddr5', 'kingston fury beast ddr5 6000', 'kingston fury renegade', 'teamgroup t-force delta rgb ddr5', 'crucial pro ddr5', 'patriot viper venom ddr5',
      'best ddr5 ram kit', 'ddr5 6400 cl32 kit', 'ddr5 8000 cudimm kit', 'best ram for 9800x3d', 'best ddr4 ram kit 3600 cl16',
    ],
    `Popular DDR5 kits (EXPO for AMD, XMP for Intel): G.Skill Trident Z5 Neo RGB (AMD EXPO) DDR5-6000 CL30, 2x16GB or 2x32GB, the classic AM5 pick; G.Skill Trident Z5 RGB / Royal (premium) DDR5-6400 CL32 and up to 8000+; G.Skill Flare X5 (low-profile, AMD, cheaper) DDR5-6000 CL30; Corsair Vengeance RGB / Vengeance DDR5-6000 CL30-36 (2x16, 2x32, 2x48 = 96GB), Corsair Dominator Titanium (premium, up to 7200-8000+ MT/s, 2x24/2x32/2x48/2x64); Kingston Fury Beast DDR5-5600/6000 CL30-36 and Fury Renegade (faster, up to 8000); TeamGroup T-Force Delta RGB / Vulcan DDR5-6000 CL30-36; Crucial Pro DDR5-6000 CL36 and Crucial DDR5-5600 (Crucial consumer line being wound down from early 2026); Patriot Viper Venom/Elite 5; ADATA XPG Lancer. Newest high-capacity kits: 2x48GB = 96GB and 2x64GB = 128GB; 4x sticks to reach 192-256GB (slower speeds). DDR4 kits: G.Skill Ripjaws V / Trident Z DDR4-3600 CL16, Corsair Vengeance LPX DDR4-3200/3600 CL16-18, Crucial Ballistix (discontinued). Buy 2 sticks, CL30-CL36 at 6000 for AM5; check the board QVL. Prices in the 2025-2026 shortage are far above launch prices.`
  ),
  k(
    'kb-pc-model-ssd-models',
    'SSD models: PCIe 5.0, PCIe 4.0, SATA and budget drives (every good model)',
    [
      'samsung 9100 pro', 'samsung 990 pro', 'samsung 990 evo plus', 'wd_black sn850x', 'wd_black sn8100', 'crucial t705', 'crucial t500', 'kingston kc3000', 'kingston fury renegade ssd', 'sk hynix platinum p41', 'sk hynix platinum p51', 'lexar nm790', 'corsair mp700 pro', 'sabrent rocket 5', 'best nvme ssd 2026',
      'samsung 870 evo', 'crucial mx500', 'wd blue sn5000', 'kingston nv3', 'teamgroup mp44',
    ],
    `PCIe 5.0 NVMe (up to 10-14.7 GB/s; need good cooling): Samsung 9100 Pro (up to 14,700 MB/s, 1-8TB), Crucial T705 (up to 14,500 MB/s), WD_BLACK SN8100 (up to ~14,900 MB/s), Corsair MP700 Pro / MP700 Elite, SK hynix Platinum P51, Sabrent Rocket 5, Kingston Fury Renegade G5, Gigabyte Aorus Gen5 12000. PCIe 4.0 NVMe (the value sweet spot, ~7,000 MB/s): Samsung 990 Pro (TLC, DRAM, the benchmark), Samsung 990 Evo Plus, WD_BLACK SN850X (excellent), WD Blue SN5000, Crucial T500, Kingston KC3000, SK hynix Platinum P41, Lexar NM790 (value), Corsair MP600 Pro, TeamGroup MP44. Budget: Kingston NV3, Crucial P3/P310, Lexar NM620, TeamGroup MP33 (often QLC/DRAM-less, fine for a second drive). SATA SSD: Samsung 870 EVO, Crucial MX500, WD Blue 3D / SanDisk Ultra 3D. Capacities 500GB-8TB. For a gaming PC, choose a 2TB Gen4 TLC drive with a DRAM cache.`
  ),

  // ------------------------------------------------------------------ PSU / cooling / case
  k(
    'kb-pc-model-psu-models',
    'Power supply models by wattage and tier: Corsair, Seasonic, MSI, ASUS, be quiet!, Super Flower, Thermaltake',
    [
      'corsair rm850e', 'corsair rm1000x shift', 'corsair hx1200i', 'corsair hx1500i', 'corsair ax1600i', 'seasonic focus gx-850', 'seasonic vertex gx-1000', 'seasonic prime tx-1600', 'msi mag a850gl pcie5', 'msi meg ai1300p', 'asus rog thor 1200w', 'asus rog strix 1000w', 'be quiet straight power 12', 'super flower leadex vii xg', 'thermaltake toughpower gf3',
      'best 1000w psu', 'best 850w psu', 'best 750w psu', 'best 1600w psu',
    ],
    `Good ATX 3.1 PSUs by wattage (examples, check current reviews and warranty): 650-750W: Corsair RM750e, MSI MAG A750GL PCIE5, Cooler Master MWE Gold 750 V3, be quiet! Pure Power 12 M 750W, Thermaltake Toughpower GF A3 750W. 850W: Corsair RM850e (ATX 3.1) and RMx, Seasonic Focus GX-850 / Focus V4 GX-850, MSI MAG A850GL PCIE5, ASUS TUF Gaming 850W Gold, be quiet! Straight Power 12 850W, Super Flower Leadex VII XG 850W. 1000W: Corsair RM1000x Shift, RM1000e, HX1000i; Seasonic Vertex GX-1000 / Focus GX-1000; MSI MPG A1000G PCIE5; ASUS ROG Strix 1000W Gold Aura; Thermaltake Toughpower GF3 1000W. 1200-1300W: Corsair HX1200i / RM1200x Shift, ASUS ROG Thor 1200W Platinum II, MSI MEG Ai1300P PCIE5, Seasonic Prime TX-1300. 1500-1600W (extreme builds): Corsair HX1500i, Corsair AX1600i (Titanium), Seasonic Prime TX-1600, Super Flower Leadex Titanium 1600W. SFX for small cases: Corsair SF750/SF1000 (Platinum), Cooler Master V SFX Gold 850, Silverstone SX1000 (Platinum), Seasonic Focus SGX-750. Always pick one with a native 12V-2x6 cable for RTX 50 cards.`
  ),
  k(
    'kb-pc-model-cooler-models',
    'CPU cooler models: air coolers, AIOs (240/280/360/420mm) and custom loop brands',
    [
      'noctua nh-d15 g2', 'noctua nh-u12a', 'thermalright phantom spirit 120 se', 'thermalright peerless assassin 120 se', 'thermalright assassin x 120', 'deepcool ak620', 'deepcool ak400', 'be quiet dark rock pro 5', 'arctic liquid freezer iii 360', 'arctic freezer 36', 'corsair icue link titan 360 rx', 'nzxt kraken elite 360', 'lian li galahad ii trinity',
      'deepcool lt720', 'asus rog ryuo iv', 'ek-quantum', 'best air cooler 2026', 'best aio 2026', 'best 420mm aio',
    ],
    `Air coolers: Noctua NH-D15 G2 (and chromax/LBC) and NH-U12A (quiet premium), Thermalright Phantom Spirit 120 SE (best value flagship), Thermalright Peerless Assassin 120 SE/Assassin X 120 R SE (budget kings), Deepcool AK620 / AK400 / Assassin IV, be quiet! Dark Rock Pro 5 / Dark Rock 5 / Pure Rock 3, Arctic Freezer 36 / 34 eSports Duo, Cooler Master Hyper 212 Halo, Scythe Fuma 3. AIO (240/280/360/420mm): Arctic Liquid Freezer III / III Pro (best value), Corsair iCUE Link Titan RX / H150i Elite / Nautilus, NZXT Kraken Elite 360 / Kraken 360, Lian Li Hydroshift II / Galahad II Trinity, Deepcool LT720 / LS720 / Mystique 360, Thermalright Frozen Warframe / Frozen Prism, ASUS ROG Ryuo IV / Ryujin III 360 ARGB, MSI MAG Coreliquid, be quiet! Silent Loop 3 / Light Loop. Custom loops: EKWB (EK-Quantum), Alphacool, Heatkiller, Corsair Hydro X, Barrow, Bitspower, EK-Loop. For a 9800X3D an air cooler like the Phantom Spirit or NH-D15 G2 is enough; for hot 16-core and Intel K chips use a 360mm AIO.`
  ),
  k(
    'kb-pc-model-case-models',
    'PC case models by type: airflow mid towers, full towers, showpiece, small form factor',
    [
      'lian li o11 dynamic evo', 'lian li o11 vision', 'lian li lancool 216', 'lian li lancool 217', 'fractal north', 'fractal torrent', 'fractal pop air', 'fractal meshify 2', 'fractal define 7 xl', 'corsair 4000d airflow', 'corsair 5000d airflow', 'corsair 7000d airflow', 'corsair 9000d rgb', 'nzxt h5 flow', 'nzxt h7 flow', 'hyte y70 touch', 'hyte y60',
      'phanteks nv7', 'phanteks xt pro', 'montech air 903 max', 'montech xr', 'antec flux pro', 'thermaltake core p3', 'cooler master haf 700 evo', 'lian li v3000 plus', 'best pc case 2026',
    ],
    `Mid-tower airflow cases: Lian Li Lancool 216 / Lancool 217, Corsair 4000D / 5000D Airflow, NZXT H5 Flow / H7 Flow, Fractal Design North / Pop Air / Meshify 2 / Torrent (max airflow, huge front fans), Montech Air 903 Max / XR (value), Phanteks XT Pro / P400A, Antec Flux Pro / P20C, be quiet! Pure Base 500DX / Silent Base 802 (quiet). Showpiece/aquarium: Lian Li O11 Dynamic EVO / O11 Vision / O11 Dynamic XL, Hyte Y60 / Y70 Touch (with a built-in touchscreen), Phanteks NV7 / NV5, Corsair 3500X / 6500X, NZXT H6 Flow. Full towers/E-ATX/huge: Corsair 7000D Airflow / 9000D RGB, Lian Li V3000 Plus, Fractal Define 7 XL / Torrent XL, Cooler Master HAF 700 EVO / Cosmos, Thermaltake Core P3 / View 71 / Tower 900, Phanteks Enthoo Pro 2 / Enthoo 719. Small form factor: Lian Li A3-mATX / A4-H2O, Fractal Terra / Ridge / Era 2, Cooler Master NR200P V2 / Qube 500, SSUPD Meshroom D / Meshlicious, Sliger SM580 / Cerberus, Ghost S1, Jonsbo D31 / Z20. Match the case to GPU length and cooler height.`
  ),

  // ------------------------------------------------------------------ monitors / peripherals
  k(
    'kb-pc-model-monitor-models',
    'Gaming monitor models: OLED, QD-OLED, mini-LED and IPS picks by resolution and refresh rate',
    [
      'asus rog swift pg27aqdm', 'asus rog swift pg32ucdm', 'alienware aw3425dw', 'alienware aw3225qf', 'alienware aw2725df', 'lg ultragear 27gr95qe', 'lg ultragear 45gx950a', 'lg 32gs95ue', 'samsung odyssey oled g8', 'samsung odyssey oled g9 g95sc', 'samsung odyssey neo g9', 'msi mpg 321urx', 'msi mag 274qrf',
      'gigabyte m27q', 'best 1440p monitor 2026', 'best 4k monitor 2026', 'best ultrawide monitor', 'best budget gaming monitor', 'best oled monitor',
    ],
    `Models (they are replaced yearly, check current reviews on RTINGS and Monitors Unboxed). 1080p esports (240-360Hz): ASUS ROG Swift Pro PG248QP (540Hz), Alienware AW2523HF, BenQ Zowie XL2566K / XL2546X, Samsung Odyssey G4. 1440p IPS value (165-240Hz): Gigabyte M27Q X, MSI MAG 274QRF-QD E2, LG UltraGear 27GP850, Dell G2724D, AOC Q27G3XMN (mini-LED), ASUS TUF VG27AQ. 1440p OLED (240-360Hz): ASUS ROG Swift OLED PG27AQDM (WOLED), Alienware AW2725DF (QD-OLED 360Hz), LG UltraGear 27GR95QE-B, Samsung Odyssey OLED G6, MSI MPG 271QRX QD-OLED. 4K OLED: ASUS ROG Swift PG32UCDM (QD-OLED 4K 240Hz), Samsung Odyssey OLED G8 (G80SD), Alienware AW3225QF (curved 32"), MSI MPG 321URX QD-OLED, LG UltraGear 32GS95UE (dual-mode 4K 240Hz / 1080p 480Hz), Gigabyte Aorus FO32U2P. Ultrawide: Alienware AW3425DW (34" QD-OLED 3440x1440 240Hz), LG UltraGear 34GS95QE, Samsung Odyssey OLED G9 (49" 5120x1440 240Hz), LG 45GX950A (5K2K bendable), Samsung Odyssey Neo G9 (mini-LED). HDR mini-LED: Samsung Odyssey Neo G7/G8, Cooler Master GP27Q. Professional color: BenQ SW, ASUS ProArt PA, Eizo.`
  ),
  k(
    'kb-pc-model-peripheral-models',
    'Peripheral models: keyboards, mice, headsets, microphones, webcams, controllers',
    [
      'wooting 60he', 'wooting 80he', 'steelseries apex pro tkl gen 3', 'razer huntsman v3 pro', 'keychron q1 pro', 'nuphy air75', 'logitech g pro x superlight 2', 'razer viper v3 pro', 'pulsar x2 v2', 'vaxee xe', 'lamzu maya', 'finalmouse ulx', 'logitech g502 x', 'steelseries arctis nova pro', 'sennheiser hd 560s', 'beyerdynamic dt 990 pro',
      'shure sm7b', 'shure mv7', 'samson q2u', 'elgato facecam mk 2', 'logitech brio 4k', 'xbox elite series 2', 'dualsense edge', 'gamesir g7 pro', 'best gaming mouse 2026', 'best gaming keyboard 2026', 'best gaming headset 2026',
    ],
    `Keyboards: Wooting 60HE / 80HE / UwU (Hall effect, rapid trigger, esports favorite), SteelSeries Apex Pro TKL Gen 3 (OmniPoint 3.0), Razer Huntsman V3 Pro TKL/Mini (analog optical), Logitech G Pro X TKL, Keychron Q1 Pro / V1 / Q3 (hot-swap, QMK), NuPhy Air75 / Halo75, Lemokey P1/X1, Akko 5075B, Ducky One 3, Corsair K70 Pro / K65 Plus. Mice (lightweight wireless): Logitech G Pro X Superlight 2 / 2 DEX, Razer Viper V3 Pro / Viper V3 HyperSpeed, Pulsar X2 V2 / X2H, VAXEE XE / ZYGEN NP-01S, Lamzu Maya / Atlantis, Finalmouse UltralightX, Endgame Gear OP1w 4k, Zowie EC2-CW / ZA13-C, Glorious Model O 2 / Series 2; allround: Logitech G502 X Plus, MX Master 3S (work), Razer DeathAdder V3 Pro. Headsets: SteelSeries Arctis Nova Pro Wireless / Nova 7, HyperX Cloud III / Alpha, Razer BlackShark V2 Pro, Logitech G Pro X 2 Lightspeed, Corsair Virtuoso; audiophile headphones: Sennheiser HD 560S / HD 600 / HD 650 / HD 800 S, Beyerdynamic DT 770 Pro / DT 990 Pro, Audio-Technica ATH-M50x, HiFiMan Sundara, Audeze LCD. Microphones: Shure SM7B / MV7+ / MV6, Samson Q2U, Rode PodMic / NT-USB Mini / Procaster, HyperX QuadCast S, Blue Yeti, Elgato Wave:3. Webcams: Logitech Brio 4K / C920, Elgato Facecam MK.2 / Neo, Razer Kiyo Pro. Controllers: Xbox Elite Series 2, Xbox Wireless, DualSense / DualSense Edge, GameSir G7 Pro / Cyclone 2 (Hall effect), 8BitDo Ultimate, Nacon, Scuf. Audio interfaces: Focusrite Scarlett Solo/2i2, GoXLR, Rodecaster.`
  ),

  // ------------------------------------------------------------------ networking, extras
  k(
    'kb-pc-model-networking-extras',
    'Networking and extras models: routers, Wi-Fi cards, capture cards, UPS, docks',
    [
      'asus rog rapture routers', 'tp-link archer be800', 'ubiquiti unifi dream router', 'eero pro 7', 'tp-link deco be85', 'intel be200 wifi 7 card', 'intel ax210', 'elgato 4k x', 'elgato hd60 x', 'avermedia live gamer', 'apc back-ups pro ups', 'cyberpower ups', 'thunderbolt 4 dock', 'usb hub for pc', 'best router for gaming 2026',
    ],
    `Networking: Wi-Fi 7 routers/mesh: ASUS RT-BE96U / ROG Rapture GT-BE98, TP-Link Archer BE800 / BE550, Deco BE85, Netgear Nighthawk RS700S, Eero Max 7 / Pro 7, Ubiquiti UniFi Dream Router 7 / Cloud Gateway, Google Nest Wifi Pro. Wi-Fi cards: Intel BE200 (Wi-Fi 7), Intel AX210 / AX211 (Wi-Fi 6E), Realtek and MediaTek in boards. Ethernet: 2.5GbE is standard, 10GbE cards (Intel X550, ASUS XG-C100C). Capture/streaming gear: Elgato 4K X / HD60 X / 4K S / Stream Deck MK.2, AVerMedia Live Gamer Ultra 2 / Ultra 4K, Razer Ripsaw. UPS (battery backup): APC Back-UPS Pro BR1500MS2 / BX1500M, CyberPower CP1500PFCLCD, EATON 5S. Docks/hubs: CalDigit TS4, Anker 575. Fans: Arctic P12 / P14 Max, Noctua NF-A12x25 / NF-A14 industrialPPC, Lian Li Uni Fan SL-Infinity / TL, Corsair iCUE Link QX / RX, Phanteks T30, Thermalright TL-C12C. Thermal paste: Arctic MX-6, Noctua NT-H2, Thermal Grizzly Kryonaut / Duronaut. Cases of tools: iFixit Pro Tech Toolkit, magnetic screwdrivers.`
  ),
];
