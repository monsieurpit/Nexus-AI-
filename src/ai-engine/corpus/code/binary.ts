import { code } from './_k';

// Binary — used ONLY when someone explicitly asks about binary / 0s and 1s / machine code (Patrick, 2026-10-11).
// Exact conversions are computed in v2/binary.ts; these docs teach the concepts and the formats.
const c = (slug: string, title: string, keywords: string[], content: string) => code('binary', slug, title, keywords, content);

export const CODE_BINARY = [
  c('numbers', 'Binary numbers: base 2, counting, converting to/from decimal, hex and octal', ['binary numbers', 'base 2', 'convert decimal to binary', 'binary to decimal', 'hexadecimal', 'octal', 'bits and bytes', 'count in binary'],
    `Binary is base 2: each digit (bit) is 0 or 1, and each position is a power of 2, from the right: 1, 2, 4, 8, 16, 32, 64, 128...
Binary → decimal: add the powers where there's a 1. 101010 = 32 + 8 + 2 = 42. 11111111 = 255.
Decimal → binary: divide by 2 repeatedly and read the remainders bottom-up. 13 → 6 r1, 3 r0, 1 r1, 0 r1 → 1101.
Counting: 0, 1, 10, 11, 100, 101, 110, 111, 1000 (0-8).
Sizes: 1 bit; 4 bits = a nibble (0-15); 8 bits = a byte (0-255, or -128..127 signed); 16-bit = 0-65,535; 32-bit unsigned max 4,294,967,295. n bits hold 2^n values.
Hexadecimal (base 16, digits 0-9 A-F): each hex digit = exactly 4 bits, so it's shorthand for binary: 0x2A = 0010 1010 = 42, 0xFF = 1111 1111 = 255, 0xB8 = 1011 1000. Octal (base 8) = 3 bits per digit: 0o52 = 101 010 = 42.
Notation in code: 0b101010 (JS, Python, C++14, Rust, Java 7+), 0x2A hex, 0o52 octal (Python/JS). Converting in code: JS (42).toString(2), parseInt('101010', 2), n.toString(16); Python bin(42) → '0b101010', int('101010', 2), format(42, '08b') → '00101010', hex(42); C++ std::bitset<8>(42).to_string(); Java Integer.toBinaryString(42), Integer.parseInt("101010", 2).
Leading zeros don't change the value (00101010 = 101010) but bytes are usually written as 8 digits.`),

  c('text-encoding', 'Text in binary: ASCII, UTF-8, how letters become 0s and 1s', ['ascii', 'utf-8', 'text to binary', 'letters in binary', 'binary alphabet', 'character encoding', 'unicode', 'binary message'],
    `Computers store text as numbers, and numbers as bits. ASCII gives each character a number 0-127 (7 bits, stored in a byte):
'A' = 65 = 01000001, 'B' = 66 = 01000010 ... 'Z' = 90 = 01011010. 'a' = 97 = 01100001 ... 'z' = 122 = 01111010 (lowercase = uppercase + 32: the 6th bit, 00100000, is the case bit). '0' = 48 = 00110000 ... '9' = 57 = 00111001. Space = 32 = 00100000. '!' = 33 = 00100001. Newline = 10 = 00001010.
So "hi" = 01101000 01101001, "Hi!" = 01001000 01101001 00100001.
UTF-8 (the standard today) keeps ASCII as one byte and encodes other characters (é, ł, emojis) in 2-4 bytes: 'é' = 11000011 10101001; 😭 is 4 bytes. The first bits tell the length: 0xxxxxxx = 1 byte, 110xxxxx = start of 2, 1110xxxx = 3, 11110xxx = 4, 10xxxxxx = continuation.
Reading a binary message: split into 8-bit groups, convert each to a number, look the number up (01001110 = 78 = 'N').
In code: JS [...new TextEncoder().encode(s)].map(b => b.toString(2).padStart(8, '0')).join(' '); decode: new TextDecoder().decode(new Uint8Array(bits.split(' ').map(b => parseInt(b, 2)))). Python ' '.join(format(b, '08b') for b in s.encode()) and bytes(int(b, 2) for b in bits.split()).decode().`),

  c('arithmetic-bitwise', 'Binary arithmetic and bitwise operations: adding, two\'s complement, AND/OR/XOR/NOT, shifts, masks', ['binary addition', 'twos complement', 'negative binary', 'bitwise operators', 'and or xor', 'bit shift', 'bit mask', 'overflow'],
    `Adding: 0+0=0, 0+1=1, 1+1=10 (write 0, carry 1), 1+1+1=11. Example 0101 (5) + 0011 (3) = 1000 (8).
Negative numbers — two's complement (how every modern CPU does it): invert all bits and add 1. In 8 bits: 5 = 00000101 → invert 11111010 → +1 → 11111011 = -5. The top bit is the sign (1 = negative); 8-bit signed range is -128..127; 11111111 = -1. Subtraction is just adding the negative.
Overflow: a result too big for the bits wraps around (8-bit 255 + 1 = 0; signed 127 + 1 = -128).
Bitwise (bit by bit): AND & (1 only if both 1: 1100 & 1010 = 1000), OR | (1 if either: 1110), XOR ^ (1 if different: 0110), NOT ~ (flip every bit; ~x = -x - 1 in two's complement).
Shifts: x << n multiplies by 2^n (0011 << 1 = 0110), x >> n divides by 2^n (arithmetic shift keeps the sign; JS >>> is unsigned).
Masks: test bit n: (x >> n) & 1; set it: x | (1 << n); clear it: x & ~(1 << n); toggle: x ^ (1 << n); keep the low 4 bits: x & 0b1111. Tricks: x & (x - 1) clears the lowest 1 bit; x & 1 = odd?; a ^ a = 0 (XOR swap, find the unique number); popcount counts the 1s (bin(x).count('1')).
Flags in one number: READ = 0b001, WRITE = 0b010, EXEC = 0b100; perms = READ | WRITE; perms & WRITE → truthy (Unix permissions 755 = rwxr-xr-x = 111 101 101).`),

  c('machine-code', 'Machine code: what "coding in binary" really means — CPU instructions as bytes, with real x86-64 examples', ['machine code', 'coding in binary', 'program in binary', 'opcodes', 'binary instructions', 'x86 machine code', 'hello world binary', 'how cpus read binary'],
    `"Coding in binary" = writing machine code: the bytes a CPU executes directly. Every instruction is an opcode (which operation) plus operands (registers, numbers, addresses). People write assembly and an assembler turns it into these bytes; nobody types full programs in 0s and 1s today (early computers were programmed with switches like that).
Real x86-64 encodings (hex → binary):
- nop = 90 = 10010000
- ret = C3 = 11000011
- mov eax, <32-bit number> = B8 then the number in little-endian (lowest byte first): mov eax, 60 = B8 3C 00 00 00 = 10111000 00111100 00000000 00000000 00000000
- xor edi, edi (set edi to 0) = 31 FF = 00110001 11111111
- syscall = 0F 05 = 00001111 00000101
- int 0x80 (old 32-bit Linux system call) = CD 80 = 11001101 10000000
- jmp short +2 = EB 02 = 11101011 00000010; add eax, 1 = 05 01 00 00 00
A complete tiny Linux x86-64 program that exits with code 0: mov eax, 60 / xor edi, edi / syscall →
B8 3C 00 00 00 31 FF 0F 05 → 10111000 00111100 00000000 00000000 00000000 00110001 11111111 00001111 00000101
(60 is the Linux "exit" system call number; edi holds the exit code.) To run bytes like these they must be wrapped in an executable format (ELF on Linux, Mach-O on macOS, PE on Windows) — or assembled from assembly: nasm -f elf64 + ld.
ARM64 (Apple Silicon, phones) uses fixed 32-bit instructions: ret = 0xD65F03C0 = 11010110 01011111 00000011 11000000; nop = 0xD503201F.
Little-endian vs big-endian: x86 and ARM store multi-byte numbers lowest byte first (0x0000003C is stored 3C 00 00 00).`),

  c('logic-hardware', 'Binary in hardware: logic gates, adders, memory, why computers use 0 and 1', ['logic gates', 'and gate', 'xor gate', 'half adder', 'full adder', 'transistor', 'why binary', 'boolean logic'],
    `Why binary: a transistor is reliably either off or on (low or high voltage) — two states are easy to build, fast and noise-resistant. 0 = false/off, 1 = true/on.
Logic gates (truth tables, inputs A B → output): AND 00→0 01→0 10→0 11→1; OR 00→0 01→1 10→1 11→1; XOR 00→0 01→1 10→1 11→0; NOT 0→1 1→0; NAND = NOT AND (any circuit can be built from NANDs alone); NOR = NOT OR.
Half adder (adds two bits): sum = A XOR B, carry = A AND B. Full adder (adds A, B and a carry-in): sum = A XOR B XOR Cin, carry-out = (A AND B) OR (Cin AND (A XOR B)). Chain 8 full adders → an 8-bit adder; that's the core of a CPU's ALU.
Memory: a flip-flop/latch stores 1 bit; registers are groups of them (64-bit registers in modern CPUs); RAM stores billions of bits addressed by number.
Boolean algebra: A AND 1 = A, A OR 0 = A, A XOR A = 0, NOT(A AND B) = (NOT A) OR (NOT B) (De Morgan).
Floating point (IEEE 754): a 32-bit float = 1 sign bit + 8 exponent bits + 23 fraction bits; 1.0 = 0 01111111 00000000000000000000000. That's why 0.1 + 0.2 = 0.30000000000000004: 0.1 has no exact binary form (like 1/3 in decimal).`),
];
