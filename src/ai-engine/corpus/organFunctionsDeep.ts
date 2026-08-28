import { KnowledgeItem } from '../../types';

export const ORGAN_FUNCTIONS_DEEP_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-organs-kidneys',
    title: 'How the Kidneys Function in the Body',
    category: 'human-biology',
    keywords: ['what do kidneys do', 'kidney function explained', 'how do kidneys filter blood', 'kidney disease dialysis'],
    content: `The **kidneys** are two bean-shaped organs located toward the back of the abdomen, whose primary job is filtering waste products, excess fluid, and toxins out of the blood, producing urine as a result. Each kidney contains roughly a million tiny filtering units called nephrons, which together filter the body's entire blood supply many times over each day, removing metabolic waste products (like urea, a byproduct of protein breakdown), balancing electrolyte levels (sodium, potassium, calcium), and precisely regulating the body's fluid balance and blood pressure. Beyond filtration, kidneys perform several other essential functions: they produce a hormone called erythropoietin that signals bone marrow to produce red blood cells, they activate vitamin D into its usable form (important for calcium absorption and bone health), and they help regulate blood pressure partly through a hormone system called the renin-angiotensin-aldosterone system. When kidney function declines significantly — due to conditions like uncontrolled diabetes or high blood pressure, the two leading causes of chronic kidney disease — waste products and fluid can dangerously build up in the body, and in severe cases patients require **dialysis** (a medical procedure that mechanically filters the blood, mimicking kidney function) or a kidney transplant to survive. The body can generally function normally with just one healthy kidney, which is why living kidney donation between compatible donors and recipients is medically possible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-organs-pancreas',
    title: 'How the Pancreas Functions in the Body',
    category: 'human-biology',
    keywords: ['what does the pancreas do', 'pancreas function insulin', 'pancreas digestive enzymes', 'pancreatitis explained'],
    content: `The **pancreas** is a long, flat gland located behind the stomach that performs two very different but essential jobs, functioning as both an "exocrine" and "endocrine" organ. As an **exocrine gland**, it produces digestive enzymes — including ones that break down proteins, fats, and carbohydrates — which it releases into the small intestine via a duct to continue digesting food after it leaves the stomach; without these enzymes, the body couldn't properly absorb nutrients from food. As an **endocrine gland**, specialized clusters of cells called the islets of Langerhans produce and release critical hormones directly into the bloodstream, most importantly **insulin** (which lowers blood sugar by signaling cells throughout the body to absorb glucose from the blood for energy or storage) and **glucagon** (which raises blood sugar by signaling the liver to release stored glucose when levels run low) — together, these two hormones keep blood sugar levels within a tight, healthy range. When the pancreas fails to produce enough insulin, or the body's cells stop responding to it properly, the result is **diabetes** (type 1 involves the immune system destroying insulin-producing cells, usually starting in childhood or young adulthood; type 2, far more common, typically develops when cells become resistant to insulin's effects, often linked to excess body weight and other lifestyle factors). **Pancreatitis**, inflammation of the pancreas, can occur from causes including heavy alcohol use or gallstones blocking the pancreatic duct, causing digestive enzymes to begin damaging the pancreas itself rather than just food in the intestine.`,
    createdAt: Date.now(),
  },
];
