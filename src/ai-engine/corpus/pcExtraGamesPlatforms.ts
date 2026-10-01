import { KnowledgeItem } from '../../types';

/**
 * PC_EXTRA_GAMES_PLATFORMS — another expansion of the 'pc-building' category (Patrick, 2026-10-01: "make sure his PC
 * knowledge is maxed out, add literally everything missing"): game system requirements, consoles/handhelds/laptops/
 * Macs/ARM, operating systems, GPU/CPU software features, game streaming. Requirements are the publishers' official
 * minimum/recommended lists (they change with patches); where a value is approximate it is marked "about".
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_EXTRA_GAMES_PLATFORMS: KnowledgeItem[] = [
  // ------------------------------------------------------------------ game requirements
  k(
    'kb-pc-req-battlefield-6',
    'Battlefield 6 PC system requirements (and Secure Boot/TPM)',
    [
      'battlefield 6 system requirements', 'can my pc run battlefield 6', 'bf6 pc specs', 'battlefield 6 secure boot tpm', 'battlefield 6 minimum specs', 'battlefield 6 recommended gpu', 'battlefield 6 ultra settings 4k', 'battlefield 6 anticheat requirements', 'bf6 fps 144 pc',
    ],
    `Battlefield 6 (EA/DICE, released October 2025). Official requirements: Minimum (1080p ~30 fps low): Intel Core i5-8400 or AMD Ryzen 5 2600, GPU NVIDIA RTX 2060 / AMD RX 5600 XT / Intel Arc A380, 16GB RAM, about 55GB SSD. Recommended (1440p 60 fps high): Core i7-10700 or Ryzen 7 3700X, RTX 3060 Ti / RX 6700 XT / Arc B580, 16GB RAM, ~90GB SSD. Ultra (4K 60 fps ultra): Core i9-12900K or Ryzen 7 7800X3D, RTX 4080 / RX 7900 XTX, 32GB RAM. It requires Secure Boot and TPM 2.0 enabled (EA Javelin anti-cheat), which means UEFI mode, GPT drive and CSM disabled. For 144+ fps in multiplayer, an X3D CPU (7800X3D/9800X3D) and a mid/high GPU (RTX 5070 / RX 9070) at 1440p are the target; use an SSD.`
  ),
  k(
    'kb-pc-req-popular-games-1',
    'System requirements: Fortnite, Minecraft, Roblox, Valorant, CS2, League of Legends, Apex, Warzone, Overwatch',
    [
      'fortnite system requirements', 'minecraft system requirements', 'roblox system requirements', 'valorant system requirements', 'cs2 system requirements', 'league of legends requirements', 'apex legends requirements', 'warzone system requirements', 'overwatch 2 requirements',
      'can my pc run fortnite', 'what pc do i need for roblox', 'cs2 minimum specs', 'marvel rivals requirements',
    ],
    `Approximate official/practical specs: Roblox: any modern PC works (a 2GHz+ CPU, 4GB RAM, any DX10+ GPU) and runs well on integrated graphics. Minecraft Java: 4GB RAM minimum, 8GB recommended, any GPU with OpenGL 4.5 (shaders need a mid GPU like an RTX 3060/RX 6600; modded packs want 16GB+). Valorant: very light (Intel Core 2 Duo E8400/AMD A6 and GT 730 minimum; Core i3-4150/Ryzen 3 1200 and a GTX 1050 Ti recommended for 144 fps); needs TPM 2.0 + Secure Boot on Windows 11 for Vanguard. CS2: 4 CPU threads and 8GB RAM minimum, but a fast CPU matters most: Ryzen 5/i5 recent for 144-240 fps, 9800X3D for 400+; any GTX 1650 / RX 6500 class GPU at 1080p. League of Legends: low (Core i3 or equivalent, 4GB RAM, any recent GPU). Fortnite: Minimum Core i3-3225 / 8GB / Intel HD 4000; recommended Core i5-7300U 3.5GHz / 16GB / GTX 960 or RX 480-class for high at 1080p; Performance Mode runs on low-end PCs; Epic/ray-traced settings want an RTX 3070-5070 and a modern 6-8 core CPU. Apex Legends: Ryzen 5 / i5 recent and an RTX 3060-class GPU for 144 fps at 1080p; 8GB RAM minimum, 16GB recommended. Call of Duty Warzone: Core i7-6700K/Ryzen 5 1600X and GTX 1060 minimum, i7-9700K/Ryzen 7 2700X and RTX 2060 / RX 6600 recommended, 16GB RAM, 125GB+ SSD. Overwatch 2: light (Core i3 / 6GB RAM / GTX 600 series minimum; Core i7 / 8GB / GTX 1060 for high refresh). Marvel Rivals: min i5-6600K/Ryzen 5 1600X, GTX 1060/RX 580, 16GB; recommended i5-10400/Ryzen 5 5600X, RTX 2060 Super/RX 5700 XT, 16GB.`
  ),
  k(
    'kb-pc-req-popular-games-2',
    'System requirements: Cyberpunk 2077, Elden Ring, Baldur\'s Gate 3, Starfield, Hogwarts Legacy, Monster Hunter Wilds, Black Myth: Wukong, GTA V and GTA VI',
    [
      'can i run cyberpunk on rtx 3060', 'can i run cyberpunk 2077', 'can i run elden ring', 'can i run baldurs gate 3', 'can i run starfield', 'can i run gta 5',
      'cyberpunk 2077 system requirements', 'elden ring pc requirements', 'baldurs gate 3 requirements', 'starfield system requirements', 'hogwarts legacy requirements', 'monster hunter wilds requirements', 'black myth wukong requirements', 'gta 5 requirements', 'gta 6 pc release', 'gta vi pc requirements',
      'can my pc run cyberpunk', 'what gpu for cyberpunk path tracing',
    ],
    `Official/typical requirements: Cyberpunk 2077 (patch 2.x, Phantom Liberty): minimum Core i7-6700/Ryzen 5 1600, GTX 1060 6GB/RX 580, 12GB RAM, SSD; recommended Core i7-12700/Ryzen 7 7800X3D, RTX 2060 Super/RX 5700 XT, 16GB; path tracing "Overdrive" needs an RTX 4070/5070 or better with DLSS frame generation (RTX 5080/5090 for 4K). Elden Ring: minimum GTX 1060 3GB/RX 580, i5-8400/Ryzen 3 3300X, 12GB; recommended GTX 1070/RX Vega 56, 16GB (locks at 60 fps). Baldur's Gate 3: minimum GTX 970/RX 480 4GB, i5-4690/FX 4350, 8GB; recommended RTX 2060 Super/RX 5700 XT, i5-8600K/Ryzen 5 3600, 16GB. Starfield: minimum GTX 1070 Ti/RX 5700, Ryzen 5 2600X/i7-6800K, 16GB, SSD; recommended RTX 2080/RX 6800 XT, Ryzen 5 3600X/i5-10600K. Hogwarts Legacy: min GTX 960 4GB/RX 470, 16GB; rec GTX 1080 Ti/RX 5700 XT, 16GB. Monster Hunter Wilds: minimum GTX 1660 Super/RX 5600 XT, Core i5-10600/Ryzen 5 3600, 16GB, 140GB SSD (1080p ~30 fps with upscaling); recommended RTX 2070 Super / RTX 4060 / RX 6700 XT, i5-11600K/Ryzen 5 5500 (1080p 60 fps with frame generation); it is very demanding at native settings. Black Myth: Wukong: minimum GTX 1060 6GB/RX 580 8GB, i5-8400/Ryzen 5 1600, 16GB; recommended RTX 2060/RX 5700 XT, i7-9700/Ryzen 5 5500; path tracing needs RTX 4070+ . GTA V: minimum Core 2 Quad Q6600/Phenom 9850, GTX 660 2GB, 4GB RAM; GTA VI: reported for console release in late 2026 (Nov 19, 2026) with no announced PC version yet.`
  ),
  k(
    'kb-pc-req-how-to-read-requirements',
    'How to read game system requirements and check if your PC can run a game',
    [
      'how to check if my pc can run a game', 'can you run it', 'what does recommended specs mean', 'minimum vs recommended requirements', 'how to see my pc specs', 'how to check gpu model windows', 'steam hardware survey', 'upgrade or not to run game', 'will my pc run it test',
    ],
    `"Minimum" usually means 1080p, low settings, ~30 fps; "Recommended" means 1080p high at 60 fps; "Ultra/Enthusiast" is 1440p or 4K at 60+ fps. Check your parts: press Win+R, type "dxdiag" (CPU, RAM, GPU) or use Task Manager > Performance, or CPU-Z/GPU-Z. Compare by performance tier, not by name: check the GPU in a benchmark list (TechPowerUp GPU database, Tom's Hardware GPU hierarchy) and compare it against the game's recommended GPU. Upscalers and frame generation are often assumed in recommended specs for new games, so native performance is lower than the listing suggests. RAM: 16GB is the minimum for new AAA games, 32GB is the safe amount. Storage: an increasing number of games need an SSD. VRAM: 8GB is the weak point in new titles. Good tools: the game's built-in benchmark (Black Myth, Monster Hunter Wilds, Cyberpunk), "Can You RUN It", and YouTube benchmark videos of your exact GPU/CPU pair.`
  ),

  // ------------------------------------------------------------------ consoles, handhelds, laptops, ARM
  k(
    'kb-pc-platform-console-specs',
    'Console hardware specs: PS5, PS5 Pro, Xbox Series X|S, Nintendo Switch 2, Steam Machine',
    [
      'ps5 specs', 'ps5 pro specs', 'xbox series x specs', 'xbox series s specs', 'nintendo switch 2 specs', 'steam machine specs', 'ps5 vs rtx', 'what gpu equals a ps5', 'what gpu equals a ps5 pro', 'console vs gaming pc spec comparison', 'ps6 release date', 'next xbox hardware',
    ],
    `PS5 (2020): AMD Zen 2 8-core CPU, RDNA 2 GPU ~10.3 TFLOPS (36 CUs), 16GB GDDR6, 825GB custom NVMe SSD; roughly an RTX 2070 Super/RX 6700 class. PS5 Pro (Nov 2024): same CPU, GPU ~16.7 TFLOPS (60 CUs) with PSSR AI upscaling, 16GB GDDR6 + 2GB DDR5, 2TB SSD; about RTX 4070/RX 7700 XT class with better ray tracing. Xbox Series X (2020): Zen 2 8-core, 12 TFLOPS RDNA 2 (52 CUs), 16GB GDDR6, 1TB SSD (about an RTX 2080/RX 6700 XT class); Series S: 4 TFLOPS, 10GB, 512GB (1080p/1440p target). Nintendo Switch 2 (June 2025, $449.99): a custom Nvidia Tegra T239 with an Ampere GPU, 12GB LPDDR5X, 256GB storage, a 7.9-inch 1080p 120Hz LCD; about 1.7 TFLOPS handheld / ~3 TFLOPS docked with DLSS support. Steam Machine (Valve, a small AMD-based living-room PC running SteamOS, announced Nov 2025 and reported for a summer 2026 launch with memory-driven high prices). Next generations (PS6, next Xbox) are expected around 2027-2028 and are rumored to be affected by memory costs. A PS5-class gaming PC costs more than a console in 2026 because of PC part prices.`
  ),
  k(
    'kb-pc-platform-handheld-pcs',
    'Handheld gaming PCs: Steam Deck, ROG Ally, ROG Xbox Ally, Legion Go and specs',
    [
      'steam deck oled specs', 'rog ally x specs', 'rog xbox ally x', 'legion go s steamos', 'legion go 2', 'msi claw', 'best handheld gaming pc 2026', 'steam deck vs rog ally', 'handheld battery life', 'ayaneo handheld', 'z1 extreme vs z2 extreme',
    ],
    `Handheld PCs: Steam Deck (2022 LCD, 2023 OLED, 7.4-inch 1280x800 OLED 90Hz, custom AMD Zen 2 + RDNA 2 APU "Van Gogh", 16GB LPDDR5, 512GB/1TB, SteamOS (Linux), 3-12 hour battery): best value and simplest. ASUS ROG Ally (2023, Ryzen Z1 Extreme, Windows) and ROG Ally X (2024, 80Wh battery, 24GB LPDDR5X, Z1 Extreme); ROG Xbox Ally / Ally X (2025, Windows 11 with an Xbox full-screen experience, Ryzen Z2 and Z2 Extreme, Ally X reported around $999). Lenovo Legion Go (2023, 8.8-inch 1440p, detachable controllers), Legion Go 2 (2025, Ryzen Z2 Extreme, OLED), Legion Go S (small, Ryzen Z2 Go, also sold with SteamOS). MSI Claw (Intel Core Ultra, weaker battery/software). AYANEO, GPD and OneXPlayer make premium/niche models. Specs that matter: APU (Ryzen Z2 Extreme > Z1 Extreme > Z2 Go), RAM (16-24GB shared with the GPU), battery (40-80Wh), and the screen. They play modern games at 720p-1080p low-medium with FSR; battery life in demanding games is 1.5-3 hours; plug in for full performance. SteamOS-style handhelds are better for gaming simplicity, Windows ones for any launcher.`
  ),
  k(
    'kb-pc-platform-laptop-chips-lineup',
    'Laptop chips and GPUs: Ryzen AI 300, Core Ultra 200H/V, Snapdragon X, RTX 50 laptop specs',
    [
      'ryzen ai 9 hx 370', 'core ultra 9 285h', 'core ultra 7 258v lunar lake', 'snapdragon x elite laptops', 'copilot+ pc requirements', 'rtx 5090 laptop specs', 'rtx 5070 laptop specs', 'rtx 5080 laptop specs', 'rtx 5060 laptop specs', 'best laptop chips 2026', 'npu tops explained',
      'ryzen 9 9955hx3d', 'strix halo laptop',
    ],
    `Laptop CPUs: AMD Ryzen AI 300 "Strix Point" (Ryzen AI 9 HX 370, 12 cores, Radeon 890M iGPU, 50 TOPS NPU), Ryzen AI Max+ 395 "Strix Halo" (16 cores, Radeon 8060S 40-CU iGPU, up to 128GB unified memory), gaming Ryzen 9 9955HX / 9955HX3D (16-core desktop-class with 3D V-Cache, for big gaming laptops); Intel Core Ultra 200V "Lunar Lake" (thin-and-light, efficient, on-package memory), Core Ultra 200H/HX "Arrow Lake" (performance); Qualcomm Snapdragon X Elite/Plus (ARM, long battery life, Windows on ARM; some games and anti-cheats do not run); Apple M-series (M4/M5) for Macs. Copilot+ PCs require an NPU of 40+ TOPS, 16GB RAM and 256GB storage. RTX 50 Laptop GPUs: RTX 5090 Laptop (24GB GDDR7, up to 175W), RTX 5080 Laptop (16GB), RTX 5070 Ti Laptop (12GB), RTX 5070 Laptop (8GB), RTX 5060 Laptop (8GB), RTX 5050 Laptop (8GB); they are much slower than the desktop cards of the same name because of power limits and use a smaller die. Look at the laptop's actual TGP and cooling in reviews, not just the GPU name.`
  ),
  k(
    'kb-pc-platform-mac-vs-windows-pc',
    'Mac vs Windows PC: Apple Silicon, Mac mini/Studio, gaming and AI differences',
    [
      'mac vs pc for gaming', 'is a macbook good for gaming', 'apple m4 vs ryzen', 'mac studio for ai', 'mac mini m4 specs', 'can you play games on mac', 'apple silicon unified memory ai', 'hackintosh worth it', 'is mac faster than pc', 'macos vs windows for programming',
      'm5 chip',
    ],
    `Macs use Apple's own ARM-based chips (M1 2020 through M4/M5 now): excellent single-thread speed, efficiency, silence, battery life and a unified memory pool shared by CPU and GPU; they are not upgradeable (RAM/storage soldered), expensive for upgrades and have limited game support (Apple's Game Porting Toolkit helps; most AAA games and anti-cheat titles do not run natively). Strengths: video editing (Final Cut/DaVinci), mobile/software development, quiet workstations, and local AI: a Mac Studio with 128-512GB unified memory runs very large language models that need far more VRAM than any single GPU, though slower than an Nvidia GPU for the same model size. Mac mini M4 is a tiny, quiet, cheap productivity desktop. Windows PCs win for gaming, upgradeability, GPU choice, price per performance and software compatibility (CUDA for AI). macOS is fine for dev work; Linux or WSL on Windows are the usual alternatives. A Hackintosh (macOS on PC hardware) is unsupported and effectively dead now that Apple dropped Intel Macs.`
  ),

  // ------------------------------------------------------------------ OS details
  k(
    'kb-pc-os-windows-editions-versions',
    'Windows editions and versions: Home vs Pro, 10 vs 11, 24H2/25H2, LTSC, activation',
    [
      'windows 11 home vs pro', 'do i need windows pro', 'windows 11 25h2', 'windows 11 24h2 problems', 'windows ltsc iot', 'windows 10 end of support extended updates', 'windows 11 on unsupported hardware', 'cheap windows keys legit', 'windows activation without key', 'what is windows 12',
      'windows 11 vs windows 10 gaming performance', 'windows 11 s mode',
    ],
    `Windows 11 comes in Home (everything most users need) and Pro (adds BitLocker management, Remote Desktop host, Hyper-V, Group Policy, domain join: needed for work/VM features); Enterprise/Education/IoT LTSC are for organizations. Versions are named by year and half (24H2 in late 2024, 25H2 in late 2025); keep one that is still supported by Microsoft. Windows 10 support ended on October 14, 2025 (consumers can buy a year of Extended Security Updates), so new builds should use 11. Gaming performance is about the same on 10 and 11; 11 has better scheduling for modern Intel/AMD CPUs and features like Auto HDR and DirectStorage. Requirements: 64-bit CPU (8th-gen Intel/Zen 2 or newer officially), 4GB RAM, 64GB storage, UEFI with Secure Boot, TPM 2.0. A genuine license: buy from Microsoft or major retailers; a retail key transfers between PCs, an OEM key does not. Very cheap "keys" sold on marketplaces are often volume/gray-market and can be revoked. Windows can run unactivated with a watermark and personalization limits. "Windows 12" is not a released product.`
  ),
  k(
    'kb-pc-os-linux-distros-steamos',
    'Linux distros for PCs: Ubuntu, Mint, Fedora, Arch, Bazzite, SteamOS, Pop!_OS and how to choose',
    [
      'best linux distro for beginners', 'ubuntu vs mint vs fedora', 'bazzite what is it', 'steamos on a pc', 'arch linux difficulty', 'pop os cosmic', 'linux for gaming nvidia', 'how to install linux', 'what is a desktop environment kde gnome', 'linux mint for windows users',
      'can i run windows software on linux',
    ],
    `Linux distros: beginner-friendly: Linux Mint (Windows-like, stable), Ubuntu (huge support, GNOME), Pop!_OS (System76, good Nvidia support, COSMIC desktop), Fedora (modern, polished, KDE/GNOME spins). Gaming-focused: Bazzite (Fedora-based, console-like, great for handhelds and HTPCs), Nobara (Fedora-based gaming tweaks), SteamOS (Valve's, Steam Deck, available for other handhelds), CachyOS (Arch-based, very fast, for tinkerers). Advanced: Arch (build it yourself), Debian (rock stable), NixOS (declarative). Choose a desktop environment: KDE Plasma (Windows-like, customizable), GNOME (clean, modern), Cinnamon (traditional). Windows software runs via Wine/Proton (Steam), Lutris and Bottles; Microsoft Office does not run natively (use the web version or LibreOffice), Adobe apps do not run well. Nvidia drivers need installing from the distro tools; AMD GPUs work best. Install by writing the ISO to a USB (Rufus/balenaEtcher), try it live first, and dual-boot on a separate SSD to keep Windows safe.`
  ),
  k(
    'kb-pc-os-drivers-firmware-updates',
    'Keeping drivers, firmware and BIOS updated (chipset, GPU, LAN, audio, SSD, peripherals)',
    [
      'how to update drivers pc', 'chipset driver update amd intel', 'do i need to update bios', 'driver booster safe', 'ssd firmware update', 'update wifi driver', 'realtek audio driver', 'peripheral firmware update logitech g hub', 'windows update drivers vs manufacturer',
      'monitor firmware update',
    ],
    `What to keep updated: chipset driver (AMD/Intel: the motherboard maker's page or the chipset vendor; matters for CPU scheduling, USB and PCIe), GPU driver (from Nvidia/AMD/Intel directly), BIOS/UEFI (only for new CPU support, security fixes or stability problems; use BIOS Flashback; do not interrupt a flash), LAN/Wi-Fi/Bluetooth drivers (the board or card maker; Intel and Realtek sites), audio driver (Realtek), SSD firmware (Samsung Magician, WD Dashboard, Crucial Storage Executive; back up first), motherboard/GPU/PSU firmware tools (Corsair iCUE, ASUS Armoury Crate; many people avoid the bloat), peripheral firmware (Logitech G Hub, Razer Synapse, Wooting), monitor firmware (some OLEDs get firmware updates via USB). Avoid "driver updater" programs (Driver Booster etc.): they bundle adware and can install wrong drivers. Windows Update gives working but sometimes old drivers; use it for the base and the manufacturer for the latest. After a major Windows update, reinstall the chipset and GPU drivers if something breaks.`
  ),

  // ------------------------------------------------------------------ GPU/CPU software features
  k(
    'kb-pc-feature-nvidia-software',
    'Nvidia software features: Nvidia App, DLSS Override, RTX HDR, RTX Video, Broadcast, ShadowPlay, Reflex 2',
    [
      'what is nvidia app', 'rtx hdr how to enable', 'rtx video super resolution', 'nvidia broadcast noise removal', 'shadowplay record gameplay', 'nvidia reflex 2 frame warp', 'dlss override', 'nvidia profile inspector', 'nvidia control panel settings', 'dldsr', 'nvidia canvas', 'g-sync compatible',
    ],
    `Nvidia features: Nvidia App (replaced GeForce Experience: driver updates, game optimization, overlay, recording, DLSS Override/Smooth Motion, filters), DLSS (Super Resolution, Frame Generation, Multi Frame Generation on RTX 50, Ray Reconstruction), DLAA (anti-aliasing at native res), DLDSR (render higher, downscale for sharpness), RTX HDR (adds HDR to SDR games), RTX Video Super Resolution (upscales low-res video in browsers), Nvidia Broadcast (AI noise removal, background blur, virtual camera), ShadowPlay/Instant Replay (low-impact recording, AV1), Reflex / Reflex 2 (lower latency; Reflex 2 uses Frame Warp), G-Sync / G-Sync Compatible (variable refresh), NVENC (hardware video encoder), Smooth Motion (driver-level frame generation for older games on RTX 40/50), Control Panel settings (power management mode: Prefer maximum performance, low latency mode, shader cache size). Use DLSS Quality + Reflex in most games. Nvidia Profile Inspector is a community tool for advanced driver profile tweaks.`
  ),
  k(
    'kb-pc-feature-amd-intel-software',
    'AMD and Intel GPU/CPU software features: Adrenalin, FSR, AFMF, Anti-Lag, Ryzen Master, XeSS, Intel XTU',
    [
      'what is amd adrenalin', 'amd fluid motion frames afmf', 'amd anti lag 2', 'fsr 3.1 frame generation', 'fsr 4 which games', 'amd radeon super resolution rsr', 'ryzen master how to use', 'amd smart access memory', 'xess 2 frame generation', 'intel xtu overclock', 'intel arc control', 'radeon chill',
    ],
    `AMD: Adrenalin software (drivers, performance tuning, recording, overlay), FSR (FSR 2/3/3.1 work on most GPUs; FSR 4 is machine-learning based and exclusive to RDNA 4 RX 9000), FSR Frame Generation and AFMF (Fluid Motion Frames, driver-level frame gen for almost any DX11/12 game), Anti-Lag / Anti-Lag 2 (latency reduction), Radeon Chill (caps fps to save power), Radeon Super Resolution (driver upscaling), Smart Access Memory (AMD's name for Resizable BAR), Ryzen Master (CPU/PBO tuning), AMD EXPO (RAM profiles), and AV1 encoding in ReLive. Intel: XeSS (upscaling and frame generation; best on Arc), Arc Control/Intel Graphics Software, Intel Extreme Tuning Utility (XTU) for CPU tuning, Intel Performance Maximizer, QuickSync (video encode), and Thread Director. Intel CPUs also use XMP and the Intel Application Optimization (APO) on supported games. Keep the BIOS up to date for AGESA/microcode fixes.`
  ),

  // ------------------------------------------------------------------ streaming / cloud
  k(
    'kb-pc-feature-game-streaming-cloud',
    'Game streaming and cloud gaming: Moonlight/Sunshine, Steam Link, GeForce NOW, Xbox Cloud, Remote Play',
    [
      'moonlight sunshine setup', 'steam link remote play', 'geforce now vs xbox cloud', 'cloud gaming latency', 'play pc games on tv', 'stream games from pc to phone', 'parsec', 'geforce now rtx 5080 tier', 'xbox cloud gaming pc', 'best way to play pc games on a steam deck from pc',
    ],
    `Local streaming from your own PC: Moonlight + Sunshine (open source, low latency, uses the GPU's hardware encoder, works on phones, TVs, handhelds, Raspberry Pi), Steam Link / Steam Remote Play (easy for Steam games), Parsec (low latency, remote work too), Apple TV/Android TV Moonlight clients. Needs a wired PC and a good network (5 GHz or Ethernet on the client, 20-80 Mbps). Cloud gaming (rent a remote PC): Nvidia GeForce NOW (supports your Steam/Epic library, tiers up to RTX 5080-class performance, free tier with queues), Xbox Cloud Gaming (with Game Pass Ultimate), Amazon Luna, Shadow PC (full cloud PC). Latency: expect 20-60 ms extra; fine for single-player, hard for competitive shooters; wired Ethernet and a server close to you help. Cloud gaming avoids buying a GPU during the shortage but needs a subscription and stable internet.`
  ),
  k(
    'kb-pc-feature-cpu-extensions-ai-npu',
    'CPU features: AVX-512, NPUs and TOPS, virtualization, ECC, security mitigations',
    [
      'what is avx 512', 'what is an npu in a cpu', 'what are tops npu', 'cpu vt-x amd-v svm', 'spectre meltdown mitigations performance', 'cpu vpro', 'what is avx2', 'does my cpu support avx 512', 'copilot plus pc npu', 'intel ai boost amd xdna',
    ],
    `CPU instruction extensions speed up special math: SSE/AVX/AVX2 (vector math, used by games and video), AVX-512 (wide vectors; AMD Zen 4/5 supports it, Intel dropped it from consumer chips after 11th gen), AES-NI (encryption), and virtualization (Intel VT-x / AMD-V = SVM; turn on in the BIOS to run VMs or Android emulators). NPUs (neural processing units) are small AI accelerators in new laptop/desktop chips (Intel AI Boost, AMD XDNA, Qualcomm Hexagon, Apple Neural Engine) measured in TOPS (trillions of operations per second): 40+ TOPS is the Copilot+ PC threshold; they run on-device AI like Windows Studio Effects efficiently, but big models still use the GPU. ECC memory support exists on AMD Ryzen (board-dependent) and Intel Xeon/workstation CPUs. Security mitigations for Spectre/Meltdown/Downfall cost a little performance on some older chips. Intel vPro and AMD PRO add management features for business PCs.`
  ),
];
