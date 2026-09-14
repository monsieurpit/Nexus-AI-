import { KnowledgeItem } from '../../types';

// Batch 280 corpus fixes — tech/computing topics. 7/25 misses, mostly the "answered only half the
// comparison" pattern (Bluetooth without ever explaining WiFi, lossy compression without lossless,
// bug without glitch, AR without VR), one complete topic dodge (hacker/cracker answered with
// hacker-culture trivia and never mentioned "cracker" at all), and one backwards relationship
// (phishing/spoofing had which one is the broader term inverted).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'technology',
  keywords,
  content,
  createdAt: now,
});

export const TECH_COMPUTING_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-tech-bluetooth-vs-wifi',
    'Bluetooth vs WiFi',
    ['bluetooth', 'wifi', 'difference bluetooth wifi'],
    "Bluetooth connects two devices directly to each other over a short range (typically up to about 10 meters) to exchange small amounts of data at relatively low bandwidth, using very little power — ideal for things like wireless earbuds, a mouse, or a smartwatch. WiFi connects a device to a broader local network (usually through a router) and back out to the internet, over a much longer range (a whole house or office), with far higher bandwidth for things like streaming video or downloading large files — but it uses noticeably more power than Bluetooth. In short: Bluetooth is for short-range, low-power, low-bandwidth connections between two nearby devices; WiFi is for longer-range, higher-bandwidth network/internet connections that can support many devices at once.",
  ),
  k(
    'kb-gap-tech-lossless-vs-lossy',
    'Lossless vs lossy compression',
    ['lossless compression', 'lossy compression', 'difference lossless lossy'],
    "Lossy compression (like JPEG for photos, or MP3 for audio) permanently throws away some data to make the file much smaller — it's designed so the loss is hard to notice for most photos or music, but the original, exact data can never be perfectly restored once compressed, and quality can degrade further with repeated saves. Lossless compression (like PNG for images, FLAC for audio, or ZIP for any file) shrinks a file WITHOUT losing any data at all — when you decompress it, you get back the exact original file, bit for bit, with zero quality loss, though the file size reduction is usually much smaller than what lossy compression achieves. The trade-off: lossy gives you much smaller files at the cost of some permanently lost detail; lossless preserves everything perfectly but doesn't shrink the file nearly as much.",
  ),
  k(
    'kb-gap-tech-bug-vs-glitch',
    'Bug vs glitch',
    ['bug', 'glitch', 'difference bug glitch'],
    "A bug is a flaw in the actual CODE of a program — a mistake a developer made that causes the software to behave incorrectly or crash, and it happens reliably/repeatably every time the same conditions are triggered (since it's baked into the code itself). A glitch is a more general, often TEMPORARY or hard-to-reproduce malfunction — it might be caused by a bug, but it can also come from hardware issues, timing problems, or momentary system hiccups, and it doesn't always happen consistently the same way twice. In casual use, 'glitch' often implies something small, weird, or funny-looking (like a character's arm clipping through a wall in a video game for a split second), while 'bug' is the more formal, technical term developers use for a defect they need to actually track down and fix in the code.",
  ),
  k(
    'kb-gap-tech-hacker-vs-cracker',
    'Hacker vs cracker',
    ['hacker', 'cracker', 'difference hacker cracker'],
    "In the original, more technical sense, a hacker is simply someone who enjoys deeply understanding and creatively exploring computer systems — pushing them beyond their intended limits out of curiosity, skill, or a love of clever problem-solving, not necessarily with any malicious intent (this is where terms like 'white hat hacker' and 'ethical hacker' come from). A cracker specifically refers to someone who breaks into computer systems, bypasses security, or breaks software copy-protection with MALICIOUS or illegal intent — stealing data, causing damage, or pirating software. The distinction exists because 'hacker' in popular culture became conflated with 'cybercriminal,' which annoyed the original hacker community — they proposed 'cracker' specifically to describe the criminal, security-breaking activity, keeping 'hacker' for the broader, not-inherently-malicious meaning of a skilled, curious tinkerer.",
  ),
  k(
    'kb-gap-tech-phishing-vs-spoofing-correction',
    'Phishing vs spoofing (correcting a backwards relationship)',
    ['phishing', 'spoofing', 'difference phishing spoofing'],
    "Correcting a common mix-up: phishing is actually the BROADER social-engineering scam — tricking someone into revealing sensitive information (like login details or credit card numbers), typically through a fake email, message, or website pretending to be legitimate. Spoofing is a more specific, narrower TECHNIQUE — faking a sender's identity or origin information (like a spoofed email 'from' address, a spoofed caller ID, or a spoofed website URL) to make something appear to come from a trusted source. The relationship: spoofing is often a TOOL used to make a phishing attempt more convincing (a phishing email becomes far more believable if the sender's address is spoofed to look like it's really from your bank) — phishing is the overall scam/goal, and spoofing is one specific technique commonly used to pull it off, not the other way around.",
  ),
  k(
    'kb-gap-tech-chatbot-vs-virtual-assistant',
    'Chatbot vs virtual assistant',
    ['chatbot', 'virtual assistant', 'difference chatbot virtual assistant'],
    "A chatbot is a program designed specifically for text (or sometimes voice) CONVERSATION — it responds to what you type or say by generating relevant replies, often trained on huge amounts of text to predict plausible responses, but its main job is just talking/answering questions within a chat interface. A virtual assistant (like Siri, Alexa, or Google Assistant) does everything a chatbot does PLUS can actually take real actions on your device or accounts — setting reminders, playing music, controlling smart-home devices, sending texts, checking the weather, or opening apps — by integrating directly with a phone, smart speaker, or other system's actual functions. In short: a chatbot is built mainly to converse; a virtual assistant is built to converse AND actually do practical tasks for you by tapping into real device/app functionality.",
  ),
  k(
    'kb-gap-tech-ar-vs-vr',
    'Augmented reality vs virtual reality',
    ['augmented reality', 'virtual reality', 'difference ar vr'],
    "Augmented reality (AR) overlays digital content ONTO the real world you can still see — like Pokémon GO showing a virtual creature standing in your actual backyard through your phone's camera, or smart glasses displaying directions over what you're really looking at. You stay fully aware of and connected to your real surroundings; digital elements are just added on top. Virtual reality (VR) REPLACES your entire view with a fully digital, simulated environment — using a headset that blocks out the real world completely, so you're immersed in a computer-generated space instead (like a VR game world) and can no longer see your actual physical surroundings at all. The key difference: AR adds digital elements to the real world you still see; VR replaces the real world entirely with a simulated one.",
  ),
];
