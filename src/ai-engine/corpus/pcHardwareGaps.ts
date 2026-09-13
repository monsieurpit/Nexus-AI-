import { KnowledgeItem } from '../../types';

/**
 * PC_HARDWARE_GAPS — batch 264 corrections. nexus-4b is genuinely strong on
 * PC hardware/networking overall (only 5 misses out of 25 — a big contrast
 * with the video-game-genre batch right before it, 16/25 wrong). Handled
 * well: CPU/GPU, RAM/storage, SSD/HDD, DDR4/DDR5, integrated/dedicated
 * graphics, laptop/desktop CPU, overclocking/stock speed, refresh rate/
 * response time, HDMI/DisplayPort, mechanical/membrane keyboard, wifi/
 * bluetooth, 2.4GHz/5GHz, router/modem, upload/download speed, latency/
 * bandwidth, cache/RAM, core/thread, lossy/lossless compression, VM/
 * container, cloud/local storage. Misses:
 * - "motherboard vs chipset" was a pure web-search dump (a list of VIA
 *   Technologies chipsets + AMD chipset history), never explained the actual
 *   conceptual difference.
 * - "PSU wattage vs efficiency rating" explained wattage fine, then got cut
 *   off before ever explaining what an efficiency rating (80+ Bronze/Gold/
 *   Platinum) actually is.
 * - "VRAM vs system RAM" only explained system RAM and never once addressed
 *   VRAM specifically, despite the question naming it directly.
 * - "32-bit vs 64-bit OS" said a 64-bit system can theoretically manage "like,
 *   16" (implying ~16GB) — a real understatement; 64-bit addressing's
 *   theoretical ceiling is enormously higher (exabytes), and even ordinary
 *   64-bit Windows editions support far more than 16GB.
 * - "RGB vs CMYK" explained the RGB/additive half correctly then got cut off
 *   mid-sentence before ever explaining CMYK/subtractive color at all.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'technology', keywords, content, createdAt: now,
});

export const PC_HARDWARE_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-pch-motherboard-vs-chipset',
    'Motherboard vs chipset',
    [
      'difference between a motherboard and a chipset', 'a motherboard is the physical circuit board that physically holds and connects every component the cpu ram graphics card storage and ports',
      'a chipset is a specific chip or pair of chips on the motherboard itself that manages communication between the cpu and everything else determining which features and expansion options that board supports',
      'the chipset determines things like how many usb ports pcie lanes overclocking support and ram speeds a motherboard can offer',
    ],
    `A MOTHERBOARD is the big physical circuit board itself — the literal piece of hardware that everything else PHYSICALLY plugs into: the CPU socket, RAM slots, graphics card slot, storage connectors, USB ports, and so on. It's the whole board.

A CHIPSET is a specific chip (or small set of chips) SOLDERED ONTO that motherboard that manages the communication and data traffic between the CPU and everything else — RAM, storage, USB, expansion slots. The chipset is what actually DETERMINES which features that particular motherboard supports: how many USB ports and PCIe lanes it has, whether it supports CPU overclocking, what RAM speeds it's rated for, and so on.

So: the motherboard is the whole physical board, and the chipset is one specific component ON that board that decides its capabilities — two motherboards can look nearly identical but have very different chipsets (like Intel's Z-series vs B-series or H-series), which is why chipset name matters when picking a motherboard for overclocking or extra features.`,
  ),
  k(
    'kb-gap-pch-psu-wattage-vs-efficiency',
    'PSU wattage vs efficiency rating',
    [
      'difference between power supply wattage and efficiency rating', 'wattage is the maximum amount of power in watts a power supply can deliver to your components',
      'efficiency rating like 80 plus bronze silver gold platinum titanium measures what percentage of the power drawn from the wall actually gets converted into usable power for your pc versus wasted as heat',
      'an 80 plus gold psu wastes less electricity as heat than an 80 plus bronze psu of the same wattage',
    ],
    `WATTAGE is simply how much power, in watts, a power supply is rated to be able to DELIVER to your components at maximum — a "750W" power supply can supply up to 750 watts to your CPU, GPU, drives, etc.

The EFFICIENCY RATING (the "80 Plus" certification: Bronze, Silver, Gold, Platinum, Titanium, in ascending order) measures something totally different — what PERCENTAGE of the power drawn from the wall outlet actually gets converted into usable power for your PC, versus wasted as heat. An "80 Plus" certified PSU is guaranteed to be at least 80% efficient at various load levels; higher tiers (Gold, Platinum, Titanium) waste even less as heat and cost more electricity savings over time, along with usually running cooler and quieter.

So: wattage tells you how much power it CAN supply, efficiency rating tells you how much of the power it DRAWS FROM THE WALL is wasted versus actually used — a higher-wattage unit isn't automatically more efficient, and a smaller, higher-efficiency-rated PSU can waste less electricity than a bigger, lower-rated one.`,
  ),
  k(
    'kb-gap-pch-vram-vs-system-ram',
    'VRAM vs system RAM',
    [
      'difference between vram and system ram', 'vram video ram is memory built directly onto the graphics card dedicated only to storing textures frame buffers and 3d rendering data for the gpu',
      'system ram is the general purpose memory on the motherboard used by the cpu and operating system for everything the whole computer is doing',
      'a graphics card with its own 8gb or 12gb of vram is separate from and does not count as part of your systems 16gb or 32gb of ram',
    ],
    `VRAM (video RAM) is memory built directly onto the GRAPHICS CARD itself, dedicated entirely to storing textures, frame buffers, and other 3D rendering data the GPU needs instant access to while drawing each frame. It's physically separate hardware from your main system memory, and only the GPU uses it.

SYSTEM RAM is the general-purpose memory installed on the motherboard (your "16GB" or "32GB" of RAM) that the CPU and operating system use for basically everything the whole computer is doing — running programs, the OS itself, background tasks, and so on.

They are SEPARATE pools: a graphics card's 8GB or 12GB of VRAM does NOT count as part of, or subtract from, your system's 16GB/32GB of RAM — they're two independent chunks of memory serving two different processors (GPU vs CPU). Running out of VRAM causes texture/graphics issues in games specifically; running out of system RAM slows down or crashes the whole computer generally.`,
  ),
  k(
    'kb-gap-pch-32-bit-vs-64-bit-ram-limit',
    '32-bit vs 64-bit operating systems: the real RAM ceiling',
    [
      'difference between 32 bit and 64 bit operating systems how much ram can each address', '32 bit operating system can only address about 4gb of ram maximum around 3.2 to 3.5gb usable in practice',
      '64 bit operating system can theoretically address far more than 16gb up to 16 exabytes in theory and in practice consumer editions of windows support anywhere from 128gb to several terabytes of ram depending on edition',
      'the difference is not a small jump from 4gb to 16gb it is an enormous jump from 4gb to effectively unlimited for consumer purposes',
    ],
    `A 32-BIT operating system can only address (recognize/use) about 4GB of RAM maximum, in practice usually only around 3.2–3.5GB usable, because a 32-bit address can only represent about 4 billion distinct memory locations.

A 64-BIT operating system's theoretical addressing limit is enormous — up to 16 exabytes (16 billion gigabytes) — and while no consumer hardware gets anywhere near that, real 64-bit consumer operating systems (like current Windows editions) support anywhere from 128GB up to several terabytes of RAM depending on the specific edition, nowhere close to a small number like 16GB. Practically speaking, essentially all modern software and hardware assumes 64-bit today; 32-bit OSes are effectively obsolete for anything beyond old/legacy hardware.

The key point: the jump from 32-bit to 64-bit isn't a small step (like 4GB to 16GB) — it's the difference between a hard 4GB ceiling and, for any realistic consumer purpose, effectively no meaningful RAM ceiling at all.`,
  ),
  k(
    'kb-gap-pch-rgb-vs-cmyk',
    'RGB vs CMYK color',
    [
      'difference between rgb and cmyk color', 'rgb red green blue is an additive color model used for light emitting screens like tvs phones and monitors combining all three colors of light at full intensity makes white and no light makes black',
      'cmyk cyan magenta yellow key black is a subtractive color model used for physical printing where pigments absorb subtract light combining cyan magenta and yellow ink is supposed to make black but in practice looks muddy brown so a separate black ink key is added',
      'screens use rgb light printers use cmyk ink that is why colors sometimes look different on screen versus printed',
    ],
    `RGB (Red, Green, Blue) is an ADDITIVE color model, used for anything that emits its own LIGHT — TVs, phone screens, computer monitors. You're literally adding light together: combining red, green, and blue light at full intensity produces WHITE (more light energy added), and the total absence of all three produces BLACK.

CMYK (Cyan, Magenta, Yellow, Key/blacK) is a SUBTRACTIVE color model, used for physical PRINTING with actual ink or pigment. Instead of adding light, you're subtracting it — pigments absorb (subtract) certain wavelengths of light bouncing off white paper, and your eye sees whatever wavelengths are left over. Mixing cyan, magenta, and yellow ink together in theory should produce black by absorbing all light, but in practice real-world inks produce a muddy brown instead — so a separate true BLACK ink ("Key") is added as the fourth channel to get proper deep black and sharper text.

The practical reason this matters: screens (RGB, light-based) and printers (CMYK, ink-based) work on fundamentally different color systems, which is exactly why a color that looks vivid on your monitor can come out looking duller or different once it's actually printed — the two systems can't represent the exact same range of colors.`,
  ),
];
