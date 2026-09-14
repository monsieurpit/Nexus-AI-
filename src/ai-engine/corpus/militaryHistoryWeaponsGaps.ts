import { KnowledgeItem } from '../../types';

// Batch 295 corpus fixes — military history/weapons/armed forces "what's the difference between
// X and Y" topics. Worst batch in a long while: 20/25 misses. First batch ever on this domain, and
// with zero military corpus coverage the model's retrieval kept grabbing semantically-similar-
// sounding but completely wrong-domain entries: "veteran" pulled baseball rookie/veteran corpus,
// "draft" pulled NFL draft corpus, "medal" pulled Olympic racing medal corpus, "bunker/trench"
// pulled ocean-trench geology corpus, "camouflage" pulled cuttlefish-biology corpus, "general/
// admiral" pulled English-dialect-spelling corpus, "tank" pulled oil-tanker corpus, and "spy/
// soldier" pulled a Captain America movie synopsis. A textbook case of a totally uncovered domain
// causing severe cross-domain hallucination via loose keyword/embedding overlap.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'history',
  keywords,
  content,
  createdAt: now,
});

export const MILITARY_HISTORY_WEAPONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-military-soldier-vs-mercenary',
    'Soldier vs mercenary',
    ['soldier', 'mercenary', 'difference soldier mercenary'],
    "A soldier is a member of a country's own official, recognized military, serving under that nation's chain of command out of duty, citizenship obligation, or a formal enlistment contract — soldiers fight for their own country's cause and are covered by that country's military law and international rules of war as lawful combatants. A mercenary is a private individual who fights in an armed conflict primarily for personal profit rather than loyalty to a nation or cause — a mercenary is an outsider to the conflict with no citizenship-based stake in it, isn't part of any official national military, and is hired (often through a private military company) for pay rather than serving out of national duty; under international law, mercenaries generally don't get the same legal protections as regular soldiers if captured. The key difference: a soldier serves in their own nation's official military out of duty or enlistment, while a mercenary is a privately-hired outsider fighting purely for payment, with no national allegiance to the conflict.",
  ),
  k(
    'kb-gap-military-army-vs-militia',
    'Army vs militia',
    ['army', 'militia', 'difference army militia'],
    "An army is a country's official, permanent, professionally organized military force — soldiers are trained, equipped, and paid by the government, operate under a formal, centralized chain of command, and typically serve full-time as a career. A militia is an informal or semi-formal armed group made up mostly of ordinary civilians rather than career soldiers — militia members usually keep their regular civilian jobs and only mobilize part-time or in an emergency, often with far less centralized command, training, and equipment than a professional army; some countries formally organize militias as a reserve or auxiliary force, while in other cases a militia can be a loosely organized, unofficial civilian group with no government backing at all. The key difference: an army is a professional, government-run, full-time military force under a formal chain of command, while a militia is a part-time or informal armed group of civilians, generally with far less training, centralization, and official structure than a standing army.",
  ),
  k(
    'kb-gap-military-general-vs-admiral',
    'General vs admiral',
    ['general', 'admiral', 'difference general admiral'],
    "A general is a senior officer rank used in land-based (army) and air force branches of the military — generals command large land or air forces, from a single brigade up to an entire army, and the rank is organized in tiers (brigadier general, major general, lieutenant general, full general) reflecting increasing levels of command. An admiral is the naval equivalent — the senior officer rank specifically used in a navy to command fleets and naval forces at sea, also organized in tiers (rear admiral, vice admiral, full admiral) that roughly parallel the general's ranks in scope of command. The key difference: general is the top officer rank in land/air forces, while admiral is the equivalent top officer rank in naval forces — they represent the same relative level of seniority and command responsibility, just in different branches of the military (land/air versus sea).",
  ),
  k(
    'kb-gap-military-rifle-vs-shotgun',
    'Rifle vs shotgun',
    ['rifle', 'shotgun', 'difference rifle shotgun'],
    "A rifle has a barrel with spiral grooves cut into the inside (rifling) that spin a single bullet as it fires, which stabilizes its flight and makes rifles accurate at long range — rifles are built to fire one precise projectile at a time over relatively long distances. A shotgun typically has a smooth (non-rifled) barrel and is designed to fire a shell that releases either a cluster of small pellets (shot) that spread out as they travel, or sometimes a single heavy slug — the spreading pellets make a shotgun effective at short range where precise aim matters less, but shotguns lose accuracy and power quickly at longer distances compared to a rifle. The key difference: a rifle has a rifled barrel that spins a single accurate bullet for long-range precision, while a shotgun usually has a smooth barrel that fires a spreading cluster of pellets (or occasionally a slug), making it more effective at short range but less precise at distance.",
  ),
  k(
    'kb-gap-military-pistol-vs-revolver',
    'Pistol vs revolver',
    ['pistol', 'revolver', 'difference pistol revolver'],
    "A pistol (in the narrower, common modern sense) is a handgun that holds its ammunition in a removable magazine, typically inserted into the grip, and uses part of the firing energy to automatically eject the spent cartridge and load the next round (semi-automatic action) — each pull of the trigger fires one round and the gun cycles itself ready for the next shot without any manual action beyond pulling the trigger again. A revolver is a different mechanism — it holds several rounds in a rotating cylinder with multiple chambers; each time the trigger is pulled (or the hammer is manually cocked first, depending on the model), the cylinder rotates to line up a fresh chamber with the barrel and fires that round, and reloading means removing the whole cylinder or swinging it out to replace all the spent cartridges at once, rather than swapping a magazine. The key difference: a pistol uses a removable magazine and self-cycles each round automatically after firing, while a revolver stores rounds in a rotating multi-chambered cylinder that turns to a fresh chamber with each shot.",
  ),
  k(
    'kb-gap-military-machine-gun-vs-assault-rifle',
    'Machine gun vs assault rifle',
    ['machine gun', 'assault rifle', 'difference machine gun assault rifle'],
    "A machine gun is a heavier, crew-served or vehicle/support weapon built for sustained, continuous automatic fire — it's typically belt-fed (ammunition comes in a continuous fabric or metal belt rather than a removable magazine), often mounted on a tripod, vehicle, or aircraft because of its weight and recoil, and is designed to lay down heavy, prolonged suppressive fire rather than be carried and aimed precisely by one soldier on the move. An assault rifle is a lighter, individually-carried infantry weapon, magazine-fed rather than belt-fed, and built around select-fire capability — a single soldier can typically switch between semi-automatic (one shot per trigger pull) and automatic or burst fire, giving it more versatility for close-to-medium range combat than either a machine gun's role or a basic non-automatic rifle. The key difference: a machine gun is a heavier, usually belt-fed weapon built for sustained support fire (often mounted or crew-operated), while an assault rifle is a lighter, magazine-fed, select-fire weapon meant to be carried and used individually by one infantry soldier.",
  ),
  k(
    'kb-gap-military-tank-vs-apc',
    'Tank vs armored personnel carrier',
    ['tank', 'armored personnel carrier', 'APC', 'difference tank armored personnel carrier'],
    "A military tank is a heavily armored, tracked combat vehicle built primarily for direct offensive combat — it carries a large main gun (typically a powerful cannon in a rotating turret) designed to destroy other vehicles, fortifications, and enemy tanks, with armor thick enough to survive being hit, and its main job is to lead an armored assault and win firefights, not to carry infantry. An armored personnel carrier (APC) is built for a very different purpose — transporting infantry soldiers safely across a battlefield, protected from small-arms fire and shrapnel, so troops can be dropped off closer to the fighting than on foot; APCs are typically more lightly armored than tanks, usually carry only smaller defensive weapons (like a machine gun) rather than a heavy main cannon, and prioritize troop capacity and mobility over offensive firepower. The key difference: a tank is a heavily armed, heavily armored combat vehicle built to fight and destroy other targets directly, while an APC is a more lightly armored, lightly armed vehicle built to transport infantry safely to and from the battlefield.",
  ),
  k(
    'kb-gap-military-bomb-vs-missile',
    'Bomb vs missile',
    ['bomb', 'missile', 'difference bomb missile'],
    "A bomb is an unguided (or, in the case of a modern 'smart bomb,' guided but still fundamentally unpowered) explosive device that is dropped or placed and then relies purely on gravity (if dropped from a plane) or a triggering mechanism (if placed) to reach its target — a basic bomb has no engine or propulsion system of its own to fly toward a target. A missile is a self-propelled weapon — it has its own engine (rocket or jet propulsion) that actively powers it through the air or space toward its target, and virtually all missiles are also guided, using onboard sensors, GPS, or remote control to actively steer and correct course toward a moving or precise target rather than simply falling under gravity. The key difference: a bomb has no propulsion of its own and typically falls or is placed without powered flight, while a missile is self-propelled by its own engine and actively guided toward its target during flight.",
  ),
  k(
    'kb-gap-military-missile-vs-rocket',
    'Missile vs rocket',
    ['missile', 'rocket', 'difference missile rocket'],
    "A rocket is any vehicle propelled by a rocket engine (burning fuel and expelling exhaust to generate thrust), and the term covers a huge range of uses beyond weapons entirely — rockets launch satellites, spacecraft, and scientific payloads, and an unguided military rocket (like a basic artillery rocket) simply follows the trajectory it was aimed and launched at, with no ability to change course mid-flight. A missile is specifically a GUIDED weapon — it uses rocket (or sometimes jet) propulsion just like a rocket does, but it also carries guidance systems (sensors, onboard computers, GPS, or remote control) that let it actively steer and adjust its course in flight to hit a specific, sometimes moving, target, rather than just following a fixed launch trajectory. The key difference: 'rocket' describes the propulsion method and covers both guided and unguided vehicles (including non-military uses like space launches), while 'missile' specifically means a guided weapon that actively steers itself toward a target during flight, even though it's usually rocket-propelled.",
  ),
  k(
    'kb-gap-military-fighter-jet-vs-bomber',
    'Fighter jet vs bomber',
    ['fighter jet', 'bomber', 'difference fighter jet bomber'],
    "A fighter jet is built for air-to-air combat — it's fast, small, and highly maneuverable, designed to dogfight and shoot down other aircraft using cannons and air-to-air missiles, prioritizing speed and agility over payload capacity. A bomber is built for the opposite job — striking ground targets with a heavy payload of bombs or missiles, so it's generally much larger and heavier than a fighter, with a large internal or external weapons bay, longer range for deep strikes, but far less speed and maneuverability, since it's not designed to dogfight other planes and typically relies on fighter escorts or stealth/altitude for protection instead. The key difference: a fighter jet is small, fast, and maneuverable, built to fight other aircraft in the air, while a bomber is large, heavy, and much less agile, built to carry and deliver a large payload of munitions onto ground targets.",
  ),
  k(
    'kb-gap-military-battleship-vs-aircraft-carrier',
    'Battleship vs aircraft carrier',
    ['battleship', 'aircraft carrier', 'difference battleship aircraft carrier'],
    "A battleship is a heavily armored warship built to fight other ships directly, bristling with large-caliber guns and armor thick enough to trade fire at close-to-medium range in direct ship-to-ship combat — battleships were the dominant capital ships of navies for decades but relied entirely on their own onboard weapons to fight. An aircraft carrier is a completely different kind of capital ship — instead of fighting directly with its own guns, a carrier is essentially a floating airbase with a long flat flight deck that launches and recovers aircraft (fighters, bombers, and other planes), projecting its striking power through those aircraft over vastly greater distances than any ship's own guns could reach, while the carrier itself typically carries only light defensive weapons and relies on escort ships for protection. The key difference: a battleship fights directly using its own heavy guns and armor at relatively short range, while an aircraft carrier projects power indirectly by launching aircraft that can strike targets far beyond the ship's own weapons range.",
  ),
  k(
    'kb-gap-military-submarine-vs-destroyer',
    'Submarine vs destroyer',
    ['submarine', 'destroyer', 'difference submarine destroyer'],
    "A submarine is a warship built to operate underwater, using stealth as its primary advantage — it can submerge and travel hidden beneath the surface for extended periods, using torpedoes and (on some submarines) missiles to strike while remaining concealed, and its main strength is being difficult to detect rather than speed or firepower on the surface. A destroyer is a fast, maneuverable surface warship, originally developed to hunt and destroy smaller torpedo boats and now used as a versatile escort ship, defending larger vessels like aircraft carriers within a fleet or convoy against threats from the air, surface, and underwater (including submarines) using guns, missiles, and anti-submarine weapons. The key difference: a submarine operates hidden underwater and relies on stealth as its core advantage, while a destroyer is a fast surface warship that operates visibly on the water's surface, escorting and defending other ships against a wide range of threats, submarines included.",
  ),
  k(
    'kb-gap-military-truce-vs-ceasefire',
    'Truce vs ceasefire',
    ['truce', 'ceasefire', 'cease-fire', 'difference truce ceasefire'],
    "A ceasefire is simply an agreement or order to stop active fighting — it can be temporary, tactical, partial (limited to one area or issue), and doesn't necessarily involve broader negotiation; it can even be called unilaterally by one side, or arranged quickly for a narrow purpose like evacuating civilians or exchanging prisoners, without settling anything about the underlying conflict. A truce is generally a more formal and often longer-lasting mutual agreement between opposing sides to stop fighting, typically involving actual negotiation and terms both sides agree to, and often intended as a step toward a broader peace process or lasting settlement rather than just a short tactical pause. The key difference: a ceasefire is often a narrower, sometimes unilateral or tactical stop to fighting for a specific immediate purpose, while a truce is typically a more formal, mutually-negotiated agreement to halt hostilities, often as part of working toward a lasting peace.",
  ),
  k(
    'kb-gap-military-mutiny-vs-rebellion',
    'Mutiny vs rebellion',
    ['mutiny', 'rebellion', 'difference mutiny rebellion'],
    "A mutiny is specifically a revolt by military personnel (soldiers, sailors, or other service members) against their own commanding officers or chain of command, refusing orders and trying to seize control of their unit, ship, or post — a mutiny happens entirely within the military itself and is aimed at the immediate leadership above the mutineers, not necessarily at overthrowing the wider government. A rebellion is broader and not limited to the military at all — it's an organized uprising by any group (which can include civilians, political factions, or a mix of civilian and military elements) against the wider ruling authority, government, or established order, typically aiming for bigger political change than just replacing immediate commanders. The key difference: a mutiny is a revolt confined to military members against their own direct chain of command, while a rebellion is a broader uprising against the ruling government or authority itself, which can involve civilians as well as military personnel and aims at larger political change.",
  ),
  k(
    'kb-gap-military-veteran-vs-active-duty',
    'Veteran vs active-duty personnel',
    ['veteran', 'active-duty', 'active duty personnel', 'difference veteran active duty'],
    "Active-duty personnel are members of the armed forces who are currently serving full-time — they're under military command right now, subject to military orders and deployment, and military service is their current, ongoing job. A veteran is someone who has previously served in the military (often, though not always, after being honorably discharged or having completed their service) but is no longer on active duty — a veteran has left full-time military service, whether through discharge, retirement, or the end of their enlistment, and is now typically a civilian again (though some remain in the reserves), no longer subject to day-to-day military command. The key difference: active-duty personnel are currently serving full-time under military command right now, while a veteran has completed their period of service and left active military duty, even though they served in the past.",
  ),
  k(
    'kb-gap-military-draft-vs-enlistment',
    'Draft vs enlistment',
    ['military draft', 'conscription', 'enlistment', 'difference draft enlistment'],
    "A draft (also called conscription) is compulsory military service — the government legally requires certain eligible people (historically often selected by lottery or age criteria) to join the armed forces whether they personally want to or not, typically only activated during wartime or national emergencies when the military needs far more personnel than voluntary enlistment provides. Enlistment is voluntary — a person chooses to join the military on their own initiative, signing a service contract for a set term, without being legally compelled to serve; most modern peacetime militaries (including the current US military) rely entirely on voluntary enlistment rather than a draft. The key difference: a draft is mandatory, government-compelled military service applied to selected eligible people (typically during wartime), while enlistment is a voluntary choice to join the military on one's own initiative.",
  ),
  k(
    'kb-gap-military-medal-vs-decoration',
    'Medal vs decoration',
    ['military medal', 'decoration', 'difference medal decoration'],
    "A military medal is a broad category of physical award given to service members, and it covers many different kinds of recognition — some medals simply mark general service or participation, like a campaign medal for serving in a particular conflict/region or a service medal for years served, without necessarily recognizing one specific heroic act. A decoration is a more specific type of award, typically given to recognize a particular act of merit, valor, or distinguished conduct — decorations (like a Medal of Honor, Purple Heart, or Distinguished Service Cross) are earned for a specific documented action or achievement, not just for having served in a place or time period, which generally makes them more prestigious and individually earned than a general service medal. The key difference: 'medal' is the broad umbrella term including many kinds of awards (some just for general service or participation), while 'decoration' specifically refers to an award recognizing a particular act of valor, merit, or distinguished conduct.",
  ),
  k(
    'kb-gap-military-camouflage-vs-uniform',
    'Camouflage gear vs uniform',
    ['camouflage gear', 'military uniform', 'difference camouflage uniform'],
    "A military uniform is the standardized clothing a service member wears that identifies them as military personnel — it includes rank insignia, unit patches, and a consistent, recognizable design meant partly to visibly identify the wearer's role, rank, and affiliation (dress uniforms are a clear example, designed to be seen and recognized, not to hide the wearer). Camouflage gear is uniform clothing specifically designed with a purpose opposite to visibility — it's patterned and colored to blend into a particular environment (woodland, desert, urban, etc.), making the wearer harder to spot visually, and is typically the everyday combat/field uniform worn during operations rather than for ceremonial or garrison identification purposes. The key difference: 'uniform' is the general term for standardized military clothing that identifies the wearer (rank, unit, affiliation), while camouflage gear is specifically a type of uniform patterned to blend into the environment and reduce visibility during field operations, rather than to be easily seen and identified.",
  ),
  k(
    'kb-gap-military-bunker-vs-trench',
    'Bunker vs trench',
    ['military bunker', 'trench warfare', 'difference bunker trench'],
    "A trench is a long, narrow ditch dug into the ground, typically connected in networks, that soldiers use to move and fight while staying below ground level for cover from enemy fire — trenches were famously the dominant defensive structure of World War I, letting troops hold a defensive line across a wide front while remaining largely protected from direct rifle and machine-gun fire. A bunker is a fortified, typically enclosed shelter — often reinforced with concrete, steel, or earth, sometimes partially or fully underground — built to withstand much heavier attacks (artillery shells, bombs) than an open trench can, and used for things like command posts, ammunition storage, or providing much stronger protection for personnel than a simple open trench line offers. The key difference: a trench is a long, open, connected ditch used mainly for cover and movement along a defensive line, while a bunker is a more heavily fortified, often enclosed shelter built to withstand far more powerful attacks than a trench, used for command, storage, or stronger personnel protection.",
  ),
  k(
    'kb-gap-military-spy-vs-soldier',
    'Spy vs soldier',
    ['spy', 'soldier', 'espionage', 'difference spy soldier'],
    "A soldier is an official, uniformed member of a country's military, serving openly as a combatant under that country's chain of command, recognized under international law as a lawful combatant, and generally protected by the rules of war (like being treated as a prisoner of war if captured, rather than as a criminal). A spy operates completely differently — a spy (engaged in espionage) works covertly and secretly, typically without a uniform, often posing as an ordinary civilian or using a false identity, gathering intelligence or information for their country (or another employer) without openly declaring who they work for; because spies operate in disguise rather than as an openly identified combatant, they generally do NOT receive the same legal protections as a captured soldier if caught, and can be prosecuted as criminals rather than treated as prisoners of war. The key difference: a soldier fights openly and visibly as a recognized member of a military under the laws of war, while a spy operates secretly and covertly, often in disguise, specifically to avoid being identified — which also means they lose the legal protections an openly-serving soldier has if captured.",
  ),
];
