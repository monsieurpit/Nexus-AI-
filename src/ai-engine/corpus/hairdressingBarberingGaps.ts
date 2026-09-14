import { KnowledgeItem } from '../../types';

// Batch 311 corpus fixes — hairdressing/barbering/personal grooming trades, "what's the
// difference between X and Y" topics. Zero prior dedicated corpus coverage of this domain
// (grep for balayage/relaxer/taper/fade/buzz cut/straight razor/manicure/pedicure/toupee/weave
// across the entire corpus returned nothing dedicated) — 21/25 misses, in line with other
// brand-new zero-coverage domains (numismatics 22/25, martial arts 17/25, cocktails 22/25).
// Failure patterns: severe wrong-domain hallucinations (comb over/slicked back answered with
// a Digable Planets album called "Blowout Comb"; bob/lob answered with a football "lob-volley"
// at Wembley; waxing/threading for eyebrows answered with moon phase waxing/waning; clipper/
// trimmer answered with audio signal clipping; pompadour/quiff and perm/relaxer-for-curly-hair
// both answered with unrelated pubic-hair-anatomy trivia; undercut/fade answered with weather
// cloud-front dynamics), and one-sided answers cut off before ever explaining the second term
// (haircut/trim, perm/relaxer, balayage/highlights, stylist/colorist, gel/acrylic nails,
// conditioner/mask, dandruff/dry scalp, wig/toupee, extensions/weave), plus one factually
// muddled answer (shaving/trimming) and one oversimplified/inaccurate answer (salon/barbershop
// defined purely by customer gender rather than service scope and specialty tools).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Grooming',
  keywords,
  content,
  createdAt: now,
});

export const HAIRDRESSING_BARBERING_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-groom-haircut-vs-trim',
    'Haircut vs trim',
    ['haircut', 'trim', 'difference haircut trim'],
    "A haircut is a change to the length, shape, or overall style of your hair — going shorter, adding or removing layers, changing the silhouette entirely. A trim is a much smaller, maintenance-only cut that removes just a small amount of length (often only the split or damaged ends) specifically to keep an existing style looking neat and healthy, without changing the shape or overall length in any noticeable way. The key difference: a haircut changes the style or length in a real, visible way, while a trim just tidies up the ends of an existing style without changing its shape.",
  ),
  k(
    'kb-gap-groom-fade-vs-taper',
    'Fade vs taper (haircut)',
    ['fade', 'taper', 'difference fade taper haircut', 'low taper fade'],
    "Both describe hair gradually getting shorter toward the bottom of a haircut (usually the sides and back), but they differ in how far that shortening goes. A taper is a subtle, gradual shortening that never reaches bare skin — even at its shortest point near the hairline or neck, there's still a small amount of visible hair, keeping a soft, natural-looking edge. A fade takes that same gradual blending all the way down to bare skin (zero length) at some point, creating much higher contrast between the top and the sides; fades are described as low, mid, or high depending on where on the head the blend starts. The key difference: a taper gradually shortens hair without ever exposing bare skin, while a fade gradually blends hair all the way down to the skin for a more dramatic, high-contrast look — every fade is technically a taper, but not every taper is a fade.",
  ),
  k(
    'kb-gap-groom-perm-vs-relaxer',
    'Perm vs relaxer',
    ['perm', 'relaxer', 'difference perm relaxer hair', 'perm relaxer curly hair'],
    "Both are chemical treatments that break and re-form the disulfide bonds inside hair strands to permanently change its texture, but they change it in opposite directions. A perm ('permanent wave') adds curl or wave to straight or slightly wavy hair — the hair is wrapped around rods, treated with a chemical solution that breaks the internal bonds, then a neutralizer re-forms the bonds while the hair holds the rod's curled shape. A relaxer does the opposite: it's used to straighten naturally curly or coily hair by breaking those same bonds and then re-setting the hair strand in a straightened, flattened shape (often using a comb to pull it straight during processing). Both processes carry real risk of hair/scalp damage if left on too long or done too often. The key difference: a perm chemically adds curl/wave to hair, while a relaxer chemically removes curl to straighten hair — they use the same bond-breaking chemistry aimed at opposite results.",
  ),
  k(
    'kb-gap-groom-balayage-vs-highlights',
    'Balayage vs highlights',
    ['balayage', 'highlights', 'difference balayage highlights'],
    "Highlights are done using foils: sections of hair are separated, coated in lightener, and wrapped in foil packets that isolate each section for a controlled, uniform, often more noticeably striped lightening pattern. Balayage (French for 'to sweep') is a freehand technique — the colorist hand-paints lightener directly onto the surface of sections of hair with no foil, sweeping it on more heavily toward the ends and tapering off near the roots, which creates a softer, more natural-looking, sun-kissed graduation of color with a much softer regrowth line. The key difference: highlights are foiled for a uniform, defined pattern, while balayage is hand-painted freehand for a softer, more natural gradient — both lighten hair, but the application method and resulting look are very different.",
  ),
  k(
    'kb-gap-groom-shaving-vs-trimming',
    'Shaving vs trimming',
    ['shaving', 'trimming', 'difference shaving trimming'],
    "Shaving uses a razor blade to cut hair off flush at (or just below) the skin's surface, leaving no visible length at all — which is also why regrowth can feel coarser at first, since the blunt-cut tip hasn't tapered to a fine point yet. Trimming uses scissors or clippers with a guard/comb to shorten hair to a specific short length while deliberately leaving some length behind, rather than removing it down to the skin — used to maintain a beard, mustache, or short haircut at a consistent length rather than eliminate the hair. The key difference: shaving removes hair completely down to the skin, while trimming shortens hair to a controlled, still-visible length without removing it entirely.",
  ),
  k(
    'kb-gap-groom-comb-over-vs-slicked-back',
    'Comb over vs slicked back hairstyle',
    ['comb over', 'slicked back', 'difference comb over slicked back hairstyle'],
    "A comb over is a style where hair from one side (or the back) of the head is grown longer and combed across the top specifically to cover a bald or thinning area — its whole purpose is concealment, and it only works on someone with thinning hair on part of the scalp. A slicked-back style is combing all the hair straight back off the forehead using gel, pomade, or wax for a smooth, controlled, shiny look — it has nothing to do with covering baldness and works on a full head of hair of suitable length, giving a polished, put-together look rather than a concealment purpose. The key difference: a comb over is specifically meant to hide a bald or thinning spot by combing hair over it, while a slicked-back style is a general styling choice that combs all the hair backward for a sleek look, regardless of hair loss.",
  ),
  k(
    'kb-gap-groom-layers-vs-blunt-cut',
    'Layers vs blunt cut',
    ['layers', 'blunt cut', 'difference layers blunt cut hair'],
    "Layers are created by cutting sections of hair to different lengths throughout the head — shorter pieces on top or around the face graduating into longer pieces underneath — which removes bulk, adds movement, and gives the hair a more textured, dynamic shape. A blunt cut does the opposite: all the hair is cut to one single, uniform length with no graduation, giving a thick, sharp, straight-across line (most visible on the ends), which reads as heavier and more structured/geometric. The key difference: layers vary the hair's length throughout for movement and texture, while a blunt cut keeps every strand the same length for a single, sharp, uniform line.",
  ),
  k(
    'kb-gap-groom-bob-vs-lob',
    'Bob vs lob haircut',
    ['bob haircut', 'lob haircut', 'long bob', 'difference bob lob haircut'],
    "A bob is a haircut that typically falls between the chin and just below the jaw or ear — a shorter, classic cut that sits above the shoulders. A lob ('long bob') is a longer variant of the same basic cut, extending down to around shoulder length or just past it, splitting the difference between a traditional short bob and longer hair. The key difference: a bob is the shorter version (chin-to-jaw length), while a lob is the longer 'long bob' variant that reaches the shoulders — both share the same basic blunt, chin-independent silhouette, just at different lengths.",
  ),
  k(
    'kb-gap-groom-stylist-vs-colorist',
    'Stylist vs colorist',
    ['hair stylist', 'colorist', 'difference stylist colorist'],
    "A (hair) stylist is a generalist who handles cutting, shaping, and styling hair — haircuts, blow-outs, updos, and overall look — and in many salons will also apply color as part of a broader skill set. A colorist is a specialist focused specifically on hair color: formulating and mixing dye/lightener, choosing and executing techniques like balayage, foils, or full-color, correcting color mistakes, and understanding the chemistry of how different color processes interact with different hair types — often with training well beyond what a general stylist has for color work specifically. The key difference: a stylist is a generalist handling cutting and overall styling (and often basic color), while a colorist is a specialist trained specifically in the chemistry and technique of hair coloring.",
  ),
  k(
    'kb-gap-groom-salon-vs-barbershop',
    'Salon vs barbershop',
    ['hair salon', 'barbershop', 'difference salon barbershop'],
    "A barbershop traditionally specializes in short, precision men's cuts, clipper work, fades, and straight-razor shaves/beard trims — its core tools and training center on cutting hair close and sharp with clippers and razors. A salon offers a much broader range of services for any gender: cuts of any length, chemical services like coloring/perms/relaxers, styling, treatments, and extensions, generally with a wider range of equipment (chairs, color stations, processing tools) built around versatility rather than one narrow specialty. Historically barbershops skewed toward male clientele and salons toward female, but that split is about the traditional service focus and tools, not a rule about who's allowed in either kind of shop — plenty of people of any gender use both today. The key difference: a barbershop specializes in short cuts, clipper work, and razor shaves, while a salon offers a broader range of cutting, coloring, and chemical services — the real distinction is service scope and specialty tools, not customer gender.",
  ),
  k(
    'kb-gap-groom-waxing-vs-threading',
    'Waxing vs threading (eyebrows)',
    ['waxing eyebrows', 'threading eyebrows', 'difference waxing threading'],
    "Waxing applies hot or cold wax to the skin, presses a strip onto it, and pulls the strip off quickly — the wax grips a whole patch of hair at once and rips it out from the root, covering a wider area fast but risking irritation, burns (with hot wax), or removing more hair than intended. Threading uses a twisted length of cotton thread, rolled across the skin so the twists trap and pluck individual hairs one at a time (or in small precise lines) right at the follicle — no chemicals or heat touch the skin, making it gentler and more precise for shaping a clean brow line, though it's slower than waxing for covering large areas. The key difference: waxing removes a wider patch of hair at once using a sticky wax strip, while threading is a chemical-free, thread-based technique that plucks hair with much more precision but takes longer.",
  ),
  k(
    'kb-gap-groom-manicure-vs-pedicure',
    'Manicure vs pedicure',
    ['manicure', 'pedicure', 'difference manicure pedicure'],
    "A manicure is a cosmetic treatment for the hands and fingernails — shaping the nails, pushing back or trimming cuticles, moisturizing the hands, and applying polish or nail art. A pedicure is the equivalent treatment for the feet and toenails, and typically includes extra steps a manicure doesn't, like soaking the feet, removing calluses and dead skin (often with a foot file or pumice), and more foot-focused massage, since feet deal with more pressure, friction, and dead skin buildup than hands do. The key difference: a manicure treats the hands and fingernails, while a pedicure treats the feet and toenails and usually includes extra callus/dead-skin care specific to feet.",
  ),
  k(
    'kb-gap-groom-gel-vs-acrylic-nails',
    'Gel nails vs acrylic nails',
    ['gel nails', 'acrylic nails', 'difference gel acrylic nails'],
    "Gel nails use a soft gel polish or gel-based extension product that only hardens when cured under a UV or LED lamp; they tend to look thinner and more natural, are more flexible (less prone to cracking on impact), and soak off relatively gently with acetone without much damage to the natural nail. Acrylic nails are made by mixing a liquid monomer with a powder polymer into a bead that's shaped onto the nail and hardens by air-drying (no lamp needed); they're harder and more durable, better suited to building out significant extra length or repairing a damaged nail, but application involves a stronger chemical smell and removal requires longer acetone soaking that can be harsher on the natural nail if not done carefully. The key difference: gel nails are cured under a UV/LED lamp for a thinner, more flexible, gentler-to-remove finish, while acrylic nails are a liquid-and-powder mix that air-dries into a harder, more durable extension material.",
  ),
  k(
    'kb-gap-groom-clipper-vs-trimmer',
    'Clipper vs trimmer (hair)',
    ['hair clipper', 'hair trimmer', 'difference clipper trimmer'],
    "Hair clippers have larger, wider blades and a more powerful motor built to cut through bulk hair quickly over large areas of the scalp — they're the main tool for full haircuts, fades, and buzz cuts, usually used with detachable guard combs to set a consistent length. Trimmers have smaller, narrower, more precise blades and a less powerful motor, designed for detail work rather than bulk cutting — cleaning up hairlines, necklines, sideburns, and edging, plus facial hair like beards and mustaches, where precision matters more than speed or cutting volume. The key difference: clippers are built for cutting large amounts of hair quickly with more power, while trimmers are built for precise, detailed edge and facial-hair work with smaller, finer blades.",
  ),
  k(
    'kb-gap-groom-pompadour-vs-quiff',
    'Pompadour vs quiff',
    ['pompadour', 'quiff', 'difference pompadour quiff'],
    "A pompadour is a style where the hair is swept up and back off the forehead with significant volume built up and maintained across the whole top of the head, from the hairline all the way back — a classic, fuller, more dramatic look (associated with Elvis-era styling) that usually needs longer hair on top. A quiff is generally shorter and more localized: it keeps a distinct forward-swept section or tuft of hair just at the front of the head styled up and slightly forward, while the rest of the top and sides are shorter (often with a fade), giving a smaller, more modern, lower-maintenance burst of volume rather than height across the whole top. The key difference: a pompadour builds volume and height across the entire top of the head swept straight back, while a quiff concentrates a smaller forward-swept tuft of volume just at the front, with shorter hair everywhere else.",
  ),
  k(
    'kb-gap-groom-undercut-vs-fade',
    'Undercut vs fade',
    ['undercut', 'fade haircut', 'difference undercut fade'],
    "An undercut shaves or clips the sides and back very short (often close to the skin or fully shaved) with a hard, visible line where it meets the longer hair left on top — an abrupt, high-contrast transition, not a gradual blend. A fade also shortens the sides and back down toward the skin, but does it as a smooth, gradual blend through multiple clipper-guard lengths with no hard line anywhere — the length tapers down continuously rather than switching abruptly. The key difference: an undercut creates a sharp, visible line between short sides and longer top, while a fade blends the same transition smoothly and gradually with no hard line.",
  ),
  k(
    'kb-gap-groom-conditioner-vs-mask',
    'Hair conditioner vs hair mask',
    ['hair conditioner', 'hair mask', 'difference conditioner mask hair'],
    "Conditioner is a lightweight product used every time you shampoo, left on for just a minute or two — it works mainly on the outer cuticle layer, smoothing it down, reducing frizz, and adding slip/shine quickly with minimal commitment. A hair mask is a much heavier, more concentrated deep-conditioning treatment, left on for 10-30 minutes (sometimes with heat) so its ingredients have time to actually penetrate into the hair shaft rather than just coat the surface, used weekly or biweekly rather than daily for more intensive repair, moisture, or protein treatment. The key difference: conditioner is a fast, light, every-wash surface treatment, while a hair mask is a heavier, longer-application deep treatment used less often for more intensive repair.",
  ),
  k(
    'kb-gap-groom-dandruff-vs-dry-scalp',
    'Dandruff vs dry scalp',
    ['dandruff', 'dry scalp', 'difference dandruff dry scalp'],
    "Dandruff is usually caused by an overgrowth of the yeast-like fungus Malassezia feeding on excess oil on the scalp, which speeds up skin-cell turnover — its flakes tend to be larger, yellowish, and oily/greasy, often paired with an oily scalp and itching from the fungal irritation. Dry scalp is caused by a genuine lack of moisture in the skin (from harsh products, cold/dry weather, or over-washing) rather than a fungal overgrowth — its flakes tend to be smaller, white, and dry rather than greasy, and the scalp itself feels tight or dry rather than oily, sometimes alongside dry skin elsewhere on the body. The key difference: dandruff comes from a fungus overgrowing on excess oil and produces larger, greasy flakes, while dry scalp comes from a lack of moisture and produces smaller, dry flakes with a dry (not oily) scalp.",
  ),
  k(
    'kb-gap-groom-wig-vs-toupee',
    'Wig vs toupee',
    ['wig', 'toupee', 'difference wig toupee'],
    "A wig is a full head covering of hair (natural or synthetic) meant to cover the entire scalp — worn over a full head of existing hair for a style change, or by someone who has lost most or all of their hair, and typically attached with a cap that covers the whole head. A toupee is a smaller, partial hairpiece that covers only a specific section of the scalp — almost always the crown or top, where male-pattern hair loss is most common — leaving the wearer's remaining natural hair around it visible and blended in, rather than covering the whole head. The key difference: a wig covers the entire head of hair, while a toupee is a smaller, partial hairpiece covering just one thinning area (usually the crown), blended in with the wearer's remaining natural hair.",
  ),
  k(
    'kb-gap-groom-extensions-vs-weave',
    'Hair extensions vs weave',
    ['hair extensions', 'weave hair', 'difference hair extensions weave'],
    "Hair extensions are added directly to the natural hair using methods like clip-ins, tape-ins, or fusion/glue bonds, attaching individual wefts or strands straight onto existing hair strands for extra length or volume — they can usually be applied and removed relatively quickly (clip-ins even daily). A weave (or sew-in) works differently: the natural hair is first braided flat against the scalp (usually in cornrows) to create a base, and then wefts of hair are sewn onto that braided base with a needle and thread, rather than attached to individual strands — a technique especially common as a protective style for textured/curly natural hair, since it keeps the natural hair tucked away and undamaged underneath. The key difference: extensions attach hair directly to individual natural strands (clips, tape, or bonds), while a weave sews wefts of hair onto a braided base built from the natural hair, protecting it underneath.",
  ),
];
