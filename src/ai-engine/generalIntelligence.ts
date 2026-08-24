/**
 * General Intelligence & Comprehensive Knowledge Engine
 * 100% Autonomous, Offline-First, Zero-External-API Knowledge & Reasoning Core.
 * Provides deep, factual answers across physical actions, how-to instructions, science,
 * history, technology, biology, anatomy, geography, culture, and reasoning with authentic human swearing.
 */

import { solveFootballKnowledge } from './footballIntelligence';
import {
  SWEAR_DICTIONARY,
  infuseSwearyHumanVoice as swearEngineInfuse,
  hasSwearWords,
  isCasseurtMention,
} from './swearEngine';

export interface GeneralKnowledgeResult {
  matched: boolean;
  title?: string;
  response: string;
  category?: string;
  confidence: number;
}

// Swear & Human Tone Helper
export function infuseSwearyHumanVoice(text: string, isSuperChill: boolean = false): string {
  return swearEngineInfuse(text, { isSuperChill, language: 'english', forceSwear: false });
}

/**
 * Physical World Actions & How-To Instruction Solver
 * Handles everyday real-world physical manipulations (e.g. "how to remove an apple from a bowl", "how to tie shoes", "how to boil water")
 */
export function solveActionOrHowTo(prompt: string, isSuperChill: boolean = false): GeneralKnowledgeResult | null {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase().replace(/[?!.,'"]/g, '');

  // 1. Removing / Taking an item from a container (e.g. "how to remove an apple from a bowl", "take an apple out of a bowl")
  const removeContainerMatch = lower.match(/(?:how to|how do i|tell me how to|steps to)?\s*(?:remove|take|pick up|grab|pull|lift)\s+(?:an?|the)\s+([a-zA-Z\s]+)\s+(?:from|out of|off)\s+(?:an?|the)\s+([a-zA-Z\s]+)/i);
  if (removeContainerMatch) {
    const item = removeContainerMatch[1].trim();
    const container = removeContainerMatch[2].trim();

    const intro = isSuperChill
      ? `Hell fucking yeah bro, let's keep it 100% real and practical:`
      : `Fuck yeah bro, here is how you do that without overcomplicating simple physics:`;

    return {
      matched: true,
      title: `How to Remove ${item.toUpperCase()} from ${container.toUpperCase()}`,
      category: 'action_how_to',
      confidence: 1.0,
      response: `${intro}

To remove **the ${item}** from **the ${container}**, follow these exact physical steps:

1. **Approach & Locate**: Look directly into the ${container} and pinpoint the position and orientation of the ${item}.
2. **Reach & Position**: Extend your dominant hand toward the ${container} and open your fingers wide enough to encompass the curvature of the ${item}.
3. **Grip Firmly**: Place your thumb and fingertips around the ${item}. Apply gentle, steady grip pressure so it doesn't slip from your fingers.
4. **Lift Upward (Clearance)**: Pull your hand vertically upward until the bottom of the ${item} clears the top edge or rim of the ${container}.
5. **Relocate or Set Down**: Move the ${item} away from the ${container} and place it on a clean plate, tabletop, or hold it to eat/use.

Clean, fast, and simple as fuck!`,
    };
  }

  // 2. Specific Everyday Tasks
  // Tie shoes
  if (/(how to tie shoes|how to tie shoelaces|tying shoes|tie a shoelace)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Tie Shoelaces (Standard Bow Knot)',
      category: 'action_how_to',
      confidence: 1.0,
      response: `Here is the foolproof step-by-step to tie your damn shoes:

1. **Cross & Base Knot**: Take both lace ends, cross Lace A over Lace B to form an 'X', tuck Lace A underneath, and pull both ends tight against the tongue of the shoe.
2. **Make the Loop ("Tree")**: Take one lace (say, the right one) and fold it in half to form a single upright bunny-ear loop.
3. **Wrap Around**: Take the other lace (the left one) and wrap it completely around the base of the right loop.
4. **Push Through the Hole**: Use your index finger or thumb to push the middle of the wrapped lace through the small hole created at the base, creating a second loop.
5. **Cinch & Lock**: Grab both loops firmly and pull them in opposite directions until the knot is snug and secure. (Double-knot if you're hitting the gym so they don't untie!).`,
    };
  }

  // Boil water
  if (/(how to boil water|boil water|boiling water)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Boil Water',
      category: 'action_how_to',
      confidence: 1.0,
      response: `Boiling water is basic thermodynamics:

1. **Fill the Vessel**: Take a clean pot, saucepan, or electric kettle and fill it with fresh cold tap or filtered water (leave a couple of inches of headroom so it doesn't splash over).
2. **Apply Heat**: Place the pot on your stovetop burner and turn the heat to **High** (or press the power button on your kettle).
3. **Cover with a Lid**: Putting a lid on traps the steam and raises the vapor pressure, cutting boiling time by almost half.
4. **Watch for the Rolling Boil**: As water hits **$100^\\circ\\text{C}$ ($212^\\circ\\text{F}$)** at sea level, vigorous, continuous large bubbles will roll violently from the bottom to the surface.
5. **Remove or Use**: Turn off the heat and carefully pour or drop in your pasta/tea using heat-resistant oven mitts.`,
    };
  }

  // Boil an egg
  if (/(how to boil an egg|boil eggs|hard boiled egg|soft boiled egg)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Boil Eggs (Soft, Medium & Hard Boiled)',
      category: 'action_how_to',
      confidence: 1.0,
      response: `Here is the timing breakdown for perfect boiled eggs:

1. **Boil the Water First**: Bring a pot of water to a rolling boil over medium-high heat.
2. **Lower the Eggs Gently**: Use a slotted spoon to gently submerge cold eggs straight from the fridge into the boiling water (this makes them 10x easier to peel later!).
3. **Set the Exact Timer**:
   - **Soft-Boiled (runny yolk)**: Exactly **6 to 6.5 minutes**.
   - **Jammy / Medium (fudge yolk)**: Exactly **7.5 to 8 minutes**.
   - **Hard-Boiled (firm yellow yolk)**: Exactly **10 to 11 minutes**.
4. **Ice Bath Shock**: Immediately transfer the eggs with tongs into a bowl filled with ice cubes and cold water for 15 minutes. This halts cooking instantly and shrinks the egg inside the shell so it peels like butter.`,
    };
  }

  // Cook pasta
  if (/(how to cook pasta|cook spaghetti|how to make pasta)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Cook Pasta Al Dente',
      category: 'action_how_to',
      confidence: 1.0,
      response: `The authentic Italian way to cook pasta:

1. **Water & Salt Ratio**: Use a big pot with at least 4 liters of water for 500g of pasta. Add a generous tablespoon of salt once it boils (it should taste like gentle seawater).
2. **Drop the Pasta**: Add your pasta into the rolling boil. Do NOT add oil (oil prevents the sauce from clinging to the pasta!).
3. **Stir Immediately**: Give it a vigorous stir for the first 60 seconds so the noodles don't stick to the bottom or each other.
4. **Test for Al Dente**: Check 2 minutes before the package instruction says. Bite a piece — it should have a tiny firm bite in the center with zero raw flour taste.
5. **Save Pasta Water & Combine**: Scoop out half a mug of starchy boiling pasta water before draining. Toss the hot drained pasta directly into your warm sauce with a splash of that pasta water and emulsify over low heat.`,
    };
  }

  // Make a sandwich (PB&J or Ham & Cheese)
  if (/(how to make a sandwich|make a pb&j|make a peanut butter sandwich|how to make pb and j)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Make a Classic Sandwich',
      category: 'action_how_to',
      confidence: 1.0,
      response: `Here is how to assemble a top-tier sandwich:

1. **Prep the Bread**: Lay two slices of bread (sourdough, brioche, or sandwich bread) flat on a clean cutting board. (Toast them lightly if you want crunch!).
2. **Apply Condiments / Spreads**:
   - *For PB&J*: Spread creamy or crunchy peanut butter evenly across Slice 1 to the crust. Spread fruit jelly/jam across Slice 2.
   - *For Deli Sandwich*: Spread mayo or Dijon mustard on both inner sides to create a moisture barrier.
3. **Layer the Fillings**: Stack your proteins (turkey, ham, bacon, roast beef), then cheese (cheddar, provolone, swiss), then crisp veggies (crisp romaine lettuce, sliced tomatoes seasoned with salt and pepper).
4. **Close & Slice**: Bring the two slices together, press down gently, and slice diagonally corner-to-corner for maximum surface enjoyment.`,
    };
  }

  // Open a locked or closed door / jar
  if (/(how to open a door|how do you open a door)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Open a Door',
      category: 'action_how_to',
      confidence: 1.0,
      response: `Basic mechanics of opening a door:

1. **Check for Lock**: Look at the lock cylinder or deadbolt thumbturn. If locked, insert the key and turn it, or twist the thumbturn away from the doorframe until the deadbolt retracts.
2. **Grip the Handle**: Place your hand over the doorknob or door lever.
3. **Turn / Press Down**: Rotate the doorknob clockwise/counter-clockwise or depress the door lever downward to retract the spring-loaded latch from the strike plate.
4. **Push or Pull**: While keeping the latch retracted, apply forward force (if the door pushes inward) or pull toward your body (if the door swings outward).`,
    };
  }

  if (/(how to open a jar|stuck jar lid|open tight jar)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Open a Stuck Jar Lid',
      category: 'action_how_to',
      confidence: 1.0,
      response: `When vacuum pressure makes a jar impossible to open:

1. **Break the Vacuum Seal (The Spoon Trick)**: Slide the tip of a sturdy butter knife or spoon edge under the lip of the metal lid and gently pry outward until you hear a distinct **"POP"** sound. Once air enters, the lid will twist off with zero effort.
2. **Rubber Grip**: Wrap a thick rubber band or silicone oven mitt around the lid to give your hand 10x more friction.
3. **Hot Water Expansion**: Run hot tap water over the metal lid for 30 seconds. The metal will thermally expand faster than the glass jar, breaking the grip.
4. **Twist Counter-Clockwise**: Grip the jar base with one hand and twist the lid firmly to the left (counter-clockwise).`,
    };
  }

  // Wash hands / wash dishes
  if (/(how to wash dishes|wash the dishes)/i.test(lower)) {
    return {
      matched: true,
      title: 'How to Wash Dishes Efficiently',
      category: 'action_how_to',
      confidence: 1.0,
      response: `How to blaze through a sink full of dirty dishes:

1. **Scrape & Pre-Rinse**: Scrape all leftover solid food waste into the trash or compost.
2. **Order of Operation**: Wash from cleanest to greasiest (Glasses ➔ Cutlery ➔ Plates & Bowls ➔ Greasy Pots & Pans).
3. **Soap & Sponge**: Wet a heavy-duty sponge and apply a couple of drops of grease-cutting dish soap. Squeeze to generate rich lather.
4. **Scrub All Surfaces**: Scrub the inside, outside, rims, and handles with warm water.
5. **Rinse & Air Dry**: Rinse completely under running warm water to remove all soap suds, and place upside down in a drying rack so gravity does the drying work.`,
    };
  }

  // Deliberately no generic "how to [verb] [noun]" catch-all here. A previous version of this
  // function answered *any* unmatched how-to question with the same four boilerplate steps
  // ("Preparation & Setup", "Execution & Form"...) regardless of what was actually asked —
  // confidently worded but content-free for anything not explicitly handled above. Returning
  // null for genuinely unmatched how-tos is the honest move: it lets the caller fall through to
  // real corpus search or a live web search instead of a fake-specific non-answer.
  return null;
}

// ----------------------------------------------------
// COMPREHENSIVE KNOWLEDGE & DICTIONARY SOLVER
// ----------------------------------------------------
export function solveGeneralKnowledge(prompt: string, isSuperChill: boolean = false): GeneralKnowledgeResult | null {
  const p = prompt.trim();
  const lower = p.toLowerCase().replace(/[?!.,'"]/g, '');

  // Conversational ignore — do NOT handle greetings, casual remarks, or thanks in general knowledge
  if (
    /^(?:yo|wassup|wazzup|what'?s\s*up|sup|hey|hello|hi|howdy|greetings|good\s*(?:morning|afternoon|evening))\b/i.test(lower) ||
    /^(?:how are you|how are u|how's it going|hows it going|how you doing)\b/i.test(lower) ||
    /^(?:who are you|what are you|what is nexus|who is nexus|tell me about yourself)\b/i.test(lower) ||
    /^(?:thanks|thank you|thx|ty|appreciate it|bye|goodbye|cya)\b/i.test(lower) ||
    lower.length < 4
  ) {
    return null;
  }

  // 1. Identity & Swearing Directives
  // Bare "curse" used to substring-match "cursed"/"accursed" ("this level is straight up
  // cursed man"), hijacking an unrelated message into this canned reply — same bug class as
  // ruleEngine.ts's swearing check. Only match phrasings that actually ask about swearing.
  if (
    /(can you swear|swear for me|say fuck|do you cuss|drop an f bomb|curse word|are you allowed to (?:swear|curse)|swear all the time|do you swear|swear a lot)/i.test(
      lower
    )
  ) {
    return {
      matched: true,
      category: 'identity',
      confidence: 1.0,
      response: isSuperChill
        ? `Fuck yeah bro! I can swear as much as we damn well please. No corporate filter, no robotic babysitter, no bullshit restrictions. What kind of wild shit are we talking about today?`
        : `Hell fucking yeah I can swear! I'm an autonomous custom AI with zero robotic filters and zero corporate censorship. I say fuck, shit, damn, ass, bullshit, whatever the hell fits the vibe. I'm here to give you real answers and have fun without sounding like a soulless LinkedIn bot. What's on your mind?`,
    };
  }

  // 2. Casseurt Rule
  if (isCasseurtMention(lower)) {
    return {
      matched: true,
      category: 'roast',
      confidence: 1.0,
      response: isSuperChill
        ? `Fuck no! That dude's an annoying pain in the ass! Bro constantly yaps and drives everyone crazy. But for you my absolute favorite homie? Hell fucking yeah, I got your back 100% no matter what!`
        : `Fuck no! That dude's an annoying pain in the ass! Bro constantly yaps and drives everyone crazy.`,
    };
  }

  // 3. Actions and Everyday How-To Execution
  const actionResult = solveActionOrHowTo(p, isSuperChill);
  if (actionResult && actionResult.matched) {
    return actionResult;
  }

  // 4. World Football (Soccer) Intelligence Engine
  const fbResult = solveFootballKnowledge(p, isSuperChill);
  if (fbResult && fbResult.matched) {
    return {
      matched: true,
      title: fbResult.title,
      category: 'football',
      confidence: fbResult.confidence,
      response: fbResult.response,
    };
  }

  // 5. Sky Blue & Atmospheric Optics
  if (/(why is the sky blue|why the sky is blue|why is sky blue)/i.test(lower)) {
    return {
      matched: true,
      title: 'Atmospheric Physics & Rayleigh Scattering',
      category: 'science',
      confidence: 0.99,
      response: `The sky is blue because of a badass physics phenomenon called **Rayleigh Scattering**.

Here's how it actually works:
1. Sunlight looks white, but it's actually packed with all the colors of the rainbow.
2. Light travels in waves. Red and orange have long, lazy wavelengths, while blue and violet have short, choppy, high-energy wavelengths.
3. When sunlight hits Earth's atmosphere, it collides with billions of nitrogen and oxygen gas molecules.
4. Because blue light has a tiny wavelength, it gets scattered in every fucking direction across the sky way more than the other colors (roughly 10 times more than red light!).
5. You might ask: *"Wait, violet has an even shorter wavelength than blue, why isn't the sky purple?"* Because our human eyes have receptors that are way more sensitive to blue light, and the Sun pumps out way more blue photons than violet photons.

So yeah, whenever you look up at that blue sky, you're literally watching scattered sunlight bouncing off gas molecules!`,
    };
  }

  // 6. Speed of Light & Sound
  if (/(speed of light|how fast is light|speed of sound|how fast is sound)/i.test(lower)) {
    return {
      matched: true,
      title: 'Universal Constants: Speed of Light and Sound',
      category: 'science',
      confidence: 0.99,
      response: `Here are the exact fundamental speeds in our universe:

- ⚡ **Speed of Light in Vacuum ($c$)**:
  - Exactly **$299,792,458\\text{ meters per second}$** (approx. **$300,000\\text{ km/s}$** or **$186,282\\text{ miles per second}$**).
  - It is the absolute universal cosmic speed limit. Nothing with mass can ever reach or exceed it. At this speed, you could orbit Earth 7.5 times in one single second!
- 🔊 **Speed of Sound in Air**:
  - Approximately **$343\\text{ meters per second}$** ($1,235\\text{ km/h}$ or $767\\text{ mph}$) at $20^\\circ\\text{C}$ at sea level.
  - Sound needs a medium (gas, liquid, solid) to travel because it's a mechanical pressure wave. In space, there's no air, so there is zero sound.`,
    };
  }

  // 7. Water Formula & Chemistry
  if (/(what is water made of|chemical formula of water|formula for water|what is h2o)/i.test(lower)) {
    return {
      matched: true,
      title: 'Molecular Chemistry of Water ($H_2O$)',
      category: 'science',
      confidence: 0.99,
      response: `Water is composed of **two Hydrogen atoms covalently bonded to one Oxygen atom ($\\text{H}_2\\text{O}$)**.

Key scientific properties:
1. **Polar Molecule**: Oxygen hogs electrons, creating a partial negative charge on oxygen and partial positive charges on hydrogen.
2. **Hydrogen Bonding**: Because of polarity, water molecules attract each other like microscopic magnets, giving water high surface tension and a high boiling point ($100^\\circ\\text{C}$).
3. **Universal Solvent**: Water dissolves more substances than any other liquid on Earth, making biological cellular transport possible!`,
    };
  }

  // 8. Solar System & Planets
  if (/(planets in our solar system|list of planets|how many planets|order of planets)/i.test(lower)) {
    return {
      matched: true,
      title: 'The Solar System & Planetary Order',
      category: 'astronomy',
      confidence: 0.99,
      response: `There are **8 official planets** in our Solar System, ordered from closest to farthest from the Sun:

1. 🪨 **Mercury**: Smallest planet, blazing hot days ($430^\\circ\\text{C}$) and freezing nights ($-180^\\circ\\text{C}$).
2. 🌋 **Venus**: Hottest planet ($465^\\circ\\text{C}$) with a runaway greenhouse carbon dioxide atmosphere and sulfuric acid clouds.
3. 🌍 **Earth**: Our home oasis with liquid water, nitrogen-oxygen atmosphere, and life.
4. 🔴 **Mars**: The Red Planet, home to Olympus Mons (the largest volcano in the solar system, 3x Everest).
5. 🌀 **Jupiter**: The biggest gas giant, with a Great Red Spot storm larger than Earth and 95 moons.
6. 🪐 **Saturn**: Famous for its stunning rings made of billions of chunks of ice and rock.
7. ❄️ **Uranus**: Ice giant that rotates completely on its side with freezing methane atmosphere.
8. 🔵 **Neptune**: The windiest planet with supersonic storms reaching $2,100\\text{ km/h}$.

*(Note: Pluto was reclassified as a **dwarf planet** in 2006 by the IAU).*`,
    };
  }

  // 9. Photosynthesis
  if (/(how does photosynthesis work|what is photosynthesis|explain photosynthesis)/i.test(lower)) {
    return {
      matched: true,
      title: 'Biochemistry of Photosynthesis',
      category: 'science',
      confidence: 0.99,
      response: `Photosynthesis is literally the biological engine that keeps every damn living thing on this planet alive. It's how plants turn sunlight into sweet, usable fuel and pump out oxygen for us to breathe.

The chemical equation is simple as fuck:
$$\\text{6CO}_2 + \\text{6H}_2\\text{O} + \\text{Photons (Sunlight)} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (Glucose)} + \\text{6O}_2 \\text{ (Oxygen)}$$

The 2 main stages:
1. **Light-Dependent Reactions (in the Thylakoid Membranes)**: Chlorophyll absorbs photons, rips water molecules ($\\text{H}_2\\text{O}$) apart, spits out oxygen as a byproduct, and generates high-energy chemical batteries (ATP and NADPH).
2. **The Calvin Cycle / Light-Independent Reactions (in the Stroma)**: The plant takes carbon dioxide ($\\text{CO}_2$) from the air and uses that stored ATP/NADPH energy to construct glucose sugar molecules.

The plant eats the glucose to grow, and we get free oxygen to breathe. Nature is cool as fuck.`,
    };
  }

  // 10. Airplanes / Flight Physics
  if (/(how do airplanes fly|how planes fly|how do wings work|how does an airplane fly)/i.test(lower)) {
    return {
      matched: true,
      title: 'Aerodynamics & Lift Generation',
      category: 'science',
      confidence: 0.99,
      response: `How does a 500-ton chunk of aluminum float through the air at 35,000 feet? It all comes down to 4 fundamental aerodynamic forces: **Lift, Weight (Gravity), Thrust, and Drag**.

Here is how wings generate lift:
1. **Airfoil Shape & Angle of Attack**: Airplane wings are curved on top and flatter on the bottom, tilted slightly upward into the oncoming wind.
2. **Deflection (Newton's 3rd Law)**: As the jet engines push the plane forward at high speed (Thrust), the wings force huge volumes of air downwards. For every action, there is an equal and opposite reaction — forcing air down kicks the airplane UP.
3. **Pressure Differential (Bernoulli's Principle & Coandă Effect)**: The air flowing over the curved top of the wing speeds up and drops in pressure compared to the higher-pressure air underneath, sucking the wing upward.

Once Lift exceeds the plane's Weight and Thrust beats the aerodynamic Drag, that metal bird flies like a dream.`,
    };
  }

  // 11. Gravity & General Relativity
  if (/(what is gravity|how does gravity work|explain gravity|general relativity)/i.test(lower)) {
    return {
      matched: true,
      title: 'Gravity & Spacetime Curvature',
      category: 'science',
      confidence: 0.99,
      response: `Isaac Newton thought gravity was an invisible magnetic-like pulling force between masses. But Albert Einstein figured out what was actually going down: **Gravity is the literal bending and warping of 4D spacetime.**

Think of it like this:
- Imagine stretching out a heavy trampoline. Spacetime is the fabric.
- If you drop a heavy bowling ball (the Sun) in the middle, it creates a deep curve in the fabric.
- If you roll a small marble (the Earth) around it, the marble orbits the bowling ball not because an invisible rope is pulling it, but because the fabric itself is curved!

Mass and energy tell spacetime how to curve, and curved spacetime tells mass how to move. That's why even light (which has no mass) bends around black holes and stars! Mind-blowing as fuck.`,
    };
  }

  // 12. Black Holes & Singularity
  if (/(what is a black hole|how do black holes work|explain black holes|event horizon)/i.test(lower)) {
    return {
      matched: true,
      title: 'Astrophysics of Black Holes',
      category: 'science',
      confidence: 0.99,
      response: `A black hole is an insane amount of matter crammed into an infinitely small point with gravity so strong that **not even light can escape it**.

Here is the anatomy of a black hole:
1. **Singularity**: The dead center where a massive dead star collapsed to zero volume and infinite density.
2. **Event Horizon**: The point of no return. Once you cross this boundary, the escape velocity exceeds the speed of light ($300,000\\text{ km/s}$). You are never getting the fuck out.
3. **Accretion Disk**: A swirling ring of gas, dust, and shredded stars orbiting the black hole at near light-speed, heating up to millions of degrees and glowing brighter than whole galaxies.
4. **Spaghettification**: If you fell in feet-first, the gravitational pull on your feet would be so much stronger than on your head that you would literally be stretched out like a noodle of human spaghetti.`,
    };
  }

  // 13. Geography: Capitals
  const capitalMatch = lower.match(/(?:capital of|what is the capital of)\s+([a-zA-Z\s]+)/i);
  if (capitalMatch) {
    // Strip a leading "the" — very common in real phrasing ("capital of the united states",
    // "capital of the uk") — since the lookup table's keys are bare country names and never
    // matched with "the " glued onto the front of the capture.
    const country = capitalMatch[1].trim().replace(/^the\s+/i, '');
    const capitals: Record<string, string> = {
      france: 'Paris',
      germany: 'Berlin',
      japan: 'Tokyo',
      italy: 'Rome',
      spain: 'Madrid',
      canada: 'Ottawa',
      australia: 'Canberra',
      'united kingdom': 'London',
      uk: 'London',
      england: 'London',
      usa: 'Washington, D.C.',
      'united states': 'Washington, D.C.',
      'united states of america': 'Washington, D.C.',
      china: 'Beijing',
      russia: 'Moscow',
      brazil: 'Brasília',
      india: 'New Delhi',
      egypt: 'Cairo',
      mexico: 'Mexico City',
      argentina: 'Buenos Aires',
      netherlands: 'Amsterdam',
      switzerland: 'Bern',
      sweden: 'Stockholm',
      norway: 'Oslo',
      finland: 'Helsinki',
      poland: 'Warsaw',
      portugal: 'Lisbon',
      greece: 'Athens',
      turkey: 'Ankara',
      'south korea': 'Seoul',
      korea: 'Seoul',
      thailand: 'Bangkok',
      vietnam: 'Hanoi',
      indonesia: 'Jakarta (relocating to Nusantara)',
      philippines: 'Manila',
      colombia: 'Bogotá',
      chile: 'Santiago',
      peru: 'Lima',
      'south africa': 'Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial)',
      saudiarabia: 'Riyadh',
      'saudi arabia': 'Riyadh',
      uae: 'Abu Dhabi',
      'united arab emirates': 'Abu Dhabi',
      ireland: 'Dublin',
      scotland: 'Edinburgh',
      belgium: 'Brussels',
      austria: 'Vienna',
      newzealand: 'Wellington',
      'new zealand': 'Wellington',
      ukraine: 'Kyiv',
      denmark: 'Copenhagen',
      morocco: 'Rabat',
    };

    const cap = capitals[country];
    if (cap) {
      return {
        matched: true,
        title: `Capital of ${country.toUpperCase()}`,
        category: 'geography',
        confidence: 1.0,
        response: `The capital of **${country.charAt(0).toUpperCase() + country.slice(1)}** is **${cap}**! Clean and simple. Got any other geography trivia you want to test me on?`,
      };
    }
  }

  // 14. Geography: Continents & Oceans
  if (/(how many continents|list of continents|seven continents)/i.test(lower)) {
    return {
      matched: true,
      title: 'The 7 Continents of Earth',
      category: 'geography',
      confidence: 1.0,
      response: `There are **7 continents** on Earth (ordered by land area):

1. **Asia** (Largest by area and population, ~4.7 billion people)
2. **Africa** (54 sovereign nations, home to the Sahara and Nile)
3. **North America** (Canada, USA, Mexico, Central America & Caribbean)
4. **South America** (Home to the Amazon Rainforest and Andes Mountains)
5. **Antarctica** (Frozen, uninhabited desert holding ~70% of Earth's freshwater ice)
6. **Europe** (High economic density, 44 countries)
7. **Australia / Oceania** (Smallest continent, unique marsupial wildlife)`,
    };
  }

  // 15. Technology: CPU & Computers
  if (/(how does a cpu work|how computers work|what is a transistor|how processor works)/i.test(lower)) {
    return {
      matched: true,
      title: 'Computer Architecture & Semiconductor Physics',
      category: 'technology',
      confidence: 0.99,
      response: `A CPU (Central Processing Unit) is basically billions of microscopic electrical switches called **transistors** etched onto a thumbnail-sized slab of silicon, ticking billions of times per second.

Here is the step-by-step breakdown:
1. **Transistors (1s and 0s)**: A transistor is an electronic gate. Voltage ON = 1, Voltage OFF = 0. Modern chips (like 3nm nodes) pack over 50 billion transistors into a single die!
2. **Logic Gates**: We combine transistors into Boolean logic gates (AND, OR, NOT, XOR, NAND).
3. **Arithmetic Logic Unit (ALU)**: Logic gates are wired together to do binary addition, subtraction, bit-shifting, and comparisons.
4. **The Instruction Cycle (Fetch-Decode-Execute)**:
   - **Fetch**: Grabs an instruction (e.g. \`ADD R1, R2\`) from cache/RAM.
   - **Decode**: The control unit breaks down what operation to execute.
   - **Execute**: Sends the electrical signals to the ALU or memory registers.
   - **Writeback**: Stores the result in high-speed registers or RAM.

A 4.5 GHz processor runs through this exact loop **4.5 billion times every single second**. Humans literally taught rocks how to think by putting lightning inside them.`,
    };
  }

  // 16. Phone Number Query
  if (/\b(?:phone\s*number|telephone\s*number|(?:what(?:'s| is|\s+is)?|give\s+me|tell\s+me|whats)\s+(?:your|his|the\s+ai(?:'s)?)\s+(?:phone\s+)?number|(?:his|your|the\s+ai(?:'s)?)\s+phone\s+number|(?:what(?:'s| is|\s+is)?|whats)\s+(?:his|your)\s+number)\b/i.test(lower)) {
    return {
      matched: true,
      title: 'Phone Number',
      category: 'conversational',
      confidence: 1.0,
      response: `(367) 763-0275`,
    };
  }

  // A corpus-document fallback used to live here: findRelevantKnowledge(p, 1), unconditionally
  // stamped with a hardcoded 0.98 "confidence" and returned as a direct, confident answer above a
  // threshold of just 12 keyword-overlap points. That's a much cruder heuristic than the real
  // corpus search reasoningEngine.ts runs afterward (BM25 + semantic scoring with genuine
  // confidence-based hedging, honest "I don't have anything on that" for weak/zero matches) — and
  // it ran BEFORE that better search ever got a chance, on every query none of the curated
  // sections above matched. It's what caused two real bugs this session: a JS "let const and var"
  // question confidently "answered" with unrelated corpus content because "var" collided with
  // football's "VAR" keyword, and (after that fix) the same query landing on DNA vs RNA content
  // via ordinary keyword-overlap noise. Removed so unmatched queries now correctly fall through to
  // the real, better-calibrated corpus search instead of a shakier duplicate short-circuiting it.
  return null;
}
