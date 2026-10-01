import { KnowledgeItem } from '../../types';

/**
 * PC_EXTRA_STANDARDS_SECURITY_MISC — the last gap-filling pass of the 'pc-building' category (2026-10-01):
 * standards and dimensions, cables and port versions, known hardware issues and controversies, PC security,
 * home-lab/NAS/Plex, emulation, trusted review sources, scams, accessories, power-draw tables, future technology,
 * chipset feature tables and quick FAQs. The "future technology" entry is a hedged roadmap (rumors).
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_EXTRA_STANDARDS_SECURITY_MISC: KnowledgeItem[] = [
  // ------------------------------------------------------------------ standards, dimensions, cables
  k(
    'kb-pc-std-form-factor-dimensions',
    'PC standards and dimensions: motherboard sizes, GPU slots, screws, standoffs, drive bays, case volume',
    [
      'atx motherboard dimensions', 'micro atx size mm', 'mini itx size', 'e-atx size', 'what screws for motherboard', 'm3 vs 6-32 screws pc', 'gpu slot width 2.5 slot 3 slot', '3.5 vs 2.5 inch drive bay', 'case volume liters', 'pcie slot bracket count', 'can an atx board fit in a micro atx case',
      'm.2 standoff screw', 'what size are case fans mm',
    ],
    `Motherboard sizes: E-ATX about 305x330 mm, ATX 305x244 mm (7 expansion slots), micro-ATX 244x244 mm (4 slots), mini-ITX 170x170 mm (1 slot), extended boards need big cases; smaller boards fit in larger cases (an ITX board fits an ATX case) but not the reverse. Screws: motherboard standoffs and most parts use M3 and 6-32 screws (case fans use 6-32 or M4-ish coarse screws, 2.5/3.5-inch drives use 6-32 for 3.5 and M3 for 2.5), M.2 SSDs use a tiny M2 screw or a clip. GPU thickness is counted in expansion slots (2, 2.5, 3, 3.5-4 slots); a 3.5-slot RTX 5090 can block other PCIe slots. Drive bays: 3.5-inch for HDDs, 2.5-inch for SATA SSDs (many cases are removing 3.5 bays); front 5.25-inch bays are almost gone. Fan sizes: 80, 92, 120, 140 and 200 mm (120/140 are standard; 120mm radiators come in 120/240/360/420 mm lengths). Case volume: mini-ITX SFF cases are 10-20 liters, mid-tower ATX 40-60 liters, full tower 70+ liters. Always check the case spec sheet for GPU length, cooler height (e.g. 160-185 mm), PSU length and radiator support before buying.`
  ),
  k(
    'kb-pc-std-usb-hdmi-dp-versions',
    'Port and cable versions: USB naming, Thunderbolt, HDMI 2.0/2.1, DisplayPort 1.4/2.1, Ethernet, SATA',
    [
      'what is usb4', 'usb4', 'what is thunderbolt', 'usb c explained',
      'usb 3.2 gen 1 vs gen 2 vs 2x2', 'usb4 vs thunderbolt 4', 'thunderbolt 5 speed', 'hdmi 2.1 bandwidth', 'displayport 2.1 uhbr', 'usb c vs usb 3', 'why is my usb c not fast', 'usb 2 vs usb 3 speed', 'what cable for 4k 240hz', 'usb-c charging wattage pd',
      'sata revision speeds', 'aux 3.5mm audio jack',
    ],
    `USB naming is confusing: USB 2.0 (480 Mbps), USB 3.2 Gen 1 (also "USB 3.0", 5 Gbps), USB 3.2 Gen 2 (10 Gbps), USB 3.2 Gen 2x2 (20 Gbps), USB4 (20 or 40 Gbps), USB4 v2 (80-120 Gbps, new). Thunderbolt 3/4 (40 Gbps over USB-C, with PCIe tunneling and charging), Thunderbolt 5 (80 Gbps, 120 Gbps boost). USB-C is only the connector shape: a USB-C port can be slow USB 2.0 or fast Thunderbolt, so check the spec; cables matter too (e-marked cables for 100W+ charging or 40 Gbps). USB Power Delivery can supply up to 100W (240W with EPR). HDMI 2.0 (18 Gbps, 4K 60Hz), HDMI 2.1 (48 Gbps, 4K 120Hz/8K 60Hz, VRR), DisplayPort 1.4 (32.4 Gbps, 4K 120/144Hz with DSC), DisplayPort 2.1 (UHBR10/13.5/20 up to 80 Gbps, for 4K 240Hz+ without compression), USB-C DP Alt Mode. Ethernet: Cat5e (1 Gbps), Cat6 (up to 10 Gbps over short runs), Cat6a/Cat7/Cat8 for 10 Gbps+. SATA III (6 Gbps, ~550 MB/s). 3.5mm audio jacks are analog; USB DACs are digital.`
  ),
  k(
    'kb-pc-std-chipset-feature-tables',
    'Chipset feature comparison: AMD AM5 (X870E, X870, B850, B840, A620) and Intel (Z890, B860, H810)',
    [
      'difference between x870e and x870', 'b850 vs b650 difference', 'b840 vs b850', 'z890 vs b860 difference', 'which chipset supports cpu overclocking', 'does b850 support pcie 5.0', 'usb4 on x870', 'a620 limitations', 'b860 ram overclock', 'x870e vs b850 worth it',
    ],
    `AM5 chipsets: X870E (top: PCIe 5.0 x16 for GPU and PCIe 5.0 M.2, USB4 mandatory, up to 44 PCIe lanes total, CPU overclock, EXPO), X870 (same with PCIe 5.0 M.2 but USB4 mandatory and 1 less PCIe 5.0 requirement), B850 (PCIe 5.0 M.2 and often x16, CPU overclocking and memory overclocking supported, no USB4 requirement: best value), B840 (PCIe 4.0/3.0 mix, no CPU overclock, limited lanes, entry), A620 (basic, PCIe 4.0 x16/M.2, no CPU overclock, entry). B650E/X670E/B650/X670 are the previous generation (PCIe 5.0 on E models). Intel LGA1851: Z890 (CPU and memory overclocking, many lanes, Thunderbolt 4 on many boards), B860 (memory overclock, no CPU overclock), H810 (basic). All AM5 boards use DDR5 only; check M.2 slot counts, rear USB, LAN (2.5GbE) and Wi-Fi 6E/7 on each model. A cheaper B850 is the right choice for 95% of gaming builds; pay for X870E only if you need USB4, more PCIe 5.0 lanes or premium VRMs.`
  ),

  // ------------------------------------------------------------------ known issues and controversies
  k(
    'kb-pc-issues-known-hardware-problems',
    'Known hardware issues and controversies: 13th/14th gen Intel, 7800X3D burnouts, 12VHPWR melting, missing ROPs, drivers',
    [
      'intel 14900k degradation', 'ryzen 7800x3d burned', '12vhpwr melting connector', 'rtx 5090 connector melted', 'missing rops rtx 50', 'rtx 5090 black screen', 'nvidia driver issues rtx 50', 'am5 soc voltage problem', 'gpu recall', 'known problems with rtx 5070',
      'intel vmin shift', 'rtx 4090 melted',
    ],
    `Notable issues so you can avoid them: Intel Core 13th/14th gen K chips (i9-13900K/14900K, i7-13700K/14700K) could degrade from excessive voltage (the "Vmin shift" instability); Intel released microcode updates in 2024 (0x129 and later) and extended warranties by 2 years; update the BIOS and watch for crashes. AMD Ryzen 7000X3D (7800X3D) burnouts in 2023 came from board makers pushing too much SoC voltage with EXPO; AMD/board makers fixed it via AGESA/BIOS limits, update your BIOS. 12VHPWR/12V-2x6 connector melting: RTX 4090 and some RTX 5090 cards have overheated when the connector was not fully seated or bent hard near the plug; fully click it in, keep a straight run, use a native ATX 3.1 cable, and check it after install. In early 2025 Nvidia confirmed some RTX 5090/5090 D/5070 Ti cards shipped with missing ROPs (a few units lost performance); affected cards are replaced under warranty (check GPU-Z ROP count). RTX 50 launch drivers had black screens and instability for some users, mostly fixed by driver updates. AMD RX 9000 launch had stock shortages. Always keep drivers/BIOS updated, buy from stores with returns, and check reviews for coil whine/noise.`
  ),
  k(
    'kb-pc-issues-sag-bent-pins-socket',
    'Bent pins, socket damage, cooler pressure, GPU sag and other build hazards',
    [
      'what happens if i bend a cpu pin', 'bent cpu pin', 'i bent a pin on my motherboard', 'cpu pin fix',
      'bent pins on cpu socket', 'lga socket pins fix', 'am5 cpu stuck to cooler', 'cpu came out with the cooler', 'cooler too tight damage', 'gpu sag damage pcie slot', 'cracked motherboard', 'broken pcie retention clip', 'thermal paste on pins', 'am5 pads socket damage',
    ],
    `Hazards while building: LGA sockets (Intel LGA1700/1851 and AMD AM5) have the pins in the motherboard socket; bending one is the classic costly mistake: never touch the socket, lift the CPU straight down and never force it; a bent pin can sometimes be straightened with a fine needle under magnification but it voids the warranty. On AM5 a CPU can come off with the cooler if the paste has bonded (twist the cooler slightly before lifting, or warm the CPU) and the retention arm should be opened first. Overtightening a cooler or backplate can crack the board or crush the socket; tighten screws in an X pattern to even pressure. Heavy GPUs can sag and stress the PCIe slot (use the bracket/support). Do not push M.2 drives too hard; plastic PCIe retention clips on some boards break, so release them gently. Thermal paste on the socket pins or contacts can cause boot problems; clean with isopropyl alcohol and a cotton bud. Take your time: no part needs force.`
  ),

  // ------------------------------------------------------------------ security
  k(
    'kb-pc-security-basics',
    'PC security basics: antivirus, passwords, backups, phishing, ransomware, BitLocker',
    [
      'do i need antivirus windows 11', 'windows defender enough', 'how to protect pc from malware', 'what is ransomware', 'how to spot phishing', 'password manager recommendations', 'two factor authentication', 'bitlocker should i enable', 'vpn do i need', 'how to know if pc is hacked',
      'ad blocker ublock origin', 'safe download sites',
    ],
    `Windows Defender (Microsoft Defender) is good enough for most people if you keep Windows updated; add an ad blocker (uBlock Origin), download software only from official sites or the Microsoft Store, avoid cracks/cheats (the most common way gamers get infected), and be careful with Discord/Telegram links and "free Robux/Nitro" scams. Use a password manager (Bitwarden, 1Password) with unique passwords, and enable two-factor authentication (an authenticator app or passkeys, not SMS) on email, Steam, Discord and banks. Keep backups (3-2-1 rule): ransomware encrypts files and you recover only from an offline/cloud backup. Phishing: check the real URL, never enter your password from a link in a message, and be suspicious of urgency. BitLocker/device encryption protects data if a laptop is stolen (back up the recovery key). A VPN does not stop malware; it hides your IP from sites and helps on public Wi-Fi. Signs of a hacked PC: unknown programs, slow performance, accounts logging in from strange places: run Defender full scan, Malwarebytes, change passwords from a clean device, and consider a Windows reset.`
  ),
  k(
    'kb-pc-security-game-cheats-accounts',
    'Gaming account safety: Steam, Discord, cheats, scams and trading',
    [
      'steam account stolen', 'discord token logger', 'free nitro scam', 'are game cheats safe', 'steam guard how to', 'csgo skin trade scam', 'how to secure discord account', 'roblox account hacked', 'fake giveaway links', 'game download crack malware',
    ],
    `Accounts get stolen mostly via phishing, fake giveaways and malware: never click "free Nitro/Robux/skins" links, do not log into sites that ask for your Discord/Steam login outside the real domain, do not run unknown .exe/.zip files from DMs or "mods", and avoid cheats (they often carry stealers and get you banned). Turn on Steam Guard (mobile authenticator), enable 2FA on Discord, Roblox and Epic, use a password manager, and log out sessions if you suspect a compromise. In trading (Steam market, CS2 skins) use only Steam's own trade/market and verify trade offers; scammers use fake middlemen and fake trade bots. Use a separate email for gaming and check haveibeenpwned.com for leaks. Admins/mods: never share your token or "verify" bots from untrusted people.`
  ),

  // ------------------------------------------------------------------ homelab / NAS / emulation
  k(
    'kb-pc-homelab-nas-plex',
    'Home lab, NAS, Plex/Jellyfin server and self-hosting on PC hardware',
    [
      'how to build a nas', 'plex server hardware requirements', 'jellyfin vs plex', 'truenas vs unraid', 'pi-hole home server', 'best cpu for plex transcoding', 'self hosting at home', 'raspberry pi vs mini pc for server', 'home assistant hardware', 'what is a homelab',
      'nas drives how many bays',
    ],
    `A home server or NAS can be an old PC, a mini PC or a dedicated box. Software: TrueNAS (ZFS, robust), Unraid (flexible, mixed drive sizes, easy Docker), OpenMediaVault, Synology DSM (on Synology hardware). Plex/Jellyfin/Emby stream your media library: Jellyfin is free and open source; Plex needs a Plex Pass for hardware transcoding and remote features. Transcoding needs a GPU or an Intel iGPU with QuickSync (an Intel Core i3/i5 with iGPU is perfect and sips power); direct play needs almost no CPU. Hardware tips: ECC RAM is nice for ZFS, more RAM helps (16GB+), use NAS-rated drives (WD Red Plus, Seagate IronWolf, Toshiba N300) and a UPS, plan RAID (RAID 1/Z1 for safety) and a backup of the backup. Other services: Pi-hole/AdGuard Home (ad blocking), Home Assistant (smart home), Nextcloud (cloud storage), Immich (photos), game servers (Minecraft). Mini PCs (Intel N100/N305 or Ryzen mini PCs) and Raspberry Pi 5 are cheap, low-power options. Expose services safely with a VPN (Tailscale/WireGuard) instead of opening ports.`
  ),
  k(
    'kb-pc-emulation-retro-hardware',
    'Emulation and retro gaming PCs: requirements for consoles and what to buy',
    [
      'pc requirements for ps2 emulator pcsx2', 'ps3 emulator rpcs3 requirements', 'switch emulator pc', 'best retro gaming pc build', 'retroarch setup', 'is emulation legal', 'cheap pc for retro gaming', 'crt vs oled retro', 'ryujin yuzu status', 'dolphin emulator specs',
    ],
    `Emulation uses software to mimic old consoles; the emulators themselves are legal, game files should come from discs/cartridges you own (laws vary by country, and Nintendo has shut down Switch emulators like Yuzu). Hardware needs: NES/SNES/GBA/PS1/N64 run on almost anything (a Raspberry Pi 4/5 or a tiny mini PC); Dolphin (GameCube/Wii) and PCSX2 (PS2) like a modern 6-core CPU with strong single-thread speed (a Ryzen 5 / Core i5 recent) and any mid GPU for upscaling; RPCS3 (PS3) needs a 6-8 core modern CPU with AVX2/AVX-512 (Ryzen is great) and 16GB RAM; Switch-class emulators (Ryujinx forks) need a strong CPU and 16GB RAM; Xbox 360/PS3 are demanding. A great retro box is a small PC (Ryzen 5 7600 / Ryzen mini PC) with a good controller, RetroArch/Batocera/EmulationStation, and a CRT shader or OLED for good motion. Handhelds like the Steam Deck and Ally handle emulation very well.`
  ),

  // ------------------------------------------------------------------ trust, scams, accessories
  k(
    'kb-pc-trust-review-sources',
    'Trusted PC review sources and how to avoid bad advice',
    [
      'best pc review sites', 'gamers nexus hardware unboxed digital foundry', 'who to trust for pc benchmarks', 'userbenchmark reliable', 'best youtube channels for pc building', 'tom\'s hardware techpowerup rtings', 'pcpartpicker forum', 'level1techs', 'jarrods tech', 'optimum tech',
      'reddit buildapc advice', 'how to know a review is sponsored',
    ],
    `Reliable sources: Gamers Nexus (deep testing, PSUs, coolers, cases), Hardware Unboxed (GPU/CPU/monitor benchmarks, value analysis), Digital Foundry (game tech/frame-time analysis), Tom's Hardware, TechPowerUp (GPU database, reviews), Anandtech archive, Chips and Cheese (architecture deep dives), RTINGS (monitors, headphones, mice with lab data), Monitors Unboxed, Level1Techs (workstations/Linux), Der8auer (overclocking), Optimum Tech (SFF), Jarrod's Tech and Paul's Hardware (value), JayzTwoCents and Linus Tech Tips (entertainment-first, check numbers), Dave2D (laptops), Hardware Canucks, and the PCPartPicker build guides/forums and r/buildapc (good, but verify prices). Avoid UserBenchmark (criticized as biased/unreliable), generic "top 10" affiliate listicles and "AI-generated" tech blogs with extreme price numbers. Check whether a review is sponsored, whether the same test is repeated across many GPUs, and whether 1% lows and frame times are shown, not just average fps.`
  ),
  k(
    'kb-pc-scams-fakes-counterfeits',
    'PC part scams: fake GPUs, counterfeit CPUs/SSDs, fake reviews and marketplace scams',
    [
      'fake gpu scam', 'counterfeit ssd capacity fake', 'fake cpu aliexpress', 'how to spot a fake rtx 4090', 'used gpu scam facebook marketplace', 'ssd shows 2tb but is 128gb', 'fake pcpartpicker links', 'scam pc build services', 'too good to be true pc parts', 'amazon third party seller gpu fake',
    ],
    `Common scams: fake or rebadged GPUs (an old GTX 1050 flashed to report as an RTX 4090; check GPU-Z, benchmarks and the card's physical weight), counterfeit SSDs/USB sticks with spoofed capacity (they show 2TB but fail after the real 128GB; test with H2testw/F3), fake CPUs (relabelled or remarked chips from AliExpress listings; buy from authorized sellers), "box only" or "empty box" scams on marketplaces, paid reviews, hijacked PCPartPicker lists with referral links, and "custom PC builder" services that ship low-quality parts. Safety: buy from known retailers or the manufacturer, use credit cards with chargeback protection, meet in person and test used parts on the spot, ask for serial numbers and original receipts, and be suspicious of prices far below the market (especially during shortages). If a deal looks too good to be true, it is.`
  ),
  k(
    'kb-pc-accessories-tools-extras',
    'Useful PC accessories and tools: fan hubs, risers, KVM, enclosures, cable combs, dust filters, UPS and more',
    [
      'pc building tools', 'what accessories do i need for a pc', 'fan hub controller', 'pcie riser cable', 'kvm switch pc', 'external ssd enclosure', 'usb hub powered', 'gpu support bracket', 'dust filters for case', 'cable combs sleeving', 'thermal paste spreader tools',
      'compressed air vs electric duster', 'laptop cooling pad',
    ],
    `Handy extras: a magnetic Phillips #2 screwdriver and a small zip tie/velcro set (that is all you need to build), anti-static mat/wrist strap (optional), isopropyl alcohol 90%+ and lint-free wipes for thermal paste, spare screws/standoffs, fan hubs/controllers (Arctic P-hub, Corsair iCUE Link hub, Lian Li Uni hub) for many fans, a PCIe 4.0/5.0 riser cable for vertical GPU mounts, a GPU support bracket, magnetic dust filters, cable combs and PSU shrouds for tidy routing, a powered USB hub or Thunderbolt dock for many devices, a KVM switch to share keyboard/monitor between two PCs, external SSD enclosures (NVMe to USB 3.2/USB4) for backups and portable storage, an electric duster instead of compressed air, a UPS, a surge protector, a USB BIOS flashback drive (FAT32), a USB Windows installer, and a spare short Ethernet cable. A laptop cooling pad helps a little with hot laptops, but a stand for airflow works too.`
  ),

  // ------------------------------------------------------------------ power draw / thermals tables
  k(
    'kb-pc-power-draw-table',
    'Typical power draw of PC parts and how to estimate a PSU size',
    [
      'how much power does an rtx 5090 use', 'cpu power consumption ryzen 9800x3d', 'ddr5 power consumption', 'ssd power consumption', 'pc power draw table', 'how many watts does a gaming pc use', 'rtx 5070 power draw', 'psu calculator accuracy', 'how to measure pc power', 'idle power draw pc',
    ],
    `Typical draw under load (watts): GPUs: RTX 5090 575 W TGP (often 450-575 W in games), RTX 5080 360 W, RTX 5070 Ti 300 W, RTX 5070 250 W, RTX 5060 Ti 180 W, RTX 5060 145 W, RX 9070 XT 304 W, RX 9070 220 W, RX 9060 XT 160 W, Arc B580 190 W. CPUs: Ryzen 7 9800X3D ~60-120 W gaming (120 W limit), Ryzen 9 9950X3D up to 170 W, Ryzen 5 7600 ~50-90 W, Core Ultra 9 285K ~125-250 W (more in all-core loads), Core i9-14900K up to 253 W+. RAM ~3-5 W per stick, NVMe SSDs 3-8 W (Gen5 up to ~12 W), HDDs 5-10 W, motherboard 20-50 W, fans/AIO pumps 3-20 W, RGB ~5 W. Idle PC 40-90 W. Add everything plus 20-30% headroom for the PSU size (e.g. RTX 5080 360 W + 9800X3D 120 W + 80 W others = 560 W, so an 850 W PSU is generous and quiet). Measure with a wall power meter (Kill A Watt) or a UPS/PSU that reports power (Corsair iCUE, ASUS Thor).`
  ),
  k(
    'kb-pc-normal-temperatures-table',
    'Normal temperatures and safe limits for CPU, GPU, SSD, RAM and VRM',
    [
      'what temp is normal for a cpu', 'what temp is normal for a gpu', 'is 80 degrees too hot for cpu', 'safe cpu temperature',
      'what is a normal cpu temperature', 'normal gpu temperature gaming', 'ssd temperature limit', 'ram temperature safe', 'vrm temperature limit', 'ryzen 7 9800x3d temperature gaming', 'intel 285k temperature', 'what temp is too hot for a gpu', 'hdd normal temperature', 'cpu idle temperature normal',
    ],
    `Reference ranges: CPU idle 30-45 degC, gaming 55-80 degC, heavy all-core loads 75-95 degC; Ryzen designs boost to 90-95 degC (normal), X3D chips are usually in the 60-85 degC range in gaming; Intel throttles at ~100-105 degC (avoid sitting at 95+). GPU core: 55-80 degC in games (up to 83-85 degC is ok on many cards), hot spot up to ~90 degC, memory junction 80-100 degC (GDDR6X can reach 100-105 degC at the limit); sustained over those means poor airflow. NVMe SSDs: 30-60 degC normal, throttling starts around 70-85 degC (use a heatsink on Gen4/Gen5); SATA SSD 25-55 degC; HDD 30-45 degC (above 55 is bad). RAM: DDR5 is happy up to ~55-60 degC (heat spreaders; some kits throttle above 85 degC). VRM: up to 100-110 degC is within spec, but cooler is better. Case ambient: every extra degree of room temperature adds about a degree to parts. Laptops run hotter (CPU 80-95 degC under load is common).`
  ),

  // ------------------------------------------------------------------ future tech
  k(
    'kb-pc-future-tech-roadmap',
    'Future PC technology roadmap (rumors): DDR6, PCIe 6.0, Zen 6, Nova Lake, RTX 60, HBM4, Wi-Fi 8, USB4 v2',
    [
      'when will ddr6 come out', 'pcie 6.0 consumer release', 'rtx 60 series release date', 'nova lake zen 6 2027', 'what is hbm4', 'wi-fi 8 release', 'usb4 v2 80gbps', 'next gen gpu architecture rubin', 'will prices drop in 2027', 'future proof pc 2027',
      'rdna 5 udna release',
    ],
    `Roadmap as of Oct 2026 (rumors and announcements; dates can slip): CPUs: AMD Ryzen 10000 (Zen 6) on AM5 expected around early-to-mid 2027, Intel Nova Lake (Core Ultra 400, LGA1954) around Q1 2027. GPUs: Nvidia's next consumer generation (RTX 60, Rubin-based) is expected around 2027+; the RTX 50 Super refresh was reported delayed and in late 2026 several reports said it was cancelled because of the GDDR7/memory shortage (unconfirmed by Nvidia); AMD's next architecture (RDNA 5 / UDNA) is also expected in 2027+. Memory: DDR6 is expected around 2027-2029 for servers first and consumer later; GDDR7 with 3GB modules enables 18-24GB cards; HBM4 is the next AI memory generation. Interfaces: PCIe 6.0 is in servers and not needed for consumers yet; USB4 v2 (80-120 Gbps) and Thunderbolt 5 are arriving on high-end boards; Wi-Fi 7 is current, Wi-Fi 8 (802.11bn) is in development for ~2028; DisplayPort 2.1 and HDMI 2.2 are the new display standards. Storage: PCIe 5.0 SSDs are mainstream-premium, 8TB-16TB models appear; 3D NAND layers keep rising. Prices: analysts expect memory and GPU prices to stay high through 2027. Windows: 11 is current; no "Windows 12" announcement.`
  ),

  // ------------------------------------------------------------------ FAQs
  k(
    'kb-pc-faq-quick-answers',
    'Quick PC FAQ: common one-line answers beginners ask',
    [
      'is 16gb ram enough in 2026', 'is 8gb vram enough', 'is a gaming pc worth it', 'is ryzen better than intel', 'is nvidia better than amd', 'should i get an ssd or hdd', 'do i need a graphics card', 'how long does it take to build a pc', 'how much does a gaming pc cost',
      'do i need wifi on my pc', 'is liquid cooling worth it', 'do i need windows pro', 'is 1440p worth it', 'is rgb worth it', 'can i build a pc without experience', 'is it safe to build a pc',
    ],
    `Short answers: 16GB RAM is the minimum, 32GB is the sweet spot in 2026. 8GB VRAM is limiting in new games; 12-16GB is better. A gaming PC is worth it if you want mods, high fps and a multi-use machine, but in the 2025-2026 price surge a console is cheaper for pure gaming. Ryzen X3D wins gaming; Intel can win some productivity-per-dollar. Nvidia leads in ray tracing, DLSS and AI/CUDA; AMD wins raster value. Use an NVMe SSD for the OS and games, an HDD only for bulk storage. A graphics card is needed for gaming; integrated graphics only play light games. Building takes 2-4 hours the first time. Costs: about $1,000-1,400 for 1080p high, $2,000-2,800 for 1440p high refresh, $3,500+ for 4K (late-2026 market). Wi-Fi is built into most boards; Ethernet is better. Liquid cooling is optional; a good air cooler is enough for most CPUs. Windows Home is enough for most. 1440p is the best value upgrade over 1080p. RGB is purely cosmetic. Yes, a first-timer can build a PC with a good guide (PCPartPicker, a YouTube build video, and the manuals); take your time and ask for help.`
  ),
  k(
    'kb-pc-faq-bottleneck-and-pairing',
    'Pairing CPU and GPU: which combos are balanced',
    [
      'is my cpu good enough for rtx 5070', 'ryzen 5 5600 with rtx 5070 bottleneck', 'best cpu gpu pairing 2026', '9800x3d with rtx 5060 worth it', 'core i5 12400f with rtx 4070', 'cpu too weak for gpu', 'what cpu for rtx 5090', 'pairing rx 9070 xt with ryzen 5 7600', 'balanced pc parts guide',
    ],
    `Balanced pairings (1440p gaming): Ryzen 5 5600/7600 or i5-12400F with RTX 5060 Ti / RX 9060 XT is balanced; Ryzen 5 7600 / 9600X / 5700X3D with RTX 5070 / RX 9070 is fine at 1440p (a small CPU limit at 1080p high refresh); Ryzen 7 7800X3D/9800X3D with RTX 5070 Ti / RX 9070 XT / RTX 5080 is ideal; RTX 5090 deserves a 9800X3D or 9950X3D (at 4K the CPU matters less). Older CPUs (Ryzen 3600, i7-8700K) with new mid/high GPUs lose 10-30% in many games. At 4K the GPU is almost always the limit, so a 7600 can drive an RTX 5080 fine there. Competitive 240+ fps needs the best CPU you can afford. If your GPU usage sits under 90% in games, upgrade the CPU; if it is at 95-100%, you are GPU-limited (good). Do not use "bottleneck calculators" as truth.`
  ),
];
