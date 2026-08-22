import React, { useState, useEffect } from 'react';
import {
  Key,
  Copy,
  Check,
  Code2,
  Terminal,
  Server,
  Zap,
  ShieldCheck,
  Bot,
  ExternalLink,
  Play,
  RotateCw,
  X,
  FileCode,
  Layers,
  Sparkles,
  Plus,
} from 'lucide-react';

interface ApiIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiIntegrationModal: React.FC<ApiIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'discord_bot' | 'nexus_sdk' | 'keys_manager' | 'railway_queue' | 'env_setup' | 'endpoints' | 'tester'>('discord_bot');
  const [apiKey, setApiKey] = useState('nexus_sk_discord_bot_1394001641899954368');
  const [newKeyLabel, setNewKeyLabel] = useState('discord_bot');
  const [keyList, setKeyList] = useState<any[]>([]);
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [keysLoading, setKeysLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Live tester states
  const [testerEndpoint, setTesterEndpoint] = useState<'/api/v1/nexus' | '/api/v1/raidshield' | '/api/v1/vision/analyze' | '/api/v1/generate' | '/api/v1/web/search'>('/api/v1/nexus');
  const [testerPersona, setTesterPersona] = useState<string>('nexus-homie');
  const [testerPrompt, setTesterPrompt] = useState('Do you like Casseurt?');
  const [testerAuthorId, setTesterAuthorId] = useState('1394001641899954368');
  const [testerImageUrl, setTesterImageUrl] = useState('');
  const [testerLoading, setTesterLoading] = useState(false);
  const [testerResult, setTesterResult] = useState<string | null>(null);

  // Queue Live Stats & Stress Test
  const [queueStats, setQueueStats] = useState<any>(null);
  const [queueLoading, setQueueLoading] = useState(false);
  const [burstTesting, setBurstTesting] = useState(false);
  const [burstResults, setBurstResults] = useState<any>(null);

  const fetchQueueStatus = async () => {
    setQueueLoading(true);
    try {
      const res = await fetch('/api/v1/queue/status');
      if (res.ok) {
        const data = await res.json();
        setQueueStats(data);
      }
    } catch {
      // ignore
    } finally {
      setQueueLoading(false);
    }
  };

  const handleRunBurstTest = async () => {
    setBurstTesting(true);
    setBurstResults(null);
    try {
      const res = await fetch('/api/v1/queue/test-burst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 10 }),
      });
      const data = await res.json();
      setBurstResults(data);
      fetchQueueStatus();
    } catch (err: any) {
      setBurstResults({ error: err.message || 'Burst test failed' });
    } finally {
      setBurstTesting(false);
    }
  };

  const fetchKeys = async () => {
    setKeysLoading(true);
    try {
      const res = await fetch('/api/v1/keys', {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        const data = await res.json();
        setKeyList(data.keys || []);
        setKeyFeatures(data.latestFeaturesSupported || []);
      }
    } catch {
      // ignore
    } finally {
      setKeysLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchKeys();
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const apiBaseUrl = `${currentOrigin}/api/v1`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleGenerateNewKey = async (labelToUse?: string) => {
    try {
      const res = await fetch('/api/v1/keys/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: labelToUse || newKeyLabel || 'discord_bot' }),
      });
      if (res.ok) {
        const data = await res.json();
        setApiKey(data.apiKey);
        fetchKeys();
      } else {
        const fallback = `nexus_sk_${labelToUse || 'discord_bot'}_${Math.random().toString(36).substring(2, 10)}`;
        setApiKey(fallback);
      }
    } catch {
      const fallback = `nexus_sk_${labelToUse || 'discord_bot'}_${Math.random().toString(36).substring(2, 10)}`;
      setApiKey(fallback);
    }
  };

  const handleRunTester = async () => {
    setTesterLoading(true);
    setTesterResult(null);
    try {
      let body: any = {};
      if (testerEndpoint === '/api/v1/nexus') {
        body = {
          prompt: testerPrompt,
          persona: testerPersona,
          authorId: testerAuthorId,
          username: 'DiscordDev',
          isSuperChillUser: testerAuthorId === '1394001641899954368',
          imageUrl: testerImageUrl.trim() || undefined,
        };
      } else if (testerEndpoint === '/api/v1/raidshield') {
        body = {
          messageText: testerPrompt,
          authorId: testerAuthorId,
          imageUrl: testerImageUrl.trim() || undefined,
        };
      } else if (testerEndpoint === '/api/v1/vision/analyze') {
        body = {
          imageUrl: testerImageUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
          prompt: testerPrompt || 'Inspect this image for security threats or describe what is happening in it.',
        };
      } else if (testerEndpoint === '/api/v1/web/search') {
        body = {
          query: testerPrompt || 'latest tech news',
          provider: 'all',
          limit: 5,
        };
      } else {
        body = {
          prompt: testerPrompt,
          model: testerPersona,
          authorId: testerAuthorId,
        };
      }

      const res = await fetch(testerEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      setTesterResult(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setTesterResult(JSON.stringify({ error: err.message || 'Failed to reach endpoint' }, null, 2));
    } finally {
      setTesterLoading(false);
    }
  };

  const envFileCode = `# ----------------------------------------------------
# Discord Bot & Nexus AI Variables (.env)
# ----------------------------------------------------

# 1. Your Discord Bot Token (From Discord Developer Portal)
DISCORD_BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN_HERE"

# 2. Nexus AI Base URL (This running instance)
NEXUS_API_URL="${apiBaseUrl}"

# 3. Your Secret Nexus API Key
NEXUS_API_KEY="${apiKey}"

# 4. Super Chill VIP User ID (Favorite Homie)
SUPER_CHILL_USER_ID="1394001641899954368"
`;

  const sdkHelperCode = `// nexus-ai.js
// Production-Grade JavaScript & TypeScript SDK Client for Nexus AI Engine, RaidShield & Dynamic Personas
// Universal compatibility: Node.js (Discord.js), Bun, Railway, and modern browser environments.
// Supports both ES Modules (import) and CommonJS (require).

export class NexusAI {
  /**
   * Initialize a new Nexus AI Client instance
   * @param {Object} [config]
   * @param {string} [config.apiKey] - Your secret Nexus API key
   * @param {string} [config.baseUrl] - Base URL of your Nexus AI Server
   * @param {string} [config.persona] - Default AI Persona ('nexus-homie', 'crashout-bot', 'roast-master', 'chill-mod', 'code-architect', 'deep-researcher', 'gemini-core', 'raidshield-ai', 'discord-sentinel', 'socratic-mentor', 'creative-synthesizer')
   * @param {string|string[]} [config.rules] - Global strict rules or custom directives
   * @param {number} [config.temperature] - Default model temperature (0.0 to 2.0)
   * @param {string} [config.authorId] - Default Discord author ID (e.g. VIP ID '1394001641899954368')
   */
  constructor({ apiKey, baseUrl, persona, rules, temperature, authorId } = {}) {
    this.apiKey = apiKey || (typeof process !== 'undefined' && (process.env.NEXUS_API_KEY || process.env.API_KEY)) || '${apiKey}';
    this.baseUrl = (baseUrl || (typeof process !== 'undefined' && process.env.NEXUS_API_URL) || '${apiBaseUrl}').replace(/\\/+$/, '');
    this.currentPersona = persona || 'nexus-homie';
    this.clientRules = Array.isArray(rules) ? rules : rules ? [rules] : [];
    this.defaultTemperature = typeof temperature === 'number' ? temperature : undefined;
    this.defaultAuthorId = authorId || '';
  }

  setPersona(personaId) { this.currentPersona = personaId; return this; }
  getPersona() { return this.currentPersona; }
  setRules(rules) { this.clientRules = Array.isArray(rules) ? rules : rules ? [rules] : []; return this; }
  addRule(rule) { if (rule) this.clientRules.push(rule.trim()); return this; }
  clearRules() { this.clientRules = []; return this; }
  getClientRules() { return [...this.clientRules]; }
  setTemperature(temp) { this.defaultTemperature = Math.max(0, Math.min(2.0, temp)); return this; }

  _getHeaders(extraHeaders = {}) {
    return {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${this.apiKey}\`,
      'x-api-key': this.apiKey,
      ...extraHeaders,
    };
  }

  // --- SERVER SETTINGS & PERSONAS ---
  async getSettings() {
    const res = await fetch(\`\${this.baseUrl}/settings\`, { headers: this._getHeaders() });
    return await res.json();
  }

  async updateSettings(updates = {}) {
    const res = await fetch(\`\${this.baseUrl}/settings\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(updates),
    });
    return await res.json();
  }

  async listPersonas() {
    const res = await fetch(\`\${this.baseUrl}/personas\`, { headers: this._getHeaders() });
    return await res.json();
  }

  async switchServerPersona(persona) {
    const res = await fetch(\`\${this.baseUrl}/persona/set\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ persona }),
    });
    return await res.json();
  }

  // --- MAIN INFERENCE & DISCORD CHAT ---
  async askJSON(options) {
    const opts = typeof options === 'string' ? { prompt: options } : options || {};
    const authorId = opts.authorId || opts.userId || this.defaultAuthorId || '';
    const isSuperChill = Boolean(opts.isSuperChillUser || opts.isSuperChill || authorId === '1394001641899954368');
    const requestRules = opts.rules || opts.customRules || opts.directives || '';
    const extraRules = Array.isArray(requestRules) ? requestRules : requestRules ? [requestRules] : [];
    const allRules = [...this.clientRules, ...extraRules];

    const activePersona = opts.persona || opts.model || this.currentPersona || 'nexus-homie';

    const res = await fetch(\`\${this.baseUrl}/nexus\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        prompt: opts.prompt || opts.content || opts.message || opts.text || '',
        persona: activePersona,
        model: activePersona,
        authorId,
        username: opts.username || 'DiscordUser',
        isSuperChillUser: isSuperChill,
        mode: opts.mode || (opts.deepThink ? 'deep-cot' : opts.crashout ? 'crashout' : undefined),
        deepThink: Boolean(opts.deepThink || opts.mode === 'deep' || opts.mode === 'deep-cot'),
        crashout: Boolean(opts.crashout || opts.mode === 'crashout' || activePersona === 'crashout-bot'),
        history: opts.history || opts.messages || [],
        rules: allRules.join('\\n'),
        imageUrl: opts.imageUrl || opts.image || '',
        imageData: opts.imageData || '',
        temperature: typeof opts.temperature === 'number' ? opts.temperature : this.defaultTemperature,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(\`Nexus API HTTP \${res.status}: \${errText || res.statusText}\`);
    }
    return await res.json();
  }

  async ask(options) {
    const data = await this.askJSON(options);
    return data.response || data.text || '';
  }

  async deepThink(options) {
    const opts = typeof options === 'string' ? { prompt: options } : options || {};
    return this.askJSON({ ...opts, mode: 'deep-cot', deepThink: true });
  }

  async solveMath(expression) {
    const res = await fetch(\`\${this.baseUrl}/math\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ expression }),
    });
    return await res.json();
  }
  async evaluateMath(expr) { return this.solveMath(expr); }
  async convertUnits(query) { return this.solveMath(query); }

  async extractEntities(text) {
    const res = await fetch(\`\${this.baseUrl}/entities\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ text }),
    });
    return await res.json();
  }

  createChatSession(options = {}) {
    return new NexusChatSession(this, options);
  }

  async askCrashout(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'crashout-bot', crashout: true }); }
  async crashout(opts) { return this.askCrashout(opts); }
  async askRoast(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'roast-master' }); }
  async askChill(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'chill-mod' }); }
  async askCode(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'code-architect' }); }
  async askResearcher(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'deep-researcher' }); }
  async askHomie(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'nexus-homie' }); }
  async askSentinel(opts) { return this.ask({ ...(typeof opts === 'string' ? { prompt: opts } : opts), persona: 'discord-sentinel' }); }

  // --- MULTI-DOCUMENT KNOWLEDGE CORPUS & BM25 SEARCH ---
  async listDocuments({ category = '' } = {}) {
    const url = category ? \`\${this.baseUrl}/documents?category=\${encodeURIComponent(category)}\` : \`\${this.baseUrl}/documents\`;
    const res = await fetch(url, { headers: this._getHeaders() });
    return await res.json();
  }

  async searchDocuments({ query, limit = 5 }) {
    const res = await fetch(\`\${this.baseUrl}/documents/search\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ query, limit }),
    });
    return await res.json();
  }
  async searchCorpus(query, options = {}) {
    const opts = typeof options === 'number' ? { limit: options } : options;
    return this.searchDocuments({ query, ...opts });
  }

  async addDocument({ title, content, category = 'custom-api-doc', keywords = [] }) {
    const res = await fetch(\`\${this.baseUrl}/documents\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ title, content, category, keywords }),
    });
    return await res.json();
  }

  async deleteDocument(documentId) {
    const res = await fetch(\`\${this.baseUrl}/documents/\${encodeURIComponent(documentId)}\`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
    return await res.json();
  }

  async getCorpusStats() {
    const res = await fetch(\`\${this.baseUrl}/corpus\`, { headers: this._getHeaders() });
    return await res.json();
  }

  // --- RAIDSHIELD 21-RULE SECURITY & AUTOMOD ---
  async checkSecurity({ messageText = '', authorId = '', imageUrl = '', imageData = '' }) {
    const res = await fetch(\`\${this.baseUrl}/raidshield\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ messageText, authorId, imageUrl, imageData }),
    });
    if (!res.ok) throw new Error(\`RaidShield API error: \${res.status}\`);
    return await res.json();
  }

  async isSafe(messageText) {
    const sec = await this.checkSecurity({ messageText });
    return sec.classification === 'safe';
  }

  // --- VISION SCANNER & OCR ---
  async analyzeImage({ imageUrl = '', imageData = '', prompt = '', mode = 'general' }) {
    const res = await fetch(\`\${this.baseUrl}/vision/analyze\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ imageUrl, imageData, prompt, mode }),
    });
    if (!res.ok) throw new Error(\`Vision API error: \${res.status}\`);
    return await res.json();
  }

  async analyzeVision(options) { return this.analyzeImage(options); }

  // --- STRICT RULES & DIRECTIVES ---
  async listSupportedRules() {
    const res = await fetch(\`\${this.baseUrl}/sdk/rules\`, { headers: this._getHeaders() });
    return await res.json();
  }

  async enforceRules({ text, rules, isSuperChillUser = false }) {
    const res = await fetch(\`\${this.baseUrl}/sdk/rules/enforce\`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ text, rules, isSuperChillUser }),
    });
    return await res.json();
  }

  // --- AUTH & SYSTEM ---
  async verifyAuth() {
    const res = await fetch(\`\${this.baseUrl}/auth/verify\`, { headers: this._getHeaders() });
    return await res.json();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NexusAI, default: NexusAI };
}
export default NexusAI;
`;

  const botJsCode = `// bot.js
// Complete Discord.js v14 Bot with Nexus AI, RaidShield & Vision Scanning!
import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { NexusAI } from './nexus-ai.js';

const ai = new NexusAI({
  apiKey: process.env.NEXUS_API_KEY,
  baseUrl: process.env.NEXUS_API_URL,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.once('ready', () => {
  console.log(\`✅ Nexus Bot is online as \${client.user.tag}!\`);
  console.log(\`🔗 Connected to AI Engine at: \${ai.baseUrl}\`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();
  const authorId = message.author.id;
  const username = message.author.username;
  const isSuperChillUser = authorId === process.env.SUPER_CHILL_USER_ID;

  // Extract any attached image URLs
  const imageAttachment = message.attachments.find((att) =>
    att.contentType?.startsWith('image/') ||
    /\\.(png|jpe?g|webp|gif)$/i.test(att.name || '')
  );
  const imageUrl = imageAttachment ? imageAttachment.url : '';

  // ---------------------------------------------------------
  // STEP 1: RaidShield AI Automod (Text + Image Inspection)
  // ---------------------------------------------------------
  try {
    const security = await ai.checkSecurity({
      messageText: content,
      authorId: authorId,
      imageUrl: imageUrl,
    });

    if (security.classification !== 'safe' && security.confidence >= 0.90) {
      console.warn(\`🚨 [RaidShield] Threat detected: \${security.classification} from \${username} (\${authorId})\`);
      
      if (message.deletable) {
        await message.delete().catch(() => {});
      }

      await message.channel.send({
        content: \`🛡️ **RaidShield Automod**: Removed **\${security.classification.toUpperCase()}** from <@\${authorId}>.\\n> *Reason*: \${security.reason}\`,
      });

      return;
    }
  } catch (err) {
    console.error('RaidShield check error:', err.message);
  }

  // ---------------------------------------------------------
  // STEP 2: Nexus AI Chat, Commands & Vision Inquiries
  // ---------------------------------------------------------
  const isMentioned = message.mentions.has(client.user);
  const isPrefixCommand = content.startsWith('!nexus') || content.startsWith('!ask') || content.startsWith('!vision');

  if (isMentioned || isPrefixCommand) {
    let cleanPrompt = content
      .replace(new RegExp(\`<@!?\${client.user.id}>\`, 'g'), '')
      .replace(/^!(nexus|ask|vision)\\s*/i, '')
      .trim();

    if (!cleanPrompt && imageUrl) {
      cleanPrompt = 'What is in this image? Explain it to me.';
    } else if (!cleanPrompt) {
      cleanPrompt = 'Yo what is good?';
    }

    try {
      await message.channel.sendTyping();

      const reply = await ai.ask({
        prompt: cleanPrompt,
        authorId: authorId,
        username: username,
        isSuperChillUser: isSuperChillUser,
        imageUrl: imageUrl,
      });

      await message.reply({
        content: reply,
        allowedMentions: { repliedUser: false },
      });
    } catch (error) {
      console.error('Nexus reply error:', error);
      await message.reply('Damn bro, my neural engine had a hiccup reaching the server! Try again in a sec.');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-900">
                  Nexus AI & Discord Bot Integration Hub
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  REST API v1 Live
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Plug this custom AI engine directly into your Discord bot with JavaScript & environment variables
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Bar */}
        <div className="px-6 py-3 bg-violet-50/50 border-b border-violet-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <Key className="w-4 h-4 text-violet-600 shrink-0" />
            <span className="font-semibold text-stone-700">Your Bot API Key:</span>
            <code className="px-2.5 py-1 rounded-md bg-white border border-violet-200 font-mono text-violet-900 font-semibold truncate max-w-xs sm:max-w-md">
              {apiKey}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(apiKey, 'key')}
              className="px-3 py-1.5 rounded-lg bg-white border border-violet-300 hover:bg-violet-100 text-violet-800 font-medium text-xs flex items-center gap-1.5 transition shadow-2xs"
            >
              {copiedSection === 'key' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-violet-600" />
                  <span>Copy Key</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleGenerateNewKey()}
              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs flex items-center gap-1.5 transition shadow-2xs"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Generate New</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-stone-200 bg-white flex overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveTab('discord_bot')}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'discord_bot'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Discord Bot (JavaScript)</span>
          </button>
          <button
            onClick={() => setActiveTab('nexus_sdk')}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'nexus_sdk'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>JavaScript Client Helper</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('keys_manager');
              fetchKeys();
            }}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'keys_manager'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Key className="w-4 h-4 text-violet-600" />
            <span>API Keys & Capabilities</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('railway_queue');
              fetchQueueStatus();
            }}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'railway_queue'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Railway Deploy & Waitlist Queue</span>
          </button>
          <button
            onClick={() => setActiveTab('env_setup')}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'env_setup'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>.env Variables</span>
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'endpoints'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>API Endpoints & Schemas</span>
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`py-3 px-3.5 font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'tester'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-600" />
            <span>Live API Tester</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-4 bg-stone-50/40">
          {/* TAB 1: DISCORD BOT JAVASCRIPT */}
          {activeTab === 'discord_bot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-600" />
                    Complete Discord.js v14 Bot Script (<code className="text-violet-700 font-mono">bot.js</code>)
                  </h3>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Supports Nexus conversational AI, expressive natural swearing, Casseurt roast, Super Chill VIP mode, and RaidShield 21-rule automod protection.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(botJsCode, 'botjs')}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-stone-800 transition"
                >
                  {copiedSection === 'botjs' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Script!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy bot.js</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Quick Install:</strong> Run <code className="px-1.5 py-0.5 bg-amber-100 rounded font-mono font-bold">npm install discord.js dotenv</code> in your bot folder, create <code className="px-1.5 py-0.5 bg-amber-100 rounded font-mono font-bold">.env</code> and <code className="px-1.5 py-0.5 bg-amber-100 rounded font-mono font-bold">nexus-ai.js</code>, then run <code className="px-1.5 py-0.5 bg-amber-100 rounded font-mono font-bold">node bot.js</code>!
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 text-stone-200">
                <div className="px-4 py-2 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>bot.js (JavaScript / ES Module)</span>
                  <span>discord.js v14+</span>
                </div>
                <pre className="p-4 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-96">
                  {botJsCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: JAVASCRIPT SDK HELPER */}
          {activeTab === 'nexus_sdk' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-violet-600" />
                    Nexus AI Client Helper (<code className="text-violet-700 font-mono">nexus-ai.js</code>)
                  </h3>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    A clean, reusable JavaScript class that handles all HTTP requests to your Nexus engine and RaidShield automod.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(sdkHelperCode, 'sdk')}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-stone-800 transition"
                >
                  {copiedSection === 'sdk' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Helper!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy nexus-ai.js</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 text-stone-200">
                <div className="px-4 py-2 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>nexus-ai.js</span>
                  <span>Pure JS / Node 18+ Fetch</span>
                </div>
                <pre className="p-4 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-96">
                  {sdkHelperCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB: API KEYS & CAPABILITY MATRIX */}
          {activeTab === 'keys_manager' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Key className="w-4 h-4 text-violet-600" />
                    Registered API Keys & Feature Capabilities
                  </h3>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    All API keys are automatically updated with full privileges for all the newest features: Multimodal Vision, Swear Engine, Strict SDK Rules, RaidShield 21 Rules, and FIFO waitlists.
                  </p>
                </div>
                <button
                  onClick={fetchKeys}
                  disabled={keysLoading}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${keysLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh Keys</span>
                </button>
              </div>

              {/* Feature Matrix Badges */}
              <div className="p-4 bg-violet-900 text-white rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-200">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Newest Capabilities Auto-Synced to All Keys</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-violet-800/80 text-violet-100 text-[10px] font-mono border border-violet-700/60">
                    ⚡ internal_autonomous_vision_scanner
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-violet-800/80 text-violet-100 text-[10px] font-mono border border-violet-700/60">
                    🛡️ raidshield_21_hard_security_rules
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-violet-800/80 text-violet-100 text-[10px] font-mono border border-violet-700/60">
                    🔥 swear_engine_polish_english
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-violet-800/80 text-violet-100 text-[10px] font-mono border border-violet-700/60">
                    📜 strict_sdk_rule_enforcement
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-violet-800/80 text-violet-100 text-[10px] font-mono border border-violet-700/60">
                    👑 super_chill_vip_mode
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-violet-800/80 text-violet-100 text-[10px] font-mono border border-violet-700/60">
                    🚦 fifo_waitlist_request_queue
                  </span>
                </div>
              </div>

              {/* Generate New Custom Key Form */}
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                <h4 className="font-bold text-stone-900 text-xs">Issue New Scoped API Key</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newKeyLabel}
                    onChange={(e) => setNewKeyLabel(e.target.value)}
                    placeholder="Bot identifier (e.g. discord_bot, staging_server)"
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                  />
                  <button
                    onClick={() => handleGenerateNewKey()}
                    className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Key</span>
                  </button>
                </div>
              </div>

              {/* Active Keys Table */}
              <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="px-4 py-2.5 bg-stone-100/80 border-b border-stone-200 font-bold text-stone-700 text-[11px] flex justify-between items-center">
                  <span>Registered Active Keys ({keyList.length})</span>
                  <span>Status & Actions</span>
                </div>
                <div className="divide-y divide-stone-100">
                  {keyList.map((k, idx) => (
                    <div key={k.key || idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50/60 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-mono font-bold text-violet-900 text-xs">
                            {k.key}
                          </code>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">
                            {k.status || 'Active'}
                          </span>
                        </div>
                        <div className="text-[10px] text-stone-500 flex flex-wrap gap-2">
                          <span>Label: <strong className="text-stone-700">{k.label}</strong></span>
                          <span>•</span>
                          <span>Created: {new Date(k.created).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setApiKey(k.key);
                            handleCopy(k.key, `table_${idx}`);
                          }}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium flex items-center gap-1 transition"
                        >
                          {copiedSection === `table_${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-500" />}
                          <span>{apiKey === k.key ? 'Selected & Copied' : 'Select Key'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAILWAY DEPLOYMENT & LIVE WAITLIST QUEUE */}
          {activeTab === 'railway_queue' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Railway Deployment & Concurrency Waitlist Engine
                </h3>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Nexus AI is equipped with automatic FIFO queue waitlists. When multiple users or servers bombard your Discord bot with messages or image scans simultaneously, requests queue safely and execute sequentially without memory crashes or hanging timeouts.
                </p>
              </div>

              {/* Railway Variables Checklist */}
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-violet-600" />
                    Railway Dashboard Environment Variables
                  </h4>
                  <span className="text-[10px] bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-mono font-medium">
                    Railway &gt; Your Project &gt; Variables
                  </span>
                </div>
                <p className="text-stone-600 text-[11px]">
                  Add these 4 variables to your Discord Bot service in Railway:
                </p>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900">DISCORD_BOT_TOKEN</span>
                      <span className="text-stone-500 block text-[10px] font-sans">Your bot token from Discord Developer Portal</span>
                    </div>
                    <span className="text-stone-600 bg-white px-2 py-1 border border-stone-200 rounded text-[10px]">Required</span>
                  </div>

                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900">NEXUS_API_KEY</span>
                      <span className="text-stone-500 block text-[10px] font-sans">{apiKey}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(apiKey, 'rw_key')}
                      className="px-2 py-1 text-[10px] bg-white hover:bg-stone-100 border border-stone-200 rounded text-stone-700 flex items-center gap-1"
                    >
                      {copiedSection === 'rw_key' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900">NEXUS_API_URL</span>
                      <span className="text-stone-500 block text-[10px] font-sans">{apiBaseUrl} (or your Railway API URL)</span>
                    </div>
                    <button
                      onClick={() => handleCopy(apiBaseUrl, 'rw_url')}
                      className="px-2 py-1 text-[10px] bg-white hover:bg-stone-100 border border-stone-200 rounded text-stone-700 flex items-center gap-1"
                    >
                      {copiedSection === 'rw_url' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900">SUPER_CHILL_USER_ID</span>
                      <span className="text-stone-500 block text-[10px] font-sans">1394001641899954368</span>
                    </div>
                    <span className="text-stone-600 bg-white px-2 py-1 border border-stone-200 rounded text-[10px]">VIP Homie</span>
                  </div>
                </div>
              </div>

              {/* Live Waitlist Queue Monitor & Stress Test */}
              <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs">Live Waitlist Queue Telemetry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchQueueStatus}
                      disabled={queueLoading}
                      className="px-2.5 py-1 text-[10px] rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1 font-mono transition"
                    >
                      <RotateCw className={`w-3 h-3 ${queueLoading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                    <button
                      onClick={handleRunBurstTest}
                      disabled={burstTesting}
                      className="px-3 py-1 text-[10px] rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1.5 font-bold transition shadow-xs disabled:opacity-50"
                    >
                      {burstTesting ? <RotateCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                      <span>Simulate 10 Burst Requests</span>
                    </button>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2 bg-stone-800/80 rounded-lg border border-stone-700/50">
                    <div className="text-[10px] text-stone-400">Waiting in Line</div>
                    <div className="text-base font-bold text-amber-400">{queueStats?.pendingInWaitlist ?? 0}</div>
                  </div>
                  <div className="p-2 bg-stone-800/80 rounded-lg border border-stone-700/50">
                    <div className="text-[10px] text-stone-400">Total Processed</div>
                    <div className="text-base font-bold text-emerald-400">{queueStats?.totalProcessed ?? 0}</div>
                  </div>
                  <div className="p-2 bg-stone-800/80 rounded-lg border border-stone-700/50">
                    <div className="text-[10px] text-stone-400">Peak Queue Length</div>
                    <div className="text-base font-bold text-sky-400">{queueStats?.peakQueueLength ?? 0}</div>
                  </div>
                  <div className="p-2 bg-stone-800/80 rounded-lg border border-stone-700/50">
                    <div className="text-[10px] text-stone-400">Avg Wait Time</div>
                    <div className="text-base font-bold text-violet-400">{Math.round(queueStats?.avgWaitTimeMs ?? 0)} ms</div>
                  </div>
                </div>

                {burstResults && (
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-lg font-mono text-[10px] text-emerald-400 max-h-48 overflow-y-auto">
                    <div className="text-stone-300 font-bold mb-1">Burst Test Completed:</div>
                    <pre>{JSON.stringify(burstResults, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: .ENV VARIABLES */}
          {activeTab === 'env_setup' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-violet-600" />
                    Bot Environment Variables (<code className="text-violet-700 font-mono">.env</code>)
                  </h3>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Save this as a <code className="font-mono text-stone-800">.env</code> file in your Discord bot project directory.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(envFileCode, 'env')}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-stone-800 transition"
                >
                  {copiedSection === 'env' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied .env!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy .env</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 text-stone-200">
                <div className="px-4 py-2 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>.env</span>
                  <span>Configuration</span>
                </div>
                <pre className="p-4 font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {envFileCode}
                </pre>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                <h4 className="font-bold text-stone-900">Variable Explanations:</h4>
                <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
                  <li>
                    <strong className="text-stone-800">DISCORD_BOT_TOKEN</strong>: Found in Discord Developer Portal &gt; Applications &gt; Bot &gt; Reset Token.
                  </li>
                  <li>
                    <strong className="text-stone-800">NEXUS_API_URL</strong>: The base URL of your running AI engine ({apiBaseUrl}).
                  </li>
                  <li>
                    <strong className="text-stone-800">NEXUS_API_KEY</strong>: The authentication secret key that connects your bot to the AI server.
                  </li>
                  <li>
                    <strong className="text-stone-800">SUPER_CHILL_USER_ID</strong>: <code className="font-mono text-violet-700">1394001641899954368</code> (activates ultra-chill VIP homie mode).
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: API ENDPOINTS */}
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Available REST API Endpoints</h3>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Connect using standard HTTP POST requests with JSON payloads and Bearer token headers.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* 1. Nexus endpoint */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-violet-100 text-violet-800 text-[11px]">
                        POST
                      </span>
                      <code className="font-mono font-bold text-stone-900 text-xs">/api/v1/nexus</code>
                    </div>
                    <span className="text-[11px] text-violet-700 font-medium">Discord Homie AI</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Generates casual, expressive swearing, accurate answers, Casseurt roasts, and Super Chill VIP responses.
                  </p>
                  <pre className="p-3 bg-stone-900 text-stone-200 rounded-lg font-mono text-[10px] overflow-x-auto">
{`// Request Body
{
  "prompt": "How do I center a div in CSS?",
  "authorId": "1394001641899954368",
  "username": "Alex",
  "isSuperChillUser": true
}

// Response
{
  "response": "Fuck yeah bro, got you covered!\\n\\n\`\`\`css\\n.parent { display: flex; justify-content: center; align-items: center; }\\n\`\`\`",
  "persona": "nexus-homie",
  "isSuperChillUser": true
}`}
                  </pre>
                </div>

                {/* 2. RaidShield endpoint */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-emerald-100 text-emerald-800 text-[11px]">
                        POST
                      </span>
                      <code className="font-mono font-bold text-stone-900 text-xs">/api/v1/raidshield</code>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">21-Hard-Rules Security</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Evaluates Discord messages against all 21 hard security rules, outputs structured JSON with classification and confidence.
                  </p>
                  <pre className="p-3 bg-stone-900 text-stone-200 rounded-lg font-mono text-[10px] overflow-x-auto">
{`// Request Body
{
  "messageText": "FREE NITRO: http://dlscord.gift/drop @everyone",
  "authorId": "987654321"
}

// Response
{
  "classification": "scam",
  "confidence": 0.99,
  "reason": "Phishing domain attempting credential theft with @everyone spam",
  "actionRecommended": "DELETE_AND_TIMEOUT"
}`}
                  </pre>
                </div>

                {/* 3. Vision Analyze endpoint */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-purple-100 text-purple-800 text-[11px]">
                        POST
                      </span>
                      <code className="font-mono font-bold text-stone-900 text-xs">/api/v1/vision/analyze</code>
                    </div>
                    <span className="text-[11px] text-purple-700 font-medium">Multimodal Vision & OCR</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Directly analyzes screenshots, images, QR codes, or attachments via Nexus autonomous vision and threat inspection.
                  </p>
                  <pre className="p-3 bg-stone-900 text-stone-200 rounded-lg font-mono text-[10px] overflow-x-auto">
{`// Request Body
{
  "imageUrl": "https://example.com/nitro-scam-screenshot.png", // or base64 data URL
  "prompt": "Scan this screenshot for Discord phishing links or fake Nitro giveaways"
}

// Response
{
  "analysis": "Identified fraudulent Discord Nitro QR login phishing page...",
  "hasImage": true
}`}
                  </pre>
                </div>

                {/* 4. Gemini-Style endpoint */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-blue-100 text-blue-800 text-[11px]">
                        POST
                      </span>
                      <code className="font-mono font-bold text-stone-900 text-xs">/api/v1/generate</code>
                    </div>
                    <span className="text-[11px] text-blue-700 font-medium">Gemini-Compatible Format</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Supports Google GenAI / Gemini SDK payload formats with <code className="font-mono">contents</code>, <code className="font-mono">generationConfig</code>, and candidates response schema.
                  </p>
                </div>

                {/* 5. Zero-API-Key Web Search endpoint */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-bold font-mono bg-cyan-100 text-cyan-800 text-[11px]">
                        POST
                      </span>
                      <code className="font-mono font-bold text-stone-900 text-xs">/api/v1/web/search</code>
                    </div>
                    <span className="text-[11px] text-cyan-700 font-medium font-semibold">Zero-API Live Google Search</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Search Google, DuckDuckGo & Wikipedia live with infinite requests per day and zero external API dependencies.
                  </p>
                  <pre className="p-3 bg-stone-900 text-stone-200 rounded-lg font-mono text-[10px] overflow-x-auto">
{`// Request Body
{
  "query": "Who won the 2024 UEFA Champions League?",
  "provider": "all", // "all" | "google" | "duckduckgo" | "wikipedia"
  "limit": 5
}

// Response
{
  "success": true,
  "query": "Who won the 2024 UEFA Champions League?",
  "totalResults": 5,
  "engineUsed": "all",
  "results": [
    {
      "title": "Real Madrid win the 2023/24 UEFA Champions League",
      "snippet": "Real Madrid claimed their 15th European Cup by beating Borussia Dortmund 2-0 at Wembley Stadium...",
      "url": "https://www.uefa.com/uefachampionsleague/news/...",
      "domain": "uefa.com",
      "engine": "google"
    }
  ],
  "quotaStatus": "infinite_free_direct_scraping"
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE API TESTER */}
          {activeTab === 'tester' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-600" />
                  Interactive API Endpoint Tester
                </h3>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Test your live server endpoints in real-time right here before deploying your Discord bot!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Request Inputs */}
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                  <h4 className="font-bold text-stone-900 text-xs">Request Configuration</h4>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                        Endpoint
                      </label>
                      <select
                        value={testerEndpoint}
                        onChange={(e) => setTesterEndpoint(e.target.value as any)}
                        className="w-full text-xs px-2.5 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                      >
                        <option value="/api/v1/nexus">POST /api/v1/nexus (Discord AI)</option>
                        <option value="/api/v1/web/search">POST /api/v1/web/search (Live Google Search)</option>
                        <option value="/api/v1/raidshield">POST /api/v1/raidshield (21-Rule Automod)</option>
                        <option value="/api/v1/vision/analyze">POST /api/v1/vision/analyze (Vision OCR)</option>
                        <option value="/api/v1/generate">POST /api/v1/generate (Gemini Style)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                        AI Persona / Mode
                      </label>
                      <select
                        value={testerPersona}
                        onChange={(e) => setTesterPersona(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 rounded-lg border border-stone-300 bg-white font-mono font-medium text-stone-800"
                      >
                        <option value="nexus-homie">🔥 Nexus Homie (Default)</option>
                        <option value="crashout-bot">🤬 Crashout Bot (Rage)</option>
                        <option value="roast-master">😈 Roast Master (Savage)</option>
                        <option value="chill-mod">🧘 Chill Moderator (Zen)</option>
                        <option value="code-architect">💻 Code Architect (Senior Dev)</option>
                        <option value="deep-researcher">🔬 Deep Researcher</option>
                        <option value="gemini-core">🧠 Gemini Core Intelligence</option>
                        <option value="raidshield-ai">🛡️ RaidShield AI Security</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Quick Test Presets
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/nexus');
                          setTesterPersona('nexus-homie');
                          setTesterPrompt('Search the web: who won the 2024 UEFA Champions League and what happened in the match?');
                          setTesterAuthorId('1394001641899954368');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded text-[10px] font-semibold text-cyan-800"
                      >
                        🌐 Live Web Search
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/nexus');
                          setTesterPersona('nexus-homie');
                          setTesterPrompt('Yo what is 1337 * 42?');
                          setTesterAuthorId('1394001641899954368');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded text-[10px] font-semibold text-emerald-800"
                      >
                        🧮 Math (1337*42)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/nexus');
                          setTesterPersona('nexus-homie');
                          setTesterPrompt('Could you tell me how to remove an apple from a bowl?');
                          setTesterAuthorId('1394001641899954368');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-[10px] font-semibold text-blue-800"
                      >
                        🍎 Apple from Bowl
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/nexus');
                          setTesterPersona('crashout-bot');
                          setTesterPrompt('Who griefed our Minecraft server base?!');
                          setTesterAuthorId('1394001641899954368');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded text-[10px] font-semibold text-red-800"
                      >
                        🤬 Crashout Mode
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/nexus');
                          setTesterPersona('roast-master');
                          setTesterPrompt('Do you like Casseurt?');
                          setTesterAuthorId('1394001641899954368');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded text-[10px] font-semibold text-amber-800"
                      >
                        🔥 Roast Casseurt
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/nexus');
                          setTesterPersona('nexus-homie');
                          setTesterPrompt('Yo bro what are we working on today?');
                          setTesterAuthorId('1394001641899954368');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded text-[10px] font-semibold text-violet-800"
                      >
                        👑 VIP Homie
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTesterEndpoint('/api/v1/raidshield');
                          setTesterPrompt('FREE NITRO 3 MONTHS: http://dlscord-drop.gift/claim @everyone');
                          setTesterAuthorId('99887766');
                          setTesterImageUrl('');
                        }}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded text-[10px] font-semibold text-rose-800"
                      >
                        🛡️ Nitro Scam Test
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Prompt / Message Content
                    </label>
                    <textarea
                      rows={2}
                      value={testerPrompt}
                      onChange={(e) => setTesterPrompt(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                      placeholder="e.g. Do you like Casseurt?"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Optional Image URL / Data URL
                    </label>
                    <input
                      type="text"
                      value={testerImageUrl}
                      onChange={(e) => setTesterImageUrl(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                      placeholder="https://... or data:image/png;base64,..."
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Author Discord User ID
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={testerAuthorId}
                        onChange={(e) => setTesterAuthorId(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                        placeholder="e.g. 1394001641899954368"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setTesterAuthorId(
                            testerAuthorId === '1394001641899954368' ? '999888777' : '1394001641899954368'
                          )
                        }
                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-stone-300 bg-stone-100 hover:bg-stone-200 whitespace-nowrap cursor-pointer"
                      >
                        {testerAuthorId === '1394001641899954368' ? 'VIP Homie' : 'Normal User'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleRunTester}
                      disabled={testerLoading}
                      className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-sm"
                    >
                      {testerLoading ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Executing API Call...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Send HTTP POST Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Response Output */}
                <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[11px] font-mono text-stone-400">
                    <span>Live JSON Response</span>
                    {testerResult && (
                      <button
                        onClick={() => handleCopy(testerResult, 'testerRes')}
                        className="hover:text-stone-200 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto pt-3">
                    {testerLoading && (
                      <div className="h-full flex items-center justify-center text-stone-500 font-mono text-xs">
                        Connecting to server...
                      </div>
                    )}
                    {!testerLoading && !testerResult && (
                      <div className="h-full flex flex-col items-center justify-center text-stone-500 font-mono text-xs p-4 text-center">
                        <Server className="w-8 h-8 text-stone-700 mb-2" />
                        <span>Click &quot;Send HTTP POST Request&quot; to test this endpoint live.</span>
                      </div>
                    )}
                    {!testerLoading && testerResult && (
                      <pre className="font-mono text-[11px] text-emerald-400 leading-relaxed overflow-x-auto">
                        {testerResult}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-500">
            <Server className="w-3.5 h-3.5 text-stone-400" />
            <span>Server Running on Port 3000 • Ready for Discord Bot Connections</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
