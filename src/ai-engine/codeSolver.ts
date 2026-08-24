/**
 * Code Engine & Multi-Language Algorithm Solver
 * Handles code generation, bug fixing, algorithms, SQL queries, and regex design.
 */

export interface CodeSolution {
  isCode: boolean;
  language: string;
  code: string;
  explanation: string;
  complexity?: string;
  title: string;
}

export function trySolveCode(prompt: string): CodeSolution | null {
  const lower = prompt.toLowerCase();

  // 0. Discord Bot Development (discord.js v14) & Security Automod
  if (
    lower.includes('discord bot') ||
    lower.includes('discord.js') ||
    lower.includes('slash command') ||
    (lower.includes('bot') && (lower.includes('discord') || lower.includes('automod') || lower.includes('intents')))
  ) {
    if (lower.includes('slash') || lower.includes('command')) {
      return {
        isCode: true,
        language: 'typescript',
        title: 'Production-Ready Discord.js v14 Slash Command Handler & REST Deployer',
        code: `import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

// 1. Define Slash Commands
export const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with bot gateway latency and server status.'),
  new SlashCommandBuilder()
    .setName('automod-status')
    .setDescription('Checks active RaidShield & AutoMod security rules.')
    .setDefaultMemberPermissions(8n), // Administrator only
].map((cmd) => cmd.toJSON());

// 2. Deploy Slash Commands to Discord REST API
export async function registerSlashCommands(clientId: string, guildId: string, token: string) {
  const rest = new REST({ version: '10' }).setToken(token);
  console.log('🔄 Refreshing guild application (/) commands...');
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
  console.log('✅ Successfully reloaded application (/) commands.');
}

// 3. Client Event Listener
export function setupInteractionHandler(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
      const ping = client.ws.ping;
      await interaction.reply({
        content: \`🏓 **Pong!** WebSocket Heartbeat: \`\${ping}ms\`\`,
        ephemeral: true,
      });
    } else if (commandName === 'automod-status') {
      await interaction.reply({
        content: '🛡️ **RaidShield Security Engine**: Active\\n- 21 Hard Rules: Enforced\\n- Confidence Threshold: 0.90+',
        ephemeral: true,
      });
    }
  });
}`,
        explanation: `### Discord.js v14 Slash Command Architecture\n\n- **REST v10 Deployment**: Uses \`Routes.applicationGuildCommands\` for instant command registration during development.\n- **Type-Safe Interactions**: Leverages \`ChatInputCommandInteraction\` and \`setDefaultMemberPermissions\` with BigInt bitfields.\n- **Ephemeral Responses**: Protects moderator commands and prevents channel spam.`,
        complexity: 'O(1) Interaction Dispatch',
      };
    }

    return {
      isCode: true,
      language: 'typescript',
      title: 'Complete Discord.js v14 Bot with Message Content Intent & Automod Scanner',
      code: `import { Client, GatewayIntentBits, Partials, Events, Message } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Required privileged intent to inspect text
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel],
});

// Anti-Phishing Domain Filter Regex
const PHISHING_REGEX = /(?:dlscord|discorcl|discrod|discord-gift|free-nitro|steamcomrnunity)\\.[a-z0-9]+/i;

client.once(Events.ClientReady, (c) => {
  console.log(\`✅ Bot ready! Logged in as \${c.user.tag}\`);
});

client.on(Events.MessageCreate, async (message: Message) => {
  // Ignore self and bot messages
  if (message.author.bot || !message.guild) return;

  const content = message.content;

  // 1. Anti-Phishing Security Check
  if (PHISHING_REGEX.test(content)) {
    if (message.deletable) {
      await message.delete().catch(() => {});
    }
    await message.channel.send({
      content: \`🛡️ **Automod Alert**: Deleted phishing link from <@\${message.author.id}>.\`,
    });
    return;
  }

  // 2. Command Prefix Handling
  if (content === '!ping') {
    await message.reply(\`🏓 Pong! Latency: \${client.ws.ping}ms\`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);`,
      explanation: `### Key Security & Architectural Points\n\n1. **Privileged Gateway Intents**: \`GatewayIntentBits.MessageContent\` is explicitly required in the Discord Developer Portal to inspect message text.\n2. **Deletable Guard**: Checks \`message.deletable\` before invoking \`.delete()\` to avoid throwing unhandled permission errors.\n3. **Environment Security**: Keeps bot tokens in \`process.env.DISCORD_BOT_TOKEN\` to prevent credential leaks.`,
      complexity: 'O(1) Event Loop Dispatch',
    };
  }

  // 1. Debounce / Throttle
  if (lower.includes('debounce') || lower.includes('throttle')) {
    const isThrottle = lower.includes('throttle');
    if (isThrottle) {
      return {
        isCode: true,
        language: 'typescript',
        title: 'High-Performance Throttle Function in TypeScript',
        code: `/**
 * Throttles a function so it can only be called once every \`limitMs\` milliseconds.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limitMs);
    } else {
      lastArgs = args;
    }
  };
}`,
        explanation: `### Throttle Implementation Details\n\n- **Rate Limiting**: Enforces a guaranteed execution ceiling of 1 call per \`limitMs\`.\n- **Trailing Call Guarantee**: Remembers the latest arguments invoked during the lockout period and executes immediately once the window elapses.\n- **Type Safe**: Fully typed with TypeScript generics and \`Parameters<T>\`.\n- **Complexity**: $O(1)$ runtime invocation overhead and $O(1)$ space.`,
        complexity: 'O(1) Time, O(1) Memory',
      };
    }

    return {
      isCode: true,
      language: 'typescript',
      title: 'Production-Ready Debounce with Cancellation in TypeScript',
      code: `/**
 * Debounces a function execution until \`delayMs\` milliseconds have elapsed
 * since the last time it was invoked. Includes a .cancel() method.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delayMs);
  };

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}`,
      explanation: `### Debounce Architectural Highlights\n\n- **Lexical Closure**: Captures the timeout reference cleanly without polluting the outer scope.\n- **Cancellation Hook**: Includes \`.cancel()\` to prevent unmounted component state updates.\n- **Generics**: Preserves argument and return signatures automatically.`,
      complexity: 'O(1) Time, O(1) Memory',
    };
  }

  // 2. LRU Cache Implementation
  if (lower.includes('lru cache') || lower.includes('lru')) {
    return {
      isCode: true,
      language: 'typescript',
      title: 'LRU (Least Recently Used) Cache with O(1) Get & Put',
      code: `class DoublyNode<K, V> {
  key: K;
  val: V;
  prev: DoublyNode<K, V> | null = null;
  next: DoublyNode<K, V> | null = null;

  constructor(key: K, val: V) {
    this.key = key;
    this.val = val;
  }
}

export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, DoublyNode<K, V>> = new Map();
  private head: DoublyNode<K, V>;
  private tail: DoublyNode<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    // Dummy sentinel nodes to avoid boundary null checks
    this.head = new DoublyNode<K, V>(null as any, null as any);
    this.tail = new DoublyNode<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) return undefined;
    this.moveToHead(node);
    return node.val;
  }

  public put(key: K, value: V): void {
    const existing = this.cache.get(key);
    if (existing) {
      existing.val = value;
      this.moveToHead(existing);
      return;
    }

    if (this.cache.size >= this.capacity) {
      // Evict least recently used (node before tail)
      const lru = this.tail.prev!;
      this.removeNode(lru);
      this.cache.delete(lru.key);
    }

    const newNode = new DoublyNode(key, value);
    this.addHead(newNode);
    this.cache.set(key, newNode);
  }

  private addHead(node: DoublyNode<K, V>): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: DoublyNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToHead(node: DoublyNode<K, V>): void {
    this.removeNode(node);
    this.addHead(node);
  }
}`,
      explanation: `### LRU Cache Architecture\n\n- **Hash Map + Doubly Linked List**: Hash map delivers $O(1)$ key lookup, while the doubly linked list maintains access recency order without expensive array shifting.\n- **Sentinel Nodes**: Using dummy \`head\` and \`tail\` sentinels eliminates edge-case conditionals during insertion and removal.\n- **Complexity**: $O(1)$ time for both \`get\` and \`put\`, $O(C)$ space where $C$ is maximum capacity.`,
      complexity: 'O(1) Time Get/Put, O(C) Auxiliary Space',
    };
  }

  // 3. Binary Search / Sorting Algorithms
  if (lower.includes('quicksort') || lower.includes('quick sort')) {
    return {
      isCode: true,
      language: 'typescript',
      title: 'In-Place QuickSort with Hoare Partitioning',
      code: `export function quickSort<T>(arr: T[], low = 0, high = arr.length - 1): T[] {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition<T>(arr: T[], low: number, high: number): number {
  const pivot = arr[Math.floor(low + (high - low) / 2)];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);

    if (i >= j) return j;

    // Swap elements at i and j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}`,
      explanation: `### QuickSort Analysis\n\n- **Hoare Partition Scheme**: More efficient than Lomuto partitioning because it performs roughly three times fewer swaps on average.\n- **Average Time Complexity**: $O(n \\log n)$.\n- **Worst Case**: $O(n^2)$ (mitigated by choosing middle/median pivot).\n- **Space**: $O(\\log n)$ recursive stack depth.`,
      complexity: 'O(n log n) Average Time, O(log n) Space',
    };
  }

  // 4. React Custom Hook: useDebounce / useLocalStorage / useFetch
  if (lower.includes('uselocalstorage') || (lower.includes('local storage') && lower.includes('hook'))) {
    return {
      isCode: true,
      language: 'tsx',
      title: 'Type-Safe useLocalStorage Hook with Cross-Tab Sync',
      code: `import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Read initial stored value or fallback
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        // Dispatch custom event for cross-component sync in same window
        window.dispatchEvent(new Event('local-storage-change'));
      } catch (error) {
        console.warn(\`Error setting localStorage key "\${key}":\`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());
    const handleStorageChange = (e: StorageEvent | Event) => {
      if ('key' in e && e.key !== key) return;
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-change', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}`,
      explanation: `### Features of \`useLocalStorage\`\n\n1. **Lazy Initialization**: Reads from \`localStorage\` only during mount to keep render performance fast.\n2. **Cross-Tab & Same-Window Sync**: Listens to native \`storage\` events for multi-tab synchronization as well as local custom events.\n3. **Functional Updater Support**: Allows setting state via \`setValue(prev => ...)\` identical to standard \`useState\`.`,
    };
  }

  // 5. Python Data Science / Async / Fast Algorithms
  if (lower.includes('python') && (lower.includes('decorator') || lower.includes('fibonacci') || lower.includes('async'))) {
    return {
      isCode: true,
      language: 'python',
      title: 'Python Memoization Decorator & Execution Timer',
      code: `import time
import functools
from typing import Callable, Any

def timed_lru_cache(maxsize: int = 128) -> Callable:
    """Decorator that caches function results and logs total execution time."""
    def decorator(func: Callable) -> Callable:
        # Wrap with built-in fast LRU cache
        cached_func = functools.lru_cache(maxsize=maxsize)(func)

        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            start_time = time.perf_counter()
            result = cached_func(*args, **kwargs)
            duration_ms = (time.perf_counter() - start_time) * 1000
            print(f"[METRIC] {func.__name__} took {duration_ms:.4f}ms")
            return result

        wrapper.cache_info = cached_func.cache_info
        wrapper.cache_clear = cached_func.cache_clear
        return wrapper
    return decorator

@timed_lru_cache(maxsize=256)
def fibonacci(n: int) -> int:
    """Calculates nth Fibonacci number with O(n) memoized runtime."""
    if n < 0:
        raise ValueError("n must be non-negative")
    if n in (0, 1):
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

if __name__ == "__main__":
    print(f"Fib(50) = {fibonacci(50)}")
    print(f"Cache Statistics: {fibonacci.cache_info()}")`,
      explanation: `### Python Implementation Details\n\n- **\`functools.wraps\`**: Preserves original function metadata (docstring, name, type annotations).\n- **Performance**: Transforms the naive exponential $O(2^n)$ Fibonacci tree into linear $O(n)$ with $O(1)$ subsequent cache hits.`,
    };
  }

  // 6. SQL Query builder / Complex Aggregations
  // Bare "join" and "query" are ordinary English words outside a database context ("can you join
  // the VC?", "I have a query about..."), so they only count here alongside an explicit SQL/table/
  // database signal — or as a real "inner/left/right/outer join" phrase, which is unambiguous.
  const hasSqlContext = /\b(sql|postgres|mysql|database|table)\b/i.test(lower);
  const hasJoinPhrase = /\b(?:inner|left|right|outer|full|cross)\s+join\b/i.test(lower) || (lower.includes('join') && hasSqlContext);
  const hasQueryInSqlContext = lower.includes('query') && hasSqlContext;
  // "what is a primary key in sql" / "how do you select all rows in sql" are asking for a
  // concept explanation, not a query to generate — but the bare "sql" keyword used to fire this
  // branch unconditionally, so every SQL-related definition question got the same canned
  // advanced CTE/window-function example back instead of an actual answer to what was asked.
  // Skip this branch for those and let them fall through to the knowledge corpus.
  const isSqlDefinitionQuestion =
    /^(?:what\s+(?:is|are|does)|define|explain\s+what|how\s+do\s+you|how\s+to)\b/i.test(lower.trim()) &&
    !/\b(write|generate|create|build|make\s+me|show\s+me\s+(?:a|an|some)\s+(?:query|code))\b/i.test(lower);
  if (!isSqlDefinitionQuestion && (lower.includes('sql') || hasQueryInSqlContext || hasJoinPhrase || lower.includes('group by'))) {
    return {
      isCode: true,
      language: 'sql',
      title: 'Advanced PostgreSQL Query with Window Functions & CTEs',
      code: `-- Analyze customer purchase metrics with running totals and ranking
WITH monthly_customer_sales AS (
  SELECT
    c.id AS customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    DATE_TRUNC('month', o.created_at) AS sale_month,
    COUNT(o.id) AS total_orders,
    SUM(o.total_amount) AS monthly_revenue
  FROM customers c
  INNER JOIN orders o ON c.id = o.customer_id
  WHERE o.status = 'completed'
    AND o.created_at >= NOW() - INTERVAL '12 months'
  GROUP BY c.id, c.first_name, c.last_name, DATE_TRUNC('month', o.created_at)
)
SELECT
  customer_id,
  customer_name,
  sale_month,
  total_orders,
  monthly_revenue,
  -- Compute rolling cumulative spend
  SUM(monthly_revenue) OVER (
    PARTITION BY customer_id
    ORDER BY sale_month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_spend,
  -- Rank customers by monthly revenue within each month
  DENSE_RANK() OVER (
    PARTITION BY sale_month
    ORDER BY monthly_revenue DESC
  ) AS monthly_revenue_rank
FROM monthly_customer_sales
ORDER BY sale_month DESC, monthly_revenue_rank ASC;`,
      explanation: `### SQL Optimization Highlights\n\n- **Common Table Expression (CTE)**: Modularizes aggregation logic before applying window operations.\n- **Window Functions**: Computes cumulative revenue (\`SUM() OVER\`) and relative tiering (\`DENSE_RANK()\`) without repetitive subqueries.\n- **Index Recommendations**: Ensure composite index on \`orders(customer_id, status, created_at)\` for optimal B-Tree index scan.`,
    };
  }

  // 7. Regex / Regular Expression generator
  if (lower.includes('regex') || lower.includes('regular expression')) {
    return {
      isCode: true,
      language: 'regex',
      title: 'Strict RFC 5322 Email Validation Regular Expression',
      code: `^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`,
      explanation: `### Breakdown of Regex Components\n\n- \`^\` ... \`$\`: Asserts match across the entire string boundary.\n- \`[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+\`: Matches compliant local-part characters.\n- \`@\`: Explicit separator.\n- \`[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\`: Complies with DNS label length constraints (up to 63 chars, no leading/trailing hyphens).\n- \`\\. ... \`: Enforces valid domain extension hierarchy.`,
    };
  }

  return null;
}
