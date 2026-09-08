import { KnowledgeItem } from '../../types';

// Batch 107 (first aid & medical emergencies). The safety corpus was mostly
// solid (adult CPR, recovery position, stroke/FAST, heart attack, anaphylaxis,
// swallowed poison, DR ABC, nosebleed). But nexus-4b gave a DANGEROUS answer
// for severe bleeding (told the user to just apply pressure for 15 min and get
// stitches "within a few hours"), nonsense for hypothermia ("expensive to keep
// someone warm"), told the user to give fluids to someone in shock (wrong),
// omitted abdominal thrusts from choking, and rambled without answering for
// opioid overdose. First-aid guidance below follows mainstream Red Cross /
// Resuscitation Council teaching; it is general information, and in a real
// emergency the priority is always to call the local emergency number.
export const FIRST_AID_EMERGENCY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-severe-bleeding',
    title: 'How to Control Severe (Life-Threatening) Bleeding',
    category: 'First Aid',
    keywords: [
      'how do you treat a severe bleeding wound', 'severe bleeding call emergency services immediately apply firm direct pressure and do not let up', 'add more dressings on top do not remove a soaked dressing',
      'tourniquet high and tight on a limb when direct pressure fails note the time', 'lie the person down keep them warm treat for shock', 'life threatening bleeding spurting or pooling blood',
    ],
    content: `Severe bleeding — blood spurting, pouring, pooling, or soaking through clothing — can kill within minutes and is treated completely differently from a small cut. Call the emergency number immediately (or have someone else call while you act). Apply firm, direct pressure straight onto the wound with your hands, using a cloth, gauze or clothing if available, and do not release to "check" — keep constant pressure. If blood soaks through, add more material on top and keep pressing; do not remove the soaked dressing. Once bleeding is controlled, hold it with a firm pressure bandage. If the bleeding is from an arm or leg and direct pressure is not controlling it, apply a tourniquet 5–8 cm above the wound (not over a joint), tighten until the bleeding stops, and write down the time it was applied — do not loosen it. Lay the person down, keep them warm with a coat or blanket, reassure them, and watch for shock. Only minor bleeding gets the "pressure for a few minutes, then a plaster or stitches later" approach.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hypothermia-treatment',
    title: 'How to Treat Hypothermia',
    category: 'First Aid',
    keywords: [
      'how do you treat hypothermia', 'move them somewhere warm out of wind and wet remove wet clothing replace with dry layers and blankets including the head insulate from the ground',
      'warm sweet drinks only if fully alert warm not hot packs to the trunk not the limbs', 'handle very gently rough handling can trigger cardiac arrest do not rub the limbs do not use direct high heat',
      'call ems for confusion slurred speech stopped shivering drowsiness not dead until warm and dead',
    ],
    content: `Hypothermia is dangerously low core body temperature. Get the person out of the cold — indoors, or at least sheltered from wind and rain — and remove any wet clothing, replacing it with dry layers and blankets, covering the head, and putting insulation between them and the ground. If they are fully alert and able to swallow, give warm sweet non-alcoholic drinks. Add gentle warmth to the core: skin-to-skin contact under blankets, or warm (not hot) packs against the chest, armpits and groin — NOT the arms and legs, because warming the limbs first pushes cold blood back to the heart. Handle the person very gently and keep them horizontal: in moderate-to-severe hypothermia the heart is irritable and rough movement can trigger cardiac arrest. Do not rub or massage the limbs, do not put them in a hot bath, and do not use direct high heat like a heater or hot water bottle against bare skin. Call the emergency number if they are confused, slurring, drowsy, or have stopped shivering despite being cold. If they are not breathing, start CPR and keep going — severe hypothermia can mimic death, and the rule is "not dead until warm and dead."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-choking-adult-child-infant',
    title: 'What to Do if Someone Is Choking (Adult, Child, Infant)',
    category: 'First Aid',
    keywords: [
      'what do you do if someone is choking', 'what do you do if a child is choking versus an adult', 'ask are you choking if they cannot cough speak or breathe act encourage coughing if they still can',
      'five sharp back blows between the shoulder blades then five abdominal thrusts heimlich alternate until it clears', 'infant under one year five back blows head down then five chest thrusts never abdominal thrusts',
      'if they go unconscious lower them to the ground call emergency services and start cpr',
    ],
    content: `Ask "Are you choking?" If they can still cough forcefully, speak, or breathe, the airway is only partly blocked — encourage them to keep coughing and stay with them. If they cannot cough, speak or breathe, or are making no sound, the airway is blocked and you must act, and shout for someone to call the emergency number. For an ADULT or a CHILD over 1: lean them forward and give up to 5 sharp blows between the shoulder blades with the heel of your hand, checking after each. If that fails, give up to 5 abdominal thrusts (the Heimlich manoeuvre) — stand behind them, fist just above the navel, other hand over it, and pull sharply inward and upward. Alternate 5 back blows and 5 abdominal thrusts until the object comes out or they become unconscious. For an INFANT under 1: do NOT use abdominal thrusts. Support them face-down along your forearm with the head low, give 5 back blows, then turn them face-up and give 5 chest thrusts (two fingers on the breastbone), and alternate. If anyone choking becomes unconscious, lower them to the ground, make sure the emergency number has been called, and begin CPR — each time you open the airway to give breaths, look in the mouth and remove any object you can clearly see (never a blind finger sweep).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-shock-treatment',
    title: 'Signs of Shock and How to Treat It',
    category: 'First Aid',
    keywords: [
      'what are the signs of shock and how do you treat it', 'shock pale cold clammy greyish skin fast weak pulse rapid shallow breathing nausea thirst weakness dizziness confusion anxiety',
      'lay them down raise the legs about 30 cm keep them warm with a blanket treat the cause reassure', 'do not give anything to eat or drink they may need surgery or may vomit',
      'monitor breathing and pulse be ready to start cpr shock is a life threatening drop in circulation',
    ],
    content: `Shock in first aid means the circulation is failing to deliver enough oxygenated blood to the body — a life-threatening emergency, usually caused by severe bleeding (internal or external), major burns, severe vomiting/diarrhoea, a heart problem, or anaphylaxis. Signs: pale, cold, clammy, and later grey or bluish skin; a fast, weak ("thready") pulse; rapid shallow breathing; yawning or gasping; nausea, thirst, and restlessness or anxiety progressing to confusion and eventually unconsciousness. Treatment: call the emergency number. Treat the obvious cause (control bleeding, give an adrenaline auto-injector for anaphylaxis). Lay the person down and, if you do not suspect a leg, hip, pelvis or spinal injury and they are not struggling to breathe, raise their legs about 30 cm to help blood return to the vital organs. Keep them warm with a coat or blanket, loosen tight clothing, and reassure them. Do NOT give them anything to eat or drink — they may need an anaesthetic and surgery, and they may vomit and choke; if they complain of thirst, moisten their lips only. Monitor breathing and pulse and be ready to start CPR.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-seizure-response',
    title: 'What to Do (and Not Do) When Someone Has a Seizure',
    category: 'First Aid',
    keywords: [
      'what should you do if someone has a seizure', 'protect from injury move hard objects away cushion the head do not restrain them do not put anything in their mouth',
      'time the seizure once it stops put them in the recovery position stay until fully recovered', 'call emergency services first seizure lasts more than 5 minutes repeated seizures without recovery injury breathing trouble pregnant in water',
      'tonic clonic seizure do not hold them down',
    ],
    content: `During a generalised (tonic-clonic) seizure the person will stiffen, then jerk, and cannot control it. Your job is to keep them safe, not to stop the seizure. DO: note the time it starts; move away anything hard or sharp; put something soft under or around the head; loosen anything tight around the neck; and once the jerking stops, roll them into the recovery position and check breathing. DO NOT: hold them down or try to restrain their movements; put anything in their mouth (they will not "swallow their tongue" — you risk breaking teeth or being bitten); or move them unless they are in danger (near water, a road, fire, or stairs). Most seizures stop on their own within 1–3 minutes and the person is then confused and drowsy for a while — stay with them, reassure them, and don't let them wander off until they are fully alert. Call the emergency number if: it is their first-ever seizure, it lasts longer than 5 minutes, one seizure follows another without recovery in between, they are injured, they have trouble breathing afterward, they don't regain consciousness, or they are pregnant, diabetic, or the seizure happened in water.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-aed-use',
    title: 'How to Use an AED (Automated External Defibrillator)',
    category: 'First Aid',
    keywords: [
      'how do you use an aed automated external defibrillator', 'turn it on and follow the spoken prompts expose and dry the bare chest attach pads as pictured upper right chest and lower left side',
      'stand clear while it analyzes if it advises a shock make sure everyone is clear and press the button then resume cpr for 2 minutes', 'keep going until ems takes over or the person recovers',
      'use paediatric pads or mode for a young child if available adult pads are better than nothing',
    ],
    content: `An AED is designed so an untrained bystander can use it — it talks you through every step. Send someone for the AED while CPR is started; do not stop CPR to go get it if you are alone (call the emergency number first). When it arrives: turn it on and do exactly what the voice/screen tells you. Expose the person's bare chest and wipe it dry (shave very hairy chests quickly if a razor is in the kit). Peel and stick the pads exactly as shown on their pictures — one on the upper right chest below the collarbone, one on the left side below the armpit — and plug in the connector if it isn't already. Make sure nobody is touching the person and say "clear" while the AED analyses the heart rhythm. If it says a shock is advised, check again that everyone is clear and press the flashing shock button. Immediately resume chest compressions and continue CPR for about 2 minutes until the AED tells you to stand clear and re-analyse. Keep the cycle going until the person shows clear signs of life or emergency responders take over. For a child under 8, use paediatric pads or the paediatric setting if the AED has them; if not, use the adult pads (placing one on the chest and one on the back if they would touch) — an adult AED is far better than none.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-opioid-overdose-response',
    title: 'How to Recognise and Respond to an Opioid Overdose',
    category: 'First Aid',
    keywords: [
      'how do you recognize and respond to an opioid overdose', 'signs unresponsive slow or absent breathing or gurgling blue or grey lips and fingertips pinpoint pupils limp body',
      'call emergency services give naloxone narcan nasal spray if available repeat every 2 to 3 minutes if no response', 'start rescue breaths or cpr if not breathing put in the recovery position if breathing',
      'stay with them naloxone wears off in 30 to 90 minutes and they can stop breathing again', 'do not leave them alone',
    ],
    content: `Signs of an opioid overdose: the person is unresponsive or barely responsive; breathing is very slow, shallow, gurgling ("death rattle"), or has stopped; lips, fingertips and skin turn blue or grey; the body is limp; pupils are constricted to pinpoints; and they may make choking or snoring sounds. Respond immediately: call the emergency number. If you have naloxone (Narcan) — a nasal spray or injection that reverses opioids — give a dose right away; if there is no clear improvement in 2–3 minutes, give another dose. If they are not breathing or only gasping, give rescue breaths (or full CPR if there is no pulse and you are trained) and keep going. If they are breathing on their own, place them in the recovery position so they don't choke if they vomit. Stay with them: naloxone wears off in about 30–90 minutes, which is often shorter than the drug it is reversing, so the person can slip back into overdose and stop breathing again even after seeming fine. Do not leave them alone until emergency responders arrive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-burn-treatment-detail',
    title: 'How to Treat a Burn',
    category: 'First Aid',
    keywords: [
      'how do you treat a burn', 'cool the burn under cool running water for at least 20 minutes as soon as possible', 'remove jewellery and tight clothing from the area before it swells unless stuck to the burn',
      'cover loosely with cling film or a clean non-fluffy dressing do not burst blisters do not apply butter ice toothpaste or creams', 'seek medical care for burns larger than the persons hand deep or white or charred on the face hands feet genitals or a joint any burn on a child chemical or electrical burns',
      'keep the person warm watch for shock with large burns',
    ],
    content: `For any burn, act fast: cool it under cool (not ice-cold) running water for at least 20 minutes, ideally starting within the first 20 minutes after the injury — this limits how deep the damage goes and eases pain. While cooling, remove rings, watches, belts and any clothing near the burn before the area swells, unless the clothing is stuck to the burn (then leave it). After cooling, cover the burn loosely with cling film (laid on, not wrapped tight) or a clean, non-fluffy dressing or plastic bag. Do NOT apply butter, oil, toothpaste, ice, or creams; do NOT burst blisters. Give paracetamol or ibuprofen for pain. Keep the person warm overall (large burns cause heat and fluid loss and can lead to shock). Seek medical care for: any burn bigger than the person's palm; a deep burn (skin looks white, brown, charred, or leathery, or is painless because nerves are damaged); burns to the face, hands, feet, genitals, or over a joint; any burn on a baby or young child or an elderly person; and all electrical and chemical burns (for chemicals, brush off dry powder and rinse with lots of water for at least 20 minutes). Call the emergency number for large, deep, airway (facial/inhalation), electrical, or chemical burns.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-snakebite-first-aid',
    title: 'First Aid for a Snake Bite',
    category: 'First Aid',
    keywords: [
      'how do you treat a snake bite', 'move away from the snake keep the person calm and as still as possible call emergency services get to hospital for antivenom',
      'keep the bitten limb still and below or level with the heart remove rings and tight clothing before swelling', 'do not apply a tourniquet do not cut or suck the wound do not apply ice do not try to catch or kill the snake',
      'note the time and mark the leading edge of swelling take a photo of the snake from a safe distance',
    ],
    content: `Move the person and yourself well away from the snake — most second bites happen while trying to catch or kill it (a phone photo from a safe distance is all that's needed for identification). Call the emergency number and arrange to get to a hospital, because the definitive treatment for a venomous bite is antivenom. Keep the person as calm and still as possible; physical activity and a racing heart pump venom around the body faster. Keep the bitten limb still and at or slightly below heart level, and gently splint it if you can. Remove rings, watches, and tight clothing from that limb before it swells. Note the time of the bite and use a pen to mark the leading edge of any swelling on the skin so hospital staff can track how fast it spreads. Do NOT apply a tourniquet, do NOT cut the wound, do NOT try to suck out the venom, and do NOT apply ice or electric shock — all of these are old myths that cause harm. (One exception: for some Australian elapid bites, a firm "pressure immobilisation" bandage over the whole limb is taught — follow local guidance where that applies.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-broken-bone-first-aid',
    title: 'First Aid for a Suspected Broken Bone',
    category: 'First Aid',
    keywords: [
      'what do you do for a suspected broken bone', 'support the injury in the position found do not try to straighten or realign it', 'immobilise it with a splint or sling only if help is delayed keep the person still',
      'apply an ice pack wrapped in cloth for pain and swelling do not give food or drink in case surgery is needed', 'open fracture cover the wound with a sterile dressing and control bleeding without pressing on the bone',
      'call emergency services for the leg hip pelvis or multiple injuries check the limb stays warm and pink beyond the injury',
    ],
    content: `Signs of a fracture: pain that worsens with movement, swelling, bruising, deformity or a limb at an odd angle, a grinding feeling, and inability to use the part normally. Keep the person still and support the injured part in the position you found it with your hands or padding — do NOT try to straighten or realign it. If emergency help is on the way quickly, that support is enough. If you are far from help, immobilise the injury: a splint (a rigid object padded and bound to the limb, tied above and below the break but not over it) for a leg or arm, or a sling for an arm or collarbone. Apply an ice pack wrapped in a cloth for up to 20 minutes to reduce pain and swelling. Do not give the person anything to eat or drink in case they need surgery. If the bone has broken the skin (open fracture), cover the wound with a sterile dressing and control any bleeding with pressure around — not directly on — the protruding bone. Call the emergency number for a suspected broken leg, hip, pelvis, or back/neck, for an open fracture, if the person is in severe pain or shock, or if the limb below the injury goes pale, cold, blue or numb (a sign circulation is cut off).`,
    createdAt: Date.now(),
  },
];
