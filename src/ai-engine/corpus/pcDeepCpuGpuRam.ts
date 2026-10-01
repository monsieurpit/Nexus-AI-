import { KnowledgeItem } from '../../types';

/**
 * PC_DEEP_CPU_GPU_RAM — expansion of the 'pc-building' category (Patrick, 2026-10-01: "expand massively his PC
 * knowledge, I want him to know literally everything in PC"). Deep dives on processors, graphics cards and memory.
 * Stable engineering knowledge; anything price/availability-related lives in pcBuildingComplete.ts and is dated there.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_DEEP_CPU_GPU_RAM: KnowledgeItem[] = [
  // ------------------------------------------------------------------ CPU deep dives
  k(
    'kb-pc-deep-cpu-architecture',
    'How a CPU works inside: cores, cache levels, IPC, pipelines, branch prediction',
    [
      'how does a cpu work', 'what is ipc in a cpu', 'l1 l2 l3 cache explained', 'what is a cpu core', 'cpu pipeline explained', 'what is branch prediction', 'cpu architecture explained', 'what is instruction per clock',
      'why is l3 cache important', 'what is out of order execution', 'cpu die explained', 'what is a cpu instruction set x86 arm',
    ],
    `A CPU executes instructions: fetch, decode, execute, write back, many at once through a pipeline. Each core has its own execution units, registers and small fast caches (L1 ~32-64KB, L2 ~1-2MB per core); a larger shared L3 (16-96MB+, and 96-128MB on X3D chips) sits behind them; data not in cache comes from RAM, which is roughly 50-100x slower, so cache hits decide game performance. IPC (instructions per clock) is how much work a core does each cycle; performance is roughly IPC x clock speed x cores used. Modern cores use out-of-order execution (reorder instructions to keep units busy), branch prediction (guess where an if/else goes so the pipeline stays full) and speculative execution. The instruction set decides what software runs: x86-64 (Intel/AMD, Windows/Linux PCs), ARM (Apple Silicon, phones, Snapdragon X laptops). Games depend on a few fast threads (the main game thread and render thread), so single-core speed and cache matter more than 16+ cores.`
  ),
  k(
    'kb-pc-deep-hybrid-cores-smt',
    'P-cores, E-cores, hyper-threading and SMT',
    [
      'what are p cores and e cores', 'hyper threading explained', 'smt vs hyperthreading', 'do e cores matter for gaming', 'should i turn off e cores', 'intel hybrid architecture', 'thread director', 'zen 5c cores',
      'what is smt on ryzen', 'does hyperthreading help gaming', 'arrow lake no hyperthreading',
    ],
    `Intel's hybrid design (12th gen onward) mixes P-cores (Performance: big, fast, for games and heavy threads) and E-cores (Efficiency: smaller, many per area, for background and multi-thread throughput). Windows 11's Thread Director steers game threads to P-cores. Intel Arrow Lake (Core Ultra 200S) dropped Hyper-Threading, so each P-core runs one thread. Hyper-Threading (Intel) and SMT (AMD) let one core run two threads at once to use idle execution units: it adds roughly 20-30% throughput in heavy multi-thread work but little or sometimes negative for games, which is why some competitive players disable it. AMD's desktop Ryzen uses identical full cores (with SMT) on most chips; AMD's "c" cores (Zen 5c) are compact cores used in mobile/server chips. You rarely need to touch core settings; keep Windows 11 updated and the chipset driver installed so the scheduler works correctly.`
  ),
  k(
    'kb-pc-deep-cpu-power-throttling',
    'CPU power limits, boost behavior, thermal throttling and Tjmax',
    [
      'what is pl1 pl2', 'cpu power limit', 'what is ppt tdc edc', 'thermal throttling explained', 'what is tjmax', 'ryzen 95 degrees normal', 'why does my cpu hit 100c', 'intel cpu power draw 253w', 'cpu boost clock behavior',
      'what is precision boost', 'cpu throttling causes', 'how to lower cpu temperature',
    ],
    `Modern CPUs boost automatically until they hit a limit: power, current, temperature or voltage. Intel: PL1 (long-term power, e.g. 125W) and PL2 (short boost, e.g. 253W) with a time window; many boards remove limits by default ("MCE" / unlimited), which raises heat and power. AMD: PPT/TDC/EDC limits and Precision Boost: Ryzen aims to boost until it reaches about 90-95 degC (Tjmax is 95 degC on most Ryzen 7000/9000 and 89 on X3D parts like the 7800X3D), and sitting at 85-95 degC under heavy all-core load is by design, not a fault. Intel Tjmax is typically 100-105 degC. Thermal throttling happens when the chip hits Tjmax and slows down to protect itself. Fixes for high temperatures: better cooler contact (mounting pressure, thin paste), better case airflow, lower power limits, a negative Curve Optimizer or voltage offset (undervolt), and a lower ambient room temperature. A sudden temperature spike to 100 degC on a new build usually means a missing cooler film, a loose mount or a pump/fan not running.`
  ),
  k(
    'kb-pc-deep-chiplets-nodes',
    'Chiplets, process nodes (TSMC N4/N3, Intel 18A) and why they matter',
    [
      'what is a chiplet', 'what does 5nm 3nm mean', 'tsmc n3 vs n4', 'intel 18a', 'process node explained', 'amd chiplet design', 'what is a cpu die', 'ccd and iod ryzen', 'why does manufacturing node matter',
      'what is euv lithography', 'intel foundry vs tsmc',
    ],
    `A process node (e.g. TSMC N4, N3; Intel 18A) is the manufacturing technology that sets transistor density and efficiency; the nanometer number is now mostly a marketing name, not a real measurement. Smaller/newer nodes give more transistors per area, better performance per watt and cost more. TSMC (Taiwan) makes most leading chips for AMD, Nvidia and Apple; Intel has its own fabs (Intel Foundry, 18A) and also buys TSMC capacity for some tiles. AMD's Ryzen desktop CPUs use chiplets: one or two CCDs (compute dies with the cores and L3, made on a leading TSMC node) plus an IOD (I/O die with memory controller, PCIe and USB, made on an older cheaper node) connected by Infinity Fabric; 3D V-Cache stacks extra cache on top of a CCD. Intel's Arrow Lake uses tiles (compute, graphics, SoC, I/O) joined with Foveros packaging. Chiplets improve yield and allow mixing nodes; the cost is a bit more latency between dies, which is why memory latency tuning matters on Ryzen. EUV (extreme ultraviolet) lithography from ASML is the machine technology behind the newest nodes.`
  ),
  k(
    'kb-pc-deep-integrated-graphics-apus',
    'Integrated graphics and APUs: what iGPUs can do',
    [
      'what is an apu', 'ryzen 8700g gaming', 'integrated graphics gaming', 'can igpu run games', 'radeon 780m', 'strix halo', 'ryzen ai max', 'intel arc graphics igpu', 'do i need a gpu', 'cpu with integrated graphics list',
      'what is an igpu used for',
    ],
    `Integrated graphics (iGPU) is a small GPU inside the CPU that shares system RAM. Intel Core CPUs without an "F" have Intel graphics (fine for desktop and video, weak for games). AMD Ryzen "G" chips (APUs) and mobile Ryzen have far stronger iGPUs: the Radeon 780M (Ryzen 8700G/7840U class) runs many games at 1080p low-medium; Strix Halo (Ryzen AI Max+ 395, 2025) has a huge iGPU with up to ~16-40 CUs and shares up to 128GB of unified memory, making small, quiet mini PCs that can run 1080p-1440p games and big local AI models. Because an iGPU uses system RAM, fast dual-channel DDR5 matters for it. Standard Ryzen 7000/9000 desktop CPUs have a tiny iGPU (2 CUs) meant only for display output and troubleshooting. Use an iGPU to test a new build with no graphics card, or for a media/office PC, but for gaming get a dedicated GPU.`
  ),
  k(
    'kb-pc-deep-workstation-server-cpus',
    'Workstation, HEDT and server CPUs: Threadripper, EPYC, Xeon',
    [
      'what is threadripper', 'epyc vs ryzen', 'xeon vs core', 'hedt platform', 'do i need a threadripper', 'ecc ram workstation', 'workstation cpu for rendering', 'many core cpu for virtual machines', 'ryzen 9 9950x for workstation',
    ],
    `Beyond consumer desktop chips: AMD Threadripper (HEDT/workstation, 24-96 cores, quad or eight-channel DDR5 memory, up to 128 PCIe lanes, ECC support, sTR5 socket; Threadripper PRO for professional workstations) and EPYC (servers, up to 192+ cores); Intel Xeon (servers and workstations, Xeon W). They give many more cores, memory channels and PCIe lanes, ECC memory support and reliability features, at much higher cost, and they are slower than a Ryzen X3D for games. Buy one only for heavy rendering, simulation, compiling, multi-VM work or huge memory needs. For most creators a Ryzen 9 9950X or Core Ultra 9 285K is plenty. ECC (error-correcting) memory detects and fixes single-bit errors: important for servers and data integrity; DDR5 has on-die ECC but that is not the same as full ECC end-to-end.`
  ),
  k(
    'kb-pc-deep-am5-x3d-quirks',
    'Ryzen X3D chips: how 3D V-Cache works, dual-CCD 9950X3D, BIOS and chipset driver notes',
    [
      'how does 3d v cache work', '9950x3d dual ccd', 'x3d game bar scheduling', 'ryzen 7800x3d burned out', 'x3d voltage limit', 'x3d pbo curve optimizer', 'amd chipset driver x3d', 'x3d overclocking locked', '9800x3d vs 9950x3d gaming',
      'why is 3d v cache good for games',
    ],
    `X3D chips stack an extra 64MB of L3 cache on the compute die (96MB total on the 9800X3D). Games love big cache because most of their data fits it, avoiding slow RAM trips; a 9800X3D often beats chips with more cores and higher clocks in games by 20-35%. Newer Zen 5 X3D (9000) puts the cache under the cores, so they run cooler and allow overclocking, unlike Zen 4 (7800X3D, cache on top, voltage-limited). Dual-CCD models (7950X3D, 9950X3D) have 3D V-Cache on only one CCD, so Windows/AMD's chipset driver must park the non-cache cores for games (use Windows 11, the latest AMD chipset driver and Xbox Game Bar enabled). In 2023 early AM5 boards pushed too much SoC voltage and damaged some 7800X3D chips; AMD and board makers fixed it with BIOS updates, so keep the BIOS current. Tuning: a negative Curve Optimizer and Precision Boost Overdrive Scalar settings are the safe way to gain performance; do not apply high manual voltage. Good cooling still matters, an air cooler like Thermalright Phantom Spirit is enough for an 8-core X3D.`
  ),
  k(
    'kb-pc-deep-old-cpu-generations',
    'Older CPU generations and which are still usable: Ryzen 1000-5000, Intel 6th-14th gen',
    [
      'is ryzen 5 3600 still good', 'is intel i7 8700k still good', 'old cpu for gaming 2026', 'ryzen 5000 vs 7000', 'i5 12400f vs ryzen 5 5600', 'is 4 cores enough for gaming', 'upgrade from ryzen 3600', 'best budget old cpu',
      'intel 10th gen still good', 'ryzen 3 3100', 'first gen ryzen',
    ],
    `AMD: Ryzen 1000 (2017, Zen) and 2000 (Zen+) are too slow for modern games; Ryzen 3000 (Zen 2, 2019: Ryzen 5 3600, 3700X) still plays at 1080p with a mid GPU but bottlenecks fast cards; Ryzen 5000 (Zen 3, AM4: 5600, 5600X, 5700X, 5700X3D, 5800X3D, 5900X, 5950X) is still very good and the 5700X3D/5800X3D are great budget gaming CPUs. Intel: 6th-9th gen (i5-6600K to i9-9900K) are old, 4-core chips struggle in new games; 10th gen (LGA1200) is fine for 1080p; 12th gen (Alder Lake: i5-12400F, i5-12600K) is excellent value on LGA1700 and still strong in 2026; 13th/14th gen are fast but see the instability note for K chips. Rule: 6 modern cores with decent clocks is the floor for gaming in 2026, 4-core CPUs (even if fast) cause stutter in many new titles. If your CPU is a Ryzen 3600 or older, upgrading to a 5700X3D on the same AM4 board (check the BIOS supports it) is the cheapest big jump.`
  ),

  // ------------------------------------------------------------------ GPU deep dives
  k(
    'kb-pc-deep-gpu-architecture',
    'Inside a GPU: CUDA cores, stream processors, RT cores, tensor cores, memory bus',
    [
      'what are cuda cores', 'stream processors vs cuda cores', 'what are rt cores', 'what are tensor cores', 'what is memory bus width gpu', 'gpu memory bandwidth explained', 'what is a gpu die', 'what is shader', 'why does a 128 bit bus matter',
      'what is infinity cache', 'what is gddr7', 'gddr6 vs gddr6x vs gddr7',
    ],
    `A GPU has thousands of small cores for parallel math: Nvidia calls its general shader cores CUDA cores, AMD calls them stream processors (grouped in compute units); core counts are not comparable across brands. RT cores (Nvidia) / ray accelerators (AMD) speed up ray tracing; tensor cores (Nvidia) / AI accelerators (AMD) run machine-learning math for DLSS and FSR 4 and for AI work. Memory: VRAM type (GDDR6, GDDR6X, GDDR7) and the bus width (e.g. 128-bit, 192-bit, 256-bit, 512-bit on the RTX 5090) set memory bandwidth, which feeds the cores; a narrow bus is partly offset by large on-chip cache (AMD Infinity Cache, Nvidia L2). GDDR7 (RTX 50 series) is faster than GDDR6X; GPUs for AI/pro work use HBM. The GPU die is the silicon chip; bigger dies (GB202 in the RTX 5090) cost more and have more cores. Performance comes from cores x clocks x memory bandwidth, plus architecture efficiency, so compare real benchmarks, not core counts. TGP (total graphics power) is the card's power budget.`
  ),
  k(
    'kb-pc-deep-gpu-coolers-sag-power',
    'GPU coolers, sag, power connectors and GPU temperatures',
    [
      'gpu sag support bracket', 'what is a vapor chamber', 'blower vs axial fan gpu', 'gpu hot spot temperature', 'gpu memory junction temperature', 'normal gpu temperature', '12v-2x6 vs 8 pin pcie', 'gpu power connector how to plug', 'gpu coil whine',
      'gpu fans not spinning at idle', 'vertical gpu mount riser', 'liquid cooled gpu',
    ],
    `Coolers: most cards use 2-3 axial fans over a heatsink with heat pipes or a vapor chamber; blower cards exhaust out the back (louder, for small cases); some premium cards are AIO liquid-cooled. Normal temps: GPU core 60-80 degC in games, hot spot up to ~90-95 degC and memory junction up to ~95-105 degC is within spec on many cards; sustained throttling means poor airflow or an old cooler. Fans stopping at idle (0 dB mode) is normal. Heavy cards can sag: use the supplied bracket or a cheap support stand to relieve PCIe slot and PCB stress. Power connectors: 8-pin PCIe (150W each), and 12V-2x6 (16-pin, up to 600W) on RTX 40/50: plug it in until it clicks and do not bend the cable right at the connector (leave a few cm of straight cable) because bent or half-seated connectors have overheated. Do not daisy-chain the high-power cable with adapters if you can avoid it, use the PSU's native cable. Coil whine (a high-pitched buzz under load) is an electrical noise some cards have; a frame rate cap or a different PSU can reduce it. Vertical GPU mounts need a good riser cable (PCIe 4.0/5.0 rated) and enough clearance from the glass.`
  ),
  k(
    'kb-pc-deep-gpu-drivers-ddu',
    'GPU drivers, DDU, Nvidia App, AMD Adrenalin, Studio vs Game Ready',
    [
      'how to update gpu drivers', 'what is ddu display driver uninstaller', 'nvidia studio vs game ready', 'amd adrenalin driver', 'gpu driver crashed', 'clean install gpu driver', 'rollback nvidia driver', 'should i update gpu drivers every time',
      'nvidia app vs geforce experience', 'driver timeout fix',
    ],
    `Drivers are the software that lets Windows and games use the GPU. Download them only from the maker: Nvidia (the Nvidia App replaced GeForce Experience), AMD (Adrenalin), Intel (Arc/Graphics Software). Nvidia "Game Ready" drivers come out for new games, "Studio" drivers are tested for creative apps; either works for gaming. You do not need every new driver: update when a game you play needs it or fixes a bug you have; if a new driver causes crashes, roll back or use DDU. DDU (Display Driver Uninstaller) removes old GPU drivers cleanly (run it in Windows Safe Mode) before a clean install, the standard fix for weird crashes, black screens or after swapping GPU brands. A "driver stopped responding" error usually points to unstable overclocks/undervolts, a failing PSU, overheating or a corrupted driver. Windows Update can install an old generic driver, so install the real one from the maker right after building.`
  ),
  k(
    'kb-pc-deep-ray-path-tracing',
    'Ray tracing vs path tracing and how heavy they are',
    [
      'what is ray tracing', 'what is path tracing', 'is ray tracing worth it', 'rt vs rasterization', 'cyberpunk path tracing requirements', 'ray reconstruction dlss', 'best gpu for ray tracing', 'amd ray tracing weak', 'ray tracing performance cost',
      'full ray tracing 4k',
    ],
    `Rasterization draws scenes with tricks (shadow maps, baked light). Ray tracing simulates light rays for realistic reflections, shadows and global illumination, but it costs 30-60% of your fps unless you use upscaling and frame generation. Path tracing (full ray tracing, in games like Cyberpunk 2077 Overdrive, Alan Wake 2, Black Myth: Wukong and Indiana Jones) traces many rays per pixel and is the heaviest setting: it basically needs an RTX 4070/5070 class or better with DLSS and frame generation, and an RTX 5080/5090 for 4K. Nvidia is clearly ahead in ray tracing (more RT cores, DLSS Ray Reconstruction cleaning the noisy result); AMD's RDNA 4 (RX 9070 series) closed much of the gap versus RDNA 3 but is still behind in path-traced games. Tips: use RT where it looks best (global illumination, reflections), turn off ray tracing if you want 144+ fps in competitive play, and rely on VRAM (RT also uses extra memory, 12GB+ is wise).`
  ),
  k(
    'kb-pc-deep-vram-usage',
    'VRAM usage by resolution and what happens when you run out',
    [
      'how much vram does a game use', 'vram bottleneck symptoms', 'what happens when vram is full', 'texture quality vram', 'is 12gb vram enough for 4k', 'vram 16gb future proof', 'allocated vs used vram', 'stuttering from low vram',
      'does ray tracing use more vram', 'vram needed for 1440p',
    ],
    `VRAM holds textures, frame buffers and ray-tracing data. When it fills, the game spills into slower system RAM: you see stutter, texture pop-in/blurry textures, or sudden fps drops (especially in the 1% lows). Typical needs in 2026 games: 1080p high 8-10GB, 1440p high 10-14GB, 4K high 14-20GB, with ray tracing and frame generation adding 1-3GB. 8GB cards (RTX 5060, 5050, RX 9060 XT 8GB) run into limits in new games at high textures; 12GB is OK for 1080p/1440p; 16GB is comfortable for 1440p and 4K; 24-32GB is for heavy mods, 4K maxed or AI. "Allocated" VRAM shown in overlays is often more than a game truly needs; look for stutter, not the bar. Fixes when short on VRAM: lower texture quality (the cheapest fix), disable ray tracing/frame-gen or use a lower upscaler mode, close other apps that use VRAM (browsers with hardware acceleration), and for a purchase pick the card with more VRAM.`
  ),
  k(
    'kb-pc-deep-workstation-gpus-ai',
    'Workstation GPUs, AI GPUs and why gamers feel the squeeze',
    [
      'rtx pro 6000', 'quadro vs geforce', 'radeon pro', 'data center gpu h100 b200', 'what is hbm', 'nvidia blackwell data center', 'why are gpus used for ai', 'consumer vs workstation gpu', 'is a workstation gpu better for gaming',
      'nvidia dgx spark', 'instinct mi300',
    ],
    `Beyond GeForce: Nvidia's workstation line (RTX Pro, formerly Quadro; e.g. RTX Pro 6000 Blackwell with 96GB) offers huge VRAM, ECC and certified drivers for CAD, 3D and AI, at several times the price and not better for gaming. Data-center GPUs (H100, H200, B200/GB200) use HBM stacked memory, NVLink and are sold to AI companies in thousands; AMD's equivalent is Instinct (MI300/MI350). GPUs are used for AI because neural networks are mostly matrix multiplications, which thousands of GPU cores and tensor cores do in parallel; Nvidia's CUDA software ecosystem is the main reason it dominates. Because gaming and data-center chips come from the same TSMC capacity and memory suppliers, AI demand raises prices and limits supply of consumer cards, as seen with the 2025-2026 shortages. Small AI boxes: Nvidia DGX Spark, AMD Strix Halo mini PCs and Apple Mac Studio give large unified memory for local models.`
  ),

  // ------------------------------------------------------------------ RAM deep dives
  k(
    'kb-pc-deep-ram-timings-gear',
    'RAM timings explained: tCL, tRCD, tRP, tRAS, gear modes, UCLK, FCLK',
    [
      'what do ram timings mean', '30-36-36-96 timings explained', 'tcl trcd trp tras', 'gear mode intel ddr5', 'uclk mclk ratio ryzen', 'fclk 2000 ryzen', 'ddr5 6000 sweet spot why', 'first word latency ram', 'cl30 vs cl36 difference',
      'memory overclocking basics', 'ram nanosecond latency calculation',
    ],
    `RAM timings are delays in clock cycles: tCL (CAS latency, time to deliver data after a read command), tRCD (row to column delay), tRP (row precharge), tRAS (row active time), written like 30-36-36-96 for DDR5-6000 CL30. Real latency in nanoseconds = (CL x 2000) / MT/s, so DDR5-6000 CL30 = 10 ns and DDR5-6400 CL32 = 10 ns too: compare speed and CL together. Lower timings help games a little (1-3%), 8GB vs 16GB capacity matters far more. On AMD AM5, the memory controller clock (UCLK) runs 1:1 with memory clock (MCLK) up to about DDR5-6000-6400, above that it drops to 1:2, which hurts latency; that is why 6000 CL30 is the sweet spot, and Infinity Fabric (FCLK ~2000-2200 MHz) matters too. Intel uses Gear 2 (and Gear 4 at very high speeds) ratios; Arrow Lake supports faster CUDIMM kits (6400-8000+). Overclocking RAM beyond EXPO/XMP profiles needs patience and testing with MemTest86/OCCT/TestMem5; most people should just enable the profile.`
  ),
  k(
    'kb-pc-deep-ram-ranks-modules',
    'RAM modules: ranks, density, CUDIMM, SO-DIMM, LPDDR5X, ECC and mixing kits',
    [
      'single rank vs dual rank ram', 'what is cudimm', 'sodimm vs dimm', 'lpddr5x vs ddr5', 'can i mix ram kits', 'ecc vs non ecc ram', 'can i mix different ram speeds', '2x16 vs 2x32 ram', 'ram rank explained', 'registered ram rdimm',
      'why is 4 sticks of ram slower',
    ],
    `A rank is a set of chips the memory controller accesses at once: single-rank (1R, e.g. most 16GB DDR5 sticks) vs dual-rank (2R, e.g. many 32-48GB sticks); dual-rank improves interleaving but is harder to run at the highest speeds, and 4 sticks (especially 2R) lowers the maximum stable speed because of load on the controller. Formats: DIMM (desktop), SO-DIMM (laptops/mini PCs, half-size), CUDIMM (Intel/AMD new clocked DDR5 with a clock driver chip, for very high speeds on supported boards), RDIMM/ECC (servers/workstations; non-ECC consumer boards usually do not support RDIMM). LPDDR5X is low-power memory soldered onto laptops and some mini PCs (very fast, not upgradeable), while HBM is stacked memory for AI chips. Never mix kits of different speeds/brands unless you accept the lowest speed and possible instability; always buy one kit of the full capacity (2x16GB or 2x32GB). To get 64GB buy 2x32GB, not 4x16GB, on AM5 for the best stability and speed.`
  ),
  k(
    'kb-pc-deep-memory-training-stability',
    'Memory training, boot times on AM5, RAM errors and how to test RAM',
    [
      'am5 long boot time', 'memory training explained', 'memory context restore', 'how to test ram for errors', 'memtest86 how to use', 'ram errors blue screen', 'why does my pc take a minute to boot', 'ddr5 not posting', 'ram not detected after install',
      'memory stability test tools',
    ],
    `DDR5 platforms (AM5, LGA1851) run "memory training" when the PC starts or when memory settings change: the controller tests timings to find stable values, which can take 30 seconds to a few minutes on the first boot with a black screen; later boots use saved results ("Memory Context Restore" in the BIOS speeds this up, but can cause instability on some boards). Symptoms of bad RAM: random crashes, WHEA/MEMORY_MANAGEMENT/IRQL_NOT_LESS_OR_EQUAL blue screens, corrupted files, failed Windows installs. Test with MemTest86 (boot from a USB, run 4 passes) or OCCT's memory test inside Windows; if errors appear, disable EXPO/XMP, reseat the sticks, update the BIOS, try one stick at a time, raise SoC/VDDIO modestly only if you know the safe limits for your platform, and replace faulty modules under warranty. A kit that does not boot at its profile on a given board is often fixed by a BIOS update (check the board's QVL).`
  ),
  k(
    'kb-pc-deep-virtual-memory-pagefile',
    'Virtual memory, page file, memory leaks and why RAM fills up',
    [
      'what is the page file', 'should i disable virtual memory', 'why is my ram usage so high', 'windows memory compression', 'what is a memory leak', 'does windows use all ram on purpose', 'standby memory explained', 'how much page file do i need',
      'chrome using too much ram',
    ],
    `Windows uses unused RAM as a cache (standby memory), so high RAM usage by itself is not a problem; it frees it when programs need it. The page file (virtual memory) is a spillover on the SSD used when RAM is full and for crash dumps; leave it on "system managed" even with 32GB+ (some games and apps break without it). A memory leak is a program that keeps using more RAM over time without releasing it; fix by restarting the app, updating it, or finding the culprit in Task Manager > Memory (sort by usage). Browsers (Chrome/Edge) and Discord are the usual heavy users; turn on the browser's memory saver, close tabs and background apps before gaming. If your system constantly hits 90%+ with nothing heavy open, you probably need more RAM (move from 16GB to 32GB) or have a leak.`
  ),
  k(
    'kb-pc-deep-hbm-vs-gddr-ddr',
    'DRAM families compared: DDR, LPDDR, GDDR, HBM and why each exists',
    [
      'difference between ddr gddr hbm', 'what is hbm memory', 'gddr7 vs ddr5', 'why gpus use gddr not ddr', 'lpddr vs ddr', 'what is unified memory', 'apple unified memory explained', 'dram vs sram vs nand', 'what is sram cache',
      'types of computer memory',
    ],
    `DRAM comes in families tuned for different jobs. DDR (DDR4/DDR5): system RAM for CPUs, balanced latency and capacity, in sticks. LPDDR (LPDDR5X): low-power memory soldered in laptops/phones/mini PCs. GDDR (GDDR6, GDDR6X, GDDR7): graphics memory with very high bandwidth on a wide bus, soldered next to the GPU. HBM (High Bandwidth Memory): dies stacked vertically next to an AI chip for enormous bandwidth, expensive and capacity-limited, the main reason for the 2025-2026 DRAM crunch because it uses far more wafer capacity per GB. Unified memory (Apple Silicon, AMD Strix Halo) means CPU and GPU share one pool, which is why those machines can load very large AI models. SRAM is the tiny, very fast memory inside the CPU/GPU (the caches); NAND flash is the non-volatile storage in SSDs; DRAM loses its contents when power goes off. Memory makers: Samsung, SK hynix, Micron produce DRAM and HBM; NAND comes from Samsung, SK hynix/Solidigm, Micron, Kioxia, SanDisk, YMTC.`
  ),
];
