import { KnowledgeItem } from '../../types';

/**
 * PC_DEEP_PERIPHERALS_SOFTWARE_FIXES — expansion of the 'pc-building' category (2026-10-01): monitors and
 * peripherals in depth, networking, Windows/software tuning, troubleshooting, gaming performance, local AI on a
 * PC, buying and warranty advice. Stable knowledge; no market prices.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'pc-building', keywords, content, createdAt: now,
});

export const PC_DEEP_PERIPHERALS_SOFTWARE_FIXES: KnowledgeItem[] = [
  // ------------------------------------------------------------------ monitors & peripherals
  k(
    'kb-pc-deep-monitor-specs-hdr',
    'Monitor specs decoded: HDR, nits, color gamut, bit depth, pixel density, response time, backlight',
    [
      'what is displayhdr 400 600 1000', 'monitor nits brightness', 'srgb vs dci-p3 gamut', '8 bit vs 10 bit monitor', 'ppi pixel density monitor', 'what is mprt', 'what is local dimming', 'mini led vs oled', 'delta e color accuracy',
      'gtg response time marketing', 'monitor backlight strobing ulmb', 'curved monitor worth it', '16:9 vs 21:9 ultrawide',
    ],
    `Monitor specs: HDR needs real brightness and local dimming: DisplayHDR 400 is mostly marketing, DisplayHDR 600/1000 (mini-LED) and OLED (True Black 400/500/600) give real HDR. Brightness is in nits (cd/m2): 250-350 normal SDR, 600-1000+ for good HDR. Color gamut: sRGB (standard), DCI-P3 (wide, 90-98% on good QD-OLED/IPS), Adobe RGB for photo work; accuracy is Delta E under 2 for pro work. Bit depth: 8-bit (16.7M colors, with FRC for 10-bit) vs true 10-bit. Pixel density (PPI): 27-inch 1440p is ~109 PPI (sweet spot), 27-inch 4K ~163 PPI (very sharp). Response time: GtG (gray-to-gray) marketing numbers (1 ms) are cherry-picked; MPRT/motion blur tests matter more; OLED pixels respond in ~0.03 ms. Backlight strobing (ULMB, DyAc, Black Frame Insertion) cuts motion blur at the cost of brightness. Mini-LED has thousands of dimming zones (blooming around bright objects), OLED has per-pixel dimming (perfect blacks, burn-in risk, lower full-screen brightness). Ultrawide 21:9 (34-inch 3440x1440) is immersive but needs game support; curved panels (1000R-1800R) suit 32-inch+ and ultrawides. Buy by reviews (RTINGS, Monitors Unboxed, TFT Central). Match the monitor to the use: a gaming PC needs 144Hz+ with adaptive sync; color-grading monitors like the Apple Pro Display XDR (6K, 60Hz, no G-Sync/FreeSync) are wrong for gaming and cap any GPU at 60 fps.`
  ),
  k(
    'kb-pc-deep-keyboard-guide',
    'Mechanical keyboards in depth: layouts, switches, hot-swap, keycaps, stabilizers',
    [
      'keyboard layouts 60 65 75 tkl', 'hot swappable keyboard', 'gasket mount keyboard', 'pbt vs abs keycaps', 'cherry mx vs gateron vs kailh', 'what are stabilizers keyboard', 'optical vs mechanical switch', 'best keyboard for typing and gaming', 'custom keyboard build',
      'what is a hall effect switch', 'rapid trigger explained',
    ],
    `Layouts: full-size, TKL (no numpad), 75%, 65%, 60% (no arrows or function row), 40%; smaller boards free mouse room. Switches: linear (smooth, gaming), tactile (bump, typing), clicky (loud); makers Cherry MX, Gateron, Kailh, JWK/Akko, Outemu; optical switches use light and have no debounce delay; Hall-effect (magnetic) switches measure key depth continuously, enabling adjustable actuation and Rapid Trigger (the key resets the instant you release, popular in CS2 and Valorant): Wooting 60HE, SteelSeries Apex Pro, Razer Huntsman V3, Lemokey, Akko/Gamakay. Hot-swap sockets let you change switches without soldering. Build: gasket mount (soft, bouncy), tray mount (stiff), top mount; foam, plates (aluminum, polycarbonate, FR4) change the sound. Keycaps: PBT (doesn't get shiny, textured, better) vs ABS (smoother, can shine), profiles Cherry/OEM/MT3/SA. Stabilizers (for spacebar, shift, enter) should be lubed and clipped to avoid rattle. Polling rate 1000Hz is standard, 8000Hz exists.`
  ),
  k(
    'kb-pc-deep-mouse-controllers-audio',
    'Mice, mousepads, controllers, headsets, microphones and webcams in depth',
    [
      'mouse sensor dpi cpi explained', 'mouse weight grams light', 'mouse shape claw palm fingertip grip', 'mouse pad control vs speed', 'xbox vs dualsense on pc', 'hall effect joystick drift', 'dac amp headphones pc', 'dynamic vs condenser microphone',
      'xlr vs usb mic', 'open back vs closed back headphones', 'best webcam for streaming', 'what is polling rate', 'virtual surround sound',
    ],
    `Mice: the sensor (PixArt 3395/3950/3370 class is all you need) counts in DPI/CPI; 800-1600 DPI with in-game sensitivity is common; weight 50-65g "ultralight" suits FPS, shape and grip (palm, claw, fingertip) matter more than specs; wireless 2.4GHz is as fast as wired, Bluetooth has more latency. Mousepads: cloth control (more friction, precise) vs speed (slick, fast), glass pads are very fast. Controllers on PC: Xbox controllers work natively; DualSense works on Steam with full support; Hall-effect/TMR sticks (GameSir, 8BitDo) avoid stick drift. Audio: open-back headphones (Sennheiser HD 560S/600, Beyerdynamic DT 990) have a wider soundstage for gaming, closed-back isolate noise; a DAC/amp matters only for high-impedance (250 ohm+) headphones; virtual surround rarely beats good stereo. Microphones: dynamic (Shure SM7B, Samson Q2U) reject room noise, condenser (Blue Yeti, Rode NT-USB) are more sensitive and need a quiet room; USB is simple, XLR plus an audio interface is the pro route. Webcams: Logitech Brio/C920, Elgato Facecam, or a mirrorless camera with a capture card for streaming. Capture cards (Elgato) bring console/camera video to the PC.`
  ),
  k(
    'kb-pc-deep-vr-ergonomics-desk',
    'VR headsets, ergonomics, desk setup, cable management and room setup',
    [
      'best vr headset for pc', 'quest 3 pc vr', 'monitor height ergonomics', 'best chair for gaming', 'desk setup tips', 'cable management behind desk', 'standing desk for pc', 'wrist pain gaming prevention', 'monitor arm worth it',
      'how to set up a gaming desk',
    ],
    `VR on PC: Meta Quest 3/3S (standalone, can stream PC games via Air Link or cable), Valve Index (older, SteamVR), Pimax and Bigscreen Beyond (high-end); you need a strong GPU (RTX 5070+ for good quality), 32GB RAM and USB/Wi-Fi 6. Ergonomics: top of the monitor at or slightly below eye level, arm's length away, elbows at 90 degrees, wrists neutral, feet flat, a chair with lumbar support (Herman Miller, Steelcase, Secretlab are popular but expensive; many good office chairs work), take a break every 30-60 minutes; a monitor arm frees desk space and adjusts height. Desk: 120-160 cm deep enough for a 27-inch monitor, a standing desk helps variety. Cable management: velcro ties, an under-desk tray, a PSU cable shroud, and keep power strips off the floor; short cables for peripherals. Room: avoid glare on the screen, put the PC where it gets airflow, and use a surge protector.`
  ),

  // ------------------------------------------------------------------ networking
  k(
    'kb-pc-deep-networking-wifi-router',
    'Networking in depth: Wi-Fi 6/6E/7, routers, mesh, Ethernet cables, NAT, DNS, ports',
    [
      'wifi 6 vs 6e vs 7', 'mesh wifi vs router', 'cat5e vs cat6 vs cat8', 'what is nat type strict open', 'how to port forward', 'change dns to cloudflare google', 'what is mtu', 'how to reduce wifi interference', '2.4 vs 5 vs 6 ghz', 'what is a switch vs router',
      'wifi extender vs mesh', 'isp modem bridge mode',
    ],
    `Wi-Fi generations: Wi-Fi 5 (802.11ac), Wi-Fi 6 (ax), 6E (adds the 6 GHz band, much less congestion), Wi-Fi 7 (be: multi-link operation, 320 MHz channels). Bands: 2.4 GHz (long range, slow, crowded), 5 GHz (fast, shorter range), 6 GHz (fastest, shortest). Use wired Ethernet for the gaming PC (Cat5e is fine up to 1 Gbps, Cat6 for 2.5-10 Gbps over short runs, Cat8 is overkill). A router connects your network to the ISP; a switch adds Ethernet ports; mesh systems (Eero, Deco, Orbi) cover big homes better than range extenders. NAT type matters for consoles/party chat: Open/Type 1-2 is good, Strict is bad (fix with UPnP or port forwarding: forward the game's ports to the PC's static local IP). DNS (Cloudflare 1.1.1.1, Google 8.8.8.8) can speed up lookups but does not lower ping in games. MTU rarely needs changing. If you use the ISP's modem-router, bridge mode lets you use your own router. Update router firmware and place the router high and central.`
  ),
  k(
    'kb-pc-deep-ping-latency-fixes',
    'Ping, jitter, packet loss, bufferbloat and how to fix lag in online games',
    [
      'how to fix high ping', 'what is jitter and packet loss', 'what is bufferbloat test', 'why do i lag in online games', 'cs2 valve rate settings', 'vpn lower ping', 'wifi vs ethernet latency test', 'gaming qos setup', 'tcp vs udp games',
      'how to check packet loss windows',
    ],
    `Ping is the round-trip time to the game server; jitter is how much it varies; packet loss is data that never arrives: packet loss and jitter cause rubber-banding more than a high-but-steady ping does. Steps: use Ethernet, not Wi-Fi; close downloads/updates/cloud sync; test with pingplotter or "ping -n 100 8.8.8.8" and "pathping" to find the bad hop; run a bufferbloat test (waveform.com/tools/bufferbloat): if latency spikes under load, enable SQM/Smart Queue (fq_codel/CAKE) on the router or lower the bandwidth cap to ~90% of the line speed; pick the nearest game server region; restart the modem/router; update drivers for the network card; disable Wi-Fi power saving; call the ISP if the loss is before your router. Most real-time games use UDP. VPNs rarely lower ping (they can help only if the ISP has a bad route). Frame rate and input lag are separate from network lag: make sure your PC settings (Reflex, frame cap, VRR) are tuned too.`
  ),

  // ------------------------------------------------------------------ Windows/software
  k(
    'kb-pc-deep-windows-gaming-tweaks',
    'Windows tweaks for gaming: Game Mode, HAGS, power plan, startup apps, debloat, updates',
    [
      'windows 11 gaming optimization', 'should i enable hags hardware accelerated gpu scheduling', 'windows power plan high performance', 'disable startup programs', 'windows debloat safe', 'game mode on or off', 'disable xbox game bar', 'windows update pause',
      'windows 11 background apps', 'does windows tweak improve fps', 'storage sense', 'windows memory integrity vbs fps',
    ],
    `Most "FPS boost" tweaks are myths; the safe, useful ones: install the chipset + GPU drivers; set the power mode to Balanced or Best Performance (AMD Ryzen has its own Balanced plan); turn on Game Mode (helps a little); Hardware-Accelerated GPU Scheduling is safe on modern GPUs and needed for DLSS frame generation on some setups; keep Resizable BAR on; disable unneeded startup programs (Task Manager > Startup apps) and heavy overlays; update Windows but pause updates during competitive sessions; close browsers with hardware acceleration and many tabs while gaming; keep 20% of the SSD free. VBS/Memory integrity can cost a few % in some games: leave it on for security unless you chase the last 5%. Debloat scripts can break Windows Update or Store; avoid registry "optimizer" tools. Better gains come from the right hardware settings (EXPO on, dual-channel RAM, GPU undervolt, upscaling) than from Windows tweaks.`
  ),
  k(
    'kb-pc-deep-monitoring-bench-tools',
    'Essential PC tools: HWiNFO, MSI Afterburner, CapFrameX, CPU-Z, GPU-Z, OCCT, Cinebench, MemTest86, CrystalDiskMark',
    [
      'best software to monitor pc temperatures', 'how to see fps in game overlay', 'what is hwinfo', 'how to run cinebench', 'what is occt', 'gpu-z how to use', 'cpu-z what does it show', 'crystaldiskmark results meaning', 'how to benchmark my pc free',
      'how to check if cpu is throttling', 'afterburner overlay setup', 'furmark safe', 'prime95 vs occt',
    ],
    `Tools: HWiNFO (the full sensor monitor: CPU/GPU/board temps, clocks, power, fan speeds; run "sensors only"), MSI Afterburner + RTSS (GPU overclock/undervolt and the in-game fps/temperature overlay), CapFrameX (frame time capture and charts), CPU-Z and GPU-Z (identify your CPU, RAM timings, GPU model, PCIe link and VRAM; also spot fake GPUs), OCCT (CPU/GPU/RAM/PSU stability tests with error detection), Cinebench 2024 (CPU score), 3DMark (Time Spy, Steel Nomad, Port Royal GPU scores), Unigine Superposition/Heaven, CrystalDiskMark (SSD speed), CrystalDiskInfo (SSD/HDD health), MemTest86 (RAM from a USB boot), Prime95 (extreme CPU/RAM stress), FurMark (extreme GPU load; unrealistic, can overheat), Y-cruncher, TestMem5 (RAM). Check throttling in HWiNFO: look for "Thermal Throttling" and "Power Limit Exceeded" flags. Always compare scores with the same test and settings; a drop from stock scores means a problem (cooling, power plan, wrong RAM speed).`
  ),
  k(
    'kb-pc-deep-linux-dual-boot-vm',
    'Linux gaming and dual-booting, virtual machines, WSL',
    [
      'how to dual boot windows and linux', 'is steamos good on pc', 'bazzite vs cachyos vs nobara', 'proton compatibility protondb', 'linux anticheat games not working', 'wsl2 on windows', 'virtualbox vs vmware', 'gpu passthrough vm', 'which linux for beginners',
      'linux gaming performance vs windows',
    ],
    `Linux gaming is good in 2026: Steam's Proton runs most Windows games (check ProtonDB for each game's rating); gaming distros are Bazzite (Fedora-based, console-like), Nobara, CachyOS (Arch-based, fast) and SteamOS; Ubuntu/Mint/Fedora are fine for general use. Nvidia drivers on Linux work but need care; AMD GPUs work best out of the box (open Mesa drivers). Games with kernel-level anti-cheat (Valorant, several Call of Duty, Fortnite, Battlefield) do not run on Linux. Dual boot: install Windows first, then Linux, ideally on a separate SSD to avoid bootloader trouble; disable Fast Startup and use BitLocker keys carefully. Virtual machines: VirtualBox and VMware Workstation (free for personal use) run an OS in a window; Hyper-V comes with Windows Pro; GPU passthrough lets a VM use a dedicated GPU but needs two GPUs and an IOMMU-friendly board. WSL2 runs a Linux environment inside Windows for development without dual booting.`
  ),

  // ------------------------------------------------------------------ troubleshooting
  k(
    'kb-pc-deep-bsod-crash-diagnosis',
    'Blue screens and crashes: WHEA, IRQL, DPC watchdog, memory management, clock watchdog',
    [
      'whea uncorrectable error fix', 'irql_not_less_or_equal blue screen', 'dpc_watchdog_violation', 'memory_management bsod', 'clock_watchdog_timeout', 'kernel power 41 critical', 'system_service_exception', 'pc crashes when gaming', 'random restarts pc',
      'video tdr failure nvlddmkm', 'what causes blue screen of death', 'how to read minidump bluescreenview',
    ],
    `A blue screen's stop code points to the cause family: WHEA_UNCORRECTABLE_ERROR = CPU/RAM/PCIe hardware errors (unstable overclock/undervolt, too-low voltage, failing CPU/RAM); MEMORY_MANAGEMENT / PAGE_FAULT_IN_NONPAGED_AREA / IRQL_NOT_LESS_OR_EQUAL = bad RAM or a driver (run MemTest86, turn EXPO/XMP off to test); CLOCK_WATCHDOG_TIMEOUT = CPU core not responding (Curve Optimizer too aggressive or BIOS issue); DPC_WATCHDOG_VIOLATION = driver or SSD firmware problem (update the chipset/NVMe drivers and SSD firmware); VIDEO_TDR_FAILURE / nvlddmkm/atikmpag = GPU driver crash (clean-install with DDU, lower the GPU undervolt/overclock, check temps and PSU); KERNEL_POWER 41 (PC restarts without a stop code) = a PSU, power or overheating shutdown. Debug steps: note the stop code, check Event Viewer (Windows Logs > System), read the crash dump with BlueScreenView or WinDbg, reset BIOS settings to defaults, update BIOS/drivers, test RAM, check temps (HWiNFO), test with one RAM stick, and try another PSU if crashes only happen under load.`
  ),
  k(
    'kb-pc-deep-game-crashes-stutter-fixes',
    'Game stutter, freezing and crash fixes: shader compilation, traversal stutter, VRAM, background apps',
    [
      'game stuttering fix', 'shader compilation stutter', 'traversal stutter unreal engine', 'game crashes to desktop', 'low 1% lows fix', 'fps drops randomly', 'stuttering with high fps', 'frame pacing explained', 'game freezes for a second', 'dx12 vs dx11 stutter',
      'discord overlay causing crashes', 'game fullscreen vs borderless latency',
    ],
    `Common causes of stutter even with high average fps: shader compilation (first time you see effects; let the game precompile shaders, turn on its shader cache, keep the driver shader cache enabled), traversal stutter in Unreal Engine 5 open worlds (a CPU/streaming issue: a faster X3D CPU helps, not a faster GPU), VRAM running out (lower textures), background apps (browser, RGB software, Discord overlay), a CPU with too few cores, a slow/full SSD, bad RAM speed (EXPO off), DX12 vs DX11 differences (try the other API in the launcher), VRR/V-Sync mismatches, and thermal throttling. Crash fixes: update the GPU driver (or roll back), verify game files (Steam/Epic), disable overlays and overclocks, run the game as borderless, check Windows Event Viewer, lower undervolt/boost, test RAM, and reinstall the game on the SSD. Frame pacing (even frame times) matters more than the fps number: look at the 1% lows and the frame-time graph.`
  ),
  k(
    'kb-pc-deep-hardware-failure-signs',
    'Signs of failing hardware: GPU artifacts, coil whine, SSD failure, PSU failure, dying fans',
    [
      'gpu artifacts what are they', 'how to know if psu is failing', 'ssd failing symptoms', 'cpu dying signs', 'fan not spinning pc', 'burning smell from pc', 'pc turns off randomly under load', 'ram failing signs', 'motherboard failing signs', 'monitor flickering cable or gpu',
      'how to tell what part is broken',
    ],
    `Failure signs: GPU artifacts (colored dots, shapes, flashing textures) = overheating VRAM, a bad overclock, bad memory or a dying GPU (lower clocks/undervolt to test, check temps and reseat the power cable). PSU failure = random shutdowns or restarts under load, no power, coil whine/clicking, a burning smell: replace it immediately (a failing PSU can damage other parts); test with a known-good PSU. SSD failure = file corruption, the drive disappearing, very slow writes, a SMART warning in CrystalDiskInfo: back up now. CPU failure is rare: instability that persists after resetting the BIOS and testing RAM, or temperatures that spike instantly (check the cooler first). RAM failure = random crashes, corrupted installs, MemTest errors. Motherboard failure = USB/ports dying, no POST, bent socket pins. Dead fans = rising temps, fan error at boot (replace them, they are cheap). A burning smell: power off and unplug immediately, then inspect. Isolate faults by swapping one component at a time and testing with minimal parts (CPU, one RAM stick, GPU, PSU).`
  ),
  k(
    'kb-pc-deep-no-signal-black-screen-fixes',
    'Black screen, no signal, monitor flicker and display problems',
    [
      'monitor says no signal', 'black screen after logging in windows', 'monitor flickering gpu', 'wrong resolution after driver', 'monitor stuck at 60hz fix', 'displayport no signal wake from sleep', 'second monitor not detected', 'screen tearing fix', 'monitor going black randomly',
      'hdr looks washed out windows',
    ],
    `No signal: confirm the cable is in the GPU (not the motherboard), reseat the cable and try another port/cable (DisplayPort cables are the usual culprit at high refresh), check the monitor input, and test with another monitor. Random black screens in games: unstable GPU undervolt/overclock, overheating, a faulty cable, or a power-saving issue; update drivers (DDU), lower the refresh rate to test, and disable DisplayPort deep sleep options on some monitors. Stuck at 60 Hz: set the refresh rate in Windows > Display > Advanced display, use a DisplayPort/HDMI 2.1 cable, and enable the high refresh mode in the monitor's OSD. Second monitor missing: try another port, update the GPU driver, check the cable and Windows display settings. Tearing: enable G-Sync/FreeSync and cap the fps slightly below the refresh rate. HDR washed out in Windows: enable HDR in Windows > Display, use the Windows HDR Calibration app and set SDR content brightness; many monitors look bad with fake DisplayHDR 400.`
  ),
  k(
    'kb-pc-deep-boot-install-windows-fixes',
    'Windows install and boot problems: no boot device, GPT/MBR, drive not detected, activation',
    [
      'no bootable device fix', 'windows cant install on this disk gpt', 'bios not seeing usb installer', 'windows installer stuck', 'drivers missing during windows install', 'activate windows after hardware change', 'boot loop after windows update', 'reset pc windows 11 how', 'create windows 11 usb bootable rufus',
      'windows doesnt see my ssd during install',
    ],
    `Making the installer: use Microsoft's Media Creation Tool or Rufus (GPT, UEFI) on an 8GB+ USB. Boot it from the BIOS boot menu in UEFI mode. If Windows says it cannot install to the disk because of GPT/MBR, you are booted in the wrong mode: boot the USB in UEFI mode and use GPT drives. If the SSD is not detected, check the M.2 seating and that the slot is enabled in the BIOS, and on some systems load the storage driver (Intel RST/VMD or AMD RAID) from the board maker. After install, install the chipset, LAN/Wi-Fi and GPU drivers from the board maker. Activation: a Windows license tied to your Microsoft account re-activates after a hardware change (use "I changed hardware on this device recently" in Settings > Activation); a retail key is transferable, an OEM key is not. Boot loop after an update: use Windows Recovery (Startup Repair, uninstall the latest update, System Restore). "No bootable device": the SSD is not seen, the OS was not installed, or the boot order is wrong; also check that UEFI/CSM settings match the install.`
  ),

  // ------------------------------------------------------------------ gaming performance
  k(
    'kb-pc-deep-game-settings-guide',
    'Game graphics settings explained: what costs fps and what is safe to lower',
    [
      'best graphics settings for fps', 'which settings to lower for more fps', 'what does anti aliasing do', 'taa vs msaa vs fxaa', 'texture quality vs shadows fps cost', 'what is ambient occlusion', 'is ultra settings worth it', 'dlss quality vs native',
      'vsync vs gsync vs fps cap', 'render scale explained', 'motion blur off why', 'chromatic aberration film grain',
    ],
    `Settings that cost the most fps: ray tracing/path tracing, shadows (set to medium), volumetric effects/fog/clouds, reflections, ambient occlusion (SSAO/HBAO+), and high resolution. Cheap or free: textures (cost VRAM, not fps, so max them if VRAM allows), anisotropic filtering (16x is nearly free), model/geometry detail. Anti-aliasing: MSAA (sharp, heavy), FXAA (cheap, blurry), TAA (soft, standard), DLAA/DLSS/FSR (best quality/performance). Turn off motion blur, film grain, depth of field and chromatic aberration if you prefer clarity (they cost little but add blur). V-Sync removes tearing but adds input lag; use G-Sync/FreeSync with an fps cap ~3 below the refresh rate (and V-Sync on in the driver) for the best feel; Nvidia Reflex/AMD Anti-Lag reduce latency. Upscaling: DLSS/FSR Quality at 1440p/4K looks near native and gains 30-50% fps; render scale below 100% lowers resolution. Competitive FPS: lowest shadows/effects, high contrast, 240+ fps, borderless or fullscreen, and a low-latency mouse. Optimize with a benchmark and change one setting at a time.`
  ),
  k(
    'kb-pc-deep-esports-settings',
    'Competitive game PC settings: CS2, Valorant, Fortnite, Apex, Overwatch and Warzone',
    [
      'best cs2 settings for fps', 'valorant fps settings', 'fortnite performance mode', 'apex legends settings competitive', 'overwatch 2 settings', 'what hardware do pros use for cs2', '360hz monitor worth it', 'cs2 fps cap', 'low input lag settings',
      'cs2 launch options', 'fortnite dx12 vs performance mode',
    ],
    `Esports titles are CPU- and latency-bound: CS2 and Valorant love fast CPU cores and big cache (Ryzen X3D chips like the 9800X3D top the charts), more than a high-end GPU; a mid GPU (RTX 5060/RX 9060 XT) is plenty at 1080p. Settings: low shadows/effects, high-contrast models, no motion blur, an fps cap well above your refresh rate (e.g. 400+) or uncapped with Reflex on, fullscreen/borderless, and V-Sync off. Fortnite: use Performance Mode (the lighter renderer; best fps and lowest latency) for competitive play, DX12 with Nanite/Lumen only for visuals. Valorant runs on weak PCs at hundreds of fps. Monitor: 240-360Hz 1080p/1440p, wired or 2.4GHz mouse, 800 DPI with low in-game sensitivity. Windows: close the browser, disable overlays, update GPU drivers, use a clean install if input feels delayed. Network matters too: Ethernet and a stable ping beat more fps.`
  ),

  // ------------------------------------------------------------------ AI on a PC
  k(
    'kb-pc-deep-local-llm-hardware',
    'Running local AI and LLMs on a PC: VRAM math, quantization, KV cache, speed',
    [
      'how much vram to run a llm', 'what is quantization q4 q8', 'how many parameters fit in 16gb vram', 'llama.cpp vs ollama vs lm studio', 'what is kv cache', 'tokens per second explained', 'best gpu for local llm', 'can i run llama 70b at home',
      'mac vs pc for local ai', 'run gemma locally', 'what is mlx on mac', 'cpu offload llm slow',
    ],
    `A language model's size is its parameter count (e.g. 7B = 7 billion). Memory needed ~ parameters x bytes per weight: at FP16 2 bytes (7B = 14 GB), at 8-bit 1 byte (7 GB), at 4-bit (Q4) about 0.5-0.6 bytes (7B ~ 4.5 GB, 14B ~ 9 GB, 32B ~ 20 GB, 70B ~ 40 GB), plus the KV cache (the conversation memory: grows with context length) and overhead (1-4 GB). So a 12-16 GB GPU runs 7-14B models comfortably, 24 GB runs ~30B, 32 GB (RTX 5090) runs ~32-35B at higher quality, and 70B needs 48 GB+ or a Mac/Strix Halo with 64-128 GB unified memory (slower). If a model does not fit in VRAM, layers offload to CPU RAM and speed drops sharply. Speed (tokens/s) depends on memory bandwidth more than raw compute. Tools: Ollama (simple server, used by Nexus), llama.cpp, LM Studio (GUI), vLLM (servers), MLX (Apple's fast framework for Macs). Nvidia (CUDA) has the best software support; AMD works via ROCm/Vulkan; Apple Silicon is excellent for big models thanks to unified memory. Quantization trades a little quality for a lot of memory: Q4_K_M is the usual sweet spot.`
  ),

  // ------------------------------------------------------------------ buying advice
  k(
    'kb-pc-deep-where-to-buy-warranty-rma',
    'Where to buy PC parts, warranty, return policy and the RMA process (including Canada)',
    [
      'where to buy pc parts', 'best pc parts retailer canada', 'canada computers memory express newegg ca', 'micro center vs newegg', 'how does rma work', 'warranty on used gpu', 'return policy open box', 'amazon pc parts risk', 'buying parts from facebook marketplace',
      'pcpartpicker canada', 'pc parts tariffs prices', 'where to buy a gpu without scalpers',
    ],
    `Retailers: US: Micro Center (in-store deals, bundles), Newegg, Amazon, B&H, Best Buy; Canada: Canada Computers, Memory Express, Newegg.ca, Amazon.ca, PC-Canada, Best Buy Canada (PCPartPicker has a Canada region with price tracking); Europe: Alternate, Caseking, LDLC, Scan, Overclockers UK. Prefer retailers with clear return policies, and for GPUs/CPUs buy new from the retailer, not from a marketplace seller with no returns. Marketplace listings (Facebook, Kijiji, eBay): meet in person, test the part, check serials, and beware of scams. Warranty: most CPUs/GPUs 3 years, SSDs 3-5, PSUs 5-12, RAM often lifetime; keep the receipt and the original box. RMA (return merchandise authorization): contact the maker's support, explain the fault with test results, get an RMA number, ship the part (often the buyer pays shipping one way), and wait 1-4 weeks for a repair/replacement. Open-box and refurbished parts can save money but check the warranty. Prices are also affected by import tariffs and exchange rates; watch price history rather than buying on a panic.`
  ),
  k(
    'kb-pc-deep-myths-and-misconceptions',
    'PC myths and misconceptions debunked',
    [
      'does more ram increase fps', 'are bottleneck calculators accurate', 'do rgb fans make pc faster', 'does higher resolution need more cpu', 'is 4k always better', 'do more cpu cores always mean more fps', 'is liquid cooling always better than air', 'is expensive thermal paste worth it',
      'myths about pc building', 'does a bigger psu use more electricity', 'is intel better than amd or vice versa myth', 'should i always buy the newest gpu',
    ],
    `Myths: (1) More RAM does not raise fps once you have enough (16GB is the floor, 32GB is the standard; beyond that games do not speed up). (2) Bottleneck calculators are rough guesses: judge by GPU usage in games (95-100% = GPU-limited, fine). (3) RGB, expensive fans and fancy cables do not add performance. (4) More cores are not always better for games: cache and clock speed matter. (5) AIO liquid is not always better than a good air cooler. (6) A bigger PSU does not waste more electricity; it only runs at a different point on its efficiency curve, and a quality 750-850W unit is fine. (7) The newest GPU is not automatically better value: mid-range last-gen cards can win on price/performance. (8) 4K is not always better: a 1440p high-refresh monitor often feels better than 4K 60Hz. (9) "Intel is bad" or "AMD is bad" is outdated: AMD X3D wins gaming; Intel can win productivity per dollar in some tiers. (10) Cleaning your PC with a vacuum can damage parts with static: use compressed air or an electric duster. (11) Pre-applied cooler paste is fine; you rarely need to replace it on day one. (12) Always buying the biggest case does not mean better cooling; airflow does.`
  ),
  k(
    'kb-pc-deep-safety-esd-moving-shipping',
    'PC safety: static (ESD), handling parts, transporting and shipping a PC or GPU',
    [
      'do i need an anti static wrist strap', 'how to avoid static damage pc', 'how to move a pc safely', 'how to ship a gpu', 'is it safe to open psu', 'cleaning pc with vacuum', 'working on a pc with power plugged in', 'how to transport a pc in a car', 'moving house with pc parts',
      'electrical safety pc building',
    ],
    `Static (ESD) damage is rare but real: build on a hard surface (not carpet), touch the bare metal of the case or PSU (plugged in but switched off, or just the case) before handling parts, hold cards by the edges, and keep parts in their antistatic bags until installing; a wrist strap is optional. Always switch off and unplug the PSU before connecting or removing parts; never open a PSU (it holds dangerous charge even when unplugged). Do not use a regular vacuum on parts; use compressed air or an electric duster. Moving a PC: remove or support the GPU (a heavy card can bend), take out or secure heavy air coolers, put the PC upright in a box with padding and use the original box when possible; ship a GPU in its original box with a support piece and double boxing. In a car, keep the PC upright and padded. For shipping a whole PC, use a fitted box, remove the GPU and cooler if heavy, and insure it.`
  ),
];
