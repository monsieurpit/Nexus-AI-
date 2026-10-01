import { KnowledgeItem } from '../../types';

/**
 * PC_DEEP_STORAGE_BOARD_PSU_COOLING — expansion of the 'pc-building' category (2026-10-01): storage internals,
 * motherboard internals, power supplies and cooling in depth. Stable engineering knowledge.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_DEEP_STORAGE_BOARD_PSU_COOLING: KnowledgeItem[] = [
  // ------------------------------------------------------------------ storage
  k(
    'kb-pc-deep-nand-types-endurance',
    'NAND types (SLC, MLC, TLC, QLC), SLC cache, TBW endurance and SSD controllers',
    [
      'slc vs mlc vs tlc vs qlc', 'what is tbw ssd', 'ssd endurance explained', 'what is an slc cache', 'ssd controller explained', 'how long do ssds last', 'ssd slows down when full', 'what is hmb host memory buffer',
      'is qlc ssd bad', 'ssd wear leveling', 'dram cache ssd why',
    ],
    `SSDs store bits in NAND cells: SLC (1 bit, fastest, most durable, enterprise only), MLC (2), TLC (3 bits: the standard for good consumer drives) and QLC (4 bits: cheaper, slower when writing, lower endurance). Almost all drives use a fast SLC cache: part of the NAND runs as 1 bit/cell to absorb bursts; once it is full (large copies, a nearly full drive) write speed can fall to 100-500 MB/s on cheap QLC or DRAM-less drives. The controller (Phison, Silicon Motion, Samsung, WD/SanDisk, SK hynix) manages wear leveling, error correction and garbage collection; a drive with a DRAM cache keeps its address map in fast DRAM, a DRAM-less drive uses HMB (a slice of system RAM) or slower NAND for that map. Endurance is rated in TBW (terabytes written): a 1TB TLC drive is usually 600 TBW, i.e. you would have to write about 330 GB every day for 5 years; normal gaming/office use never gets close. Keep 10-20% free, enable TRIM (Windows does by default), and watch health with CrystalDiskInfo or the maker's tool.`
  ),
  k(
    'kb-pc-deep-m2-form-factors-keys',
    'M.2 sizes and keys (2280, 2230, B-key, M-key), NVMe vs SATA M.2, U.2 and heatsinks',
    [
      'm.2 2280 vs 2230', 'm key vs b key m.2', 'sata m.2 vs nvme', 'will my m.2 fit my laptop', 'm.2 heatsink needed', 'u.2 drive', 'm.2 slots on motherboard', 'pcie lanes for nvme', 'nvme in steam deck 2230',
      'm.2 wifi slot e key',
    ],
    `M.2 is a connector/size standard, not a speed: a drive can be NVMe (PCIe) or SATA over M.2, so check the spec. Size numbers are width x length in mm: 2280 (22x80, the standard desktop size), 2242, 2230 (small, used by the Steam Deck, ROG Ally and mini PCs). Keys: M-key (PCIe x4 NVMe, the desktop SSD standard), B+M-key (SATA and/or PCIe x2), E-key (Wi-Fi cards). Motherboards list which slots are PCIe 5.0/4.0/3.0 and whether a slot is SATA-capable; using a second M.2 slot can disable some SATA ports or reduce a PCIe slot (shared lanes), see the manual. Heatsinks: PCIe 5.0 drives get hot (70-85 degC under load) and need a heatsink with airflow; PCIe 4.0 drives are fine under the board's built-in heatsink. Remove the plastic film from the thermal pad before installing the heatsink. U.2/U.3 (2.5-inch NVMe) is for servers/workstations. A PCIe adapter card can add more M.2 drives if you have spare lanes.`
  ),
  k(
    'kb-pc-deep-hdd-guide',
    'Hard drives: CMR vs SMR, RPM, cache, NAS drives, Seagate/WD/Toshiba lines, lifespan',
    [
      'cmr vs smr hdd', 'hdd 5400 vs 7200 rpm', 'best hard drive for nas', 'seagate barracuda vs ironwolf', 'wd red vs blue vs black', 'how long does an hdd last', 'hdd clicking noise', 'do i still need an hdd',
      'helium hard drive', 'hdd for backups', 'toshiba n300',
    ],
    `Hard disk drives (HDD) store data on spinning platters: cheap per terabyte, slow (100-250 MB/s, high latency), noisy, shock-sensitive. 7200 RPM is faster than 5400 RPM. CMR (conventional) vs SMR (shingled) recording: SMR drives are fine for backups and archives but slow badly under sustained writes and are poor in NAS RAID; check the datasheet. Lines: Seagate BarraCuda (desktop), FireCuda (hybrid), IronWolf (NAS), Exos (enterprise); Western Digital Blue (desktop), Black (performance), Red Plus/Pro (NAS), Ultrastar (enterprise); Toshiba P300 (desktop), N300 (NAS). Large drives (16-30TB) are often helium-sealed for lower power and heat. Lifespan: typically 3-6 years of continuous use; a clicking or grinding drive is failing: back up immediately. Today use an NVMe SSD for Windows and games and an HDD only for bulk storage, media libraries and backups, ideally with a second copy elsewhere (3-2-1 rule).`
  ),
  k(
    'kb-pc-deep-raid-nas-backup',
    'RAID levels, NAS and the 3-2-1 backup rule',
    [
      'what is raid 0 1 5 10', 'raid is not a backup', 'how to back up my pc', 'what is a nas', '3-2-1 backup rule', 'best backup for photos', 'raid 1 vs raid 5', 'synology vs truenas unraid', 'do i need raid on a gaming pc',
      'cloud backup vs external drive',
    ],
    `RAID combines drives: RAID 0 (stripe, 2+ drives): double speed, no safety, one failure loses everything; RAID 1 (mirror): the same data on 2 drives, survives one failure; RAID 5 (3+ drives): one drive of parity, survives one failure; RAID 6: survives two; RAID 10: mirrored stripes (4+ drives), fast and safe. RAID is NOT a backup: it does not protect against deletion, ransomware, a power surge or fire. Follow the 3-2-1 rule: 3 copies of important data, on 2 different kinds of media, with 1 copy off-site (cloud or a drive at a friend's house). A NAS (network-attached storage: Synology, QNAP, or a DIY box with TrueNAS or Unraid) shares storage on your network with drive redundancy and backup tools. For a gaming PC you do not need RAID: use an NVMe for the OS/games and back up photos and documents to an external drive plus a cloud service. SSD data recovery is hard, so back up before it fails.`
  ),
  k(
    'kb-pc-deep-ssd-maintenance-cloning',
    'SSD maintenance: TRIM, cloning, secure erase, GPT vs MBR, partition tips, dual drives',
    [
      'how to clone a drive to an ssd', 'mbr vs gpt', 'secure erase ssd', 'should i defrag ssd', 'ssd not showing up in windows', 'initialize disk gpt', 'move windows to a new ssd', 'ssd firmware update', 'format ssd before selling',
      'should i partition my ssd',
    ],
    `Never defragment an SSD (Windows runs TRIM/optimize on its own). To move Windows to a new SSD, use cloning software (Macrium Reflect, Clonezilla, the SSD maker's tool such as Samsung Data Migration) or do a clean install, which is usually cleaner. A drive that is not showing up in "This PC" but appears in Disk Management needs "Initialize Disk" (choose GPT) and a new simple volume; a drive missing in Disk Management too points to a seating, cable, BIOS M.2 slot setting or failing drive. GPT (modern, UEFI, drives over 2TB, required for Windows 11) vs MBR (old BIOS, 2TB limit): choose GPT. To wipe a drive before selling, use the maker's secure-erase tool or a full format with the "diskpart clean all" command; for SSDs a secure erase/crypto erase is better than overwriting. Update SSD firmware via the maker's tool when they release fixes; back up first. Separate partitions are not needed for speed; keep game libraries and files simple.`
  ),
  k(
    'kb-pc-deep-directstorage-sata-ports',
    'DirectStorage, SATA ports and how games use fast SSDs',
    [
      'what is directstorage', 'do games load faster on nvme', 'nvme vs sata game loading', 'sata iii speed limit', 'does pcie 5 ssd improve fps', 'game install on hdd works', 'sata port count motherboard', 'sata cable types',
      'ssd for gta or cyberpunk loading times',
    ],
    `DirectStorage is a Microsoft API that lets games load assets straight from an NVMe SSD to the GPU with less CPU overhead (GPU decompression); few games use it so far, and the benefit is mostly faster loading and less pop-in, not higher fps. In practice: games load only a little faster on NVMe than on a SATA SSD (the CPU and decompression are the limit), and PCIe 5.0 vs 4.0 is nearly unnoticeable; the big jump is HDD to any SSD. A game installed on an HDD can stutter or load slowly in open-world titles, and some modern games now list an SSD as a requirement. SATA III maxes at about 550 MB/s; SATA cables are cheap, the connector is L-shaped, data and power are separate cables. Motherboards have 2-6 SATA ports (some share lanes with M.2 slots). Use NVMe for the OS and games you play often, and SATA SSDs or HDDs for older games and media.`
  ),

  // ------------------------------------------------------------------ motherboards
  k(
    'kb-pc-deep-motherboard-vrm-bios',
    'Motherboard VRM, power phases, BIOS features, flashback and CMOS',
    [
      'what is a vrm on a motherboard', 'how many phases do i need', 'bios flashback how to use', 'clear cmos how', 'cmos battery dead symptoms', 'motherboard vrm temperatures', 'what is q-flash', 'what is a bios update risk', 'ez flash usb bios',
      'motherboard power phases explained', 'what does a motherboard heatsink do',
    ],
    `The VRM (voltage regulator module) turns the PSU's 12V into the low, precise voltage the CPU needs, using power stages (phases), inductors and capacitors under the heatsinks near the CPU socket. More and better stages (e.g. 14+2 at 80A) keep a high-power CPU cool and stable; a Ryzen 5/7 or non-K Intel runs fine on a mid board, a Ryzen 9/Core i9/Core Ultra 9 wants a strong VRM with heatsinks. BIOS/UEFI is the board's firmware: update it for CPU support and fixes, but only when needed and never interrupt a flash. Safer ways to flash: BIOS Flashback (ASUS) / Q-Flash Plus (Gigabyte) / Flash BIOS button (MSI): put the BIOS file on a FAT32 USB stick, plug it in the labeled port with the PC off and press the button; it works without a CPU or RAM, which matters when a new CPU needs a newer BIOS. Clear CMOS (jumper, button or removing the coin cell for ~30s) resets BIOS settings after a bad overclock or failed boot. A dead CMOS battery (CR2032) makes the clock and BIOS settings reset every time the PC loses power.`
  ),
  k(
    'kb-pc-deep-motherboard-headers-ports',
    'Motherboard headers and ports: front panel, USB, ARGB, fan, TPM, audio',
    [
      'front panel header pins', 'usb 3.0 header vs usb c header', 'argb 5v vs rgb 12v', 'fan header pwm vs dc', 'cpu_fan vs sys_fan', 'tpm header', 'where to plug case fans', 'motherboard audio header hd audio', 'what is aio_pump header',
      'can i plug argb into rgb', 'motherboard ports explained',
    ],
    `Where things plug in: the 24-pin ATX connector (main power) on the right edge, the 8-pin (4+4) EPS connector near the top left (CPU power), the CPU_FAN header next to the socket (cooler) and AIO_PUMP/W_PUMP for pump power, SYS_FAN/CHA_FAN headers around the board for case fans (4-pin PWM controls speed, 3-pin DC works with voltage control), the front panel header at the bottom right (power switch, reset, power LED, HDD LED; the manual has the exact pin layout), the USB 3.0 19/20-pin header (front USB-A ports), the USB-C (key-A/E) header for a case USB-C port, USB 2.0 headers, HD audio header (front headphone/mic jacks), RGB headers (12V 4-pin RGB) vs ARGB headers (5V 3-pin addressable); NEVER plug a 5V ARGB device into a 12V RGB header or you can burn the LEDs. Other headers: TPM, COM, thermal sensor, and 5V/12V fan hubs. Always connect the CPU 8-pin and the CPU fan, or the PC will not start or will shut down.`
  ),
  k(
    'kb-pc-deep-chipset-lanes-bifurcation',
    'Chipset vs CPU PCIe lanes, DMI, bifurcation and why some slots share bandwidth',
    [
      'how many pcie lanes does a cpu have', 'chipset lanes vs cpu lanes', 'what is pcie bifurcation', 'why does my second m.2 slow down', 'am5 pcie lanes 24', 'what is dmi', 'pcie lanes explained for a build', 'x16 slot running at x8',
      'can i run two gpus', 'usb4 on am5',
    ],
    `A CPU provides a limited number of direct PCIe lanes (AM5 Ryzen 7000/9000: 28 PCIe 5.0 lanes in total: 16 for the GPU, 4+4 for two M.2 SSDs and 4 to the chipset; Intel LGA1851: 16 PCIe 5.0 for the GPU + 4 for an M.2 + 4 more for another SSD, with the rest via the chipset). The chipset adds more lanes (USB, extra M.2, SATA, Wi-Fi, LAN) but they all share one uplink to the CPU (x4 PCIe on AM5, DMI on Intel), so several fast devices behind the chipset can contend. Some boards use bifurcation to split the GPU x16 into two x8 slots for a second device (e.g. a PCIe SSD adapter); using it can drop the GPU to x8, which costs only a few percent. Multi-GPU gaming (SLI/CrossFire) is dead; extra GPUs are used for compute/AI. Read the manual's lane-sharing table before filling every M.2 and PCIe slot. USB4/Thunderbolt on a board needs lanes, so only premium boards have it.`
  ),
  k(
    'kb-pc-deep-uefi-secure-boot-tpm-csm',
    'UEFI, Secure Boot, TPM, CSM and Windows 11 / anti-cheat requirements',
    [
      'how to enable secure boot', 'enable tpm 2.0 amd ftpm', 'what is csm in bios', 'uefi vs legacy boot', 'valorant vanguard tpm requirement', 'battlefield secure boot required', 'windows 11 requirements pc', 'bios boot order usb windows install',
      'why can i not install windows 11', 'fastboot bios windows',
    ],
    `UEFI replaced legacy BIOS: it boots GPT drives and supports Secure Boot (only allow signed bootloaders) and a TPM (firmware TPM: AMD "fTPM", Intel "PTT"; enable it in the BIOS, Windows 11 requires TPM 2.0). Several anti-cheat systems (Riot Vanguard for Valorant, EA Javelin in recent Battlefield games, FACEIT, some Call of Duty modes) require Secure Boot and TPM 2.0 turned on, which also requires CSM (Compatibility Support Module, legacy boot) to be disabled and the Windows drive to be GPT. If "Secure Boot state: off" shows in msinfo32, enable it in BIOS > Boot/Security (you may need to clear keys / "Install default Secure Boot keys"). To install Windows 11 from USB set the USB first in the boot menu (F8/F11/F12) and boot in UEFI mode. If Windows says "this PC can't run Windows 11", the cause is usually TPM or Secure Boot being disabled in the BIOS. Keep Fast Boot on if you like quicker starts, off if you need to reach the BIOS often.`
  ),

  // ------------------------------------------------------------------ PSU deep
  k(
    'kb-pc-deep-psu-internals-protections',
    'Inside a PSU: rails, ripple, OCP/OVP/OPP, hold-up time and what makes a good one',
    [
      'single rail vs multi rail psu', 'what is psu ripple', 'what is ocp ovp opp', 'what is hold up time', 'how to tell a good power supply', 'cheap psu dangers', 'psu protections explained', 'dc to dc vs group regulated psu', 'why does psu quality matter',
      'psu capacitors japanese', 'psu efficiency curve',
    ],
    `A PSU converts AC wall power to DC rails (+12V for CPU/GPU, +5V and +3.3V for small parts). Modern designs use one big 12V rail and DC-to-DC conversion for 5V/3.3V, which is more efficient and stable than older group-regulated designs. Good PSUs have protections: OCP (over-current), OVP (over-voltage), UVP, OPP (over-power), SCP (short circuit) and OTP (over-temperature), plus decent hold-up time (keeps running ~16 ms after power loss) and low ripple (voltage noise). A cheap unit can fail in a way that damages the motherboard, GPU or SSD, which is why the PSU is the one part you should not budget-cut. How to judge one: look at the Cybenetics (ETA/LAMBDA) and reviewers' tests (Tom's Hardware, Gamers Nexus, JonnyGuru-style reviews), not the "80 Plus" label alone; check the warranty (7-12 years on good units), the platform (Seasonic, Super Flower, CWT, Channel Well, HEC/Compuware, FSP, Delta OEMs make most good ones), and use ATX 3.1 units for new GPUs. Efficiency curve: PSUs are most efficient at 40-70% load, so oversizing too much wastes a little efficiency at idle.`
  ),
  k(
    'kb-pc-deep-psu-connectors-cables',
    'PSU connectors and cables: 24-pin, EPS, PCIe, SATA, Molex, 12V-2x6, and never mixing cables',
    [
      'what are psu cables', '8 pin eps vs pcie', 'can i use pcie cable for cpu', 'can i mix modular cables between brands', 'sata power vs molex', '12vhpwr vs 12v-2x6 difference', 'pcie 6+2 pin power', 'psu daisy chain cable vs separate', 'how many cables does a psu have',
      'cable extensions sleeved', 'modular psu cables not compatible',
    ],
    `Cables from a PSU: 24-pin ATX (motherboard), 4+4 pin EPS (CPU: the CPU socket takes EPS, never plug a PCIe cable into it even though it looks similar), 6+2 pin PCIe (GPU, 150W each; use separate cables for each 8-pin on a high-power GPU rather than one daisy-chain cable when you can), 12V-2x6 / 12VHPWR (16-pin high-power GPU cable: use the native one from the PSU, fully click it in and leave a few cm of straight cable before bending), SATA power (drives, fans/RGB hubs), Molex (old devices). NEVER mix modular cables from different PSU brands or even different models: the PSU-side pinouts differ and a wrong cable can short and destroy parts. If you need a longer cable, buy the exact model's cable from the PSU maker. Extensions (CableMod, etc.) look nice but add connection points; sleeved cables are cosmetic. Keep cables away from fans and the CPU cooler.`
  ),
  k(
    'kb-pc-deep-psu-form-factors-ups',
    'PSU form factors (ATX, SFX, SFX-L), UPS and surge protection, electricity cost',
    [
      'sfx psu for small case', 'sfx vs sfx-l vs atx psu', 'do i need a ups', 'surge protector for pc', 'how much electricity does a gaming pc use', 'pc power draw in kwh cost', 'psu fan 0 rpm mode', 'what is tfx psu', 'is sfx as good as atx',
      'pc power consumption idle gaming',
    ],
    `Sizes: ATX (standard, most cases), SFX and SFX-L (smaller, for mini-ITX/SFF cases, good units up to 1000-1200W from Corsair SF, Cooler Master V SFX, Silverstone, Seasonic; SFX-L is slightly longer with a bigger, quieter fan), TFX (thin, small office PCs). Many PSUs have a 0 RPM fan mode below ~30-40% load: silent at idle. A UPS (uninterruptible power supply) keeps the PC alive for a few minutes during outages and cleans power: worth it for a workstation or file server; for a gaming PC a good surge protector is the minimum. Typical power use: an idle desktop 40-90W, gaming 250-500W (a PC with an RTX 5080/9800X3D about 400-550W), a high-end 5090 system can reach 700W+. Cost = kWh x price: 400W x 3 hours/day = 1.2 kWh/day, about 36 kWh a month; at $0.10-0.15/kWh that is roughly $4-6 a month (Quebec's low electricity rates make it cheaper). Undervolting the GPU/CPU and a capped frame rate lower power and heat.`
  ),

  // ------------------------------------------------------------------ cooling deep
  k(
    'kb-pc-deep-thermal-interface-materials',
    'Thermal paste, pads, liquid metal, delidding and contact frames',
    [
      'best thermal paste', 'how often to reapply thermal paste', 'liquid metal on cpu safe', 'thermal pads vs paste gpu', 'what is delidding', 'contact frame lga1700', 'how to apply thermal paste', 'thermal paste dried out', 'cleaning old thermal paste isopropyl',
      'noctua nt-h2 vs arctic mx-6', 'conductonaut',
    ],
    `Thermal paste fills microscopic gaps between the CPU lid and cooler. Good pastes: Arctic MX-4/MX-6, Noctua NT-H1/NT-H2, Thermal Grizzly Kryonaut/Hydronaut, Thermalright TF7/TFX; the difference between good pastes is only 1-3 degC, so apply it correctly (a pea or a thin X/line, press the cooler on evenly, remove the film) and replace it every 3-5 years or when you remove the cooler. Clean old paste with 90%+ isopropyl alcohol and a lint-free cloth/coffee filter. Thermal pads are used on GPU memory and VRMs: the right thickness matters (0.5-3mm) when you service a GPU. Liquid metal (Thermal Grizzly Conductonaut) cools a few degrees better but conducts electricity and eats aluminum: only for experienced users, never on coolers with aluminum bases, and it is not worth the risk for most builds. Delidding removes the CPU's metal lid (IHS) to reapply better TIM, mostly done on old Intel chips, and it voids the warranty; Ryzen X3D delids are risky. A contact frame (Thermalright LGA1700 bracket) fixes IHS bending on LGA1700 and lowers temperatures a bit.`
  ),
  k(
    'kb-pc-deep-fans-pressure-noise',
    'Case fans: airflow vs static pressure, bearings, PWM, curves, noise and dust',
    [
      'airflow vs static pressure fans', 'best case fans', 'what is a fdb bearing', 'fan curve how to set', 'pwm fan vs dc fan', 'how to make my pc quieter', 'what is dba noise', 'fans intake vs exhaust', 'reverse blade fans', 'arctic p12 vs noctua nf-a12x25',
      'case fan size 120 140',
    ],
    `Fans move air in two ways: airflow-oriented (open frames, great in free space) vs static-pressure-oriented (fine blades, better through radiators, dust filters and heatsinks). Sizes: 120mm and 140mm (140mm is quieter at the same airflow). Bearings: sleeve (cheap, short life), rifle, ball (noisy, long life), fluid dynamic (FDB) and magnetic/dual-ball for the best life and quietness. 4-pin PWM fans vary speed by signal (best), 3-pin DC fans by voltage. Good fans: Arctic P12/P14 (best value), Noctua NF-A12x25 and NF-A14 (quiet premium), Thermalright TL-C12/TL-K12, Corsair AF/RS, Lian Li Uni Fan (daisy-chain), be quiet! Silent Wings. A fan curve in the BIOS or software (Fan Control) should ramp smoothly with CPU/GPU temperature; a 0 RPM idle mode helps silence. Noise is measured in dBA (30 dBA is quiet, 40 loud); slightly lower fan RPM plus a bigger heatsink beats high RPM. Keep dust filters clean; intake through filters at the front/bottom, exhaust at the rear/top. Reverse-blade fans make the RGB face the glass without changing the airflow direction.`
  ),
  k(
    'kb-pc-deep-aio-custom-loops',
    'AIO coolers in depth and custom water cooling',
    [
      'how long does an aio last', 'aio pump noise', 'does an aio leak', 'aio radiator placement top or front', 'how to mount an aio', 'is custom water cooling worth it', 'what is a custom loop', 'coolant types', 'aio pump header vs cpu fan header',
      'aio gurgling sound',
    ],
    `An AIO (all-in-one) cooler has a pump block on the CPU, tubes and a radiator with fans, sealed at the factory. Expect 5-7 years of life (pump wear, coolant evaporation through tubing); leaks are rare but possible. Mounting: radiator at the front or top as exhaust/intake, with the tubes on the sides (not the highest point) so air bubbles stay in the radiator, not the pump (gurgling noise means trapped air); connect the pump to AIO_PUMP/CPU_FAN at full speed and the fans to a fan header on a curve. Sizes: 240mm (good), 280mm, 360mm (best cooling for hot 16-core/Intel K chips). Brands: Arctic Liquid Freezer III, Corsair iCUE Link/H-series, NZXT Kraken, Lian Li Galahad, Thermalright, Deepcool, be quiet! Silent Loop. Custom loops use a reservoir, pump, rigid or soft tubing, water blocks for the CPU and GPU and distilled water or coolant: they are quieter at high power and look incredible, but cost $500-1,500+, need maintenance (flush every 1-2 years) and risk leaks. A good air cooler is as quiet and safer for most people.`
  ),
  k(
    'kb-pc-deep-airflow-thermals-ambient',
    'Case airflow patterns, pressure, ambient temperature and how to lower PC heat',
    [
      'positive vs negative pressure case', 'how to improve airflow in a pc case', 'pc too hot in summer', 'room temperature effect on pc', 'best fan layout for airflow', 'top exhaust or intake', 'gpu temperature too high fix', 'cable management airflow',
      'why is my pc so hot', 'ambient temperature and cpu temp',
    ],
    `Airflow basics: cool air in the front and bottom, hot air out the rear and top. Positive pressure (more intake than exhaust) keeps dust out through filters; negative pressure pulls dust through every gap. Typical good layout: 2-3 front intake, 1 rear exhaust, 1-2 top exhaust. Heat: a gaming PC dumps its power draw as heat into the room, so a 500W PC acts like a small heater; ambient room temperature directly adds to component temperatures (every extra degree in the room is roughly a degree on the parts). To lower heat: use a mesh-front case, remove blocked dust filters, route cables so they do not block the fans, undervolt the GPU/CPU, cap fps (60-144 instead of 500), keep the PC off carpet and away from walls, and add fans before an expensive cooler. A GPU that runs hot with a stuffed case may need a case with real front intake and a free path, not more RGB. In very hot rooms, expect higher fan noise and temperatures; it is not a fault.`
  ),
];
