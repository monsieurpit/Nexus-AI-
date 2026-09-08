import { KnowledgeItem } from '../../types';

// Batch 56 (everyday physics) gap-fills. Weak category (~7/25). Live misses on
// nexus-4b: "why does a spinning top not fall over" -> answered Inception;
// "why do you feel pushed outward on a merry-go-round" -> "because I crave
// chaos"; "why does a heavier object not fall faster" -> a history-of-aviation
// web dump; "why does a straw look bent in water" -> "surface tension" (it's
// refraction); "why does a spinning ice skater speed up when pulling arms in"
// -> "pulling your arms in increases your rotational inertia" (it decreases it);
// "why is it harder to walk on sand" -> a MythBusters dump.
export const EVERYDAY_PHYSICS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-spinning-top',
    title: 'Why a Spinning Top Does Not Fall Over',
    category: 'Physics',
    keywords: [
      'why does a spinning top not fall over', 'gyroscopic stability top', 'why does a top stay upright when spinning',
      'what is precession', 'why does a top wobble before it falls', 'angular momentum spinning top',
    ],
    content: `A spinning top stays up because of angular momentum. When it spins, it has a large angular momentum pointing along its spin axis. Gravity still pulls down on it and tries to tip it over — but for a spinning object, applying a sideways torque doesn't make it fall; instead it makes the spin axis slowly swivel around in a cone (this is "precession," the slow circling you see). The faster the top spins, the more angular momentum it has and the slower and steadier that precession is, so it looks like it's just standing there defying gravity. Friction at the tip (and air drag) gradually bleeds away the spin; as the top slows, the precession gets wider and wobblier, and once the spin is too slow to resist gravity, the top topples. It's the same physics that keeps a gyroscope, a spinning bicycle wheel, a football thrown with a spiral, and the Earth itself stable. (Nothing to do with the film Inception.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-merry-go-round',
    title: 'Why You Feel Pushed Outward on a Merry-Go-Round',
    category: 'Physics',
    keywords: [
      'why do you feel pushed outward on a merry-go-round', 'what is centrifugal force', 'centripetal vs centrifugal force',
      'why do you slide off a spinning platform', 'why does a car feel like it pushes you sideways in a turn',
      'is centrifugal force real',
    ],
    content: `There isn't actually an outward force — that feeling is your own inertia. By Newton's first law, your body naturally wants to keep moving in a straight line at constant speed. To make you travel in a circle instead, something has to constantly pull or push you toward the centre (a "centripetal force") — the handrail you grip, the friction of the floor on your feet, the seat back. You feel that inward push as if you were being thrown OUTWARD against it, because your body is trying to go straight and the merry-go-round keeps curving you inward. If you let go, you don't fly straight outward; you fly off along a tangent, in the straight line you were already travelling. The apparent outward force is called "centrifugal force" — it's a real, useful bookkeeping trick when you do physics in the rotating frame, but from the outside there's only the inward force and your inertia. The faster the spin or the bigger the circle, the more centripetal force is needed, so the harder you feel flung.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heavier-object-fall',
    title: 'Why a Heavier Object Does Not Fall Faster',
    category: 'Physics',
    keywords: [
      'why does a heavier object not fall faster than a lighter one', 'do heavier things fall faster', 'galileo falling objects',
      'why do a hammer and a feather fall at the same rate', 'apollo 15 hammer feather', 'gravity acceleration mass',
    ],
    content: `Gravity does pull harder on a heavier object — twice the mass, twice the force. But a heavier object is also twice as hard to get moving (twice the inertia). Those two effects cancel exactly, so every object accelerates downward at the same rate, about 9.8 m/s² near Earth's surface, regardless of its mass. Drop a bowling ball and a marble from the same height in a vacuum and they land together. Galileo argued this around 1600 (the story that he dropped weights from the Leaning Tower of Pisa is probably a legend), and Apollo 15 astronaut David Scott demonstrated it live on the airless Moon in 1971, dropping a hammer and a feather that hit the ground at the same instant. On Earth the reason a feather, a leaf or a sheet of paper drifts down slowly is not its light weight but AIR RESISTANCE — crumple the paper into a ball and it falls almost as fast as a rock. In a true vacuum, all of them fall identically.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-straw-bent-water',
    title: 'Why a Straw Looks Bent in Water',
    category: 'Physics',
    keywords: [
      'why does a straw look bent in water', 'why does a pencil look broken in a glass of water', 'what is refraction',
      'why do things underwater look shifted', 'why does a swimming pool look shallower than it is', 'index of refraction',
    ],
    content: `It's refraction, not surface tension. Light travels more slowly in water than in air, so when a light ray passes from the water into the air (on its way from the straw to your eye) it changes direction — it bends at the surface. Your brain assumes light always travels in straight lines, so it traces the bent ray straight back and "places" the underwater part of the straw in a different spot than where it really is — shifted and raised toward the surface. The result is that the straw appears to jump or kink right at the waterline and the submerged part looks broken off and displaced. The same effect makes a swimming pool or a lake look shallower than it is, makes a fish appear closer to the surface than it actually swims, and is exactly how lenses in glasses, cameras and eyes work — bending light by controlled amounts. How much light bends between two materials is set by their "refractive index."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-spinning-skater',
    title: 'Why a Spinning Skater Speeds Up When Pulling Their Arms In',
    category: 'Physics',
    keywords: [
      'why does a spinning ice skater speed up when they pull their arms in', 'conservation of angular momentum',
      'moment of inertia arms in', 'why do figure skaters spin faster', 'angular momentum figure skating', 'why does pulling mass toward the axis speed up rotation',
    ],
    content: `It's conservation of angular momentum. Angular momentum equals "moment of inertia" times "angular velocity" (spin rate), and with almost no friction on the ice, the skater's angular momentum stays constant while they spin. Moment of inertia measures how spread out the mass is from the spin axis: arms and one leg stretched out puts a lot of mass far from the axis, so the moment of inertia is LARGE. Pulling the arms and leg in tight brings that mass close to the axis, which makes the moment of inertia SMALL. Since the product (moment of inertia × spin rate) can't change, if the moment of inertia drops, the spin rate must rise to compensate — so the skater spins dramatically faster. Spreading back out slows them again. (Pulling in does the extra work needed to speed up the mass, drawn from the skater's muscles.) The same effect makes a collapsing spinning gas cloud speed up to form a fast-rotating star, and it's how divers and gymnasts control how fast they somersault.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-walk-on-sand',
    title: 'Why It Is Harder to Walk on Sand Than Pavement',
    category: 'Physics',
    keywords: [
      'why is it harder to walk on sand than pavement', 'why is walking on the beach tiring', 'energy cost of walking on sand',
      'why does your foot sink in sand', 'why is dry sand harder to walk on than wet sand', 'walking on soft ground physics',
    ],
    content: `On a hard surface, when you push off, the ground pushes right back (Newton's third law) and returns almost all your energy — the surface barely deforms, and a springy surface (a running track) even gives some back. Sand does the opposite: it's a loose pile of grains that slide past each other, so with every step your foot sinks in and the sand flows and shears out of the way. The work you do compacting and displacing that sand, plus the energy lost to friction between the grains, is not returned to you — it's wasted as heat and rearranged sand. You also get a weak, mushy push-off because your foot doesn't meet a firm surface, and your leg muscles have to work harder to stabilise on the shifting ground. Measurements show walking on soft dry sand costs roughly 1.6 to 2.7 times as much energy as walking the same distance on a firm surface (running on sand is even worse). Wet, packed sand is much easier because the water holds the grains together into something more solid.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-boat-float-nail-sinks',
    title: 'Why a Boat Floats but a Nail Sinks',
    category: 'Physics',
    keywords: [
      'why does a boat float but a nail sinks', 'how does a steel ship float', 'archimedes principle explained',
      'why does a metal boat not sink', 'buoyancy and displacement', 'what determines if something floats',
    ],
    content: `An object floats if it can push aside (displace) a weight of water equal to its own weight — Archimedes' principle. A steel NAIL is a small lump of solid metal denser than water: even at the deepest it can sink, it only displaces its own small volume of water, which weighs less than the nail, so it can't be held up and it sinks. A steel BOAT is mostly a hollow shell full of air. Because of its shape it can sit low in the water and push aside a huge volume — many tonnes — of water, and as long as the weight of that displaced water is more than the total weight of the boat (steel hull plus air plus cargo), the upward buoyant force wins and it floats. Put another way, the AVERAGE density of the whole boat (steel + trapped air) is less than water's, even though steel by itself is denser. If the hull is holed and fills with water, the air is replaced, the average density rises above water's, and the boat sinks — like the nail.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-helium-balloon',
    title: 'Why a Helium Balloon Floats',
    category: 'Physics',
    keywords: [
      'why does a helium balloon float', 'why does helium make a balloon rise', 'buoyancy in air', 'why is helium lighter than air',
      'why does a helium balloon eventually deflate', 'hot air balloon vs helium balloon',
    ],
    content: `A helium balloon floats for the same reason a boat floats on water — buoyancy. The balloon, filled with helium, displaces a volume of air, and that displaced air is pushed up and out of the way; by Archimedes' principle the surrounding air pushes back UP on the balloon with a force equal to the weight of the air displaced. Helium is about seven times less dense than air (its atoms are very light), so the balloon plus its helium weighs much less than the air it shoves aside — the upward buoyant force beats the downward weight and the balloon rises until it reaches air thin enough that the forces balance (or it pops). A hot-air balloon works the same way but makes its gas lighter by heating it (hot air is less dense than cool air). Helium balloons go limp after a day or two because helium atoms are tiny enough to slip between the molecules of the latex or Mylar skin and leak out. (Sound speed has nothing to do with it.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bicycle-upright',
    title: 'How a Bicycle Stays Upright',
    category: 'Physics',
    keywords: [
      'how does a bicycle stay upright', 'why does a moving bike balance', 'bicycle self stability', 'is it the gyroscopic effect of the wheels',
      'caster and trail bicycle steering', 'why is it hard to balance a stationary bike', 'no hands bike riding',
    ],
    content: `A moving bicycle balances mainly because it automatically steers into the direction it's falling. If the bike starts to lean left, the front wheel turns left — partly on its own and partly from the rider's tiny corrections — and this drives the wheels through a curved path that swings the bottom of the bike back under its centre of mass, standing it up again. The front wheel steers itself because of "trail": the wheel's contact patch with the ground sits behind the point where the steering axis would meet the ground (like the caster wheels on a shopping trolley), so gravity and gyroscopic effects nudge it to turn toward a lean. The spinning wheels do add a stabilising gyroscopic effect, but experiments with special bikes built with counter-spinning extra wheels show that steering geometry and mass distribution alone are enough — the gyroscope isn't essential. This is why a bike is nearly impossible to balance when stationary (no steering corrections available) but easy at speed, and why a riderless bike, given a push, can roll a long way upright.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-microwave-uneven',
    title: 'Why a Microwave Heats Food Unevenly',
    category: 'Physics',
    keywords: [
      'how does a microwave heat food unevenly', 'why are there hot and cold spots in a microwave', 'why does a microwave have a turntable',
      'do microwaves heat from the inside out', 'why does frozen food stay cold in the middle', 'standing waves microwave oven',
    ],
    content: `Microwaves penetrate only a few centimetres into food and deposit their energy there (not just on the surface, and not "from the inside out"); the middle of a thick item heats afterward mostly by heat spreading inward from that outer zone. The unevenness has several causes. The biggest is that the metal box reflects the microwaves back and forth, and the reflected waves overlap to form a "standing wave" pattern with fixed regions of strong field (hot spots) and weak field (cold spots) — that's why ovens have a rotating turntable or a spinning metal "stirrer" fan, to move the food through the pattern. Also: microwaves heat water, fat and sugar at different rates, so a stew's liquid gets hot while a dense potato stays cool; corners and edges catch waves from more directions and overheat; and ICE barely absorbs microwaves, so a frozen lump in the centre can stay frozen while the thawed parts around it boil — which is why defrost settings pulse the power on and off to let heat even out.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mirror-flip',
    title: 'Why a Mirror Seems to Flip Left–Right but Not Up–Down',
    category: 'Physics',
    keywords: [
      'why does a mirror flip left and right but not up and down', 'does a mirror reverse your image', 'why is text backwards in a mirror',
      'mirror front to back reversal', 'why is my reflection not upside down', 'how does a mirror reversal actually work',
    ],
    content: `A flat mirror doesn't actually swap left and right at all — it swaps FRONT and BACK. Every point of you is reflected straight back along the line to the mirror, so your reflected nose points toward you and your reflected right hand stays on your right side (the mirror's right). What creates the illusion of a left–right flip is that when you compare yourself with your reflection, you imagine turning yourself around to face the same way the reflection faces — and that mental half-turn about a vertical axis is what actually exchanges left and right. If instead you imagine flipping yourself head-over-heels to face the reflection, you'd say the mirror reversed up and down. Lay a mirror flat on the floor and look down into it and the reflection does look "upside down." Writing appears backwards in a mirror only because you turn the paper to face the mirror, physically flipping the text before it's reflected. So: mirrors reverse depth; your brain supplies the rest.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-slinky-drop',
    title: 'Why a Dropped Slinky Seems to Hang in the Air',
    category: 'Physics',
    keywords: [
      'why does a slinky appear to hang in the air when dropped', 'slinky drop experiment', 'why does the bottom of a slinky not move',
      'tension wave slinky', 'levitating slinky physics', 'what happens when you drop a stretched slinky',
    ],
    content: `Hold a slinky by its top and let it stretch out under its own weight, then let go. For a moment the BOTTOM of the slinky just hangs there while the top rushes down. The reason: while you were holding it, the spring tension at the bottom was pulling up on the bottom coils exactly hard enough to cancel their weight. When you release the top, that tension doesn't disappear instantly — a "collapse wave" has to travel down the coils from the top, and until it arrives the bottom coils still feel the same upward tension balancing gravity, so they don't accelerate and appear to float. The top, meanwhile, has no support and falls, bunching up the coils as it goes; only when the wave reaches the bottom (the slinky has fully collapsed) does the whole thing fall together. The centre of mass, though, falls at the normal 9.8 m/s² the entire time — it's just that the mass at the top is falling fast and the mass at the bottom hasn't started yet.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rubber-band-warm',
    title: 'Why a Stretched Rubber Band Gets Warm',
    category: 'Physics',
    keywords: [
      'why does a stretched rubber band get warm', 'rubber band thermodynamics', 'entropic elasticity',
      'why does rubber contract when heated', 'gough-joule effect', 'why does a rubber band cool when it snaps back',
    ],
    content: `Rubber is made of very long, tangled polymer chains that are normally coiled up in a high-entropy (disordered) jumble. When you stretch a rubber band quickly, you force those chains to straighten out and line up — which LOWERS their entropy. By thermodynamics, that drop in entropy has to be paid for by releasing energy as heat, so the rubber band warms up (press a stretched band against your lip to feel it). Let it snap back and the chains re-tangle, entropy rises, and the rubber absorbs heat and cools down. This is called "entropic elasticity" or the Gough–Joule effect, and it's the opposite of a metal spring, which stores energy in stretched atomic bonds. A weird consequence: a stretched rubber band under a fixed load actually CONTRACTS when you heat it (heat makes the chains wriggle and want to re-coil more), the reverse of nearly every other material, which expands.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wet-finger-glass',
    title: 'Why a Wet Finger on a Glass Rim Makes a Sound',
    category: 'Physics',
    keywords: [
      'why does a wet finger on a glass make a sound', 'how does a glass harp work', 'why does a wine glass sing',
      'stick-slip friction glass', 'why do you need water to play a glass', 'why does the pitch depend on how full the glass is',
    ],
    content: `Rubbing a moistened finger around the rim of a glass makes it "sing" by stick–slip friction, the same mechanism as a violin bow on a string. As your finger slides, friction alternately grabs the glass and releases it, dozens or hundreds of times a second. If that grab–release rhythm happens to match one of the glass's natural resonant frequencies, each little tug arrives at just the right moment to push the vibration a bit further — the glass rings louder and louder at that pitch and radiates a clear tone. Water is important because it sets the friction to the right level (too dry and the finger just judders and squeaks; too slippery and it can't grab at all). The pitch depends on the glass's size, thickness and shape, and drops as you add liquid, because the extra mass of the water makes the vibrating glass wall move more slowly. Playing several tuned glasses this way is a "glass harp," an instrument Benjamin Franklin mechanised as the "glass armonica."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-curveball',
    title: 'Why a Curveball Curves',
    category: 'Physics',
    keywords: [
      'why does a curveball curve', 'magnus effect explained', 'why does a spinning ball curve in flight', 'how does a baseball pitcher make the ball drop',
      'why does a soccer free kick bend', 'topspin and backspin ball flight',
    ],
    content: `A spinning ball curves because of the Magnus effect. As the ball flies, its spinning surface drags a thin layer of air around with it. On one side of the ball, that dragged air moves in the same direction as the oncoming airflow, so the air there speeds up and its pressure drops; on the other side the dragged air fights the oncoming flow, slows down, and its pressure rises. The ball is pushed from the high-pressure side toward the low-pressure side, deflecting its flight path. A curveball is thrown with topspin, so the low-pressure region is underneath and the ball dips sharply as it nears the plate (and gravity adds to the drop); backspin (a fastball, or a golf drive) creates lift that makes the ball fall more slowly and appear to "rise"; sidespin bends it left or right, as in a curling soccer free kick. The effect is stronger with more spin, a rougher surface (raised seams, dimples) and a slower ball, which is why a well-thrown curve seems to break most in the last few metres.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pressure-cooker-physics',
    title: 'Why a Pressure Cooker Cooks Food Faster',
    category: 'Physics',
    keywords: [
      'why does a pressure cooker cook food faster', 'how does a pressure cooker work', 'why does water boil at a higher temperature under pressure',
      'boiling point and pressure', 'why does food cook slowly at high altitude', 'pressure cooker temperature 120 degrees',
    ],
    content: `In an open pot, water boils at 100 °C at sea level and cannot get any hotter — add more heat and it just turns to steam faster. So food simmering in water or steam is stuck at 100 °C, and cooking speed is limited. A pressure cooker seals the pot so the steam can't escape; the trapped steam raises the pressure inside to roughly 2 times atmospheric, and higher pressure raises water's boiling point to about 120 °C. Chemical reactions — including the ones that soften tough connective tissue, break down starch, and cook a bean or a grain — roughly double in rate for every 10 °C rise, so cooking at 120 °C instead of 100 °C cuts cooking times by half to two-thirds (dried beans in 30–40 minutes instead of 1.5–2 hours). The dense hot steam also transfers heat into the food very efficiently. The reverse happens at high altitude: lower air pressure means water boils below 100 °C, so food takes longer and recipes need adjusting.`,
    createdAt: Date.now(),
  },
];
