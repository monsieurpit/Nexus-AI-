import { KnowledgeItem } from '../../types';

export const TECHNOLOGY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-tech-semiconductor-moore-law',
    title: "Semiconductor Technology and Moore's Law",
    category: 'Technology',
    keywords: ['semiconductor', 'transistor', "Moore's law", 'silicon', 'chip', 'integrated circuit', 'CPU', 'GPU', 'memory', 'nanotechnology'],
    content: `Modern electronics rest on semiconductors — materials like silicon with electrical conductivity between conductors and insulators. By adding impurities (doping), engineers create n-type (electron-rich) and p-type (hole-rich) regions. A p-n junction forms a diode — allowing current in one direction. The transistor (invented at Bell Labs in 1947 by Bardeen, Brattain, and Shockley) amplifies or switches signals. Integrated circuits (ICs, 'chips') pack millions then billions of transistors onto a tiny silicon die. Gordon Moore observed in 1965 that transistor density doubles approximately every two years (Moore's Law), driving exponential growth in computing power while costs fall. Today, the most advanced chips (TSMC, Samsung, Intel) use 3–5 nm process nodes with tens of billions of transistors. GPUs (Graphics Processing Units) contain thousands of cores for parallel computation, enabling AI and graphics. Memory chips (DRAM, NAND flash) store data. Physical limits are approaching (quantum tunnelling, heat), driving research into 3D chip stacking, silicon photonics, quantum computing, and neuromorphic computing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-tech-renewable-energy-solar-wind',
    title: 'Renewable Energy: Solar, Wind, and Beyond',
    category: 'Technology',
    keywords: ['renewable energy', 'solar', 'wind', 'hydroelectric', 'battery', 'climate', 'green hydrogen', 'photovoltaic', 'turbine'],
    content: `Renewable energy comes from naturally replenishing sources that produce little or no greenhouse gas. Solar photovoltaic (PV) panels convert sunlight directly to electricity using the photovoltaic effect in semiconductor cells; silicon solar cells reach ~20–25% efficiency commercially. Concentrated solar power (CSP) uses mirrors to focus heat onto a fluid, driving steam turbines. Wind turbines extract kinetic energy from moving air; modern offshore turbines exceed 14 MW. Hydroelectric power generates electricity from falling water, currently the largest renewable source globally. Geothermal energy taps Earth's internal heat (volcanically active regions). Tidal and wave energy are emerging technologies. Bioenergy uses organic matter but has land-use and CO₂ trade-offs. The key challenge is intermittency — sun and wind don't always produce when demand is high. Grid-scale batteries (lithium-ion, solid-state), pumped hydro, green hydrogen (electrolysis using renewable electricity), and smart grids address this. Solar and wind costs have fallen >90% in a decade, making them the cheapest electricity sources in history. The transition to clean energy is essential to limit climate change.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-tech-internet-world-wide-web',
    title: 'The Internet and the World Wide Web',
    category: 'Technology',
    keywords: ['internet', 'World Wide Web', 'HTTP', 'HTML', 'Berners-Lee', 'browser', 'ARPANET', 'cloud computing', 'social media'],
    content: `The internet evolved from ARPANET, a US Defense Department network that sent its first message in 1969. TCP/IP (developed by Vint Cerf and Bob Kahn) became the standard protocol, enabling different networks to interconnect. By the 1980s, universities and research labs were connected. Tim Berners-Lee invented the World Wide Web in 1989 at CERN: HTML for structuring documents, HTTP for transferring them, and URLs for addressing them. The first web browser (WorldWideWeb) and first website appeared in 1991. Mosaic (1993) was the first graphical browser; Netscape Navigator popularised the web commercially. By the early 2000s, the dot-com boom and bust reshaped the economy. Web 2.0 brought social media (Facebook 2004, Twitter 2006, YouTube 2005) and user-generated content. Smartphones made the web ubiquitous. Cloud computing (AWS, Azure, Google Cloud) moved computing from local hardware to remote data centres. The modern web uses HTTPS for security, REST APIs for services, and JavaScript frameworks (React, Vue) for dynamic UIs. Today, ~5.4 billion people use the internet. Challenges include privacy, misinformation, digital divide, and concentration of platform power.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-tech-quantum-computing',
    title: 'Quantum Computing',
    category: 'Technology',
    keywords: ['quantum computing', 'qubit', 'superposition', 'entanglement', 'Shor', 'Grover', 'decoherence', 'IBM', 'Google', 'cryptography'],
    content: `Quantum computing harnesses quantum mechanical phenomena to perform computations impossible or impractical for classical computers. Classical computers use bits (0 or 1); quantum computers use qubits, which can be in a superposition of 0 and 1 simultaneously. Entanglement links qubits so the state of one depends on the state of others, enabling massive parallelism. Quantum interference is used to amplify correct answers and cancel wrong ones. Quantum gates (analogous to classical logic gates) manipulate qubits. Key quantum algorithms: Shor's algorithm factors large numbers exponentially faster than any known classical algorithm — threatening RSA encryption. Grover's algorithm searches unsorted databases with a quadratic speedup (O(√N) vs O(N)). Quantum simulation could model molecular behaviour for drug discovery and materials science. Physical implementations use superconducting qubits (Google, IBM), trapped ions (IonQ), and photonic systems. The challenge is decoherence — qubits lose their quantum state through environmental interactions. Google claimed 'quantum supremacy' in 2019 (a calculation in 200 seconds vs. 10,000 years for classical). Practical general-purpose quantum computers likely remain 10–20+ years away.`,
    createdAt: Date.now(),
  },
];
