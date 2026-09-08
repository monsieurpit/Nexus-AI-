import { KnowledgeItem } from '../../types';

// Batch 126 (knots & rope work) — a total gap in the corpus. Nearly every
// answer on nexus-4b was wrong or refused: "figure-eight knot" -> "it's just
// how you tie a square knot"; "water knot for webbing" -> "a fancy name for a
// square knot"; "whipping a rope end" -> a description of the goddess Nuwa
// flinging mud to make people; "two half hitches" -> tying shoelaces;
// "trucker's hitch" -> lashing a semi-trailer to a tractor by its D-ring;
// "anchor bend" -> tying fishing line to a hook; "taut-line hitch", "sheet
// bend", "alpine butterfly", "monkey's fist" -> flat refusals; "constrictor
// knot" -> a blank answer; "laid vs braided rope" -> a web dump of knot
// definitions.
export const KNOTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-knot-figure-eight',
    title: 'The Figure-Eight Knot and Why Climbers Use It',
    category: 'Knots',
    keywords: [
      'what is a figure-eight knot and why do climbers use it', 'the figure eight is a stopper knot a single loop that makes an 8 shape it is not a square knot and has nothing to do with right over left left over right',
      'the rethreaded figure eight or figure eight follow through is the standard climbing tie in knot it is strong about 75 to 80 percent efficiency easy to check visually is it a perfect 8 and does not work loose',
      'the figure eight bend flemish bend joins two ropes compared to the bowline the figure eight is easier to inspect but harder to untie after a hard fall',
    ],
    content: `A basic figure-eight knot is a STOPPER knot: you make a loop, pass the end around behind the standing part and back through the loop, and it forms a shape like the numeral 8. It stops a rope end from pulling back through a hole or belay device. It is NOT a square knot and has nothing to do with "right over left, left over right." The version climbers rely on is the FIGURE-EIGHT LOOP, and specifically the "figure-eight follow-through" (rethreaded figure-eight): you tie a loose figure-eight a metre or so from the end, pass the tail through your harness tie-in points, then thread it back through the knot retracing the original path exactly, and dress it. It is the standard tie-in knot in rock climbing because: it retains a high fraction of the rope's strength (~75–80%); it is very easy to check at a glance — a correctly tied one is a symmetrical "8" with two parallel strands throughout, so a partner can confirm it in a second; and it does not shake or work loose the way a bowline can. Its one drawback is that it welds tight after catching a hard fall and can be a struggle to untie. The FIGURE-EIGHT BEND (Flemish bend) — two figure-eights tied into each other's tails — is a clean, strong way to join two ropes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-efficiency',
    title: 'How a Knot Weakens a Rope (Knot Efficiency)',
    category: 'Knots',
    keywords: [
      'how does a knot weaken a rope and what is knot efficiency', 'any knot reduces a ropes breaking strength typically to 40 to 80 percent of the unknotted rope because the fibres on the outside of the tightest curve are stretched much more than those on the inside so they take a disproportionate share of the load and fail first',
      'sharp bends and the rope crossing or pinching itself concentrate stress figure eight about 75 to 80 percent bowline about 65 to 75 double fishermans about 65 to 70 clove hitch about 60 to 65 overhand knot about 45 to 50',
      'a loaded rope almost always breaks at the knot not in the middle',
    ],
    content: `Every knot makes a rope weaker — it does not add strength, it subtracts it, typically leaving a rope with only about 40–80% of its original breaking strength. The reason is uneven stress distribution: where the rope bends sharply through the knot, the fibres running along the OUTSIDE of the curve have to stretch much farther than the fibres on the inside, so they carry a hugely disproportionate share of the load and reach their breaking point first, after which the failure cascades through the rest. Places where the rope crosses over, pinches, or presses hard against itself add further stress concentrations. Rough figures for "knot efficiency" (the fraction of strength retained): figure-eight loop ~75–80%, bowline ~65–75%, double fisherman's ~65–70%, clove hitch ~60–65%, overhand loop ~45–50%; a sharp bend around a thin carabiner or a rock edge can be worse than any of these. This is why a rope under load almost always breaks AT a knot rather than in a clear span, why climbing gear is rated with the knot as the weak link, and why knots that spread the bend over a longer, gentler curve (like the figure-eight) keep more strength than knots with a tight nip (like the overhand).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-hitch-bend',
    title: 'Knot vs Hitch vs Bend vs Loop vs Splice',
    category: 'Knots',
    keywords: [
      'what is the difference between a knot a hitch and a bend', 'knot is the general word used specifically it means a knot tied in a rope by itself a stopper knot or a loop knot',
      'a hitch ties a rope to an object a post ring rail or another rope acting as an anchor and falls apart if the object is removed a bend joins the ends of two ropes together a loop knot makes a fixed loop',
      'a splice is a semi permanent join made by tucking the ropes own strands through itself',
    ],
    content: `"Knot" is the everyday word for any deliberate complication in cordage, but knot-tiers use a more precise vocabulary. A KNOT (in the narrow sense) is tied in a single rope acting on itself — for example a stopper knot at the end, or a loop knot. A HITCH attaches a rope to something else — a post, ring, rail, spar, carabiner, or another rope that is acting as a fixed object — and it relies on that object to keep its shape: take the object away and most hitches simply fall apart (a clove hitch or a rolling hitch, off its pole, is just a tangle). A BEND joins the working ends of two separate ropes into one (a sheet bend, a double fisherman's, a figure-eight bend). A LOOP KNOT forms a fixed, closed loop in a rope (a bowline, a figure-eight loop, an alpine butterfly). A SPLICE is a more permanent join or eye made not by knotting but by unlaying the rope's own strands and tucking them back through the standing part. So: knot = rope on itself, hitch = rope to an object, bend = rope to rope end-to-end, loop = a ring in the rope, splice = woven join.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-taut-line-hitch',
    title: 'The Taut-Line Hitch (Adjustable Loop)',
    category: 'Knots',
    keywords: [
      'what is a taut-line hitch or adjustable loop', 'an adjustable friction loop used to tension a line that you may need to re tighten the classic tent guy line knot',
      'tied around the standing part with two or three wraps inside the loop and one outside it holds under load but slides freely by hand when the load is off so you can push it up or down to tension or slacken the guy',
      'the midshipmans hitch is a more secure version',
    ],
    content: `The taut-line hitch is an adjustable loop knot — a hitch tied around the rope's own standing part in such a way that it grips when pulled but slides by hand when the tension is released. It is the standard knot for a tent or tarp guy-line: you tie the loop of the hitch around a stake, and then, whenever the line goes slack (rope stretches, ground settles, weather changes), you simply slide the knot toward the stake to take up tension, or away from it to slacken. Structurally it is two round turns wrapped INSIDE the loop, plus one half hitch OUTSIDE, all around the standing line, so the wraps bind on the line under load. The "midshipman's hitch" (also called a tautline or rolling hitch variant) puts the wraps in a slightly different, more locking order and holds better on slippery modern cord. On very slick line, both can creep, so add a stopper or use a mechanical line-tensioner.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-sheet-bend',
    title: 'The Sheet Bend (Joining Two Ropes)',
    category: 'Knots',
    keywords: [
      'what is a sheet bend and when is it better than a square knot', 'the standard knot for joining two ropes especially two ropes of different thickness or material where a square or reef knot fails badly and can capsize',
      'make a bight in the thicker rope pass the thinner rope up through it around behind both parts of the bight and tuck it under itself keep both tails on the same side', 'the double sheet bend with an extra wrap is more secure for very unequal ropes or slippery line it has the same structure as a bowline',
    ],
    content: `The sheet bend is the basic knot for tying two ropes together, and it is markedly better than a square/reef knot for that job — the reef knot is a BINDING knot, and if it is used to join two free rope ends it can "capsize" and slip apart, especially if the two ropes differ in size. To tie a sheet bend: form a bight (a U) in the thicker or stiffer rope, pass the end of the second rope up through the bight, take it around behind both legs of the bight, and then tuck it under its own standing part where it emerges — so it is trapped against the bight. For security both short tails should finish on the SAME side of the knot. A sheet bend works even when the two ropes are quite different in diameter or material, which is exactly where the reef knot fails. For a very large size difference, or with slick line, use the DOUBLE sheet bend (take the working end around behind the bight twice before tucking). The sheet bend is topologically the same knot as the bowline.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-two-half-hitches',
    title: 'Two Half Hitches (and Round Turn and Two Half Hitches)',
    category: 'Knots',
    keywords: [
      'what is a two half hitches knot', 'a reliable way to tie a rope to a post ring or eye pass the rope end around the object then tie two identical half hitches overhand knots around the standing part so the end chases itself down the standing line',
      'round turn and two half hitches puts a full wrap around the object first so the turn takes the load while you tie off the stronger standard version', 'used for mooring lines clotheslines tarp ridge lines hanging a hammock',
    ],
    content: `"Two half hitches" is a simple, dependable way to fasten a rope to a post, ring, rail, or eye. You bring the rope's end around the object, then tie a half hitch (a single overhand knot) around the STANDING part of the rope, and then a second, identical half hitch just below it — the two hitches sit next to each other and the working end runs parallel to the standing line, so under load the standing part is pinched between the object and the hitches. The more robust and much-preferred version is the ROUND TURN AND TWO HALF HITCHES: you first take a full wrap (a "round turn") completely around the object before tying the two half hitches. The round turn carries most of the load and provides friction, which means you can hold a heavy or dynamic load with one hand on the turn while you tie the hitches with the other, and it takes strain off the knot itself. This is the classic knot for tying a boat's mooring line to a piling or ring, for a clothesline, a tarp ridge line, or hanging a hammock. It jams somewhat under a hard pull but can still be worked loose.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-truckers-hitch',
    title: 'The Trucker\'s Hitch (Mechanical Advantage)',
    category: 'Knots',
    keywords: [
      'what is a truckers hitch and how does it give mechanical advantage', 'a knot for cinching a line very tight the classic for lashing a load onto a roof rack or truck bed',
      'anchor one end tie a loop in the standing part partway along a slippery or directional loop pass the working end around the far anchor point and back up through that loop then pull down',
      'the loop acts as a pulley giving roughly a 3 to 1 mechanical advantage minus friction so effectively about 2 to 1 lock it off with two half hitches around the doubled line not a semi trailer knot',
    ],
    content: `The trucker's hitch is the knot for pulling a line drum-tight — the standard way to lash a canoe, lumber, or a load to a roof rack, trailer, or pickup bed. Steps: (1) tie or anchor one end of the rope to a fixed point; (2) partway along the standing part, tie a loop that will not jam — a slippery half hitch, a directional figure-eight, or a "sheepshank"-style loop; (3) run the working end around the anchor point on the far side (a rack bar, tie-down ring, bumper) and bring it back UP and through the loop you just made; (4) haul down hard on the working end. The loop acts as a crude pulley: the working end you pull, plus the two legs of rope passing through the far anchor and back to the loop, give a theoretical 3:1 mechanical advantage (in practice friction at the loop eats some of it, so it feels like about 2:1) — so a moderate pull produces a very high line tension. (5) While holding the tension, lock it off with two half hitches around the doubled line just below the loop. To release, undo the half hitches and the whole thing lets go. (It has nothing to do with connecting a semi-trailer to a tractor.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-water-knot',
    title: 'The Water Knot (Joining Webbing)',
    category: 'Knots',
    keywords: [
      'what is a water knot for tying webbing', 'the water knot also ring bend tape knot or overhand bend is the standard knot for joining the two ends of flat webbing or tape to make a sling or loop it is not a square knot',
      'tie a loose overhand knot in one end then thread the other end back through it following the exact path in reverse retracing so the finished knot is a doubled overhand with a tail out each side',
      'safety leave at least 8 cm 3 inch tails dress it snug and check it before every use the water knot is known to slowly work loose over repeated loading cycles many climbers now prefer sewn bar tacked slings',
    ],
    content: `The water knot (also called the ring bend, tape knot, or overhand bend) is the traditional knot for tying two ends of flat webbing (tubular or flat "tape") together to make a sling, runner, or anchor loop. A square knot does NOT work in webbing — it slips out. To tie the water knot: make a loose overhand knot in one end of the webbing, then take the other end and thread it back through that overhand knot, following the first strand's path exactly but in the opposite direction, so the two strands lie flat and parallel all the way through and a tail comes out each side. Dress it flat with no twists and tighten it hard. SAFETY: this knot has a documented tendency to loosen and creep slowly under repeated loading and unloading — several fatal accidents have been caused by tied webbing slings coming undone in use — so you must leave long tails (at least 8 cm / 3 inches), pull it snug, tape or mark the tails, and physically inspect it before every use. Because of this, most modern climbers and riggers use factory-sewn (bar-tacked) slings instead of tying their own.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-whipping',
    title: 'Whipping (Stopping a Rope End from Fraying)',
    category: 'Knots',
    keywords: [
      'what is whipping and how do you keep a rope end from fraying', 'whipping is binding the end of a rope tightly with a length of thin twine to stop the strands from unravelling',
      'common whipping lay a loop of twine along the rope end wrap tightly over it toward the end then pass the working end through the loop and pull it back under the wraps to bury it west country and sailmakers whipping are more durable',
      'modern alternatives heat seal the end of a synthetic rope with a flame dip it in liquid whipping compound or use heat shrink tube an overhand knot in the end is not whipping and just makes a lump',
    ],
    content: `Whipping is the proper way to finish a rope's end so it does not fray and unlay. You bind the last 15–25 mm of the rope tightly with many close turns of thin waxed twine ("whipping twine" or sail twine). The simplest method, "common whipping": lay a small loop of twine along the rope pointing toward the end, hold it, and wrap the standing part of the twine tightly around the rope and over the loop, working toward the rope's end, for a length roughly equal to the rope's diameter; then pass the wrapping end through the exposed loop and pull the other tail so the loop drags the working end back under the turns, burying and locking it; trim both tails. More durable versions ("West Country" whipping, tied with a series of overhand knots; "sailmaker's" whipping, sewn through the strands) hold up better on working rope. For synthetic (nylon, polyester, polypropylene) rope, the quick modern fix is to melt and fuse the fibres with a flame or hot knife, and for a neat finish you can dip the end in a liquid whipping compound or slide on a piece of heat-shrink tube. (Tying an overhand knot in the end does not whip it — it just leaves a bump and the strands beyond the knot still fray.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-alpine-butterfly',
    title: 'The Alpine Butterfly Knot',
    category: 'Knots',
    keywords: [
      'what is the alpine butterfly knot', 'a fixed loop tied in the middle of a rope without access to either end strong stable and it can be loaded safely in any of the three directions both standing ends and the loop and it does not jam so it unties easily even after heavy loading',
      'uses isolating a damaged section of rope put the bad bit inside the loop out of the load path attaching a middle climber in a glacier travel rope team creating an equalised clip in point making multiple handholds in a rope',
    ],
    content: `The alpine butterfly (also "butterfly loop" or "lineman's loop") is a fixed loop tied into the MIDDLE of a rope, without needing either end. Its virtues: it is strong (retains a high fraction of rope strength), it is stable and secure, it can bear load pulled in ANY of three directions — either of the two standing ends, or the loop itself, or any combination — without distorting or weakening, and it does NOT jam, so you can untie it easily by hand even after it has held a hard load. Common uses: isolating a worn, cut, or core-shot section of a rope by tying it so the damaged bit sits harmlessly inside the loop and out of the load path; clipping a middle person into a glacier-travel or caving team; creating a directional anchor point or an equalised clip-in in the middle of a rigged line; and putting a row of them into a rope to make hand- and foot-holds or to hang gear. One quick way to tie it: wrap the rope twice around your open hand, then pull the outer wrap over the other two and back through under them, and pull the loop tight.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-slipknot-noose',
    title: 'Slipknot vs Noose',
    category: 'Knots',
    keywords: [
      'what is a slipknot and a noose and are they the same', 'a slipknot is any knot tied so that pulling one end draws the knot down or collapses a loop the slip refers to the sliding or quick release action a slipped version of a knot like a shoelace bow unties with one tug',
      'a noose is a slipknot forming a loop that runs freely and tightens around whatever is inside it as the line is pulled used for snares lassos tightening around a bundle and the hangmans noose',
      'a noose is a type of slipknot slipknot is the general mechanism noose is the specific self tightening loop',
    ],
    content: `A SLIPKNOT is a family term, not one specific knot: it is any knot tied so that pulling the standing end causes the knot to slide down the rope, or collapses a loop, or lets the whole knot fall apart with a single tug. The "slip" refers to that sliding / quick-release behaviour. A "slipped" version of a normal knot has a bight (a folded doubled section) tucked in place of the end, so one pull on that end releases it — a shoelace bow is a doubly-slipped reef knot, and a slipped half hitch is a common quick-release tie. A NOOSE is a particular kind of slipknot: a loop formed so that the loop itself runs freely through the knot and therefore tightens (constricts) around anything inside it whenever the standing line is pulled, and does not loosen on its own. Nooses are used practically for animal snares, a cowboy's lasso ("honda knot" running loop), starting a diagonal lashing, and cinching a cord tight around a bundle before finishing it off — and, notoriously, for the hangman's knot. So the two overlap: a noose IS a slipknot, but "slipknot" covers the broad idea of a sliding or releasable knot, while "noose" specifically means a self-tightening running loop.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-prusik-friction',
    title: 'The Prusik Knot and Friction Hitches',
    category: 'Knots',
    keywords: [
      'what is a prusik knot and how does a friction hitch work', 'a friction hitch is a knot tied with a thin cord or sling around a thicker rope when unloaded it slides freely along the rope but when weighted it bites down and grips',
      'the prusik is a symmetrical girth hitch wrapped two or three times using a closed loop of cord it grips in both directions used for ascending a fixed rope two prusiks alternately weighted and slid up and as a rappel backup',
      'the klemheist autoblock french prusik and bachmann are variants the friction cord must be significantly thinner than the rope typically 60 to 80 percent of the diameter',
    ],
    content: `A friction hitch is a knot tied around a rope with a separate, thinner piece of cord or webbing. The principle: when there is no load on the cord, the hitch is loose enough to slide along the main rope by hand; the instant you put weight on the cord, the wraps cinch down onto the rope and the friction locks it in place — it "grabs." The PRUSIK is the classic: take a closed loop of accessory cord (usually joined with a double fisherman's), pass it around the main rope, and girth-hitch it through itself two or three times so the wraps are neat and symmetrical. Because it is symmetrical it grips whichever way it is pulled. Two prusiks let you ascend a fixed rope: stand in the sling on one while sliding the other up, alternating. A prusik or "autoblock" tied below a rappel device and clipped to the leg loop acts as an automatic brake if you let go. Related one-directional or easier-to-release friction hitches include the Klemheist (wraps that only grip when pulled one way, works with webbing), the Autoblock / French prusik (quick to tie and release under a rappel), the Bachmann (tied around a carabiner for a handle), and mechanical rope-grabs and ascenders that do the same job with a cam. The critical requirement for any friction hitch: the cord must be clearly THINNER than the rope it grips — generally 60–80% of the rope's diameter — or it will not bite.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-anchor-bend',
    title: 'The Anchor Bend (Fisherman\'s Bend)',
    category: 'Knots',
    keywords: [
      'what is the anchor bend or fishermans bend', 'despite the name bend the anchor bend is actually a hitch it ties a rope to a ring shackle or anchor',
      'take a round turn two wraps through the ring then pass the working end back under the round turn through the extra turn pull snug and finish with a half hitch or two around the standing part or seize the tail for permanent use',
      'the round turn takes the load and the tuck locks it so it holds well under a steady heavy pull and does not jam as badly as some alternatives the traditional knot for bending an anchor rode to the anchor and for a bucket or dinghy painter',
    ],
    content: `The anchor bend (also called the fisherman's bend, though it is really a HITCH, not a bend) is used to tie a rope to a ring, shackle, or the eye of an anchor. To tie it: pass the working end through the ring twice, making a "round turn" (two wraps); then bring the working end back and tuck it UNDER that round turn — between the two wraps and the ring — and pull it snug so the round turn traps it against the ring; finally, tie one or two half hitches with the working end around the standing part, or for a permanent job seize (lash) or tape the tail to the standing part. It works because the round turn absorbs most of the load and its friction lets you tie the finishing hitches without the whole thing slipping, and because it does not bury itself as badly as a bowline or two half hitches under a heavy, wet, steady pull — so it can be untied afterward. It is the classic knot for "bending" an anchor rode onto the anchor, and it is equally good for tying a line to a bucket handle, a mooring ring, or a dinghy's painter.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-laid-vs-braided',
    title: 'Laid Rope vs Braided Rope',
    category: 'Knots',
    keywords: [
      'what is the difference between laid rope and braided rope', 'laid twisted rope is made of usually three strands twisted together in a helix the strands themselves twisted the opposite way most commonly right laid cheap easy to splice grips on a winch but stiffer kinks and hockles and untwists under load spinning a hanging weight',
      'braided rope has strands woven over and under solid braid hollow braid diamond braid and double braid or kernmantle a braided load bearing core inside a braided protective sheath all climbing rope and most modern sailing line is kernmantle more flexible does not kink or spin smoother stronger for its size but cannot be traditionally spliced',
    ],
    content: `LAID (twisted) rope is built by twisting fibres into yarns, yarns into strands, and then twisting usually three strands together into the rope — each stage twisted in the opposite direction to the one below, which is what makes the structure hold together. Most is "right-laid" (Z-twist). It is cheap, it can be spliced quickly with just a fid, its rough surface grips well on a winch drum or capstan, and if a strand is damaged you can see it. Downsides: it is stiff, it kinks and forms corkscrew loops ("hockles") if mishandled, it loses strength faster over sharp bends, and it untwists under load, so a hanging weight on the end will spin. BRAIDED rope has strands woven over-and-under. Types: single "solid braid" and "diamond braid" (flexible utility rope), "hollow braid" (easily spliceable, used for towing and ski ropes), and the strong one — "double braid" or "kernmantle" (German for "core-sheath"), which has a braided or parallel load-bearing CORE carrying most of the strength, wrapped in a tightly braided SHEATH that protects it from abrasion and UV. ALL modern climbing rope and most quality sailing line is kernmantle. Braided rope is supple, does not kink or spin, has a smooth hand that runs easily through devices, and (double braid) is stronger for a given diameter — but it needs special tools and techniques to splice, and hidden core damage under an intact sheath is harder to detect.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-knot-bowline-backup',
    title: 'The Bowline, and Why It Needs a Backup for Climbing',
    category: 'Knots',
    keywords: [
      'what is a bowline knot and why should you never use it for a critical climbing tie in without a backup',
      'a bowline makes a fixed loop at the end of a rope that will not slip under a steady load and unties easily even after heavy loading the rabbit comes out of the hole round the tree and back down the hole',
      'but the bowline can capsize or work loose when it is repeatedly loaded and unloaded or shaken with no load on it as happens on a climb and a partly loosened bowline can then roll and fail it is also harder to eyeball than a figure eight so as a tie in it must have a stopper knot double overhand or yosemite finish on the tail',
    ],
    content: `A bowline forms a secure fixed loop at the end of a rope. Under a steady pull it holds firmly and does not slip or constrict, and — unlike the figure-eight — it can still be untied by hand after taking a very heavy load, which makes it popular for rescue, sailing, and rigging. The classic tying mnemonic: make a small loop in the standing part ("the hole"), bring the end up through it ("the rabbit comes out of the hole"), around behind the standing part ("round the tree"), and back down through the small loop ("and back down the hole"). The problem for climbing: a plain bowline can "capsize" (rearrange into a slipping form) or gradually work loose when it is cyclically loaded and unloaded and jostled with NO tension on it — exactly the conditions of a day of climbing and lowering — and a bowline that has partly loosened can then roll off the end of the rope and fail completely. It is also harder for a partner to verify at a glance than the very recognisable figure-eight. So a bowline used as a harness tie-in MUST be secured — with a double-overhand stopper on the tail, or tied as a "Yosemite bowline," or a "double bowline" (two loops in the hole) plus a stopper. Many climbers simply use the figure-eight follow-through instead and accept the harder untying.`,
    createdAt: Date.now(),
  },
];
