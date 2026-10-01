import { KnowledgeItem } from '../../types';

/**
 * PC_BUILDING_COMPLETE — Patrick's ask (2026-10-01): "a full corpus category about PC, with PC parts,
 * the RAM crisis right now, GPUs, companies and etc... literally everything about PC so Nexus can teach
 * me how to build a PC with the best parts or parts that fit together."
 *
 * Category 'pc-building'. Two kinds of facts live here:
 *  - STABLE knowledge (sockets, chipsets, compatibility rules, how parts work, how to assemble and
 *    troubleshoot, companies) — safe to state flatly.
 *  - MARKET snapshots (prices, shortages, what is available, upcoming launches) — true as of
 *    SEPTEMBER/OCTOBER 2026 from several tech-press and market-tracker reports, and they change monthly.
 *    Every such entry says so and tells the user to check live prices (PCPartPicker price history etc.).
 *    Prices are rounded ranges on purpose; sources disagreed by store and by week.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_BUILDING_COMPLETE: KnowledgeItem[] = [
  // ---------------------------------------------------------------- the big picture / how to build
  k(
    'kb-pc-build-overview',
    'How to build a PC: the whole process',
    [
      'how do i build a pc', 'how to build a pc', 'how can i build a pc', 'teach me to build a pc', 'build me a pc', 'help me build a pc', 'pc build guide', 'how to make a gaming pc', 'how do you build a computer',
      'how to build a pc', 'how do i build a gaming pc', 'pc building guide for beginners', 'steps to build a computer', 'first time building a pc', 'what do i need to build a pc',
      'list of pc parts needed', 'parts you need to build a computer', 'build a pc from scratch', 'pc build checklist',
    ],
    `Building a PC is 5 steps. (1) Decide the budget and what you do with it (gaming resolution/fps, editing, streaming, AI). (2) Pick parts in this order: GPU (for gaming it is the biggest slice of the budget) -> CPU -> motherboard that fits the CPU socket -> RAM that fits the board -> SSD -> power supply sized for the GPU -> CPU cooler -> case that fits everything. (3) Check compatibility on PCPartPicker (it flags socket, RAM type, GPU length, cooler height). (4) Assemble: put CPU, RAM, M.2 SSD and cooler on the motherboard OUTSIDE the case first, then mount the PSU, motherboard and GPU, then cables. (5) First boot: update BIOS if needed, turn on EXPO/XMP for the RAM, install Windows from a USB, then GPU drivers, then stress test.\nParts you need: CPU, motherboard, RAM, SSD, GPU (unless the CPU has integrated graphics), power supply, CPU cooler (some CPUs ship with one, most do not), case, case fans if the case has few, Windows license. Also a monitor, keyboard and mouse. Tools: one Phillips #2 screwdriver is enough.`
  ),
  k(
    'kb-pc-build-order-compat',
    'PC compatibility checklist: will these parts fit together',
    [
      'will my parts fit together', 'pc parts compatibility', 'how to check pc compatibility', 'is my cpu compatible with my motherboard', 'what is compatible with what in a pc',
      'compatibility checklist pc build', 'pcpartpicker compatibility', 'do my parts work together',
    ],
    `Compatibility rules, in order:\n1) CPU socket must match the motherboard socket: AM4 (Ryzen 1000-5000), AM5 (Ryzen 7000/8000/9000), LGA1700 (Intel 12th-14th gen), LGA1851 (Intel Core Ultra 200S).\n2) RAM type must match the board: AM5 and LGA1851 are DDR5 only; AM4 is DDR4 only; LGA1700 boards are EITHER DDR4 or DDR5 depending on the model.\n3) The chipset must support the CPU (a BIOS update may be needed for newer CPUs on older boards).\n4) Motherboard size (ATX / micro-ATX / mini-ITX) must fit the case.\n5) GPU length and thickness must fit the case (check the case's max GPU length in mm) and the PSU needs the right power connectors (8-pin PCIe or 12V-2x6).\n6) CPU cooler height must be under the case's max cooler height; radiators (AIO) must fit a case mount spot; RAM must not be taller than the cooler allows.\n7) PSU wattage = GPU + CPU + ~150 W headroom, and an ATX 3.x PSU with a native 12V-2x6 cable for new Nvidia cards.\n8) M.2 SSD slots: check the board has one and that it is PCIe 4.0/5.0 if the drive is.\nBest habit: enter the parts on PCPartPicker.com, it checks most of this automatically.`
  ),
  k(
    'kb-pc-assembly-steps',
    'Step-by-step PC assembly',
    [
      'how to assemble a pc step by step', 'order to install pc parts', 'how to install cpu ram cooler', 'how to put a pc together', 'pc assembly guide', 'how to install a motherboard in a case',
      'how to install a gpu', 'how to connect pc cables', 'which cables go where in a pc', 'front panel connectors pc',
    ],
    `Assembly order that avoids pain: (1) On the motherboard box: lift the CPU socket lever, drop the CPU in matching the triangle marker (never force it; on AMD AM5 and Intel LGA the pins are in the socket, bent pins are the classic mistake), close the lever. (2) Click the RAM into the right slots (with 2 sticks use slots A2 and B2, usually the 2nd and 4th from the CPU; check the manual). (3) Screw the M.2 SSD into its slot under its heatsink. (4) Mount the CPU cooler (thin even layer of thermal paste, pea-size dot; remove the plastic film from the cooler). (5) In the case: install motherboard standoffs, the I/O shield if separate, then the motherboard. (6) Mount the PSU, then route cables: 24-pin to the motherboard, the 8-pin (EPS 4+4) CPU cable at the top of the board, then the GPU. (7) Install the GPU in the top PCIe x16 slot and connect its PCIe/12V-2x6 power cable fully (it must click, a half-seated 12V-2x6 connector is dangerous). (8) Plug in the case's front panel header (power switch, reset, LEDs), front USB and audio, and case fans. (9) Tidy cables, close it up, plug the monitor into the GPU (not the motherboard) and power on. Never plug the monitor into the motherboard if you have a graphics card.`
  ),
  k(
    'kb-pc-first-boot-bios',
    'First boot, BIOS, EXPO/XMP and Windows install',
    [
      'first boot of a new pc', 'what to do after building a pc', 'enable expo xmp', 'how to enable xmp', 'how to enable expo on amd', 'bios settings for new pc', 'install windows on a new pc',
      'how to update bios', 'resizable bar enable', 'new pc setup checklist',
    ],
    `After the first power-on: press DEL (or F2) to enter the BIOS. 1) Check that the BIOS sees the CPU, all RAM and the SSD. 2) Update the BIOS if the board is older than the CPU (use the board maker's BIOS flashback button with a USB if the PC will not even POST). 3) Turn on EXPO (AMD) or XMP (Intel) / DOCP, otherwise your RAM runs at a slow default like 4800 MT/s instead of its rated 6000. 4) Turn on Resizable BAR / Above 4G Decoding for the GPU. 5) Keep fan curves on defaults at first. 6) Save and exit. Install Windows from a USB made with Microsoft's Media Creation Tool, pick the SSD, then install the chipset driver from AMD/Intel, the GPU driver from Nvidia/AMD/Intel directly, and Windows Update. Then test: temperatures with HWiNFO, a stress test (OCCT or Cinebench), RAM with MemTest86 or OCCT memory, and a game. A new AM5 PC can sit on a black screen for 1-3 minutes on the first boot while it does memory training. That is normal, wait before panicking.`
  ),
  k(
    'kb-pc-troubleshooting-no-post',
    'PC will not turn on or no display: troubleshooting',
    [
      'pc wont turn on after building', 'no display on new pc', 'pc will not post', 'black screen after building a pc', 'motherboard debug lights red', 'pc turns on but no signal',
      'new pc fans spin but no screen', 'qcode led cpu dram vga boot', 'pc boot loop after build', 'why wont my pc boot',
    ],
    `Check in this order: 1) Power: PSU switch on, 24-pin and the CPU 8-pin EPS plugged in, front-panel power header on the correct two pins (try shorting the two pins with a screwdriver to rule out the case button). 2) Monitor cable in the GRAPHICS CARD, not the motherboard, and the right input selected. 3) Reseat the RAM (a hard click on both sides) and try one stick in the slot the manual says. 4) Reseat the GPU and its power cable. 5) Look at the motherboard debug LEDs: CPU = CPU/cooler/power problem, DRAM = RAM problem (the most common, also memory training taking minutes on AM5/new Intel), VGA = GPU, BOOT = no bootable drive/OS installed. 6) Clear CMOS (remove the coin battery for 30 s or use the button) and update the BIOS (BIOS flashback). 7) Look for a forgotten standoff shorting the board, cooler mounted too tight, or a bent socket pin. 8) Try a different PSU cable/PSU if you have one. If it powers on for a second and turns off, suspect RAM or the CPU power cable.`
  ),

  // ---------------------------------------------------------------- the RAM crisis
  k(
    'kb-pc-ram-crisis-2026',
    'The RAM crisis right now (2025-2026 DRAM shortage)',
    [
      'ram crisis', 'ram shortage', 'why is ram so expensive', 'why are ram prices so high', 'ddr5 prices 2026', 'dram shortage ai', 'memory price crisis', 'ram prices right now',
      'when will ram prices go down', 'ram price increase explained', 'is it a bad time to buy ram', 'should i buy ram now', 'ram prices tripled', 'memory shortage hbm',
    ],
    `Snapshot as of Sept/Oct 2026 (prices change weekly, check live): there is a global DRAM shortage that started in the second half of 2025 and exploded in 2026. Cause: AI data centers. Samsung, SK hynix and Micron, who make roughly 90-95% of the world's DRAM, moved a large share of their fab capacity to HBM and server memory for AI accelerators because it earns far more per wafer than consumer DDR5/DDR4, so there is not enough regular PC memory. Result: contract prices for PC DRAM rose at record speed (TrendForce reported something like +90-110% quarter-over-quarter in Q1 2026, the biggest jump on record). A 32GB DDR5-6000 kit that cost roughly $90-110 in mid-2025 was commonly reported at about $300-500 in 2026, DDR4 spiked too because makers cut DDR4 production. NAND (SSDs) also rose sharply, for the same AI reason. Late-summer reports said the retail surge was starting to cool because buyers hit an affordability limit, but AI demand keeps contract prices climbing, and analysts mostly expect no real relief before 2027 (new fabs ramp), with prices staying well above 2024 levels into 2027-2028. Consumer impact: PC builds cost more, prebuilts and laptops got pricier or shipped with less RAM, and some vendors raised GPU prices because GPUs use the same memory chips.`
  ),
  k(
    'kb-pc-ram-crisis-advice',
    'How to build a PC during the RAM crisis (buying advice)',
    [
      'how to save money on ram during the shortage', 'should i buy ddr4 or ddr5 now', 'buy ram now or wait', 'ram shortage pc build advice', 'cheapest way to build a pc with expensive ram',
      '16gb or 32gb ram during shortage', 'is a prebuilt cheaper with the ram crisis', 'how to build a pc with the ram prices', 'used ram worth it', 'ddr4 build still worth it',
    ],
    `Practical advice during the RAM crisis (Oct 2026): 1) Buy 2 sticks (2x16GB = 32GB) of DDR5-6000 CL30-36 if you are building a new AM5 or Intel Core Ultra PC, 32GB is the sweet spot, but 2x8GB (16GB) is acceptable for pure 1080p esports if the price is painful; the free slots let you add more later. 2) Do not buy 4 sticks, 2 sticks are faster and more stable. 3) A budget path that avoids DDR5 prices: stay on AM4 (Ryzen 5 5600 / 5700X3D / 5800X3D) with DDR4, which still plays modern games well; but DDR4 was also hit by the shortage, so compare real listings before assuming it is much cheaper. 4) Compare a prebuilt: big system integrators bought memory early and sometimes sell a whole PC cheaper than the parts, check before you commit. 5) Buy the amount you need now, and upgrade later; do not panic-buy 64GB. 6) Do not pay scalper prices: use PCPartPicker price history and set alerts, the price moves in waves. 7) Used DDR4/DDR5 from trusted sellers can save money but check seller ratings and test with MemTest86. 8) Do not skimp on the GPU to afford RAM: the GPU matters more in games. 9) Expect prices to stay high through at least 2027 per analysts, so waiting 3-4 months rarely saves much; wait only if your current PC works fine.`
  ),
  k(
    'kb-pc-storage-price-crisis',
    'SSD and storage prices in 2026 (NAND shortage)',
    [
      'ssd prices 2026', 'why are ssds expensive', 'nand shortage', 'nvme prices going up', 'should i buy an ssd now', 'ssd price increase ai', 'hdd vs ssd price 2026', 'best value ssd right now',
    ],
    `Snapshot as of Sept/Oct 2026: NAND flash prices roughly doubled from late 2025 and kept rising (TrendForce expected another ~15-20% quarter-over-quarter in Q4 2026), because AI data centers now compete with consumers for the same NAND. A 2TB NVMe SSD that cost roughly $120-150 a year earlier was commonly seen at around $300-480. Advice: buy a PCIe 4.0 NVMe (the value sweet spot, game loading barely benefits from PCIe 5.0), buy only the capacity you need (1TB is fine for a gaming PC with a Windows drive, add a 2nd SSD or a hard drive later), and for bulk storage a hard disk (HDD) is still far cheaper per terabyte, though HDD prices also rose due to AI storage demand. Skip QLC and DRAM-less drives for the main Windows drive if you can. Relief is expected in 2027 at the earliest.`
  ),
  k(
    'kb-pc-gpu-market-2026',
    'GPU market right now (Oct 2026): prices, shortages, what to buy',
    [
      'gpu prices right now', 'graphics card prices 2026', 'is it a good time to buy a gpu', 'rtx 5090 price', 'gpu shortage 2026', 'best gpu to buy now', 'should i wait for rtx 50 super', 'why are gpus so expensive',
      'graphics card shortage ai', 'gpu price increase 2026', 'what gpu should i buy in 2026',
    ],
    `Snapshot as of Sept/Oct 2026 (street prices, rounded, in USD; they move weekly): GPU prices are above launch MSRP because AI and data-center demand for the same chips and GDDR7 memory crowds out consumer supply, and memory costs rose. Reported street prices: RTX 5090 (32GB, MSRP $1,999) roughly $2,400-4,200 and often out of stock; RTX 5080 (16GB, MSRP $999) around $1,200-1,300; RTX 5070 Ti (16GB, MSRP $749) around $1,000; RTX 5070 (12GB, MSRP $549) around $630; RTX 5060 Ti 16GB (MSRP $429) around $580; RTX 5060 (MSRP $299) around $350; AMD RX 9070 XT (16GB, MSRP $599) around $690-760; RX 9060 XT 16GB (MSRP $349) around $470; Intel Arc B580 (12GB, MSRP $249) around $300. AMD cards increased in price less than Nvidia's. The rumored RTX 50 Super refresh was repeatedly reported delayed or possibly cancelled, with early 2027 floated, so do not wait for it unless you can live without a GPU. Best value picks now: RX 9070 XT for 1440p/4K raster value, RX 9060 XT 16GB or RTX 5060 Ti 16GB for 1080p/1440p, RTX 5070 / 5070 Ti if you want Nvidia features (DLSS 4, best ray tracing, CUDA for AI/editing). Always check live prices on PCPartPicker or a GPU price tracker before buying.`
  ),

  // ---------------------------------------------------------------- CPUs
  k(
    'kb-pc-cpu-basics',
    'CPU basics: cores, threads, clocks, cache and what matters for gaming',
    [
      'best cpu for gaming', 'best gaming cpu', 'which cpu should i buy', 'what cpu should i get', 'best processor for gaming', 'which processor is best',
      'what is a cpu', 'how to choose a cpu', 'cores vs threads', 'does cpu matter for gaming', 'cpu clock speed vs cores', 'what is cpu cache', 'how many cores do i need for gaming', 'cpu for gaming or productivity',
      'what is 3d v-cache', 'what is boost clock', 'what is tdp',
    ],
    `The CPU is the brain: it runs the game logic, the OS and everything not done by the GPU. Cores run tasks in parallel (threads are virtual halves of a core, SMT/Hyper-Threading). For gaming, a fast, large-cache CPU with 6-8 good cores is plenty: single-thread speed and cache matter more than core count. AMD's X3D chips add a huge stacked L3 cache (3D V-Cache) which makes games run noticeably faster; that is why the Ryzen 7 9800X3D and 7800X3D are the gaming kings. For editing, rendering, streaming and compiling, more cores win (Ryzen 9 / Core Ultra 9). Boost clock is the max speed under light load; TDP/PBP is a rough power class, not exact heat or power draw. Pair the CPU with the right GPU: at 4K the GPU does most of the work and CPU choice matters less, at 1080p/1440p high-refresh the CPU matters more. A "bottleneck" is simply the slower part limiting the faster one.`
  ),
  k(
    'kb-pc-amd-ryzen-lineup',
    'AMD Ryzen CPU lineup (AM4 and AM5): what to buy',
    [
      'best cpu for gaming', 'best gaming cpu 2026', 'ryzen 9800x3d vs 7800x3d', '9800x3d vs 7800x3d', 'which ryzen should i buy',
      'ryzen 9000 series', 'ryzen 7 9800x3d', 'ryzen 5 7600', 'best amd cpu for gaming', 'ryzen 7000 vs 9000', 'ryzen 9 9950x3d', 'ryzen 5 9600x', 'ryzen 7 7800x3d', 'ryzen 5 5600', 'ryzen 7 5700x3d', 'amd cpu lineup',
      'am5 cpus list', 'am4 cpus still worth it', 'ryzen 9850x3d',
    ],
    `AMD desktop CPUs (Zen architecture). AM5 platform (DDR5 only, PCIe 5.0): Ryzen 7000 (Zen 4), Ryzen 9000 (Zen 5), plus 8000G APUs with integrated graphics. Key chips: Ryzen 5 7600 / 9600X (6 cores, best budget AM5 gaming chips), Ryzen 7 7700 / 9700X (8 cores), Ryzen 7 7800X3D (8 cores, 3D V-Cache, still near the top for gaming), Ryzen 7 9800X3D (8 cores, the fastest gaming CPU for most people, with an even higher clocked 9850X3D refresh reported), Ryzen 9 7900X / 9900X (12 cores), Ryzen 9 7950X3D / 9950X3D (16 cores with 3D V-Cache: top gaming plus top productivity, the most expensive). AM4 platform (DDR4 only, older but still great value): Ryzen 5 5600 (6 cores, best budget CPU), Ryzen 7 5700X3D and 5800X3D (X3D gaming chips on a cheap DDR4 platform), Ryzen 7 5700X. Rules of thumb: for gaming buy X3D if budget allows (9800X3D, or 7800X3D if cheaper); for value buy Ryzen 5 7600/9600X; for workstation buy the 9950X3D or 9950X. AM5 is promised until at least 2027 and Ryzen 10000 (Zen 6) is expected on AM5 too, so AM5 boards have an upgrade path. Ryzen chips run warm by design (up to ~95 degC under load is normal) and need a decent cooler.`
  ),
  k(
    'kb-pc-intel-core-lineup',
    'Intel Core CPU lineup (LGA1700 and LGA1851): what to buy',
    [
      'intel core ultra 200s', 'core ultra 9 285k', 'core ultra 7 265k', 'core ultra 5 245k', 'intel 14900k problems', 'intel vs amd cpu 2026', 'best intel cpu for gaming', 'lga1851 vs lga1700', 'arrow lake refresh 270k plus',
      'intel i5 14600k', 'intel core i5 13400f', 'intel cpu lineup', 'is intel good for gaming now',
    ],
    `Intel desktop CPUs. LGA1851 (Core Ultra 200S "Arrow Lake", DDR5 only, boards: Z890/B860/H810): Core Ultra 9 285K (24 cores), Core Ultra 7 265K(F) (20 cores), Core Ultra 5 245K(F) (14 cores), and the "Plus" refresh (Core Ultra 7 270K Plus and Core Ultra 5 250K Plus, around March 2026) which raised clocks and sped up the die interconnect on the same socket. Arrow Lake is efficient and strong in productivity but AMD's X3D chips lead it in gaming by a big margin (often 20-35% in CPU-bound games). Previous generation LGA1700 (12th-14th gen: Core i5-12400F, 13400F, 14600K, 14700K, 14900K): boards are DDR4 or DDR5 depending on the model; the 13th/14th-gen K chips (13900K/14900K, 13700K/14700K) had a known instability/degradation issue fixed by Intel microcode updates in 2024, so update the BIOS and look at the warranty. Value pick: Core i5-13400F / 12400F on a cheap DDR4 board or Core Ultra 5 245K for a new platform. Intel's next desktop generation, Nova Lake (Core Ultra 400, new LGA1954 socket, new Z990-class boards), is expected around early 2027 with a big core-count jump, which means LGA1851 is a short-lived platform. Intel generally runs the cooling needs lower than AMD's flagship in idle, but 14th-gen K chips and 285K can draw a lot of power under heavy load.`
  ),
  k(
    'kb-pc-upcoming-cpu-gpu',
    'Upcoming PC hardware: Zen 6, Nova Lake, RTX 50 Super, next GPUs',
    [
      'ryzen 10000', 'zen 6 release date', 'nova lake release date', 'rtx 50 super release', 'what is coming next in pc hardware', 'should i wait for zen 6', 'new cpus coming 2027', 'rdna 5 udna', 'rtx 60 series release',
      'should i wait to build my pc', 'ces 2027 pc hardware',
    ],
    `Expected (rumors and roadmaps as of Oct 2026, dates can slip): AMD Ryzen 10000 "Olympic Ridge" (Zen 6) for AM5 is reported for a CES 2027 announcement and a first-half-2027 launch (some sources said Zen 6 appears on server EPYC first); AMD has said AM5 supports it, usually via a BIOS update. Intel Nova Lake-S (Core Ultra 400) on the new LGA1954 socket: mass production in Q4 2026, first CPUs reported for Q1 2027, up to a very high core count, with new motherboards. Nvidia RTX 50 Super refresh: repeatedly reported delayed or maybe cancelled because GDDR7 memory is scarce; early 2027 floated. Nvidia's next architecture and AMD's next Radeon generation (RDNA 5 / UDNA) are expected later in 2027+, no firm dates. Advice: waiting is a gamble in this market because the RAM and GPU shortage keeps prices high; if your PC is dead or too slow, build now on AM5 (it should take Zen 6) and upgrade the CPU later. If you can wait and your current PC works, waiting until spring 2027 for the new CPU wave and clearer prices is reasonable.`
  ),

  // ---------------------------------------------------------------- GPUs
  k(
    'kb-pc-gpu-basics',
    'GPU basics: how to choose a graphics card',
    [
      'what gpu should i buy', 'best gpu for 1440p', 'best graphics card for gaming', 'which graphics card should i buy', 'what graphics card do i need', 'best gpu for 1080p', 'best gpu for 4k', 'how to pick a gpu',
      'what is a gpu', 'how to choose a graphics card', 'gpu vs cpu', 'how much vram do i need', 'vram explained', 'what gpu for 1080p 1440p 4k', 'integrated vs dedicated graphics', 'gpu tiers explained', 'rasterization vs ray tracing',
      'is 8gb vram enough 2026', 'gpu for 144hz gaming',
    ],
    `The GPU draws the picture and is the most important gaming part. Choose by your monitor: 1080p -> an RTX 5060 / RX 9060 XT class; 1440p -> RTX 5070 / RX 9070 / RTX 5070 Ti / RX 9070 XT class; 4K -> RTX 5080 / RTX 5090 / RX 9070 XT with upscaling. VRAM (video memory): 8GB is the bare minimum for 1080p and is already limiting in new games at high texture settings; 12GB is fine for 1080p-1440p; 16GB is the comfortable target for 1440p and entry 4K; 24-32GB is for 4K maxed, heavy mods, AI and editing. Rasterization = the normal way games draw; ray tracing = realistic lighting that is heavy on performance, where Nvidia is stronger; upscalers (DLSS, FSR, XeSS) render at lower resolution and upscale to raise fps; frame generation inserts extra frames (more fps but a bit more input latency). Integrated graphics (iGPU, built into some CPUs, like Ryzen 8000G) can run light games but a dedicated GPU is far faster. Always buy the model with the larger VRAM if two versions exist (e.g. RTX 5060 Ti 16GB vs 8GB; RX 9060 XT 16GB vs 8GB).`
  ),
  k(
    'kb-pc-nvidia-rtx50',
    'Nvidia GeForce RTX 50 series (Blackwell): models, VRAM, MSRP',
    [
      'rtx 5090', 'rtx 5080', 'rtx 5070 ti', 'rtx 5070', 'rtx 5060 ti', 'rtx 5060', 'rtx 5050', 'rtx 50 series specs', 'nvidia rtx 50 lineup', 'rtx 5090 vram', 'rtx 5070 12gb vs 9070', 'blackwell gpus',
    ],
    `Nvidia GeForce RTX 50 series (Blackwell, launched Jan-2025 onward, GDDR7 memory on most models). Launch prices (MSRP, USD): RTX 5090 32GB $1,999 (the fastest consumer GPU, 575 W, needs a big PSU); RTX 5080 16GB $999; RTX 5070 Ti 16GB $749; RTX 5070 12GB $549; RTX 5060 Ti 8GB $379 / 16GB $429; RTX 5060 8GB $299; RTX 5050 8GB $249. They add DLSS 4 with Multi Frame Generation (up to 3 extra generated frames per real frame, only on RTX 50), the transformer-based upscaler (also available on RTX 20/30/40 for upscaling), and better ray tracing. Notes: the RTX 5070's 12GB is the weak spot against AMD's 16GB RX 9070; the 8GB cards (5060 Ti 8GB, 5060, 5050) struggle in new games at high textures, so prefer the 16GB 5060 Ti. Street prices in late 2026 are well above MSRP (see the GPU market entry). The 5090 power connector (12V-2x6) must be fully seated.`
  ),
  k(
    'kb-pc-amd-rx9000',
    'AMD Radeon RX 9000 series (RDNA 4) and older RX 7000',
    [
      'rx 9070 xt', 'rx 9070', 'rx 9060 xt', 'amd radeon rx 9000', 'rx 9070 xt vs rtx 5070 ti', 'fsr 4', 'rdna 4', 'rx 7800 xt', 'rx 7900 xtx', 'best amd gpu 2026', 'amd gpu lineup',
    ],
    `AMD Radeon RX 9000 series (RDNA 4, 2025): RX 9070 XT 16GB (MSRP $599), RX 9070 16GB (MSRP $549), RX 9060 XT 8GB ($299) and 16GB ($349). There is no RX 9000 high-end 4K flagship; AMD went for mainstream value. The RX 9070 XT performs close to an RTX 5070 Ti in regular (raster) games at a lower price and with 16GB of VRAM, and is the best-value GPU for 1440p and entry 4K in 2026. FSR 4 (machine-learning upscaler) is exclusive to RDNA 4 and looks much better than FSR 3, but fewer games support it than DLSS; AMD's ray tracing is better than before but still behind Nvidia. Older RX 7000 (RDNA 3): RX 7600/7700 XT/7800 XT/7900 XT/7900 XTX are fine if found cheap used, but they lack FSR 4. AMD cards need a driver install from AMD (Adrenalin). AMD prices rose less than Nvidia's in 2026 (street around 15-35% above MSRP).`
  ),
  k(
    'kb-pc-intel-arc',
    'Intel Arc GPUs (Battlemage B-series and Alchemist)',
    [
      'intel arc b580', 'intel arc b570', 'intel arc gpu', 'is intel arc good', 'battlemage gpus', 'arc a750', 'best budget gpu intel', 'xess upscaling', 'intel arc drivers',
    ],
    `Intel Arc: Battlemage (B-series, Dec 2024/Jan 2025): Arc B580 12GB (MSRP $249) and B570 10GB ($219) are the best budget 1080p/1440p cards for the money, with more VRAM than Nvidia/AMD's cheapest cards, and good ray-tracing for the price. Older Alchemist: A580/A750/A770 (cheap used). Caveats: Arc relies on a modern CPU, and older CPUs without Resizable BAR support lose a lot of performance; drivers have improved a lot but older games (DX9/DX11) and some features still lag behind; XeSS is Intel's upscaler. Best use: a budget gaming PC where the B580 beats the RTX 5050/5060 8GB in VRAM-limited cases. Street price in 2026 is around $300 (above MSRP).`
  ),
  k(
    'kb-pc-upscaling-framegen',
    'DLSS, FSR, XeSS, frame generation and Reflex explained',
    [
      'what is dlss', 'dlss vs fsr', 'what is frame generation', 'dlss 4 multi frame generation', 'is frame gen worth it', 'what is xess', 'nvidia reflex', 'upscaling explained', 'dlss quality vs performance',
      'does frame generation add input lag', 'fsr 4 vs dlss 4',
    ],
    `Upscaling renders the game at a lower internal resolution and uses AI/math to reconstruct a higher-res image, giving more fps with a small quality cost. DLSS (Nvidia, RTX cards only; DLSS 4 uses a transformer model for sharper images, available to all RTX cards for upscaling); FSR (AMD; FSR 4 is machine learning, RDNA 4 cards only, FSR 3 works on almost any GPU); XeSS (Intel, works on most GPUs best on Arc). Modes: Quality (renders at ~67%), Balanced, Performance (~50%), Ultra Performance. Frame generation creates extra frames between real ones: Nvidia's Multi Frame Generation (RTX 50 only) can make up to 3 extra frames, AMD has FSR Frame Generation / AFMF. It raises the fps number a lot but adds a little latency and works best when the base fps is already about 60+; Nvidia Reflex and AMD Anti-Lag reduce that latency. Rule: use upscaling Quality/Balanced always; use frame generation for single-player games, avoid it in competitive shooters.`
  ),
  k(
    'kb-pc-gpu-board-partners',
    'GPU board partners and which brand to pick',
    [
      'asus vs msi vs gigabyte gpu', 'best gpu brand', 'gpu partner brands', 'what is a founders edition', 'evga graphics cards', 'sapphire vs xfx powercolor', 'which gpu brand is most reliable', 'zotac gpu good',
    ],
    `Nvidia and AMD sell the GPU chip; "board partners" (AIBs) build and sell the cards. Nvidia partners: ASUS (ROG Strix premium, TUF mid, Prime budget), MSI (Suprim premium, Gaming Trio mid, Ventus budget), Gigabyte (Aorus, Gaming OC, Eagle), Zotac, PNY, Palit/Gainward, Inno3D, Colorful. Nvidia's own Founders Edition cards are compact, good quality and sold at MSRP when in stock. AMD partners: Sapphire (Nitro+/Pulse, widely praised), PowerColor (Reaper/Hellhound/Red Devil), XFX, ASRock, ASUS, Gigabyte. EVGA stopped making GPUs in 2022. Advice: the chip decides the performance; the brand mostly changes cooler quality, noise, warranty and price. Pick a model with a thick cooler, 3 fans on 70-class and above, a good warranty, and good reviews for noise. Avoid paying a lot more for a tiny factory overclock.`
  ),

  // ---------------------------------------------------------------- RAM
  k(
    'kb-pc-ram-basics',
    'RAM basics: DDR4 vs DDR5, speed, CL, capacity, dual channel',
    [
      'what is ram', 'ddr4 vs ddr5', 'how much ram do i need', 'ram speed explained', 'what is cl latency ram', 'dual channel ram', 'ram 6000 cl30', 'ddr5 6000 sweet spot', 'does ram speed matter for gaming',
      '16gb vs 32gb ram', 'single vs dual rank ram', 'how many ram sticks should i use', 'ram timings explained', 'what is ram mt/s',
    ],
    `RAM is the PC's short-term working memory. DDR4 (older, used with AM4 and some LGA1700 boards) vs DDR5 (newer, faster, needed for AM5, LGA1851 and Intel DDR5 boards); they are NOT interchangeable, the notch is in a different place. Capacity: 16GB is the minimum for gaming today, 32GB is the recommended standard in 2026 (modern games plus Discord/browser can use 20GB+), 64GB for editing, streaming, VMs and AI. Speed is in MT/s (DDR5-6000 is the sweet spot for AMD AM5 because it runs the memory controller in sync; Intel Arrow Lake can use faster 6400-8000 kits). CL (CAS latency) is the delay in cycles, lower is better; DDR5-6000 CL30 is the gold standard, CL36 is fine. For real latency compare speed and CL together. Always use 2 sticks in dual channel (2x16GB beats 1x32GB for speed) and put them in the correct slots (usually 2nd and 4th from the CPU). 4 sticks lowers the max stable speed on most boards. Turn on EXPO (AMD) or XMP (Intel) in the BIOS or the kit runs slowly. Gaming difference between DDR5-5200 and 6000 is small (a few %), between 8GB total and 16GB it is huge.`
  ),
  k(
    'kb-pc-ram-brands-vendors',
    'RAM brands and memory makers: who makes DRAM',
    [
      'who makes ram', 'best ram brands', 'g.skill vs corsair vs kingston ram', 'samsung sk hynix micron ram chips', 'crucial ram exit', 'micron crucial consumer business', 'what ram brand should i buy', 'cxmt dram china',
      'which ram brand is best', 'teamgroup patriot ram',
    ],
    `Only a few companies make the DRAM chips: Samsung, SK hynix and Micron (roughly 90-95% of the market), plus China's CXMT growing in the budget/domestic market. Module brands buy chips and build kits with heatsinks and sell them: G.Skill (Trident Z5, Ripjaws; popular with enthusiasts, often Hynix/Samsung chips), Corsair (Vengeance, Dominator), Kingston (Fury Beast/Renegade), TeamGroup (T-Force), Patriot, ADATA/XPG, Crucial (Micron's consumer brand; Micron announced in Dec 2025 that it would wind down the Crucial consumer business by early 2026 to focus on AI/data-center customers, which tightened supply for consumers) and Lexar. Which brand? Choose by the kit's rated spec (DDR5-6000 CL30-36, EXPO for AMD or XMP for Intel), warranty, and price; SK hynix A-die/M-die and Samsung chips overclock well. Buy kits on the motherboard maker's QVL (qualified vendor list) when possible for fewer problems.`
  ),

  // ---------------------------------------------------------------- storage
  k(
    'kb-pc-storage-basics',
    'Storage basics: NVMe, SATA SSD, HDD, PCIe 4.0 vs 5.0, QLC, DRAM cache',
    [
      'ssd vs hdd', 'nvme vs sata ssd', 'pcie 4.0 vs 5.0 ssd', 'what is qlc ssd', 'dram less ssd', 'how much storage do i need for gaming', 'best ssd for gaming', 'm.2 ssd explained', 'do i need a heatsink on my nvme',
      'best nvme ssd brands', 'samsung 990 pro vs wd sn850x', 'is 1tb enough for gaming',
    ],
    `Storage types: NVMe SSD (M.2 stick, PCIe; Gen3 ~3,500 MB/s, Gen4 ~7,000 MB/s, Gen5 ~10,000-14,000 MB/s), SATA SSD (~550 MB/s, 2.5-inch), HDD (spinning, 100-250 MB/s, cheapest per terabyte, good for bulk storage/backups only). For games and Windows use an NVMe SSD; PCIe 4.0 is the value sweet spot because games barely load faster on Gen5 (DirectStorage helps little so far). Look for TLC NAND and a DRAM cache or HMB; avoid QLC and DRAM-less drives for your main drive if you can (slow when full). Capacity: 1TB is the practical minimum for a gaming PC today (games are 50-150GB each), 2TB is comfortable, add a second drive later. A heatsink matters for Gen5 and sustained writes (motherboards usually include one). Good Gen4 drives: Samsung 990 Pro / 990 Evo Plus, WD_BLACK SN850X (SanDisk), Crucial T500, Kingston KC3000/Fury Renegade, SK hynix P41/Platinum, Lexar NM790, Kioxia Exceria Pro. Prices rose a lot in 2026 (see the storage price entry).`
  ),

  // ---------------------------------------------------------------- motherboards
  k(
    'kb-pc-motherboard-basics',
    'Motherboards: chipsets, VRM, form factors and what to look for',
    [
      'how to choose a motherboard', 'motherboard chipset explained', 'b650 vs x670 vs b850', 'x870e vs x870 vs b850', 'z890 vs b860', 'atx vs micro atx vs mini itx', 'what is a vrm', 'do i need an expensive motherboard',
      'best motherboard for ryzen 7 9800x3d', 'best budget am5 motherboard', 'motherboard features that matter', 'a620 vs b650', 'b840 chipset',
    ],
    `The motherboard connects everything. Pick by socket, chipset, form factor and VRM quality. AMD AM5 chipsets: X870E (flagship, PCIe 5.0 GPU + storage, USB4), X870 (similar, slightly fewer features), B850 (best value: PCIe 5.0 GPU/SSD, great for X3D CPUs), B840 (entry), A620 (cheapest, no CPU overclocking, basic VRM); older X670E/X670/B650E/B650 (very good, often cheaper). Intel LGA1851 (Core Ultra 200S): Z890 (overclocking), B860 (value), H810 (basic). LGA1700: Z790/B760/H610. Form factor: ATX (most slots, biggest), micro-ATX (cheaper, 4 RAM slots, fewer PCIe slots), mini-ITX (tiny, 2 RAM slots, premium price). The VRM (power delivery for the CPU) must be adequate: a Ryzen 7 9800X3D is easy to power on any decent B850/B650 board; a 16-core or a K-series Intel chip wants a stronger VRM. Also check: number of M.2 slots, rear USB, Wi-Fi 6E/7 and 2.5G LAN, BIOS flashback button (lets you update the BIOS without a CPU), and the number of fan headers. Do NOT overpay for X870E if you do not need PCIe 5.0 or USB4; B850 is the sweet spot for most builds. Big brands: ASUS (ROG, TUF, Prime), MSI, Gigabyte (Aorus), ASRock.`
  ),
  k(
    'kb-pc-socket-guide',
    'CPU sockets guide: AM4, AM5, LGA1700, LGA1851, LGA1954',
    [
      'what socket do i need', 'am4 vs am5', 'lga1700 vs lga1851', 'is am5 future proof', 'what is a cpu socket', 'will zen 6 work on am5', 'lga 1954 nova lake socket', 'which cpu socket is best to buy now', 'upgrade path pc socket',
    ],
    `A socket is the physical and electrical connection between CPU and board. AM4 (AMD, 2016-2024): Ryzen 1000-5000, DDR4 only; an end-of-line platform but still a great budget option (Ryzen 5 5600 / 5700X3D / 5800X3D). AM5 (AMD, 2022 onward): Ryzen 7000/8000G/9000, DDR5 only, PCIe 5.0; AMD committed to support it through at least 2027 and Zen 6 (Ryzen 10000) is reported to work on AM5 with a BIOS update: the best long-term buy. LGA1700 (Intel 12th-14th gen): DDR4 or DDR5 depending on the board, end-of-life. LGA1851 (Intel Core Ultra 200S, DDR5 only): a short-lived socket, Intel's next generation Nova Lake is reported to use LGA1954. Practical rule: if you want an upgrade path buy AM5; if you want the cheapest decent gaming build buy AM4 or a used LGA1700 board with DDR4; avoid LGA1851 unless you need Intel for a specific reason.`
  ),

  // ---------------------------------------------------------------- PSU
  k(
    'kb-pc-psu-guide',
    'Power supply (PSU): wattage, 80 Plus, ATX 3.x, 12V-2x6 and picks',
    [
      'what power supply do i need', 'what psu for a 5080', 'how many watts psu rtx 5080', 'psu for rtx 5070 ti', 'what psu wattage for my gpu',
      'how many watts do i need', 'what psu do i need for rtx 5090', 'psu wattage for rtx 5080', '80 plus bronze vs gold', 'atx 3.1 psu', '12v-2x6 connector', '12vhpwr melting', 'best psu brands', 'seasonic corsair msi psu',
      'psu tier list', 'do i need a modular psu', 'can i use an old psu', 'psu calculator',
    ],
    `The PSU feeds everything, so never go cheap. Size it by the GPU: RTX 5060 / RX 9060 XT -> 550-650W; RTX 5070 / RX 9070 -> 650-750W; RTX 5070 Ti / RX 9070 XT -> 750-850W; RTX 5080 -> 850-1000W; RTX 5090 -> 1000-1200W (the card alone is 575W). Add the CPU (65-250W) and headroom of 20-30%. 80 Plus rating is efficiency (Bronze, Silver, Gold, Platinum, Titanium): Gold is the sweet spot; it does NOT mean build quality, so check a trusted tier list (Cybenetics ratings, Tom's Hardware PSU tests, the "PSU Tier List"). ATX 3.0/3.1 PSUs are built to handle the GPU power spikes of modern cards and have a native 12V-2x6 (formerly 12VHPWR) cable: use that native cable with RTX 50 cards, not a messy adapter, and push it in until it fully clicks (a half-seated connector can overheat and melt; there were melted-connector incidents on RTX 4090 and 5090). Fully modular cables make cable management easier. Trusted PSU brands/lines: Seasonic (Focus/Prime/Vertex), Corsair (RMx, RMe, HXi), MSI (MAG/MPG A-series), be quiet! (Straight Power/Pure Power), Super Flower (Leadex), FSP, Thermaltake (Toughpower), Cooler Master (V, MWE Gold), Antec, NZXT C-series. Do not reuse an old PSU older than ~8-10 years for a modern high-end GPU.`
  ),

  // ---------------------------------------------------------------- cooling & case
  k(
    'kb-pc-cooling-guide',
    'CPU cooling: air vs AIO, thermal paste, fans and airflow',
    [
      'air cooler vs aio', 'best cpu cooler 2026', 'do i need a cooler', 'thermal paste how much', 'how to cool ryzen 9800x3d', '240mm vs 360mm aio', 'noctua vs thermalright', 'case fan setup airflow', 'positive vs negative air pressure',
      'is liquid cooling worth it', 'how many case fans do i need', 'cpu temperatures normal',
    ],
    `Most CPUs (especially Ryzen 7 9800X3D, Core Ultra 7/9, Ryzen 9) need a separate cooler. Air coolers are cheap, quiet and reliable: Thermalright Peerless Assassin 120 SE / Phantom Spirit 120 (best value), Deepcool AK400/AK620, Noctua NH-D15 G2 / U12A (the quiet premium choice), be quiet! Dark Rock Pro. AIO liquid coolers (240/280/360mm radiators) cool a bit better and look cleaner but cost more and have a pump: Arctic Liquid Freezer III (best value), Corsair iCUE Link, NZXT Kraken, Lian Li Galahad, Thermalright Frozen Warframe. A 360mm AIO is for hot 16-core/Intel K chips; a good dual-tower air cooler is enough for a 9800X3D. Thermal paste: a pea-sized dot is enough (Arctic MX-4/MX-6, Noctua NT-H2). Airflow: a mesh-front case with 2-3 intake fans at the front/bottom and 1 exhaust at the rear/top is ideal (slightly positive pressure keeps dust out). Normal temps: idle 30-45 degC, gaming 60-80 degC; Ryzen is designed to boost until ~90-95 degC under heavy load, which is normal; if above 95 degC, check the cooler contact and the case airflow.`
  ),
  k(
    'kb-pc-case-guide',
    'PC cases: sizes, airflow and which to choose',
    [
      'best pc case 2026', 'mid tower vs full tower', 'mesh vs glass case airflow', 'what case for a 5090', 'micro atx case', 'itx case small form factor', 'fractal north vs lian li lancool', 'corsair 4000d airflow vs nzxt h5',
      'how to choose a pc case', 'case fits gpu length',
    ],
    `Choose a case by motherboard size, GPU length/thickness, cooler height, radiator support and airflow. ATX mid tower is the standard. Popular airflow/value cases: Lian Li Lancool 216, Corsair 4000D Airflow, NZXT H5 Flow, Fractal Design Pop Air / North (wood front), Montech Air 903 / XR, Phanteks XT Pro, be quiet! Pure Base 500 DX; premium: Lian Li O11 Dynamic EVO (showpiece), Fractal Torrent (max airflow), Hyte Y70/Y60 (aquarium style). Small: micro-ATX (Lian Li A3-mATX), mini-ITX (Fractal Terra, NR200P, Ghost S1). Mesh fronts cool better than solid glass fronts; fully glass cases look nice but trap heat unless fans are strong. Check the max GPU length (many 5090/9070 XT cards are 300-350+mm and 3-4 slots thick), max CPU cooler height (e.g. 160-170mm) and PSU shroud depth. Pre-installed fans save money; 3 included fans is a good sign. Front I/O: USB-C and USB 3.0 are standard now.`
  ),

  // ---------------------------------------------------------------- monitors & peripherals
  k(
    'kb-pc-monitor-guide',
    'Gaming monitors: resolution, refresh rate, panel type (IPS, VA, OLED), G-Sync/FreeSync',
    [
      'best gaming monitor', 'ips vs va vs oled', '1080p vs 1440p vs 4k monitor', 'what refresh rate do i need', 'is 240hz worth it', 'what is g-sync freesync', 'oled burn in', 'qd-oled vs woled', 'response time explained',
      'monitor size for 1440p', 'ultrawide monitor gaming', 'hdr monitors worth it',
    ],
    `Match the monitor to the GPU. 1080p 144-240Hz suits budget GPUs and esports; 1440p 165-240Hz is the sweet spot for most gamers; 4K 144Hz+ needs an RTX 5080/5090-class card or upscaling. Refresh rate: 60Hz is basic, 144-165Hz is a big smoothness upgrade, 240-360Hz helps competitive FPS players (needs high fps to matter). Panels: IPS (good colors, fast, the all-rounder), VA (best contrast for dark rooms but slower), TN (older, fast and cheap, bad colors), OLED (QD-OLED and WOLED: perfect blacks, instant response ~0.03ms, best motion clarity, but pricier, possible burn-in with static elements, and some have dimmer full-screen brightness; use screen-saver/pixel-shift features). Adaptive sync (Nvidia G-Sync, AMD FreeSync, VESA Adaptive-Sync) removes tearing; most modern monitors work with both. Size: 24-27 inch for 1080p/1440p, 27-32 inch for 4K. HDR: real HDR needs HDR600+ or OLED, cheap "HDR400" is mostly marketing. Check inputs: DisplayPort 1.4/2.1 for high refresh, HDMI 2.1 for consoles.`
  ),
  k(
    'kb-pc-peripherals-guide',
    'PC peripherals: keyboard, mouse, headset, webcam, mic',
    [
      'best gaming mouse', 'mechanical keyboard switches explained', 'linear vs tactile vs clicky', 'hall effect keyboard', 'best gaming headset', 'wired vs wireless mouse', 'polling rate mouse 8000hz', 'best keyboard for fps',
      'what mouse dpi should i use', 'good microphone for discord',
    ],
    `Keyboards: mechanical (switches: linear = smooth like Cherry Red, tactile = bump like Brown, clicky = loud like Blue); Hall-effect/magnetic switch keyboards (Wooting 60HE, SteelSeries Apex Pro TKL Gen 3, Razer Huntsman V3 Pro) offer adjustable actuation and rapid trigger, popular in competitive games. Mice: lightweight wireless mice with a good sensor are now as good as wired (Logitech G Pro X Superlight 2, Razer Viper V3 Pro, Pulsar X2, Lamzu, VAXEE); polling rate 1000Hz is plenty, 4000/8000Hz is optional and needs a strong CPU. DPI: 400-1600 with in-game sensitivity tuned. Headsets/audio: open-back headphones plus a separate mic sound best (Sennheiser HD 560S, Beyerdynamic DT 770), wireless gaming headsets from SteelSeries Arctis, HyperX, Razer; a USB mic (Samson Q2U, HyperX QuadCast, Shure MV7) is a big upgrade for Discord. Mousepad size matters for aim. Budget priority order for gaming: GPU, monitor, then peripherals.`
  ),

  // ---------------------------------------------------------------- OS, software, overclocking
  k(
    'kb-pc-windows-linux-software',
    'Windows vs Linux for a gaming PC, drivers and essential software',
    [
      'windows 11 vs linux gaming', 'do i need to buy windows', 'windows 11 license cheap', 'steamos bazzite linux gaming', 'what software to install on a new pc', 'hwinfo cinebench occt', 'gpu driver nvidia app', 'windows 10 end of support',
      'is linux good for gaming 2026', 'tpm secure boot windows 11',
    ],
    `Windows 11 is the default for gaming (best driver and anti-cheat support); you can install it for free and run it unactivated with limits, a license costs money (OEM keys). Windows 10 support ended in October 2025, so new builds should use 11 (TPM 2.0 and Secure Boot are built into modern boards). Linux gaming works well with Steam Proton and distros like Bazzite, SteamOS, Nobara or CachyOS, but some anti-cheat games (several competitive shooters) do not run on it. Essential software after building: chipset driver (AMD/Intel), GPU driver (Nvidia App / AMD Adrenalin / Intel Arc Control), HWiNFO (temperatures and sensors), Cinebench / OCCT / Prime95 (CPU stress), MemTest86 or OCCT (RAM test), 3DMark or Unigine Superposition (GPU), CrystalDiskInfo (SSD health), MSI Afterburner (GPU monitoring/undervolt). Turn on Windows Game Mode, update the BIOS now and then, and enable Resizable BAR.`
  ),
  k(
    'kb-pc-overclock-undervolt',
    'Overclocking, undervolting, PBO and Curve Optimizer',
    [
      'how to overclock cpu', 'what is pbo', 'curve optimizer undervolt', 'undervolt rtx 5080', 'should i overclock my gpu', 'is overclocking worth it 2026', 'cpu throttling', 'xmp expo overclock', 'precision boost overdrive x3d safe',
      'how to undervolt gpu msi afterburner',
    ],
    `Modern CPUs and GPUs already boost close to their limit, so manual overclocking gives little. What helps more: (1) Turn on EXPO/XMP for RAM (the biggest easy win). (2) Undervolting: lowers voltage so the chip runs cooler and quieter at the same or better speed. On AMD use Curve Optimizer (a negative offset, e.g. -15 to -30 on all cores, test stability) inside PBO (Precision Boost Overdrive); X3D chips are voltage-limited so undervolting/PBO tuning is the right way to gain performance there, raw overclocking is mostly locked. On GPUs use MSI Afterburner's voltage-frequency curve to cap voltage around 0.9V for large power and heat savings with almost no fps loss. (3) Good cooling gives a higher sustained boost. Risks: instability (crashes, WHEA errors), warranty issues on extreme voltage; always stress test with OCCT/Cinebench and a game. Never overvolt a 3D V-Cache chip manually and never exceed the board's safe limits.`
  ),
  k(
    'kb-pc-benchmarks-bottleneck',
    'Benchmarks, bottlenecks and how to check if your PC parts are balanced',
    [
      'what is a bottleneck', 'cpu bottleneck gpu', 'how to check bottleneck', 'is my cpu bottlenecking my gpu', 'balanced pc build', 'benchmark my pc', 'how to read gpu benchmarks', 'fps vs 1% lows', 'frame time explained',
    ],
    `A bottleneck is when one part limits the others. If your GPU is at 95-100% usage in a game, the GPU is the limit (normal and desirable at high settings or 4K). If the GPU sits at 60-70% and one CPU core is at 100%, you are CPU-limited (common at 1080p high refresh with a weak CPU). The fix is a faster CPU or a higher resolution/settings. Balance rule: spend most of the budget on the GPU, pair it with a CPU of about the same class (e.g. RTX 5070 / RX 9070 with a Ryzen 5 7600/9600X or better; RTX 5080/5090 with a 9800X3D). Read benchmarks by average fps AND 1% lows (the smoothness), and trust independent reviewers (Gamers Nexus, Hardware Unboxed, Digital Foundry, Tom's Hardware, TechPowerUp). Use MSI Afterburner overlay or the Nvidia/AMD overlays to see usage, temps and frame times in-game. Benchmark tools: Cinebench (CPU), 3DMark Time Spy (GPU), CapFrameX.`
  ),

  // ---------------------------------------------------------------- upgrade, prebuilts, used
  k(
    'kb-pc-prebuilt-vs-diy',
    'Prebuilt vs building your own PC (and how to check a prebuilt)',
    [
      'prebuilt vs custom pc', 'should i build or buy a prebuilt', 'is it cheaper to build a pc', 'how to judge a prebuilt gaming pc', 'bad prebuilt red flags', 'best prebuilt gaming pc brands', 'pre-built pc with ram shortage',
      'build vs buy gaming pc 2026', 'ibuypower cyberpowerpc nzxt',
    ],
    `Building usually saves 10-25% and gives better parts choice, quieter cooling and a clean upgrade path, plus you learn to fix it. A prebuilt saves time, has one warranty and support, and in 2026's RAM/GPU shortage can sometimes be cheaper than the parts because big system integrators bought memory and GPUs in bulk earlier; compare the actual part prices on PCPartPicker. Red flags in prebuilts: a proprietary motherboard or power supply (Dell/HP/Alienware), a no-name PSU, a single stick of RAM (single channel), a hard drive instead of an SSD, a weak CPU with a strong GPU, tiny coolers, or "gamer" marketing words without part names. Good prebuilt sellers: NZXT Player, Corsair, MSI, ASUS ROG, Lenovo Legion, Maingear, Origin, Velocity Micro, iBUYPOWER, CyberPowerPC (check the exact parts); check the PSU and RAM first. A mini-ITX or laptop is a different compromise. If you build, do it with the sample builds in this guide and watch one assembly video.`
  ),
  k(
    'kb-pc-used-parts-upgrade',
    'Buying used parts and upgrading an existing PC',
    [
      'buying used gpu safe', 'used cpu worth it', 'how to upgrade my old pc', 'what to upgrade first in a pc', 'gpu upgrade bottleneck old cpu', 'upgrade ram or gpu first', 'used pc parts tips', 'testing a used graphics card',
      'upgrade from gtx 1060', 'is it worth upgrading am4 to am5',
    ],
    `Upgrade priority for gaming: 1) GPU (biggest fps jump), 2) RAM from 8/16GB to 32GB if you run out, 3) SSD (if you still have a hard drive), 4) CPU (if the GPU sits below 70% usage), 5) PSU/case/cooler as needed. If you are on AM4, a Ryzen 7 5700X3D/5800X3D drop-in upgrade is the best money-per-fps upgrade and needs no new board or RAM. Going AM5 means new board, DDR5 and probably a cooler; worth it when you need a modern platform and a long-term path. Used parts: a used GPU is fine from a seller who lets you test it (run a stress test and check temps, avoid ex-mining cards with worn fans unless cheap, avoid cards with no return policy); always ask for the original receipt on high-end items, and be careful of fake/relabelled GPUs on marketplaces (check GPU-Z). Used CPUs are safe if the pins/pads are clean and the price is right; used PSUs older than ~8 years and used hard drives are not worth the risk. Test everything on arrival with the same stress tools as a new build.`
  ),

  // ---------------------------------------------------------------- sample builds
  k(
    'kb-pc-build-budget-1080p',
    'Sample build: budget 1080p gaming PC (around 2026 market)',
    [
      'budget gaming pc build', 'cheap gaming pc build 2026', 'best 800 dollar gaming pc', 'best 1000 dollar gaming pc', 'budget pc parts list', 'best 1080p gaming pc build', 'entry level gaming pc',
    ],
    `Budget 1080p (high settings, 100+ fps) example parts, chosen so they fit together (swap for current prices): CPU Ryzen 5 7600 or 9600X (AM5) or, to save on RAM, a Ryzen 5 5600 / 5700X3D on AM4; GPU Radeon RX 9060 XT 16GB or RTX 5060 Ti 16GB (avoid 8GB cards if you can); motherboard B650 / B850 / A620 mATX (AM5) or B550 (AM4); RAM 2x16GB DDR5-6000 CL30-36 (or 2x8GB if prices hurt, plan to upgrade); SSD 1TB PCIe 4.0 NVMe (Kingston NV3/Lexar NM790/WD SN7100 class); PSU 650W Gold (Corsair RM650e, MSI MAG A650GL, Cooler Master); cooler a 120mm air tower (Thermalright Assassin X / AK400); case a mesh-front ATX/mATX airflow case with fans included (Montech Air 903, Corsair 4000D). Rough total in the late-2026 market: $1,000-1,400 because RAM, SSD and GPU prices are above 2025 levels; check PCPartPicker for live totals. Target: 1080p high/ultra, 1440p medium. A budget-conscious alternative: AM4 build with DDR4 and a 5700X3D.`
  ),
  k(
    'kb-pc-build-midrange-1440p',
    'Sample build: mid-range 1440p gaming PC',
    [
      'mid range gaming pc build', '1440p gaming pc build 2026', 'best 1500 dollar gaming pc', 'best 2000 dollar gaming pc', 'pc build for 1440p 144hz', 'best value high fps pc build', 'rx 9070 xt build',
    ],
    `Mid-range 1440p (high refresh) example: CPU Ryzen 7 7800X3D or Ryzen 7 9700X, or Ryzen 7 9800X3D if the budget allows; GPU Radeon RX 9070 XT 16GB (best value) or RTX 5070 Ti / RTX 5070 if you want Nvidia features (DLSS 4, ray tracing, CUDA); motherboard B850 ATX (Gigabyte B850 Aorus Elite, MSI MAG B850 Tomahawk, ASUS TUF B850) with a BIOS flashback button; RAM 2x16GB DDR5-6000 CL30; SSD 2TB PCIe 4.0 NVMe (WD SN850X / Samsung 990 Pro / Crucial T500); PSU 750-850W Gold ATX 3.1 (Corsair RM750e/RM850e, Seasonic Focus GX, MSI MAG); cooler Thermalright Phantom Spirit 120 SE or a 240/280mm AIO (Arctic Liquid Freezer III); case Lian Li Lancool 216 / Fractal North / NZXT H5 Flow with 3+ fans; 27-inch 1440p 165-240Hz IPS/OLED monitor. Late-2026 market total with the memory and GPU surcharge is roughly $2,000-2,800 depending on the GPU and RAM price that week, so check live prices. This build plays almost everything at 1440p high/ultra at 100+ fps.`
  ),
  k(
    'kb-pc-build-highend-4k',
    'Sample build: high-end 4K gaming PC and a no-compromise build',
    [
      'high end gaming pc build', '4k gaming pc build 2026', 'best 3000 dollar gaming pc', 'rtx 5090 pc build', 'best cpu for rtx 5090', 'ultimate gaming pc', 'rtx 5080 build', '4k 144hz pc requirements',
    ],
    `High-end 4K example: CPU Ryzen 7 9800X3D (best gaming CPU) or Ryzen 9 9950X3D if you also edit/stream/render; GPU RTX 5080 16GB (4K high with DLSS) or RTX 5090 32GB for no compromise (very expensive and scarce in 2026; street often $2,400-4,200); motherboard X870E or a strong B850 (PCIe 5.0, USB4, Wi-Fi 7) from ASUS/MSI/Gigabyte; RAM 2x16GB or 2x32GB DDR5-6000 CL30 (64GB for creators); SSD 2TB PCIe 4.0/5.0 NVMe plus a second 2-4TB drive; PSU 1000-1200W ATX 3.1 Gold/Platinum with a native 12V-2x6 cable (Seasonic Vertex/Prime, Corsair HX1000i/HX1200i, MSI MEG Ai1000P); cooler a 360mm AIO (Arctic Liquid Freezer III Pro 360, Corsair iCUE Link, NZXT Kraken Elite) or a Noctua NH-D15 G2; case a high-airflow roomy case (Lian Li O11 Dynamic EVO, Fractal Torrent, Hyte Y70) that fits a 3.5-4 slot, 340mm+ GPU; 4K 144Hz OLED or mini-LED monitor. Realistic total in 2026 with RAM and GPU premiums: $3,500-7,000+. RTX 5080 with 9800X3D is the sane high-end; a 5090 is only worth it if you truly need 4K max-settings ray tracing, AI or rendering.`
  ),
  k(
    'kb-pc-build-creator-ai',
    'PC build for video editing, streaming, 3D and local AI (LLMs)',
    [
      'pc for video editing', 'best pc for streaming', 'pc build for local ai llm', 'how much vram for llm', 'cpu for video editing 2026', 'workstation pc build', 'gpu for stable diffusion', 'ram for editing 64gb', 'nvidia vs amd for ai',
      'best gpu for running local models', 'pc for blender rendering',
    ],
    `Creator/AI builds trade gaming-first logic for cores, RAM and VRAM. Video editing (Premiere, DaVinci Resolve): 8-16 fast cores (Ryzen 9 9900X/9950X, Core Ultra 7/9), 32-64GB RAM, a fast NVMe for the project plus a big second drive, a GPU with 12-16GB (NVENC on Nvidia is excellent for encoding and Resolve; Intel/AMD have hardware encoders too). Streaming: Nvidia NVENC or AV1 encoding on RTX/Arc/RX 9000 lets you stream and game on one PC with little loss. 3D/Blender rendering: GPU rendering loves Nvidia (CUDA/OptiX) and lots of VRAM; CPU rendering loves core count. Local AI / LLMs: VRAM is king because the model must fit in GPU memory: 8GB runs small models (7B quantized), 12-16GB runs 13-14B models comfortably, 24-32GB (RTX 5090, used RTX 3090/4090) runs ~30-35B quantized, and Apple Silicon Macs or systems with 64-192GB of unified/system memory run larger models more slowly. Nvidia (CUDA) has the widest software support; AMD (ROCm) works on Linux/Windows for supported cards but needs more tinkering. With the RAM crisis, buy only the RAM you need and prioritize VRAM for AI.`
  ),
  k(
    'kb-pc-laptop-vs-desktop',
    'Gaming laptop vs desktop and mini PCs',
    [
      'gaming laptop vs desktop', 'is a gaming laptop worth it', 'laptop gpu vs desktop gpu', 'rtx 5070 laptop vs desktop', 'mini pc for gaming', 'steam deck rog ally handheld pc', 'laptop with 8gb vram', 'should i buy a laptop or build a pc',
    ],
    `A desktop gives far more performance per dollar, better cooling, easy upgrades and repairs. A laptop wins on portability. Laptop GPUs share the names of desktop cards but are slower because they are power-limited (a laptop RTX 5090 performs more like a desktop RTX 5080), and many laptop GPUs have less VRAM (about 8GB on the laptop 5070, 12GB on the 5070 Ti, 16GB on the 5080 and 24GB on the 5090). Check thermals, the screen (OLED/IPS 165Hz+) and whether the RAM/SSD are upgradeable. Handheld PCs (Steam Deck, ROG Ally X, Legion Go) run PC games portably at low resolution. Mini PCs (Ryzen 8000/9000 or Strix Halo systems) fit small spaces; high-end iGPU mini PCs run 1080p medium. In the 2026 RAM shortage, laptop and mini PC prices also rose and some shipped with less RAM.`
  ),

  // ---------------------------------------------------------------- companies
  k(
    'kb-pc-companies-chipmakers',
    'PC hardware companies: Nvidia, AMD, Intel and what each makes',
    [
      'who makes cpus and gpus', 'nvidia vs amd vs intel', 'what companies make pc parts', 'who owns nvidia amd intel', 'tsmc makes chips', 'who makes graphics cards', 'nvidia market cap ai', 'intel foundry 18a', 'amd vs nvidia gpu',
      'companies in the pc industry',
    ],
    `Nvidia (Santa Clara, CEO Jensen Huang): dominates GPUs (GeForce for gamers, plus data-center AI chips that make it one of the world's most valuable companies, which is why AI demand squeezes gamer GPU supply). AMD (CEO Lisa Su): Ryzen CPUs, Radeon GPUs, EPYC server CPUs, and the chips in PlayStation/Xbox consoles. Intel: Core CPUs, Arc GPUs, and its own foundry (Intel Foundry, 18A process) while also using TSMC for some tiles. TSMC (Taiwan) manufactures most advanced chips for Nvidia, AMD and Apple; Samsung Foundry is a smaller competitor. Memory: Samsung, SK hynix, Micron (DRAM/HBM). NAND/SSD makers: Samsung, SK hynix/Solidigm, Micron, Kioxia, SanDisk (spun off from Western Digital in 2025; WD_BLACK SSDs are SanDisk-made), YMTC. Storage drives: Seagate, Western Digital, Toshiba. Motherboards: ASUS, MSI, Gigabyte, ASRock. GPU board partners: ASUS, MSI, Gigabyte, Zotac, PNY, Sapphire, XFX, PowerColor. Cases/coolers: Lian Li, Fractal Design, NZXT, Corsair, Noctua, be quiet!, Thermalright, Deepcool, Arctic, Cooler Master, Phanteks, Montech. PSUs: Seasonic, Corsair, MSI, Super Flower, be quiet!, FSP. Peripherals: Logitech, Razer, SteelSeries, Corsair, HyperX, Wooting.`
  ),
  k(
    'kb-pc-companies-ai-demand-effect',
    'Why AI companies affect PC part prices',
    [
      'why do ai companies make pc parts expensive', 'ai bubble gpu prices', 'hbm memory vs ddr5', 'data center demand pc hardware', 'will ai demand end the pc price crisis', 'nvidia gpu supply consumers', 'ai data centers ram and ssd',
    ],
    `AI companies and cloud providers (OpenAI, Microsoft, Google, Meta, Amazon, xAI and others) are building giant data centers filled with Nvidia/AMD accelerators that use HBM stacked memory, huge amounts of DDR5 server memory and fast SSDs. Memory makers earn much more per wafer on HBM and server DRAM than on consumer DDR5, so they shifted capacity there; NAND makers likewise serve enterprise SSDs first. The same Blackwell-generation silicon and memory supply chain also feeds consumer GPUs, so gamers compete with data centers. Effects since late 2025: DRAM contract prices at record highs, DDR4 supply cut, NAND roughly doubled, high-end GPUs scarce, retail price increases and laptop/console/phone price hikes. New fabs take 2-3 years, so analysts expect relief in 2027 at the earliest and prices to stay above 2024 levels for a while. If AI spending slows, prices could fall faster, but that is uncertain. Short term: buy what you need and avoid paying scalper prices.`
  ),

  // ---------------------------------------------------------------- misc how-to / explainers
  k(
    'kb-pc-what-pc-do-i-need',
    'What PC should I build? Choosing by use case and budget',
    [
      'what pc should i build', 'pc build for fortnite', 'pc build for valorant cs2', 'pc build for roblox', 'pc for minecraft', 'pc for gta 6', 'best pc for competitive gaming', 'what specs do i need for gaming',
      'pc for school and gaming', 'how much does a gaming pc cost',
    ],
    `Pick by game and screen. Esports (Valorant, CS2, Fortnite performance mode, Rocket League, Roblox, Minecraft): a modest GPU (RX 9060 XT / RTX 5060) with a strong CPU (Ryzen 5 7600/9600X or an X3D) and a 240Hz 1080p/1440p monitor gives hundreds of fps; CS2/Valorant love the CPU and X3D cache. AAA single-player (Cyberpunk, Alan Wake 2, Black Myth: Wukong): spend on the GPU (RX 9070 XT / RTX 5070 Ti and up) and play at 1440p with DLSS/FSR. Fortnite at max settings with ray tracing: RTX 5070 Ti or better. Simulators (MSFS, racing, flight): top CPU (9800X3D) and 32GB+ RAM. School + gaming: a balanced Ryzen 5 + 16GB GPU build. VR: strong GPU plus 32GB RAM. Budget guidance in the 2026 market: roughly $1,000-1,400 for 1080p high, $2,000-2,800 for 1440p high refresh, $3,500+ for 4K; a console (PS5/Xbox) can still be cheaper for pure gaming right now because of PC part prices, but a PC does everything and has free online and cheap games.`
  ),
  k(
    'kb-pc-common-mistakes',
    'Common PC building mistakes to avoid',
    [
      'pc building mistakes', 'what to avoid when building a pc', 'beginner pc build errors', 'common pc build problems', 'mistakes new pc builders make', 'monitor plugged into motherboard', 'ram in wrong slot', 'forgot io shield',
    ],
    `Top mistakes: plugging the monitor into the motherboard instead of the graphics card (no GPU output, or slow iGPU); RAM in the wrong slots (single channel, use the 2nd and 4th slots with 2 sticks) or not fully clicked in; forgetting to enable EXPO/XMP (RAM at slow default speed); forgetting the CPU 8-pin EPS power cable; not fully seating the GPU power connector (especially 12V-2x6); mounting the cooler without removing the plastic film or tightening unevenly; thermal paste too much or too little; forgetting motherboard standoffs or installing extra ones (short circuit); wrong fan direction (front intake, rear/top exhaust); forgetting the I/O shield; buying a mismatched RAM type (DDR4 vs DDR5); too weak or low-quality PSU; skipping BIOS updates for new CPUs on old boards; buying an 8GB GPU in 2026 for high textures; buying a case too small for the GPU/cooler; installing Windows from a USB with the old drive still unformatted and unplugging the wrong thing; bending CPU pins on LGA sockets (touch the pins and you void the warranty). Take your time, follow the manuals and avoid forcing parts.`
  ),
  k(
    'kb-pc-pcie-lanes-m2',
    'PCIe lanes, generations, M.2 slots and USB standards',
    [
      'pcie 5.0 vs 4.0 gpu', 'do i need pcie 5.0', 'pcie x16 x8 slot', 'm.2 slots sharing lanes', 'usb4 vs thunderbolt vs usb 3.2', 'what is pcie bandwidth', 'sata ports disabled when using m.2', 'pcie gen 4 gpu in gen 3 board', 'usb c front panel',
    ],
    `PCIe is the bus that connects the GPU and NVMe SSDs. Each generation doubles speed: Gen3 ~1 GB/s per lane, Gen4 ~2, Gen5 ~4 (x16 Gen5 = ~64 GB/s). A graphics card uses x16 (some budget cards only use x8: the RTX 5060 Ti, 5060 and 5050 are x8, which hurts a little on old PCIe Gen3 boards). Current GPUs do not saturate Gen4 x16, so PCIe 5.0 is not needed for gaming GPUs. Motherboard M.2 slots may share lanes: using a second M.2 slot can disable a SATA port or reduce a PCIe slot; check the manual. USB: USB 3.2 Gen 2 (10 Gbps), USB 3.2 Gen 2x2 (20 Gbps), USB4 (40 Gbps, supports Thunderbolt 4-like speeds on boards that include it), Thunderbolt 4/5 (40/80-120 Gbps, mostly on premium boards). A front-panel USB-C connector needs a case with USB-C and a motherboard header for it. HDMI 2.1 / DisplayPort 1.4/2.1 are on the GPU, not the motherboard (for a GPU build).`
  ),
  k(
    'kb-pc-networking-audio',
    'Networking for gaming PC: Ethernet vs Wi-Fi, routers, latency',
    [
      'ethernet vs wifi for gaming', 'best wifi card for pc', 'wifi 7 vs wifi 6e', 'how to lower ping', 'router for gaming', 'cat6 ethernet cable', 'do i need wifi on my motherboard', 'what is a good ping', 'bufferbloat',
    ],
    `Use wired Ethernet (Cat5e/Cat6) whenever possible: lower, more stable ping than Wi-Fi. Boards with 2.5GbE LAN are standard; Wi-Fi 6E/7 on boards is good for convenience. Ping under ~40ms is great, under 80ms fine; the bigger enemy is jitter and packet loss, not speed. Bufferbloat (ping spikes when someone downloads) is fixed with a router that supports SQM/QoS. A gaming router is rarely needed, a decent Wi-Fi 6/7 router and Ethernet to your PC is better. For Wi-Fi on a PC: use the board's Wi-Fi or add an Intel AX210/BE200 card; a powerline or MoCA adapter if Ethernet cannot reach. Internet plan 100-300 Mbps is enough for gaming; upload matters for streaming.`
  ),
  k(
    'kb-pc-maintenance-lifespan',
    'PC maintenance: dust, thermal paste, lifespan and upgrades',
    [
      'how often to clean a pc', 'how to clean dust from pc', 'how long does a pc last', 'when to replace thermal paste', 'gpu repaste needed', 'pc running hot dust', 'how to extend pc lifespan', 'pc making loud fan noise',
    ],
    `Clean dust every 3-6 months (more with pets) with compressed air or an electric duster; hold the fans so they do not over-spin, and do it outside. Replace CPU thermal paste every 3-5 years or when temps climb; most GPUs need a repaste/pad change only after 3-5+ years if temps rise. A well-built PC lasts 5-8 years for gaming; the GPU is usually replaced first (every 3-5 years), the CPU/board/RAM/SSD last longer, and the PSU can run 7-10+ years (look at its warranty, good ones carry 10 years). Keep the BIOS and drivers updated, watch temperatures with HWiNFO, keep 15-20% of the SSD free, and use a surge protector. If fans are loud, set a sane fan curve in the BIOS; if the PC freezes or blue-screens, test RAM first (MemTest86) then the PSU and temps.`
  ),
  k(
    'kb-pc-glossary',
    'PC glossary: common terms and abbreviations',
    [
      'what does tdp mean', 'what is xmp expo', 'what is a vrm', 'what does psu mean', 'pc terms explained', 'what is bios uefi', 'what is rgb argb', 'what does aio mean', 'what is dlss', 'pc abbreviations meaning',
      'what is mt/s', 'what is a case fan rpm',
    ],
    `CPU = processor; GPU = graphics card; iGPU = integrated graphics; RAM = memory; VRAM = GPU memory; SSD/NVMe/M.2 = fast storage; HDD = hard disk; PSU = power supply; AIO = all-in-one liquid cooler; VRM = board power delivery; BIOS/UEFI = board firmware settings; POST = power-on self test; EXPO/XMP/DOCP = RAM profile for rated speed; TDP = a power/heat class; MT/s = RAM transfers per second; CL/CAS = RAM latency; PCIe = expansion bus; ATX/mATX/ITX = board sizes; RGB/ARGB = LED lighting (ARGB is addressable, uses 5V 3-pin); DLSS/FSR/XeSS = upscalers; Frame gen = AI-inserted frames; RT = ray tracing; ReBAR = Resizable BAR; QVL = RAM/board compatibility list; fps = frames per second; 1% lows = smoothness metric; V-Cache = AMD's stacked cache; K = unlocked Intel CPU; F = no integrated graphics; X3D = AMD cache chip; HBM = very fast memory for AI chips; Wh/W = watts; Gold/Platinum = PSU efficiency tiers.`
  ),
  // ---------------------------------------------------------------- beginner basics, naming, older hardware
  k(
    'kb-pc-parts-explained-simple',
    'What each PC part does and where it goes (beginner overview)',
    [
      'what does each pc part do', 'what is a motherboard', 'what is an ssd', 'what is a psu', 'what is a cpu cooler', 'where does everything go in a pc', 'what is the case for', 'explain pc parts to a beginner',
      'what are the parts of a computer', 'where do i plug the monitor', 'where does the gpu go', 'where does the ram go', 'where does the cpu go', 'what is 32gb of ram', 'what does 32gb ram mean', 'what is hdmi',
    ],
    `Think of the PC as a body. The CPU is the brain (runs instructions): it sits in the socket in the middle of the motherboard under the cooler. The motherboard is the skeleton and nervous system: every part plugs into it. The RAM (e.g. 32GB) is the short-term memory: the more you have, the more apps and game data fit at once, it clicks into the long slots next to the CPU (2 sticks in slots 2 and 4). The SSD is long-term storage for Windows, games and files (an M.2 stick screwed flat onto the board, or a 2.5-inch SATA drive). The GPU (graphics card) draws everything you see: it goes in the top long PCIe x16 slot, takes its own power cables from the PSU, and your monitor plugs into IT (HDMI or DisplayPort) on the back. The PSU (power supply) feeds all the parts; it mounts at the bottom/back of the case and cables go to the motherboard (24-pin), the CPU (8-pin at the top of the board) and the GPU. The CPU cooler (air or liquid) keeps the CPU cool, mounted on top of the CPU with thermal paste; case fans move air through the case. The case holds everything. 32GB of RAM means 32 gigabytes of memory, a good standard amount for gaming today (16GB is the minimum, 64GB for editing/AI).`
  ),
  k(
    'kb-pc-cpu-naming',
    'CPU naming explained: Intel Core i5/i7/i9, Core Ultra, Ryzen numbers and letters',
    [
      'what does intel core i7 mean', 'intel core i5 vs i7 vs i9', 'what does k mean in intel cpu', 'what does kf mean cpu', 'ryzen 5 vs ryzen 7 vs ryzen 9', 'what does x3d mean', 'what does the x in ryzen mean', 'ryzen naming',
      'intel core ultra 5 7 9 meaning', 'what is a f cpu', 'cpu names explained', 'what does 9800x3d mean', 'ryzen g series meaning',
    ],
    `Intel naming: Core i3/i5/i7/i9 are tiers (i3 = entry, i5 = mainstream gaming, i7 = high-end, i9 = flagship). The number is generation + SKU (i5-14600K = 14th generation, SKU 600). Since 2024 Intel uses "Core Ultra 5/7/9" (e.g. Core Ultra 7 265K = Arrow Lake, 200 series). Suffixes: K = unlocked for overclocking, KF = unlocked and no integrated graphics, F = no integrated graphics (you need a graphics card; slightly cheaper), no letter = has integrated graphics, T = low power, X/KS = special editions. AMD naming: Ryzen 3/5/7/9 are tiers like Intel's (5 = mainstream, 7 = high-end gaming, 9 = flagship with the most cores). The 4-digit number: first digit = generation (7000 = Zen 4, 9000 = Zen 5; 5000 = AM4 Zen 3), the rest = tier within it (9800X3D = generation 9000, model 800). Suffixes: X = higher clocks, X3D = extra 3D V-Cache for gaming (the best gaming chips), no letter = lower power/cheaper, G = has strong integrated graphics (APU), F = no integrated graphics, E/HS = laptop/low power. So a Ryzen 7 9800X3D is a 9000-series (Zen 5), 8-core, gaming cache chip on socket AM5, and a Core i5-14600K is a 14th-gen unlocked mid-range Intel chip on LGA1700.`
  ),
  k(
    'kb-pc-gpu-generations-history',
    'Older and past graphics card generations: GTX 900, 10, 16, RTX 20, 30, 40',
    [
      'gtx 970', 'gtx 900 series', 'gtx 1060', 'gtx 1080 ti', 'rtx 2060', 'rtx 3060', 'rtx 3090', 'rtx 4090', 'rtx 4070', 'gtx 1650', 'is my old gpu still good', 'nvidia gpu generations', 'rtx 900',
      'what was before rtx 50', 'rtx 30 vs rtx 40', 'when did rtx start', 'is there an rtx 900', 'old nvidia graphics cards',
    ],
    `There is no "RTX 900". You may mean the GTX 900 series (GTX 970/980, from 2014): very old now, weak by 2026 standards. Nvidia GeForce history: GTX 900 (Maxwell, 2014-15), GTX 10 (Pascal, 2016-17: GTX 1060, 1070, 1080, 1080 Ti; the 1060/1080 Ti aged very well), GTX 16 (Turing, 2019: GTX 1650/1660), RTX 20 (Turing, 2018: first ray tracing and DLSS; RTX 2060/2070/2080), RTX 30 (Ampere, 2020: RTX 3060, 3070, 3080, 3090; the 3090 had 24GB), RTX 40 (Ada, 2022: RTX 4060, 4070, 4080, 4090 with 24GB and DLSS 3 frame generation; the RTX 4090 was the top card until the RTX 5090), RTX 50 (Blackwell, 2025: RTX 5050-5090, DLSS 4). "RTX" means it has ray-tracing cores; GTX has none. The first number is the generation, the rest the tier (5090 = 50 series, top tier; 5060 = 50 series, mainstream). AMD: RX 400/500 (Polaris), RX 5000 (RDNA), RX 6000 (RDNA 2: 6600/6700 XT/6800/6900 XT), RX 7000 (RDNA 3: 7600, 7700 XT, 7800 XT, 7900 XTX), RX 9000 (RDNA 4). Used-market guidance: an RTX 3060 12GB or RX 6700 XT is fine for 1080p, an RTX 3080/4070-class card is fine for 1440p, GTX 900/10 cards can only play light and older games and miss modern features.`
  ),
  k(
    'kb-pc-display-cables-hdmi-dp',
    'HDMI vs DisplayPort vs USB-C and which cable to use',
    [
      'hdmi vs displayport', 'which cable for 144hz', 'hdmi 2.1 vs 2.0', 'displayport 1.4 vs 2.1', 'what is hdmi', 'what is displayport', 'can i use hdmi for 240hz', 'usb-c display output', 'monitor cable for gaming',
      'why no signal from monitor', 'vga dvi hdmi explained',
    ],
    `HDMI and DisplayPort carry video (and audio) from the graphics card to the monitor. DisplayPort (DP 1.4 / 2.1) is the PC standard: best for high refresh rates (e.g. 1440p 240Hz, 4K 144Hz) and supports G-Sync/FreeSync. HDMI is what TVs, consoles and many monitors use; HDMI 2.0 is limited (4K 60Hz), HDMI 2.1 supports 4K 120Hz and is the right choice for consoles and TVs. Use the cable that came with the monitor or a certified one (a cheap/old cable is the number one cause of 144Hz not working or flickering). Plug the cable into the GRAPHICS CARD ports on the back of the PC, not the motherboard ports. USB-C/Thunderbolt can carry video if the GPU/board and monitor support it. VGA and DVI are old; avoid them. If you see "no signal": check the right input on the monitor, that the cable is in the GPU, and try another cable/port.`
  ),
];
