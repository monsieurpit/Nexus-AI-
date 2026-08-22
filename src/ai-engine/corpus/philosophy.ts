import { KnowledgeItem } from '../../types';

export const PHILOSOPHY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-philosophy-ancient-greek',
    title: 'Ancient Greek Philosophy',
    category: 'Philosophy',
    keywords: ['philosophy', 'Socrates', 'Plato', 'Aristotle', 'Stoicism', 'ethics', 'Greece', 'reason', 'logic', 'Forms'],
    content: `Greek philosophy sought rational explanations for the cosmos and human life. Pre-Socratics asked about the fundamental nature of reality: Thales proposed water, Heraclitus emphasised change ("you cannot step into the same river twice"), Democritus proposed atoms. Pythagoras founded a school linking mathematics to the cosmos. Socrates (469–399 BCE) redirected philosophy to ethics and epistemology, using the dialectical method to expose contradictions. He was executed for impiety and corrupting youth; Plato immortalised him in dialogues. Plato (428–348 BCE) proposed the theory of Forms: abstract, eternal Forms (like the Form of Beauty) are more real than physical objects, which are imperfect copies. His Republic outlines an ideal state ruled by philosopher-kings. Aristotle (384–322 BCE) rejected Forms and emphasised empirical observation. He systematised logic, developed the syllogism, classified biology, and wrote on ethics (Nicomachean Ethics: the good life is eudaimonia — flourishing through virtue). Stoics (Zeno, Epictetus, Marcus Aurelius) taught equanimity through virtue and acceptance. Epicureans sought pleasure through moderation and friendship.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-philosophy-ethics-moral',
    title: 'Ethics: Moral Philosophy and Major Theories',
    category: 'Philosophy',
    keywords: ['ethics', 'morality', 'utilitarianism', 'Kant', 'deontology', 'virtue ethics', 'Mill', 'Rawls', 'philosophy'],
    content: `Ethics is the philosophical study of morality — what is right, wrong, good, and evil. Major normative theories provide different frameworks. Consequentialism (utilitarianism) judges actions by their outcomes: the right action maximises overall well-being. John Stuart Mill defined utility as happiness; Jeremy Bentham quantified it with the hedonic calculus. Deontological ethics (Kant) judges actions by adherence to rules or duties regardless of consequences. Kant's categorical imperative: act only according to maxims you could will to be universal laws; treat persons as ends in themselves, never merely as means. Virtue ethics (Aristotle) focuses on character: what kind of person should I be? Virtues like courage, honesty, and justice, developed through habit, lead to eudaimonia (flourishing). Contractarianism (Hobbes, Locke, Rousseau, Rawls) bases morality on hypothetical social contracts. Rawls's veil of ignorance: design society without knowing your position in it — ensuring fairness. Applied ethics examines specific issues: bioethics (end-of-life, consent), environmental ethics, business ethics, and AI ethics. Meta-ethics asks what moral statements mean and whether objective moral facts exist.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-philosophy-epistemology',
    title: 'Epistemology: Theory of Knowledge',
    category: 'Philosophy',
    keywords: ['epistemology', 'knowledge', 'Descartes', 'Kant', 'empiricism', 'rationalism', 'Locke', 'Hume', 'truth', 'philosophy'],
    content: `Epistemology asks: what is knowledge, what can we know, and how do we know it? The classical definition is 'justified true belief' (Plato's Meno/Theaetetus). Edmund Gettier (1963) showed this is insufficient with counterexamples — raising the Gettier problem. Rationalism holds that reason is the primary source of knowledge; Descartes, Leibniz, and Spinoza are key rationalists. Descartes' method of radical doubt strips away all possibly-false beliefs; cogito ergo sum ('I think, therefore I am') is his unshakeable foundation. Empiricism holds that all knowledge comes from sensory experience: Locke (mind as tabula rasa — blank slate), Berkeley (esse est percipi — to be is to be perceived), and Hume (scepticism about causation and induction). Kant synthesised both: the mind actively structures experience through categories (space, time, causality). We know phenomena (things as they appear) but not noumena (things in themselves). Scepticism doubts knowledge is possible. Pragmatism (James, Peirce, Dewey) defines truth as what works in practice. Epistemology underpins scientific methodology and debates about AI and consciousness.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-philosophy-mind-consciousness',
    title: 'Philosophy of Mind and Consciousness',
    category: 'Philosophy',
    keywords: ['philosophy of mind', 'consciousness', 'qualia', 'Chalmers', 'Descartes', 'dualism', 'free will', 'brain', 'functionalism'],
    content: `The philosophy of mind investigates the nature of mental states, consciousness, and the relationship between mind and body. The mind-body problem asks how mental states relate to physical brain states. Substance dualism (Descartes) holds that mind and body are distinct substances — but how they interact is puzzling. Physicalism (materialism) holds that mental states are identical to or realised by physical brain states. Functionalism defines mental states by their functional roles — inputs, outputs, and relations to other states — not the physical medium, enabling the possibility of machine minds. The 'hard problem' of consciousness (David Chalmers) asks why and how physical processes give rise to subjective experience (qualia) — the redness of red, the pain of pain. This seems unexplained even by complete knowledge of brain function. The philosophical zombie thought experiment imagines a being physically identical to a human but with no subjective experience. Free will debates ask whether our choices are determined by prior causes. Eliminative materialism (Churchland) argues folk psychology concepts like 'belief' and 'desire' are ultimately fictional.`,
    createdAt: Date.now(),
  },
];
