import { KnowledgeItem } from '../../types';

// Batch 52 (World War II) gap-fills. Live misses on nexus-4b:
// "Eastern Front in WW2" -> "it wasn't involved in World War II at all";
// "Battle of Midway" -> "led by Admiral Chester W. Nichols" (Nimitz);
// "D-Day" -> "Roosevelt called it a date that'll live in infamy, and suddenly
// America was in WWII" (that's Pearl Harbor); "Pacific island hopping campaign"
// -> "I've never heard of any coordinated hopping campaign... sounds like a
// video game"; "North Africa campaign" -> "France fighting Britain over their
// former empire"; "what caused World War 2" -> only gave dates.
export const WORLD_WAR_2_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-eastern-front-ww2',
    title: 'What the Eastern Front Was in World War II',
    category: 'World War II',
    keywords: [
      'what was the eastern front in world war 2', 'operation barbarossa', 'germany invades the soviet union',
      'battle of kursk', 'siege of leningrad', 'why was the eastern front so deadly', 'soviet union vs nazi germany',
    ],
    content: `The Eastern Front (1941–1945) was by far the largest and deadliest theatre of World War II — the war between Nazi Germany (with allies Romania, Hungary, Finland, Italy) and the Soviet Union. It began on 22 June 1941 when Germany launched Operation Barbarossa, the largest land invasion in history, breaking the Nazi–Soviet Pact. The Germans drove deep into Soviet territory, besieged Leningrad for 872 days (over a million dead, mostly of starvation), and were stopped just short of Moscow in the winter of 1941. The tide turned at Stalingrad (1942–43), where the German 6th Army was encircled and destroyed, and at Kursk (July 1943), the largest tank battle ever, after which the Soviets went permanently on the offensive, pushing the Germans back across Eastern Europe and finally storming Berlin in April–May 1945. The Eastern Front accounted for roughly 80% of German military casualties and about 27 million Soviet deaths (soldiers and civilians), and its outcome was the single biggest factor in Germany's defeat. It also placed the Red Army across Eastern Europe, setting up the Cold War division of the continent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-caused-ww2',
    title: 'What Caused World War II',
    category: 'World War II',
    keywords: [
      'what caused world war 2', 'causes of ww2', 'why did world war 2 start', 'hitler expansionism', 'appeasement munich',
      'treaty of versailles and world war 2', 'invasion of poland 1939',
    ],
    content: `The immediate trigger was Germany's invasion of Poland on 1 September 1939, after which Britain and France declared war. The deeper causes: (1) the harsh Treaty of Versailles (1919) that ended WWI left Germany humiliated, stripped of territory, disarmed and burdened with reparations, breeding resentment. (2) The Great Depression from 1929 caused mass unemployment and political extremism, helping Adolf Hitler and the Nazi Party take power in 1933. (3) Hitler's ideology demanded overturning Versailles and seizing "living space" (Lebensraum) in the east; he rearmed Germany, remilitarised the Rhineland (1936), annexed Austria (the Anschluss, 1938) and then Czechoslovakia (1938–39). (4) Militarism and imperial ambition in Japan (which had invaded Manchuria in 1931 and China in 1937) and Fascist Italy (which invaded Ethiopia in 1935). (5) The failure of the League of Nations and the policy of "appeasement" — Britain and France conceding to Hitler's demands (the Munich Agreement, 1938) in the hope of avoiding war, which only emboldened him. (6) The Nazi–Soviet Pact of August 1939, which secretly divided Eastern Europe and freed Hitler to attack Poland without fear of a two-front war.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-d-day-fix',
    title: 'What D-Day Was',
    category: 'World War II',
    keywords: [
      'what was d-day', 'operation overlord', 'normandy landings june 6 1944', 'the five d-day beaches', 'omaha beach',
      'who commanded d-day', 'why was d-day important',
    ],
    content: `D-Day (6 June 1944) was the Allied invasion of German-occupied France across the English Channel — Operation Overlord — the largest seaborne invasion in history and the opening of a Western Front in Europe. Under the overall command of US General Dwight D. Eisenhower, about 156,000 American, British and Canadian troops landed on five Normandy beaches code-named Utah, Omaha, Gold, Juno and Sword, backed by roughly 7,000 ships and 11,000 aircraft, and preceded by airborne divisions dropped inland overnight. Fighting was heaviest at Omaha, where American troops took severe casualties against cliff-top defences; total Allied casualties on the day were around 10,000, with about 4,400 dead. The beachhead held, and over the following weeks the Allies broke out of Normandy, liberated Paris in August, and drove toward Germany. (D-Day is often confused with Pearl Harbor: it was the attack on Pearl Harbor on 7 December 1941 that Roosevelt called "a date which will live in infamy" and that brought the US into the war.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-battle-of-midway',
    title: 'What the Battle of Midway Was',
    category: 'World War II',
    keywords: [
      'what was the battle of midway', 'battle of midway 1942', 'who commanded the us fleet at midway', 'admiral nimitz midway',
      'japan lost four carriers midway', 'why was midway a turning point', 'codebreaking midway',
    ],
    content: `The Battle of Midway (4–7 June 1942) was a decisive US naval victory over Japan in the central Pacific, and the turning point of the Pacific War. Japan planned to seize Midway Atoll and ambush the US Pacific Fleet, but American codebreakers had partly cracked the Japanese naval code and knew the plan, so Admiral Chester W. NIMITZ (commander of the Pacific Fleet; task-force commanders were Frank Jack Fletcher and Raymond Spruance) set his own ambush. In a battle fought entirely by carrier aircraft, with the fleets never seeing each other, US dive bombers caught the Japanese carriers with their decks full of fuelled and armed planes: Japan lost four fleet carriers (Akagi, Kaga, Sōryū, Hiryū) and hundreds of its best naval aviators, against one US carrier (Yorktown). Japan never recovered that carrier strength or the initiative, and the US shifted to the offensive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-island-hopping',
    title: 'What the Pacific Island-Hopping Campaign Was',
    category: 'World War II',
    keywords: [
      'what was the pacific island hopping campaign', 'island hopping strategy ww2', 'leapfrogging pacific', 'macarthur nimitz pacific',
      'guadalcanal iwo jima okinawa', 'why did the us bypass japanese islands', 'how did the us advance across the pacific',
    ],
    content: `"Island-hopping" (or "leapfrogging") was the US strategy for advancing across the Pacific toward Japan from 1943 to 1945. Rather than assaulting every Japanese-held island — there were thousands, many heavily fortified — US forces captured only selected islands that were strategically placed and lightly enough defended, used them to build airfields and naval bases, and simply BYPASSED the strong Japanese garrisons, cutting off their supplies and leaving them to "wither on the vine." Two thrusts ran in parallel: Admiral Nimitz's central-Pacific drive through the Gilberts, Marshalls and Marianas (Tarawa, Saipan, Guam), and General MacArthur's south-west Pacific drive up through New Guinea toward the Philippines. Key bloody battles along the way included Guadalcanal (1942–43), Tarawa, Peleliu, Iwo Jima (February 1945) and Okinawa (April–June 1945). Each step brought American bombers closer to the Japanese home islands, and Okinawa put them within easy range — after which the atomic bombs and Soviet entry ended the war before a planned invasion of Japan.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-north-africa-campaign',
    title: 'What the North Africa Campaign Was',
    category: 'World War II',
    keywords: [
      'what was the north africa campaign', 'desert war ww2', 'rommel afrika korps', 'battle of el alamein', 'operation torch',
      'montgomery vs rommel', 'why did the axis fight in north africa',
    ],
    content: `The North African Campaign (June 1940 – May 1943) was the World War II fight for control of North Africa and the Suez Canal between the Allies (Britain and its Commonwealth, later joined by the United States and Free French) and the Axis (Italy, then reinforced by Germany's Afrika Korps under General Erwin Rommel, "the Desert Fox"). It swept back and forth across hundreds of kilometres of Libyan and Egyptian desert, dominated by tanks, supply lines and control of a few ports. The turning point was the Second Battle of El Alamein in Egypt (October–November 1942), where British Eighth Army commander Bernard Montgomery decisively beat Rommel and began pushing the Axis west. At the same time, Operation Torch (November 1942) landed British and American troops in French Morocco and Algeria, squeezing the Axis from the other side. Trapped in Tunisia, the Axis forces surrendered in May 1943 — about 250,000 prisoners taken. Victory secured the Mediterranean and the Suez route and became the springboard for the Allied invasions of Sicily and mainland Italy. (This was not French-vs-British colonial fighting.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ww2-end-europe',
    title: 'How World War II Ended in Europe',
    category: 'World War II',
    keywords: [
      'how did world war 2 end in europe', 'fall of berlin 1945', 'hitler suicide', 'german surrender ve day',
      'battle of berlin', 'why did nazi germany surrender', 'end of the war in europe 1945',
    ],
    content: `By late 1944 Germany was being crushed from two sides: the Western Allies had broken out of Normandy, liberated France and Belgium, and — after turning back Germany's last major offensive at the Battle of the Bulge (December 1944 – January 1945) — crossed the Rhine into Germany in March 1945. From the east, the Soviet Red Army had rolled through Poland and reached the German heartland. In April 1945 the Soviets launched a massive assault on Berlin; as they fought into the ruined city, Adolf Hitler shot himself in his bunker on 30 April. The remaining German leadership, under Admiral Karl Dönitz, sought terms. Germany signed an act of unconditional surrender at Reims on 7 May 1945 (repeated in Berlin on 8 May at Soviet insistence). The war in Europe was declared over on 8 May 1945 — "Victory in Europe Day" (VE Day) — celebrated across the Allied nations. Fighting against Japan continued in the Pacific until Japan's surrender in August–September 1945.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-holocaust-clean',
    title: 'What the Holocaust Was',
    category: 'World War II',
    keywords: [
      'what was the holocaust', 'the final solution', 'wannsee conference', 'how many people died in the holocaust',
      'auschwitz death camps', 'who were the victims of the holocaust', 'when did the holocaust happen',
    ],
    content: `The Holocaust (the Shoah) was the state-organised, systematic murder of about six million European Jews by Nazi Germany and its collaborators between 1941 and 1945, plus roughly five million other victims — Roma, disabled people (killed first, in the "T4" programme), Soviet prisoners of war, Poles and other Slavs, political opponents, Jehovah's Witnesses, and gay men. It escalated in stages: from 1933 the Nazis stripped Jews of rights and citizenship (the Nuremberg Laws, 1935) and drove them into ghettos; after the invasion of the USSR in 1941, mobile killing squads (Einsatzgruppen) shot over a million people; and in January 1942 the Wannsee Conference COORDINATED the "Final Solution" — industrialised killing at extermination camps in occupied Poland (Auschwitz-Birkenau, Treblinka, Sobibor, Belzec, Chelmno, Majdanek), mostly by gas chamber. Victims were deported in cattle trucks, and the camps combined slave labour, starvation and mass murder. It is the defining example of genocide, and after the war led to the Nuremberg trials, the UN Genocide Convention, and the founding of the state of Israel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-battle-of-britain',
    title: 'What the Battle of Britain Was',
    category: 'World War II',
    keywords: [
      'what was the battle of britain', 'battle of britain 1940', 'raf vs luftwaffe', 'operation sea lion',
      'the few churchill', 'the blitz', 'why did germany fail to invade britain',
    ],
    content: `The Battle of Britain (roughly July to October 1940) was the air campaign in which Britain's Royal Air Force (RAF) fought off Nazi Germany's air force, the Luftwaffe — the first major battle fought entirely by air forces. After the fall of France, Hitler planned to invade Britain (Operation Sea Lion) but needed air superiority first. The Luftwaffe attacked airfields, radar stations and aircraft factories, then switched (a costly mistake) to bombing London and other cities ("the Blitz," which continued into 1941). The RAF, though outnumbered, held on thanks to a new integrated radar-and-control system, home-ground advantage (downed pilots could fly again), the Spitfire and Hurricane fighters, and the Luftwaffe's poor intelligence and short-range escorts. By late September, Germany had failed to break the RAF and postponed the invasion indefinitely. It was the first major defeat for Hitler and kept Britain in the war. Churchill's tribute to the pilots: "Never in the field of human conflict was so much owed by so many to so few."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-axis-allies',
    title: 'The Axis and Allied Powers of World War II',
    category: 'World War II',
    keywords: [
      'who were the axis and allied powers', 'axis powers ww2', 'allied powers ww2', 'was the soviet union an ally',
      'the big three ww2', 'which countries fought in world war 2', 'was italy axis or allies',
    ],
    content: `The AXIS powers were the aggressor alliance: Nazi Germany, the Kingdom of Italy, and the Empire of Japan (the "Pact of Steel" / Tripartite Pact), plus co-belligerents Hungary, Romania, Bulgaria, and Finland (which fought the USSR). Italy switched sides in 1943 after Mussolini fell. The ALLIED powers were the coalition against them, led by "the Big Three": the United Kingdom (and its Commonwealth — Canada, Australia, New Zealand, India, South Africa), the Soviet Union, and the United States, together with China (which had been fighting Japan since 1937), Free France, Poland, and dozens of smaller nations. It's a common mistake to leave out the SOVIET UNION — it was a full Allied power from June 1941 and did the overwhelming majority of the fighting and dying against Germany. Note the alliances shifted: the USSR was effectively cooperating with Germany under the 1939 Nazi–Soviet Pact until Germany invaded it in 1941.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dunkirk',
    title: 'What the Dunkirk Evacuation Was',
    category: 'World War II',
    keywords: [
      'what was the dunkirk evacuation', 'operation dynamo', 'the little ships of dunkirk', 'where is dunkirk',
      'how many soldiers were rescued at dunkirk', 'why were the germans stopped at dunkirk', 'miracle of dunkirk',
    ],
    content: `The Dunkirk evacuation (Operation Dynamo, 26 May – 4 June 1940) rescued the bulk of the British Army — and many French troops — from the beaches and harbour of Dunkirk (Dunkerque), a port in northern FRANCE near the Belgian border. After Germany's fast armoured breakthrough in May 1940, the British Expeditionary Force and its French allies were cut off and pinned against the coast. With the port under bombardment, the Royal Navy was joined by a fleet of about 800 civilian "little ships" — fishing boats, pleasure yachts, lifeboats — many crewed by their owners, which could reach the shallow beaches to ferry men out to larger vessels offshore. Around 338,000 Allied soldiers were evacuated, far more than the ~45,000 the government had hoped for, though almost all heavy equipment was abandoned. A German halt order (later much debated) gave the Allies a crucial pause. Britain called it a "miracle," Churchill warned "wars are not won by evacuations," and gave his "we shall fight on the beaches" speech to Parliament days later.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ww2-consequences',
    title: 'The Long-Term Consequences of World War II',
    category: 'World War II',
    keywords: [
      'what were the long term consequences of world war 2', 'aftermath of world war 2', 'how did ww2 change the world',
      'iron curtain division of europe', 'creation of the united nations', 'ww2 and the atomic age', 'superpowers after ww2',
    ],
    content: `World War II killed an estimated 70–85 million people (about 3% of the world's population) and reshaped the world. Politically: the United States and the Soviet Union emerged as rival superpowers, and Europe was divided by the "Iron Curtain" into a US-aligned West and a Soviet-controlled Communist East — the start of the Cold War, NATO (1949) and the Warsaw Pact. Germany and its capital were split; Japan was occupied and rebuilt as a pacifist democracy. Institutionally: the United Nations was founded (1945) to prevent another world war, along with the World Bank and IMF (Bretton Woods) and, in 1948, the Universal Declaration of Human Rights; the Nuremberg trials established that "following orders" is no defence for atrocities. The Holocaust drove the creation of the state of Israel (1948). The exhaustion of the European empires accelerated decolonisation across Asia and Africa. The atomic bombings opened the nuclear age and the balance of "mutually assured destruction." The Marshall Plan rebuilt Western Europe, and Franco-German reconciliation began the process that became the European Union.`,
    createdAt: Date.now(),
  },
];
