import { KnowledgeItem } from '../../types';

// Batch 100 (cryptography basics). The crypto corpus was already fairly good
// (symmetric/asymmetric, AES, RSA, hashing, salt, PKI, CAs, block/stream all
// fine). Real misses on nexus-4b: "key stretching" was answered about calf and
// hamstring stretches; "encoding vs encryption vs hashing" never defined
// encoding; "Diffie-Hellman" said the parties "multiply by their private
// number" (it is modular exponentiation); "rainbow table attack" never said
// what a rainbow table is; "nonce", "perfect forward secrecy", "HMAC",
// "quantum cryptography" and "steganography" were muddled or raw web dumps.
export const CRYPTOGRAPHY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-key-stretching',
    title: 'What Key Stretching Is',
    category: 'Cryptography',
    keywords: [
      'what is key stretching', 'key stretching make a weak password harder to attack slow iterated function', 'pbkdf2 bcrypt scrypt argon2 thousands to millions of iterations',
      'key stretching raises the cost of each brute force guess', 'password based key derivation function turns a fast hash into a slow one', 'key stretching is not physical stretching exercises',
    ],
    content: `Key stretching is a technique for making a low-entropy secret — almost always a human-chosen password — much more expensive to attack. Instead of hashing the password once, a password-based key derivation function (PBKDF2, bcrypt, scrypt, or Argon2) runs it through an iterated, deliberately slow process tens of thousands to millions of times, and often forces the attacker to use a large amount of memory as well. The legitimate user only pays this cost once per login (tuned to roughly 100 milliseconds), but an attacker trying billions of guesses against a stolen password database has that cost multiplied by every guess, turning a crack that would take hours into one that takes years. Key stretching is normally combined with a per-password salt. (This is a cryptography concept and has nothing to do with calf, hamstring, or shoulder stretches.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-encoding-vs-encryption-vs-hashing',
    title: 'Encoding vs Encryption vs Hashing',
    category: 'Cryptography',
    keywords: [
      'what is the difference between encoding encryption and hashing', 'encoding base64 url encoding reversible no key no security', 'encryption reversible only with a key confidentiality',
      'hashing one way no key integrity fingerprint', 'base64 is not encryption common mistake', 'when to use encoding vs encryption vs hashing',
    ],
    content: `These three transform data but for completely different purposes. ENCODING (Base64, URL-encoding, hex, ASCII, UTF-8) converts data into another representation so it can be transported or stored safely — for example turning binary into text that survives an email system. It uses no key, provides no security whatsoever, and anyone can reverse it instantly. Treating Base64 as if it hides anything is a classic mistake. ENCRYPTION scrambles data so that only someone with the correct key can recover it; its purpose is confidentiality, and it is reversible only with that key (AES with a shared key, RSA with a private key). HASHING runs data through a one-way function (SHA-256) to produce a fixed-size digest; there is no key and it cannot be reversed, so it is used for integrity checks, fingerprinting, and — with salting and key stretching — password storage. Quick test: no key and reversible by anyone = encoding; key required = encryption; one-way = hashing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-diffie-hellman-detail',
    title: 'How the Diffie-Hellman Key Exchange Works',
    category: 'Cryptography',
    keywords: [
      'what is the diffie-hellman key exchange', 'diffie hellman shared secret over an insecure channel modular exponentiation', 'public prime p generator g each party picks a secret exponent',
      'both parties compute g to the ab mod p eavesdropper cannot due to discrete logarithm problem', 'ephemeral diffie hellman dhe ecdhe forward secrecy', 'diffie hellman does not authenticate needs signatures or certificates',
    ],
    content: `Diffie-Hellman lets two parties agree on a shared secret over a channel that an eavesdropper is watching, without ever sending the secret itself. They agree publicly on a large prime p and a generator g. Each party privately picks a secret number (an exponent): Alice picks a, Bob picks b. Alice sends g^a mod p, Bob sends g^b mod p — these can be seen by anyone. Alice then raises Bob's value to her secret, (g^b)^a mod p; Bob raises Alice's value to his secret, (g^a)^b mod p. Both arrive at the same value, g^(ab) mod p, which becomes the shared key. An eavesdropper who saw g, p, g^a and g^b still cannot compute g^(ab) because recovering a or b from g^a mod p is the discrete logarithm problem, which is computationally infeasible for large p. In practice the secrets are generated fresh for every session (ephemeral Diffie-Hellman, DHE or its elliptic-curve form ECDHE), which is what gives TLS its forward secrecy. Diffie-Hellman by itself does not authenticate the other party, so it must be combined with signatures or certificates to stop a man-in-the-middle.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rainbow-table',
    title: 'What a Rainbow Table Attack Is',
    category: 'Cryptography',
    keywords: [
      'what is a rainbow table attack', 'rainbow table precomputed table mapping hashes back to plaintext passwords', 'time memory tradeoff reduction chains',
      'attacker with a stolen unsalted hash database looks up passwords instantly', 'salting defeats rainbow tables each hash is unique', 'slow hashes also defeat rainbow tables',
    ],
    content: `A rainbow table is a large precomputed structure that maps password hashes back to the passwords that produced them. Rather than storing every hash (which would be enormous), it uses a time-memory trade-off: it stores only the start and end of long "reduction chains" of alternating hashing and reduction steps, so a modest table can cover a huge keyspace at the cost of some computation per lookup. In a rainbow table attack, someone who has stolen a database of password hashes looks each hash up in the table and recovers the original password almost instantly, skipping the work of brute-forcing. Two standard defenses make rainbow tables useless: a unique random salt per password (the attacker would need a separate table for every salt value, which is infeasible), and a deliberately slow key-stretching hash (bcrypt, Argon2), which makes building the table impractically expensive.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nonce-crypto',
    title: 'What a Nonce Is (Cryptography)',
    category: 'Cryptography',
    keywords: [
      'what is a nonce in cryptography', 'nonce number used once must never repeat for a given key', 'nonce initialization vector in ctr and gcm modes reuse is catastrophic',
      'nonce prevents replay attacks challenge response authentication', 'nonce does not need to be secret can be a counter or random', 'nonce in proof of work bitcoin mining',
    ],
    content: `A nonce is a "number used once" — a value fed into a cryptographic operation that must never repeat for a given key. Nonces do not have to be secret and are often just a counter or a random value. Their uses: as the initialization vector in block-cipher modes such as CTR and GCM, where reusing a nonce with the same key is catastrophic (it can leak the plaintext and, for GCM, the authentication key); in challenge-response authentication, where a server sends a fresh nonce the client must incorporate into its reply so an old reply cannot be replayed; in network protocols to reject replayed messages generally; and in proof-of-work systems like Bitcoin mining, where miners vary a nonce until the block hash meets the difficulty target. The essential rule is uniqueness per key, not randomness or secrecy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perfect-forward-secrecy',
    title: 'What Perfect Forward Secrecy Is',
    category: 'Cryptography',
    keywords: [
      'what is perfect forward secrecy', 'forward secrecy each session uses a fresh ephemeral key discarded afterwards', 'stealing the server long term private key later does not decrypt past recorded sessions',
      'achieved with ephemeral diffie hellman dhe ecdhe', 'defends against store now decrypt later', 'rsa key exchange without pfs a stolen key decrypts all past traffic',
    ],
    content: `Forward secrecy (also called perfect forward secrecy) is a property of a key-exchange protocol whereby each communication session is protected by a temporary key that is generated fresh and thrown away when the session ends. Because the session key is never derived directly from a long-lived secret, an attacker who records encrypted traffic today and later manages to steal the server's long-term private key still cannot decrypt those past sessions. It is achieved by doing the key agreement with ephemeral Diffie-Hellman (DHE or ECDHE) — a new random exponent per connection — instead of, for example, encrypting a session key with the server's static RSA key (where one stolen key exposes all past and future traffic). Forward secrecy is the main defense against "harvest now, decrypt later" attacks and is mandatory in TLS 1.3.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hmac',
    title: 'What HMAC Is',
    category: 'Cryptography',
    keywords: [
      'what is hmac', 'hmac message authentication code from a hash function and a secret key', 'hmac verifies integrity and authenticity receiver shares the key',
      'hmac nested construction protects against length extension attacks', 'hmac sha256 used in api request signing jwt tls', 'mac is not a signature symmetric key both sides',
    ],
    content: `HMAC (Hash-based Message Authentication Code) is a way to attach a tag to a message so that a recipient who shares a secret key can confirm the message really came from someone with that key and has not been altered. It is computed as HMAC(K, m) = H((K XOR opad) || H((K XOR ipad) || m)), where H is a hash such as SHA-256 and ipad/opad are fixed padding constants. That nested, double-hash construction is deliberate: it prevents length-extension attacks, which a naive tag of H(K || m) would be vulnerable to. HMAC is symmetric — both sides hold the same key — so unlike a digital signature it does not provide non-repudiation, but it is fast and widely used: signing API requests, the integrity portion of older TLS cipher suites, JWT ("HS256"), and derivation steps inside protocols like TLS 1.3 and Signal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-digital-signature-detail',
    title: 'How a Digital Signature Works',
    category: 'Cryptography',
    keywords: [
      'what is a digital signature', 'digital signature sign a hash of the message with your private key', 'verify by checking the signature against the signer public key and your own hash',
      'digital signature provides authenticity integrity and non-repudiation', 'signing uses the private key the opposite direction from encryption', 'rsa signatures ecdsa ed25519',
    ],
    content: `A digital signature proves who created a message and that it has not been changed. To sign, the sender computes a cryptographic hash of the message and then transforms that hash with their own PRIVATE key (for RSA this is loosely "encrypting the hash with the private key"; ECDSA and Ed25519 use a related but different operation). The resulting value is the signature, sent alongside the message. To verify, anyone uses the sender's PUBLIC key on the signature to recover the hash, independently hashes the received message, and checks that the two hashes match. A match guarantees three things: authenticity (only the holder of the private key could have produced a signature that verifies against the matching public key), integrity (any modification of the message changes its hash and breaks the match), and non-repudiation (the signer cannot plausibly deny it, since no one else has the private key). Note the direction: encryption for confidentiality uses the recipient's public key, whereas signing uses the sender's private key.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-quantum-cryptography',
    title: 'Quantum Cryptography vs Post-Quantum Cryptography',
    category: 'Cryptography',
    keywords: [
      'what is quantum cryptography', 'quantum key distribution qkd bb84 photon polarization eavesdropping disturbs the state and is detected',
      'post-quantum cryptography classical algorithms designed to resist quantum computers', 'shor algorithm breaks rsa and ecc grover weakens symmetric', 'lattice based kyber ml-kem hash based signatures',
      'qkd needs special hardware and fiber pqc is a software drop in replacement',
    ],
    content: `Two different things are often confused here. QUANTUM KEY DISTRIBUTION (QKD) uses the laws of quantum mechanics to share a key: in schemes like BB84, bits are encoded on the polarization of individual photons, and because measuring a quantum state unavoidably disturbs it, any eavesdropper introduces detectable errors, letting the two parties know the channel was compromised. QKD needs dedicated hardware and a direct optical link and is used only in niche high-security settings. POST-QUANTUM CRYPTOGRAPHY (PQC) is the mainstream concern: it is ordinary software-based cryptography built on math problems believed to be hard even for a large quantum computer. This matters because Shor's algorithm, run on a sufficiently powerful quantum computer, would break RSA and elliptic-curve cryptography outright (Grover's algorithm only halves the effective strength of symmetric ciphers, fixed by doubling key size). NIST has standardized replacements — the lattice-based ML-KEM (Kyber) for key exchange and ML-DSA (Dilithium) plus hash-based SLH-DSA for signatures — and deployment across TLS and messaging apps is underway.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-steganography',
    title: 'What Steganography Is',
    category: 'Cryptography',
    keywords: [
      'what is steganography', 'steganography hiding the existence of a message inside another file or object', 'least significant bit encoding in an image invisible to inspection',
      'steganography hides that communication is happening cryptography hides only the content', 'cover text carrier file hidden payload', 'steganography combined with encryption for defense in depth',
    ],
    content: `Steganography is the practice of hiding a message inside another, ordinary-looking object so that an observer does not realize any secret communication is taking place at all. A common digital method is least-significant-bit encoding: the low bit of each color value in an image (or sample in an audio file) is replaced with a bit of the hidden payload, changing the picture too slightly for a human to notice. The message can also be concealed in the whitespace of a document, in the metadata of a file, or in the word choices of an innocuous-looking text ("cover text"). The key contrast with cryptography: encryption scrambles the content of a message but makes it obvious that a secret exists, whereas steganography conceals the very existence of the message but does nothing to protect it if found. The two are often used together — encrypt the payload, then hide it — so that even discovery of the carrier does not reveal the contents.`,
    createdAt: Date.now(),
  },
];
