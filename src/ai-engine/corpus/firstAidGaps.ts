import { KnowledgeItem } from '../../types';

// Batch 37 (first aid & emergencies) gap-fills. General first-aid information,
// NOT a substitute for a certified course or professional medical care — in a
// real emergency, call your local emergency number first. Live misses on
// nexus-4b: "treat someone for shock" -> "Trick 'r Treat is a 2007 horror
// film... BioShock" dump; "hypothermia" -> jumped straight to CPR; "minor cut"
// -> RICE/burn dump; "chemical in the eye" -> answered onion vapour;
// "choking" -> left out abdominal thrusts for adults; "recognize a heart
// attack" -> explained the mechanism, not the symptoms.
export const FIRST_AID_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-treat-for-shock',
    title: 'First Aid for Shock',
    category: 'First Aid',
    keywords: [
      'how do you treat someone for shock', 'what to do for shock first aid', 'signs of shock', 'what is medical shock',
      'first aid for someone going into shock', 'shock position',
    ],
    content: `Medical shock is a life-threatening drop in blood flow to the organs, often from serious bleeding, major injury, severe allergic reaction, burns or a heart problem. Signs: pale, cold, clammy or greyish skin; fast, weak pulse; rapid shallow breathing; nausea; thirst; weakness, dizziness, confusion or anxiety. What to do: call your emergency number immediately. Lay the person down and, unless you suspect a spinal, head, leg or breathing problem, raise their legs about 30 cm (a foot) to help blood reach the heart and brain. Treat any obvious cause you can (control bleeding, give their adrenaline auto-injector for anaphylaxis). Keep them warm with a coat or blanket and keep them calm and still. Do NOT give them anything to eat or drink (they may need surgery, and it can cause choking). Keep checking their breathing and be ready to start CPR if it stops.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hypothermia-first-aid',
    title: 'First Aid for Hypothermia',
    category: 'First Aid',
    keywords: [
      'what should you do for hypothermia', 'first aid for hypothermia', 'how to warm someone who is too cold',
      'signs of hypothermia', 'how to treat someone freezing', 'why handle a hypothermia victim gently',
    ],
    content: `Hypothermia is dangerously low body temperature. Early signs: shivering, cold pale skin, slurred speech, clumsiness, confusion. Severe: shivering stops, drowsiness, slow weak breathing and pulse, loss of consciousness. What to do: call your emergency number. Move the person somewhere warm and sheltered, and handle them very gently — rough movement can trigger a cardiac arrest in a severely cold heart. Remove any wet clothing and wrap them in dry blankets or a sleeping bag, covering the head but leaving the face clear; add your own body heat if that's all you have. Warm the core (chest, neck, groin) with warm — not hot — packs, not the arms and legs first. If they are fully alert and can swallow, give warm sweet drinks (no alcohol, no caffeine). Do NOT put them in a hot bath, rub their limbs, or use direct high heat. Only start CPR if they are not breathing normally and not moving — check for up to a minute first, because a very cold pulse can be hard to feel, and keep going until help arrives ("nobody is dead until they are warm and dead").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-minor-cut',
    title: 'How to Treat a Minor Cut',
    category: 'First Aid',
    keywords: [
      'how do you treat a minor cut', 'first aid for a small cut', 'how to clean a cut', 'how to stop a small cut bleeding',
      'when does a cut need stitches', 'how to dress a wound', 'do i need a tetanus shot for a cut',
    ],
    content: `For a minor cut or graze: wash your own hands first if you can. Apply gentle pressure with a clean cloth or tissue for a few minutes to stop the bleeding. Once it slows, rinse the wound under clean running water to flush out dirt (don't scrub; you can use tweezers cleaned with alcohol to pick out obvious debris). Pat the surrounding skin dry, apply a thin layer of antiseptic or antibiotic ointment if you have it, and cover with a sterile adhesive bandage or dressing; change it daily and keep it dry. Watch for infection over the next days — spreading redness, warmth, swelling, pus, red streaks, or fever — and see a doctor if any appear. Seek medical care instead of self-treating if: the bleeding won't stop after 10–15 minutes of pressure, the cut is deep, gaping, or longer than about 1–2 cm (may need stitches, ideally within a few hours), it's on the face or over a joint, something is embedded, it was caused by a dirty or rusty object or an animal/human bite, or the person isn't up to date on tetanus vaccination (booster recommended within 48 hours for a dirty wound).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chemical-in-eye',
    title: 'First Aid for a Chemical Splash in the Eye',
    category: 'First Aid',
    keywords: [
      'how do you treat a chemical in the eye', 'chemical splash in eye first aid', 'what to do if you get bleach in your eye',
      'how to flush an eye', 'chemical burn to the eye', 'got cleaner in my eye',
    ],
    content: `A chemical (bleach, oven cleaner, drain cleaner, battery acid, strong soap, garden chemicals) in the eye is an emergency — alkalis especially keep burning. Act immediately: flush the eye with lots of clean, lukewarm water continuously for at least 15–20 minutes (longer, 30–60 min, for strong acids or alkalis). Hold the eyelids open, tilt the head so the affected eye is lower and the water runs from the inner corner outward (away from the other eye), and let the water pour over it — a gentle shower, tap, eyewash station, or a clean jug all work. Remove contact lenses after you start rinsing if they don't come out with the flushing. Do not rub the eye, do not bandage it tightly, and do not put in any drops or ointment unless a professional tells you to. While flushing (or as soon as you can), call your emergency number or poison control, tell them exactly what the chemical was, and get to an eye specialist or emergency department — keep rinsing on the way if possible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-choking-adult-full',
    title: 'What to Do if an Adult or Child Is Choking',
    category: 'First Aid',
    keywords: [
      'what should you do if someone is choking', 'how to help a choking person', 'choking first aid', 'back blows and abdominal thrusts',
      'what to do if someone cannot breathe from choking', 'choking adult vs child vs baby',
    ],
    content: `If the person can still cough, speak or breathe, encourage them to keep coughing — don't interfere. If they can't cough, speak or breathe, or are going blue, act at once and get someone to call the emergency number. For an adult or a child over 1 year: stand behind and slightly to the side, lean them well forward, and give up to 5 sharp BACK BLOWS between the shoulder blades with the heel of your hand, checking after each. If that fails, give up to 5 ABDOMINAL THRUSTS ("Heimlich"): wrap your arms around their waist, make a fist just above the navel (well below the breastbone), grasp it with your other hand and pull sharply inward and upward. Alternate 5 back blows and 5 abdominal thrusts until the object comes out or they become unconscious — if they collapse, lower them to the floor, call the emergency number if not already done, and start CPR (chest compressions may dislodge it). For a baby under 1: don't use abdominal thrusts — give 5 back blows with the baby face-down along your forearm, head lowest, then 5 chest thrusts (two fingers, centre of chest) face-up; repeat. Anyone who was choking should be checked by a doctor afterward.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heart-attack-recognize',
    title: 'How to Recognise a Heart Attack',
    category: 'First Aid',
    keywords: [
      'how do you recognize a heart attack', 'heart attack symptoms', 'signs of a heart attack', 'what does a heart attack feel like',
      'what to do if you think someone is having a heart attack', 'is it a heart attack or heartburn',
    ],
    content: `Common signs of a heart attack: pressure, tightness, squeezing or pain in the centre or left of the chest, lasting more than a few minutes or coming and going; pain spreading to one or both arms, the jaw, neck, back or stomach; shortness of breath; a cold sweat; nausea or vomiting; light-headedness or a sense of impending doom. Women, older people and people with diabetes more often have subtler symptoms — unusual fatigue, mild chest discomfort, breathlessness or "indigestion" — without the classic crushing chest pain. What to do: call the emergency number immediately (don't wait to "see if it passes," and don't drive yourself). Help the person sit down and stay calm and still, loosen tight clothing. If they are not allergic to aspirin and have no bleeding problem, have them slowly chew one adult aspirin (about 300 mg) or several low-dose tablets. If they have prescribed nitroglycerin, help them take it. Be ready to start CPR if they collapse and stop breathing normally.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-broken-bone-first-aid',
    title: 'First Aid for a Suspected Broken Bone',
    category: 'First Aid',
    keywords: [
      'what should you do for a broken bone', 'first aid for a fracture', 'how to splint a broken bone', 'what to do if you think a bone is broken',
      'should you move someone with a broken leg', 'first aid for a broken arm',
    ],
    content: `If you think a bone is broken (pain, swelling, bruising, deformity, a grating feeling, or the person can't use or bear weight on the limb): tell them to keep still and don't move them unnecessarily. Support the injured part in the position you found it — do NOT try to straighten or realign it. Steady and immobilise it: for an arm, a sling; for a leg, padding and, if you must move them, gently tying the injured leg to the uninjured one. Apply an ice pack wrapped in a cloth for up to 20 minutes to reduce pain and swelling, and don't give them food or drink in case they need surgery. Call the emergency number, or get them to an emergency department, especially for a leg, hip or pelvis, an open fracture (bone through the skin — cover it with a clean dressing, apply pressure around it, not on the bone), any suspected spine, neck or skull injury (in which case do not move them at all unless they're in danger), signs of shock, or numbness/blue colour beyond the injury.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-recovery-position',
    title: 'What the Recovery Position Is',
    category: 'First Aid',
    keywords: [
      'what is the recovery position', 'how to put someone in the recovery position', 'when to use the recovery position',
      'unconscious but breathing what to do', 'why put someone on their side', 'recovery position steps',
    ],
    content: `The recovery position is a stable side-lying position for a person who is unconscious (or not fully alert) BUT breathing normally, and who you don't suspect has a spinal injury. Lying on the side with the head tilted slightly back and down keeps the airway open and lets saliva or vomit drain out of the mouth instead of blocking the throat or being inhaled. To do it: kneel beside them, place the near arm out at a right angle; bring the far arm across so the back of their hand is against their near cheek; bend the far knee up; then pull on that knee to roll them toward you onto their side; adjust the top leg so hip and knee are bent at right angles for stability; tilt the head back to open the airway. Then call the emergency number if not already done, keep checking that they're still breathing, and be ready to start CPR if breathing stops. Use it after a seizure has ended, for someone who has fainted and isn't quickly coming round, for intoxication, or any time someone is unresponsive but breathing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-seizure-first-aid',
    title: 'What to Do if Someone Has a Seizure',
    category: 'First Aid',
    keywords: [
      'what should you do if someone has a seizure', 'seizure first aid', 'what not to do during a seizure',
      'how to help someone having a seizure', 'when to call an ambulance for a seizure', 'epilepsy first aid',
    ],
    content: `During a tonic-clonic (convulsive) seizure: stay calm and note the time it starts. Ease the person to the floor if they're not already down, move away anything hard or sharp, and put something soft and flat under their head. Loosen anything tight around the neck. Do NOT hold them down or restrain their movements, and do NOT put anything in their mouth (they can't swallow their tongue, and you risk broken teeth or a bitten finger). Once the jerking stops, gently roll them into the recovery position and stay with them, speaking calmly, as they come round — they may be confused or drowsy for a while. Call the emergency number if: it's their first-ever seizure, it lasts longer than 5 minutes, another seizure follows without them recovering in between, they're injured, they have trouble breathing afterward, or they're pregnant, diabetic, or the seizure happened in water.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-snake-bite-donts',
    title: 'What NOT to Do (and What to Do) for a Snake Bite',
    category: 'First Aid',
    keywords: [
      'what should you not do for a snake bite', 'snake bite first aid', 'should you suck out snake venom', 'what to do if bitten by a snake',
      'snake bite myths', 'do you use a tourniquet for a snake bite',
    ],
    content: `Do NOT: cut the wound, try to suck out the venom (by mouth or a "venom extractor" — it doesn't work and wastes time), apply a tight tourniquet, put ice on it, give the person alcohol or caffeine, or try to catch or kill the snake (photograph it from a safe distance if you can). Any of these can worsen the injury. Instead: move the person away from the snake and get them to stay as calm and still as possible — movement pumps venom around the body. Call the emergency number right away. Remove rings, watches and tight clothing near the bite before it swells. Keep the bitten limb still and roughly at or below heart level, and immobilise it with a splint. Note the time of the bite and watch for swelling spreading. (In Australia, official advice adds a firm "pressure-immobilisation" bandage over the whole limb for the specific snakes there — elsewhere that is not generally recommended.) Get to a hospital for antivenom as fast as possible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-frostbite-first-aid',
    title: 'First Aid for Frostbite',
    category: 'First Aid',
    keywords: [
      'what should you do for frostbite', 'frostbite first aid', 'how to rewarm frostbite', 'frostnip vs frostbite',
      'should you rub frostbite', 'what not to do for frostbite',
    ],
    content: `Frostbite is frozen skin and tissue, usually on fingers, toes, ears, nose or cheeks — the area looks white, greyish or waxy and feels hard, cold and numb (frostnip is the mild, reversible early stage: cold, tingling, pale skin). What to do: get the person somewhere warm, and treat any hypothermia first (that's the bigger threat). Remove wet or tight clothing, rings and jewellery from the area. Do NOT rub or massage the area, do NOT use direct high heat (fire, stove, heater, hot water), and do NOT rewarm it if there's any chance it will refreeze before you reach safety — refreezing causes far worse damage than staying frozen a while longer. To rewarm, soak the part in warm (not hot) water, about 37–39 °C, for 15–30 minutes until it turns soft and red/purple; expect severe pain as feeling returns. Afterward, wrap it loosely in dry sterile dressings, separate the fingers/toes, keep the part elevated, don't walk on frostbitten feet, and get medical care — deep frostbite needs a hospital.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heat-stroke-first-aid',
    title: 'First Aid for Heat Stroke',
    category: 'First Aid',
    keywords: [
      'what should you do for heat stroke', 'heat stroke first aid', 'how to cool someone with heat stroke', 'heat exhaustion vs heat stroke',
      'signs of heat stroke', 'how to treat overheating',
    ],
    content: `Heat stroke is a life-threatening emergency: the body's temperature control fails, core temperature rises above ~40 °C, and the person becomes confused, agitated, slurred or unconscious, with hot skin (which may be dry or sweaty), a fast pulse and rapid breathing, headache and nausea. (Heat exhaustion is the milder warning stage — heavy sweating, pale clammy skin, dizziness, cramps — treated by resting in the cool, sipping water, and cooling; it becomes heat stroke if ignored.) For heat stroke: call the emergency number immediately, then cool the person as fast and as aggressively as you can while you wait — move them into shade or air conditioning, remove outer clothing, and use whatever you have: immerse them in or douse them with cool water, spray/sponge them and fan hard, or put wrapped ice packs or cold wet cloths on the neck, armpits and groin. Keep cooling until they're less hot or help arrives. If they are alert and can swallow, give small sips of cool water; do NOT give fluids to anyone confused or drowsy. Put an unconscious but breathing person in the recovery position.`,
    createdAt: Date.now(),
  },
];
