import { KnowledgeItem } from '../../types';

// Batch 114 (cryptocurrency & blockchain). Base was OK (blockchain, PoW vs PoS,
// wallets, mining, smart contracts, hot/cold wallet, seed phrase, halving,
// public address vs private key, Layer 2). Real problems on nexus-4b:
// "custodial vs non-custodial" returned the UN Bangkok Rules on women prisoners
// and a passage on types of rape; "gas in ethereum" and "decentralized vs
// centralized exchange" were web dumps; "51 percent attack" was a flat refusal
// ("makes no sense to me"); "bitcoin vs ethereum" claimed Ethereum is built on
// top of Bitcoin's blockchain; "NFT" only defined the word "mint".
export const CRYPTOCURRENCY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-custodial-vs-non-custodial',
    title: 'Custodial vs Non-Custodial (Crypto)',
    category: 'Cryptocurrency',
    keywords: [
      'what is the difference between custodial and non-custodial', 'custodial a third party exchange or broker holds your private keys and actually controls your crypto you have an account with a password not your keys not your coins',
      'non-custodial you hold your own private keys and seed phrase metamask hardware wallet full control cannot be frozen but no password reset and no support', 'ftx celsius collapses wiped out custodial users',
      'lose the seed phrase or get phished on a non-custodial wallet and it is gone permanently',
    ],
    content: `The distinction is about who holds the private keys that actually control the crypto. In a CUSTODIAL arrangement, a third party — a centralized exchange or broker like Coinbase or Binance — holds the keys on your behalf. You have an ordinary account with a username and password, you can reset that password, and customer support can help you, but you are trusting the company to stay solvent, honest, and un-hacked; when FTX, Celsius, and Mt. Gox failed or were breached, custodial users lost their funds because they never controlled the keys. The crypto maxim "not your keys, not your coins" is about this. In a NON-CUSTODIAL wallet (MetaMask, a hardware wallet like a Ledger, most self-hosted software wallets), you and only you hold the private keys / seed phrase. No company can freeze your funds or lock you out — but there is also no password reset and no support line: if you lose the seed phrase, or get tricked into revealing it or signing a malicious transaction, the money is gone with no recourse. (This has nothing to do with "custodial" as used in criminal justice or the UN Bangkok Rules.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ethereum-gas',
    title: 'What Gas Is in Ethereum Transactions',
    category: 'Cryptocurrency',
    keywords: [
      'what is gas in ethereum transactions', 'gas the unit measuring the computational work an ethereum operation requires every transaction and smart contract step costs a set amount of gas',
      'you pay a gas price in gwei a billionth of an ether per unit total fee equals gas used times gas price', 'gas price floats with network demand congestion means expensive you set a gas limit to cap what you will spend failed transactions still consume gas',
      'gas pays validators and stops infinite loops and spam eip-1559 burned base fee plus a priority tip',
    ],
    content: `"Gas" is the unit that measures how much computational work an action on Ethereum takes. Sending ETH costs a fixed 21,000 gas; each operation inside a smart contract (storing data, doing arithmetic, calling another contract) has its own gas cost. To get a transaction processed you pay a fee for the gas it uses, priced in "gwei" (one billionth of an ether). The total fee is roughly gas used × gas price, and the gas price floats with demand — when the network is congested, everyone bids higher and fees spike. You also set a "gas limit," the maximum gas you're willing to spend; if a transaction runs out of gas it fails but you still pay for the work done up to that point. Gas exists for two reasons: it compensates the validators who execute and store the computation, and it makes spam and infinite loops economically impossible. Since the EIP-1559 upgrade, the fee is split into a "base fee" (set by the protocol and permanently burned, removing that ETH from supply) plus an optional "priority fee" or tip that goes to the validator to get you included faster.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-51-percent-attack',
    title: 'What a 51% Attack Is',
    category: 'Cryptocurrency',
    keywords: [
      'what is a 51 percent attack', 'a single entity controls more than half of a blockchains mining power proof of work or staked coins proof of stake',
      'lets them exclude or reorder transactions block transactions and double spend by secretly mining an alternative chain then releasing the longer one', 'they cannot steal coins from arbitrary wallets change the protocol rules or alter old confirmed transactions',
      'big chains bitcoin ethereum are effectively immune due to cost smaller coins ethereum classic bitcoin gold have been 51 percent attacked',
    ],
    content: `A 51% attack (or "majority attack") is when one entity gains control of more than half of a blockchain's block-producing power — the hash rate on a proof-of-work chain, or the staked coins on a proof-of-stake chain. That majority lets the attacker do a limited set of harmful things: censor transactions (refuse to include specific ones), reorder transactions, and — the real danger — "double-spend." To double-spend, the attacker secretly builds an alternative version of the chain in private while, on the public chain, they spend coins (say, deposit them on an exchange and withdraw something of value). Then they publish their secret chain; because it is longer, the network adopts it, erasing the original spend while the attacker keeps what they bought. What a 51% attacker CANNOT do: steal coins from wallets they don't have the keys to, create coins out of nothing, change the protocol rules, or rewrite old, deeply-buried transactions. Large chains like Bitcoin and Ethereum are effectively safe because acquiring that much hash rate or stake would cost billions and the attack would crater the coin's value; but several smaller proof-of-work coins, including Ethereum Classic and Bitcoin Gold, have genuinely been 51%-attacked.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nft-detail',
    title: 'What an NFT Is',
    category: 'Cryptocurrency',
    keywords: [
      'what is an nft', 'non-fungible token a unique blockchain record usually on ethereum via the erc-721 standard that points to a specific digital item and records who owns it',
      'non-fungible means each one is unique and not interchangeable unlike a bitcoin or a dollar', 'the token proves provenance and ownership on chain the actual media file is usually stored elsewhere ipfs or a server the token does not grant copyright',
      'used for digital art collectibles music in game assets domain names speculative bubble peaked 2021 to 2022',
    ],
    content: `NFT stands for "non-fungible token." "Fungible" means interchangeable — any one bitcoin or dollar is identical in value to any other. An NFT is deliberately the opposite: a unique entry on a blockchain (most are on Ethereum, created using the ERC-721 or ERC-1155 token standards) with its own ID that cannot be swapped one-for-one with another. Each NFT points to a particular item — a piece of digital art, a profile-picture collectible, a music track, an in-game weapon, an event ticket, a blockchain domain name — and the chain publicly records the current owner and the full history of transfers, providing verifiable provenance. Important limits: the actual image or media file is normally NOT stored on the blockchain (it lives on IPFS or an ordinary web server, and can break or change), and owning the token does not by itself give you copyright or any legal rights to the underlying work unless the seller separately grants them. NFTs saw a large speculative bubble in 2021-2022 that then collapsed, with most collections losing the majority of their value.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dex-vs-cex',
    title: 'Decentralized Exchange vs Centralized Exchange',
    category: 'Cryptocurrency',
    keywords: [
      'what is a decentralized exchange versus a centralized exchange', 'centralized exchange coinbase binance kraken a company holds your funds matches buyers and sellers on its own order book requires id kyc you trust it not to fail or get hacked mt gox ftx',
      'decentralized exchange uniswap pancakeswap smart contracts you trade directly from your own wallet no signup no custody liquidity pools automated market maker instead of an order book',
      'dex downsides you hold your own keys gas fees slippage scam tokens no recourse for mistakes',
    ],
    content: `A CENTRALIZED EXCHANGE (CEX) — Coinbase, Binance, Kraken — is a company. You sign up, pass identity verification (KYC), and deposit your crypto or cash into accounts the company controls. It runs an internal order book matching buyers and sellers, holds custody of everyone's funds, and offers a familiar app, customer support, and fiat on/off ramps. The trade-off is trust: you're relying on the company to be solvent and secure, and its failure or fraud takes user funds with it (Mt. Gox in 2014, FTX in 2022). A DECENTRALIZED EXCHANGE (DEX) — Uniswap, PancakeSwap, Curve — is a set of smart contracts with no company in the middle. You connect your own wallet and trade directly from it, with no account, no KYC, and no one taking custody of your coins. Most DEXs don't use an order book at all; they use "liquidity pools" — pots of two tokens supplied by users — and an automated market-maker formula that sets the price from the pool ratio. The downsides: you are fully responsible for your own keys and for checking that a token isn't a scam, you pay network gas fees on every trade, large trades suffer "slippage" against the pool, and if you send to the wrong place or approve a malicious contract, no one can reverse it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bitcoin-vs-ethereum-detail',
    title: 'Bitcoin vs Ethereum',
    category: 'Cryptocurrency',
    keywords: [
      'what is the difference between bitcoin and ethereum', 'bitcoin launched 2009 by the pseudonymous satoshi nakamoto designed as digital money and a store of value fixed 21 million supply proof of work',
      'ethereum launched 2015 a programmable blockchain that runs smart contracts and decentralized apps switched to proof of stake in 2022 no hard supply cap', 'ethereum is its own independent blockchain not built on top of bitcoin',
      'bitcoin is deliberately simple and hard to change ethereum is a general purpose computing platform', 'ether eth is the native coin used to pay gas fees',
    ],
    content: `Bitcoin and Ethereum are separate, independent blockchains with different purposes. BITCOIN (launched 2009 by the pseudonymous Satoshi Nakamoto) was designed to be peer-to-peer digital money and, increasingly, a scarce "store of value" — often called digital gold. Its supply is capped at 21 million coins, its scripting ability is deliberately minimal, and it changes very slowly and conservatively; it uses proof-of-work mining. ETHEREUM (launched 2015, led by Vitalik Buterin and others) is a general-purpose "world computer": a blockchain that runs arbitrary programs (smart contracts) and hosts decentralized applications — token issuance, lending platforms, DEXs, NFT marketplaces, DAOs. Its native coin, ether (ETH), is used to pay "gas" fees for that computation. Ethereum switched from proof-of-work to proof-of-stake in 2022 (cutting its energy use by ~99.9%) and has no fixed supply cap (though fee-burning can make it deflationary). A common misconception: Ethereum is NOT built on top of Bitcoin — it is its own network with its own validators and security. The reason there are thousands of "tokens" but few "coins" is that a token is just a smart contract deployed on a chain like Ethereum, whereas a coin requires launching an entire blockchain.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stablecoin-types',
    title: 'How Stablecoins Stay Pegged (Three Types)',
    category: 'Cryptocurrency',
    keywords: [
      'what is a stablecoin and how does it stay pegged', 'fiat collateralized usdc usdt one real dollar or treasury bill held per token redeemable arbitrage keeps the price near a dollar',
      'crypto collateralized dai over collateralized with eth and other crypto positions liquidated automatically if the collateral falls', 'algorithmic no real backing a mint and burn mechanism targets the peg the type that collapsed with terrausd luna in 2022',
      'stablecoin risks reserve transparency de-pegging bank runs regulation',
    ],
    content: `A stablecoin is a crypto token designed to hold a steady value, almost always $1. There are three main designs. FIAT-COLLATERALIZED (USDC, Tether/USDT — the largest by far): the issuer claims to hold one real dollar or dollar-equivalent (cash, short-term Treasuries) in reserve for every token, and lets large holders redeem tokens for dollars, so arbitrageurs buy the token whenever it dips below $1 and redeem it, pushing the price back. The risk is whether the reserves are actually there and fully liquid. CRYPTO-COLLATERALIZED (DAI): each token is backed by more than $1 of volatile crypto (ETH and others) locked in smart contracts; if the collateral's value falls toward the debt, the position is automatically liquidated to keep the system solvent. It's more transparent but capital-inefficient. ALGORITHMIC (the failed model): no real assets back it — a smart contract tries to hold the peg by minting new tokens when the price is high and burning them (or swapping to a paired "governance" token) when it's low. This is fragile, and TerraUSD (UST) with its partner token Luna collapsed from ~$18 billion to near zero in a few days in May 2022 when confidence broke and the mechanism spiralled.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-coin-vs-token',
    title: 'Coin vs Token (Crypto)',
    category: 'Cryptocurrency',
    keywords: [
      'what is the difference between a coin and a token', 'a coin is the native asset of its own blockchain btc on bitcoin eth on ethereum sol on solana used to pay fees and secure the network',
      'a token is created by a smart contract on top of an existing blockchain erc-20 for fungible tokens erc-721 for nfts and relies on that host chains security', 'making a token takes minutes making a coin means launching a whole network',
      'stablecoins and most defi and meme assets are tokens not coins',
    ],
    content: `A COIN is the built-in, native currency of its own blockchain: Bitcoin (BTC) on the Bitcoin network, Ether (ETH) on Ethereum, SOL on Solana, ADA on Cardano. The coin is what you use to pay that chain's transaction fees, and (in proof-of-work or proof-of-stake) it's what secures the network through mining rewards or staking. Creating a new coin means designing and launching an entire blockchain with its own nodes and consensus. A TOKEN is created by deploying a smart contract on top of an existing blockchain, and it inherits that host chain's security and pays fees in that chain's coin. Standards define token behaviour — ERC-20 for interchangeable (fungible) tokens on Ethereum, ERC-721 for NFTs, with equivalents on other chains (SPL on Solana, BEP-20 on BNB Chain). Because deploying a contract takes minutes and a few dollars of gas, there are hundreds of thousands of tokens: stablecoins (USDC, DAI), governance tokens, DeFi protocol tokens, and meme coins are almost all tokens, not coins.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-defi-detail',
    title: 'What DeFi (Decentralized Finance) Is',
    category: 'Cryptocurrency',
    keywords: [
      'what is defi decentralized finance', 'defi recreates financial services as permissionless smart contracts anyone can use without a bank or broker lending borrowing aave compound trading uniswap derivatives stablecoins yield',
      'benefits open access transparency composability money legos', 'risks smart contract bugs and hacks no consumer protection oracle manipulation impermanent loss often anonymous teams',
      'total value locked tvl overcollateralized loans flash loans',
    ],
    content: `DeFi ("decentralized finance") is the effort to rebuild financial services — lending and borrowing, trading, market-making, derivatives, insurance, asset management, yield — as open smart contracts on public blockchains (mostly Ethereum and its Layer 2s, plus Solana and others), so anyone with a wallet can use them directly, 24/7, without opening an account at a bank or broker. Examples: Aave and Compound for lending (you supply crypto to earn interest, or borrow against collateral), Uniswap and Curve for swapping tokens, MakerDAO for the DAI stablecoin. Its selling points are permissionless access, on-chain transparency (anyone can audit the contracts and the flows), and "composability" — protocols snap together like "money legos," so the output of one can feed another. Its risks are serious and frequent: smart-contract bugs and exploits have drained billions; there is no deposit insurance or consumer protection and no one to call; "oracle" price feeds can be manipulated; liquidity providers face "impermanent loss" when pooled token prices diverge; and many projects are run by anonymous teams. The headline metric is "total value locked" (TVL), the dollar value of assets deposited in DeFi contracts.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rug-pull-mechanics',
    title: 'What a Rug Pull Is (and How It Works)',
    category: 'Cryptocurrency',
    keywords: [
      'what is a rug pull in crypto', 'rug pull the creators of a token hype it get people to buy in and add liquidity then drain the value and disappear',
      'liquidity theft the developers hold the lp tokens and withdraw the pooled funds', 'dump the team sells a huge premined allocation all at once crashing the price', 'honeypot contract a hidden backdoor that lets only the creators sell or lets them mint unlimited tokens',
      'red flags anonymous team unaudited contract unlocked liquidity huge team allocation',
    ],
    content: `A rug pull is a crypto exit scam. The developers create a new token, market it hard (influencers, Telegram/Discord hype, promises of huge returns), and get people to buy it and to deposit money into its liquidity pool on a DEX. Then they "pull the rug." The common mechanisms: (1) LIQUIDITY THEFT — the team holds the "LP tokens" representing the pool, and they simply withdraw all the pooled funds, leaving the token worthless and untradeable. (2) DUMP — the team quietly kept a large share of the total supply for themselves ("premine") and sells it all at once into the buyers, crashing the price to zero. (3) MALICIOUS CONTRACT — the token's code contains a hidden function: a "honeypot" that lets only the creators' addresses sell (everyone else can buy but not sell), or an unlimited mint function that lets the team print new tokens and drain the pool. Warning signs of a likely rug: an anonymous team, an unaudited contract, liquidity that is not "locked" or time-locked, and a large fraction of supply held by the team or a few wallets.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-block-confirmation',
    title: 'How Crypto Transactions Are Confirmed (Block Confirmations)',
    category: 'Cryptocurrency',
    keywords: [
      'how are crypto transactions confirmed and what is a block confirmation', 'a transaction is unconfirmed while it sits in the mempool waiting it becomes confirmed once a miner or validator includes it in a block',
      'each additional block built on top is another confirmation making it exponentially harder to reverse', 'exchanges typically wait for 3 to 6 confirmations for bitcoin about an hour fewer for faster chains before crediting a deposit',
      'finality proof of stake ethereum reaches economic finality after about 13 minutes two epochs',
    ],
    content: `When you send a crypto transaction it is first broadcast to the network and sits in the "mempool," a waiting area of unconfirmed transactions. It becomes CONFIRMED when a miner (proof-of-work) or validator (proof-of-stake) selects it and includes it in a new block that the network accepts — that's 1 confirmation. Every subsequent block added on top of that one counts as another confirmation, because reversing your transaction would now require an attacker to secretly rebuild that block and every block after it faster than the rest of the network builds honestly — a task whose difficulty grows exponentially with each confirmation. That's why recipients wait for a number of confirmations before treating a payment as final: exchanges commonly require about 3-6 confirmations for Bitcoin (roughly 30-60 minutes, since Bitcoin targets one block every 10 minutes), fewer on faster chains. Proof-of-stake Ethereum has a stronger notion called "finality": after about 13 minutes (two epochs) a block is economically final and cannot be reverted without a large fraction of all staked ETH being destroyed.`,
    createdAt: Date.now(),
  },
];
