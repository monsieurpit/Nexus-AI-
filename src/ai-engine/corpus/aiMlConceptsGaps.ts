import { KnowledgeItem } from '../../types';

// Batch 73 (AI & machine-learning concepts). Strong category. Real misses on
// nexus-4b: "what is overfitting" and "what is backpropagation" were raw web
// dumps (the latter mixed in the neuroscience meaning of "neural
// backpropagation"); "what is a decision tree" said it "uses algorithms like
// linear regression to split data" (it does not).
export const AI_ML_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-overfitting',
    title: 'What Overfitting Is',
    category: 'AI',
    keywords: [
      'what is overfitting', 'overfitting vs underfitting', 'model memorizes training data', 'why does validation accuracy drop',
      'how to prevent overfitting', 'regularization dropout early stopping', 'generalization machine learning',
    ],
    content: `Overfitting is when a machine-learning model learns its training data too well — including the random noise, outliers and quirks specific to that particular dataset — so it performs excellently on data it has already seen but poorly on new, unseen data. The model has effectively memorised the examples instead of learning the underlying pattern that would generalise. The classic sign during training: accuracy (or loss) on the training set keeps improving while accuracy on a held-out validation set plateaus and then gets worse. Common causes are a model with too many parameters relative to the amount of data, training for too long, or too little / unrepresentative data. Countermeasures include getting more and more varied training data, using a simpler model, regularisation (penalising large weights), dropout (randomly disabling neurons during training), early stopping (halting when validation performance turns), data augmentation, and cross-validation. The opposite failure is underfitting — a model too simple to capture the real pattern, doing poorly on both training and new data.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-backpropagation',
    title: 'What Backpropagation Is',
    category: 'AI',
    keywords: [
      'what is backpropagation', 'how do neural networks learn', 'chain rule neural network training', 'gradient of the loss',
      'backprop weight updates', 'forward pass backward pass', 'backpropagation vs gradient descent',
    ],
    content: `Backpropagation ("backward propagation of errors") is the algorithm that makes training a neural network practical. In machine learning it has nothing to do with the neuroscience idea of a signal travelling back up a biological neuron's dendrites. It works in two passes per batch of training data. Forward pass: the input is run through the network to produce an output, and a loss function measures how wrong that output is compared to the correct answer. Backward pass: starting from the loss and moving layer by layer back toward the input, backpropagation uses the chain rule of calculus to compute the gradient — how much each individual weight in the network contributed to the error. Those gradients are then handed to an optimiser (gradient descent or a variant like Adam), which nudges every weight a small step in the direction that reduces the loss. Repeating this over millions of examples is how the network gradually learns. Backpropagation computes the gradients; gradient descent uses them to update the weights.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-decision-tree',
    title: 'What a Decision Tree Is (Machine Learning)',
    category: 'AI',
    keywords: [
      'what is a decision tree', 'how does a decision tree split data', 'gini impurity information gain', 'decision tree classification regression',
      'random forest gradient boosting', 'why do decision trees overfit', 'is a decision tree interpretable',
    ],
    content: `A decision tree is a machine-learning model that makes predictions by asking a sequence of simple yes/no questions about the input's features, like a flowchart. It does NOT use linear regression to make its splits. At each node, the training algorithm searches all features and threshold values to find the split that best separates the outcomes — measured by criteria such as Gini impurity or information gain (entropy reduction) for classification, or variance reduction for regression. It keeps splitting until the branches are pure enough or a stopping rule (max depth, minimum samples per leaf) is hit; each leaf then holds a prediction (a class, or an average value). Decision trees are easy to interpret and visualise and need little data preprocessing, but a single deep tree overfits badly. In practice they are usually combined: a random forest averages many trees each trained on random subsets of data and features, and gradient boosting builds trees in sequence where each corrects the previous one's errors — these ensembles are among the strongest models for tabular data.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cnn',
    title: 'What a Convolutional Neural Network Is',
    category: 'AI',
    keywords: [
      'what is a convolutional neural network', 'how does a cnn work', 'convolution filter kernel feature map', 'pooling layer downsampling',
      'why are cnns good at images', 'weight sharing translation invariance cnn', 'cnn edges shapes objects hierarchy',
    ],
    content: `A convolutional neural network (CNN) is a type of neural network designed for data with a grid structure, above all images. Its key layer is the convolutional layer: instead of connecting every input pixel to every neuron, it slides a small set of learnable filters (kernels) across the image, and each filter fires where it detects a particular local pattern — an edge, a colour blob, a texture. Stacking these layers builds a hierarchy: early layers detect edges and corners, middle layers combine them into shapes and parts, later layers recognise whole objects. Pooling layers periodically shrink the feature maps, making the representation smaller and more tolerant of small shifts. Two properties make CNNs efficient and effective on images: weight sharing (the same filter is reused across the whole image, so far fewer parameters than a fully connected network) and translation tolerance (an object is recognised wherever it appears). CNNs powered the deep-learning breakthrough in image classification around 2012 and are used for object detection, medical imaging, and also audio and some text tasks, though transformers now rival them in vision.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-embedding',
    title: 'What an Embedding Is',
    category: 'AI',
    keywords: [
      'what is an embedding', 'vector representation of words', 'word2vec king queen analogy', 'semantic similarity vectors',
      'sentence embedding search', 'embedding space distance meaning', 'embeddings for recommendations and rag',
    ],
    content: `An embedding is a way of representing something — a word, a sentence, an image, a product, a user — as a list of numbers (a vector), typically a few hundred to a few thousand values long. The vectors are learned so that items with similar meaning or behaviour end up close together in the vector space, and unrelated items end up far apart. Geometry then encodes relationships: in classic word embeddings, the vector for "king" minus "man" plus "woman" lands near "queen." Because similarity becomes a simple distance calculation, embeddings power semantic search (find documents about the same topic even with no shared keywords), recommendation systems (users and items near each other), clustering, deduplication, and retrieval-augmented generation, where a question is embedded and the nearest stored text chunks are pulled in as context for a language model. Inside a transformer, the first step is turning each token into an embedding vector that the rest of the network operates on.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-machine-learning',
    title: 'What Machine Learning Is',
    category: 'AI',
    keywords: [
      'what is machine learning', 'machine learning vs traditional programming', 'learn from data not explicit rules',
      'supervised unsupervised reinforcement learning', 'what is a model in machine learning', 'training and inference',
    ],
    content: `Machine learning is the branch of artificial intelligence in which a system improves at a task by finding patterns in data, rather than being given explicit step-by-step rules by a programmer. Instead of a human writing "if the email contains X, mark it spam," you show the system thousands of emails already labelled spam or not-spam, and it works out the pattern itself, producing a "model" — a set of learned parameters — that can then classify new emails. There are three broad kinds: supervised learning (learn from labelled input-output examples: classification and regression), unsupervised learning (find structure in unlabelled data: clustering, dimensionality reduction), and reinforcement learning (an agent learns by trial and error from rewards and penalties). The two phases are training (fitting the model to data, computationally expensive) and inference (using the trained model on new inputs). Deep learning is the subfield using many-layered neural networks, which now dominates vision, speech and language.`,
    createdAt: Date.now(),
  },
];
