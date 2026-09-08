import { KnowledgeItem } from '../../types';

// Batch 105 (computer networking). Mostly OK (TCP/UDP, 3-way handshake, DNS,
// IPv4/IPv6, router vs switch, HTTP/HTTPS, VPN, bandwidth vs latency, ARP,
// internet vs WWW). Real misses on nexus-4b: "default gateway" was answered
// about a sovereign-debt default; "DHCP", "subnet mask", "CIDR notation" were
// raw web dumps; "OSI model" claimed "TCP/IP boils it down to four: ip, tcp,
// http" and that Patrick invented it; "hub switch and router" never mentioned
// the hub; "proxy server" said it was "basically a VPN" and encrypts (it does
// not); "packet loss" described packet switching without saying what loss is.
export const NETWORKING_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-default-gateway',
    title: 'What a Default Gateway Is',
    category: 'Networking',
    keywords: [
      'what is a default gateway', 'default gateway ip address of the router your device sends packets to for destinations not on your own subnet', 'the door out of the local network toward everywhere else',
      'without a default gateway a device can only talk to its own subnet', 'default gateway usually the router 192.168.1.1', 'default gateway is not a debt default',
    ],
    content: `A default gateway is the IP address of the router that a device uses to reach anything that is NOT on its own local network. When your computer wants to send a packet, it compares the destination address with its own subnet: if the destination is on the same subnet it sends the packet directly to that device; if it is anywhere else — another network, or the internet — it hands the packet to the default gateway and lets the router figure out where to send it next. On a home network the default gateway is typically the router itself, at an address like 192.168.1.1. If a device has no default gateway configured (or the wrong one), it can still talk to other devices on its own subnet but cannot reach the internet at all. (This is a networking term and has nothing to do with a government defaulting on its debt.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dhcp-detail',
    title: 'What DHCP Is and How It Works',
    category: 'Networking',
    keywords: [
      'what is dhcp', 'dynamic host configuration protocol automatically assigns a device an ip address subnet mask default gateway and dns servers', 'dhcp dora exchange discover offer request acknowledge',
      'dhcp lease with expiry and renewal', 'dhcp server runs on the home router', 'static ip vs dhcp assigned',
    ],
    content: `DHCP (Dynamic Host Configuration Protocol) is what lets a device join a network and get online without anyone configuring it by hand. When a device connects, it goes through a four-step exchange, often remembered as DORA: it broadcasts a DISCOVER ("is there a DHCP server?"); a DHCP server replies with an OFFER containing a proposed IP address; the device broadcasts a REQUEST accepting that offer; the server sends an ACKNOWLEDGE confirming it and supplying the full configuration — the IP address, the subnet mask, the default gateway, and the DNS server addresses. The assignment is a "lease" with an expiry time; the device renews it periodically, and if it leaves the network the address eventually returns to the pool for reuse. On a home network the DHCP server is built into the router. Devices that must keep a fixed address (servers, printers) are instead given a static IP or a DHCP reservation tied to their MAC address.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-subnet-mask',
    title: 'What a Subnet Mask Is',
    category: 'Networking',
    keywords: [
      'what is a subnet mask', 'subnet mask 32-bit value that splits an ip address into a network portion and a host portion', 'one bits mark the network part zero bits mark the host part 255.255.255.0',
      'device ands its ip with its mask to know its own network', 'compare destination to decide same network send directly or different network send to the gateway', 'slash 24 means 24 network bits 254 usable hosts',
    ],
    content: `A subnet mask is a 32-bit number, written like an IP address (for example 255.255.255.0), that tells a device which part of an IP address identifies the network and which part identifies the individual host on it. Written in binary, the leading 1-bits mark the network portion and the trailing 0-bits mark the host portion — 255.255.255.0 is 24 ones then 8 zeros, so the first 24 bits are the network and the last 8 (256 values, 254 of them usable for hosts) identify the host. A device uses the mask two ways: it performs a bitwise AND of its own IP with the mask to learn its own network address, and it does the same with any destination address — if the result matches its own network, the destination is local and it sends the packet directly; if not, the destination is remote and the packet goes to the default gateway. The same information written as "/24" after an address is CIDR notation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cidr-notation',
    title: 'What CIDR Notation Is',
    category: 'Networking',
    keywords: [
      'what is cidr notation', 'cidr classless inter-domain routing ip address with a slash and a number for the prefix length', 'the number is how many leading bits are the network prefix 192.168.1.0/24',
      'replaced the rigid class a b c system with flexible sized blocks', 'slash 24 is 256 addresses slash 16 is 65536 each step doubles or halves the block', 'used in routing tables and firewall rules',
    ],
    content: `CIDR (Classless Inter-Domain Routing) notation writes an IP network as an address followed by a slash and a number, like 192.168.1.0/24 or 10.0.0.0/8. The number after the slash — the "prefix length" — is how many of the leading bits are fixed as the network portion; the remaining bits are available for hosts. So /24 fixes 24 bits and leaves 8 for hosts (256 addresses, 254 usable); /16 leaves 16 host bits (65,536 addresses); /32 is a single address; /0 is "everything." Every step down in the number doubles the block size. CIDR was introduced in 1993 to replace the old "classful" system, which only allowed fixed network sizes of roughly 256 (Class C), 65,000 (Class B) or 16 million (Class A) addresses — hugely wasteful. CIDR lets address blocks be sized to actual need and lets routers combine ("aggregate") many small routes into one entry, keeping the internet's routing tables manageable. It appears constantly in routing tables, firewall rules, and cloud network configuration.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-osi-model',
    title: 'What the OSI Model Is',
    category: 'Networking',
    keywords: [
      'what is the osi model in networking', 'osi model seven layers physical data link network transport session presentation application', 'layer 1 physical cables radio layer 2 data link ethernet mac switches layer 3 network ip routers',
      'layer 4 transport tcp udp ports layer 7 application http dns smtp', 'osi is a conceptual teaching model tcp-ip practical model has four or five layers', 'encapsulation each layer adds its own header',
    ],
    content: `The OSI (Open Systems Interconnection) model is a conceptual framework that divides everything a network does into seven stacked layers, each with a defined job, so that different technologies can interoperate and problems can be reasoned about layer by layer. From the bottom: (1) Physical — the actual signals on cables, fibre or radio; (2) Data Link — framing and local delivery on one network segment, where Ethernet, MAC addresses and switches live; (3) Network — addressing and routing between networks, where IP and routers live; (4) Transport — end-to-end delivery, reliability and port numbers, where TCP and UDP live; (5) Session — setting up, managing and tearing down conversations; (6) Presentation — data format, character encoding, compression and encryption; (7) Application — the protocols programs actually use, such as HTTP, DNS, SMTP. A common mnemonic is "Please Do Not Throw Sausage Pizza Away." Each layer adds its own header as data goes down the stack (encapsulation) and strips it on the way up. The OSI model is primarily a teaching and design tool; the TCP/IP model that the real internet runs on is simpler, collapsing OSI layers 5–7 into a single "Application" layer and often layers 1–2 into one "Link" layer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hub-switch-router',
    title: 'Hub vs Switch vs Router',
    category: 'Networking',
    keywords: [
      'what is the difference between a hub switch and a router', 'hub obsolete repeats every incoming signal out every other port one collision domain half duplex', 'switch learns which mac address is on which port forwards frames only to the right port full duplex layer 2',
      'router connects different networks forwards based on ip address boundary between lan and internet layer 3', 'home router also does nat dhcp firewall wifi', 'hub is dumb switch is smart router routes',
    ],
    content: `These three devices connect things, at increasing levels of intelligence. A HUB (now obsolete) is a dumb repeater: any signal arriving on one port is blasted out of every other port. Every device shares one "collision domain," everyone can see everyone else's traffic, and only one device can transmit at a time (half duplex). A SWITCH is the modern replacement: it learns which device (MAC address) is connected to which port by watching traffic, and then forwards each Ethernet frame only out the single port where its destination lives. Every port is its own collision domain, devices can send and receive at the same time (full duplex), and it operates at OSI layer 2. A ROUTER connects different networks to each other and decides where to send traffic based on IP address (layer 3). It is the boundary between your local network and the internet, maintaining a routing table and a default route out. Home "routers" are actually combo boxes: a router, an Ethernet switch, a Wi-Fi access point, plus NAT, DHCP and a firewall in one unit.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-proxy-server',
    title: 'What a Proxy Server Is',
    category: 'Networking',
    keywords: [
      'what is a proxy server', 'proxy server an intermediary that makes requests on your behalf traffic goes to the proxy which forwards it and returns the response',
      'forward proxy used by clients filtering caching hiding client ip bypassing geo restrictions', 'reverse proxy sits in front of servers load balancing tls termination caching waf nginx cloudflare',
      'proxy usually works per-application and does not necessarily encrypt unlike a vpn',
    ],
    content: `A proxy server is a machine that sits between a client and a destination server and relays requests: instead of connecting to the website directly, your application connects to the proxy, the proxy makes the request to the website, and it passes the response back to you. A FORWARD proxy acts on behalf of clients — organisations use it to filter and log web access, to cache popular content, to hide the client's real IP, or to appear to be browsing from another country. A REVERSE proxy acts on behalf of servers — it sits in front of one or more web servers and handles load balancing, TLS encryption/decryption, caching, compression, and web-application-firewall filtering, so the back-end servers are simpler and hidden (nginx, HAProxy, and Cloudflare work this way). A proxy differs from a VPN: a VPN encrypts and tunnels all of a device's traffic at the network level, whereas a plain proxy typically handles one application's traffic (often just HTTP) and does not necessarily encrypt the connection between you and it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-packet-loss',
    title: 'What Packet Loss Is and What Causes It',
    category: 'Networking',
    keywords: [
      'what is packet loss and what causes it', 'packet loss when one or more packets fail to reach their destination', 'main cause network congestion router queues fill and packets are dropped',
      'other causes weak wifi or faulty cabling overloaded or failing hardware routing errors rate limiting', 'tcp retransmits lost packets lower throughput udp just loses the data glitchy voice video games',
      'measured as a percentage even 1 to 2 percent degrades real time apps',
    ],
    content: `Packet loss is when packets sent across a network never arrive at their destination. The most common cause is congestion: when a router or link receives more traffic than it can forward, its buffers fill up and it simply drops the excess packets. Other causes include a weak or interference-heavy Wi-Fi signal, damaged or marginal cabling, network hardware that is overloaded or failing, misconfigured routing, and deliberate rate-limiting or traffic policing. The effect depends on the protocol: TCP detects the loss and retransmits the missing data, so the connection still works but throughput drops and latency rises; UDP does not retransmit, so the data is just gone — which shows up as glitches, dropouts, or rubber-banding in voice calls, video, and online games. Packet loss is measured as a percentage of packets lost, and even 1–2% is enough to noticeably degrade real-time applications, while file downloads over TCP tolerate it better.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nat-detail',
    title: 'How NAT (Network Address Translation) Works',
    category: 'Networking',
    keywords: [
      'what is nat network address translation', 'nat lets many devices share one public ip the router rewrites source ip and port on outgoing packets', 'nat translation table maps replies back to the right internal device pat nat overload',
      'nat is why you cannot be reached from outside without port forwarding', 'nat helped delay ipv4 address exhaustion', 'nat provides incidental privacy not a real firewall',
    ],
    content: `NAT lets a whole network of devices, each with a private IP address, share a single public IP address on the internet. When a device sends a packet out, the router rewrites the packet's source address from the private IP to the router's public IP, and also usually changes the source port, recording the mapping in a translation table. When the reply comes back to that public IP and port, the router looks up the table and rewrites the destination back to the original private device. Because one public address is multiplexed across many internal devices by port, this common form is called PAT ("port address translation") or "NAT overload." Consequences: it dramatically slowed the exhaustion of IPv4 addresses; it means outside hosts cannot initiate a connection to a device behind the NAT unless you set up port forwarding; and it provides incidental privacy (external sites see only the shared public IP), though NAT is not a substitute for a real firewall.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-mac-address-detail',
    title: 'What a MAC Address Is',
    category: 'Networking',
    keywords: [
      'what is a mac address', 'mac address 48-bit hardware address burned into a network interface', 'first 24 bits identify the manufacturer oui last 24 bits are device specific',
      'used for delivery within a local network segment layer 2 not routable across the internet', 'mac address vs ip address hardware vs logical', 'mac address can be spoofed or randomized for privacy',
    ],
    content: `A MAC (Media Access Control) address is a 48-bit identifier assigned to a network interface — the Ethernet or Wi-Fi hardware in a device — usually written as six pairs of hex digits like 3C:5A:B4:12:9F:07. The first half (24 bits, the "OUI") identifies the manufacturer of the interface; the second half is assigned by that manufacturer to be unique. Its role is local delivery: within a single network segment, switches and devices use MAC addresses to send frames to the correct piece of hardware (OSI layer 2). This is different from an IP address, which is a logical address used to route between networks (layer 3) and which can change depending on where a device connects. MAC addresses are not carried across the internet — each router rewrites the layer-2 addressing for the next hop. They can be changed in software ("spoofed"), and modern phones and laptops deliberately randomise their MAC per network for privacy so they cannot be tracked across locations.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-public-vs-private-ip',
    title: 'Public vs Private IP Addresses',
    category: 'Networking',
    keywords: [
      'what is the difference between a public and a private ip address', 'private ip ranges 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 reserved not routable on the public internet reused everywhere',
      'public ip globally unique assigned by your isp', 'nat bridges private addresses to a shared public address', 'check your public ip vs your local 192.168 address', 'private ip only meaningful inside its own network',
    ],
    content: `Every device on a network has an IP address, but there are two kinds. PRIVATE IP addresses come from three ranges reserved by standard for internal use — 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 — and are not routable on the public internet. The same private addresses (192.168.1.10, say) are reused in millions of separate homes and offices simultaneously, and they only have meaning inside their own local network. PUBLIC IP addresses are globally unique, handed out through the regional internet registries to ISPs and organisations, and are what the rest of the internet uses to reach you. A home network has one public IP (assigned by the ISP to the router) and many private IPs behind it, with NAT on the router translating between them. This is why the address your computer shows locally (192.168.x.x) is different from the address a website sees you coming from.`,
    createdAt: Date.now(),
  },
];
