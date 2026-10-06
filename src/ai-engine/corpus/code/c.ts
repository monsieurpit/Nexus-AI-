import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('c', slug, title, keywords, content);

export const CODE_C = [
  c('basics', 'C basics: program structure, types, printf/scanf, compiling, control flow, functions', ['c programming basics', 'c hello world', 'printf format', 'scanf', 'compile c gcc', 'c data types', 'c functions', 'c header files'],
    `#include <stdio.h>
int main(void) {
    int age;
    printf("Age? ");
    if (scanf("%d", &age) != 1) { fprintf(stderr, "not a number\\n"); return 1; }
    printf("Next year: %d\\n", age + 1);
    return 0;
}
Compile: gcc -std=c17 -Wall -Wextra -O2 main.c -o app (clang same); debugging: -g -fsanitize=address,undefined; math library: -lm. Multiple files: gcc main.c util.c -o app, or a Makefile/CMake.
Types: char (1 byte), short, int (usually 32-bit), long, long long, unsigned variants, float, double, _Bool/bool (<stdbool.h>), size_t (sizes), fixed width int32_t/uint8_t (<stdint.h>). sizeof(x). Constants: #define MAX 100 or const int max = 100; enum { RED, GREEN };
printf formats: %d (int), %ld, %lld, %u, %zu (size_t), %f (double; %.2f), %c, %s, %p (pointer), %x (hex), %% ; field widths %5d, %-10s. scanf needs addresses (&x) except for arrays/strings; %s reads one word — use fgets(buf, sizeof buf, stdin) for lines (and strip '\\n': buf[strcspn(buf, "\\n")] = '\\0').
Control: if/else, switch (with break), for, while, do-while, break, continue, goto (cleanup only). Integer division truncates (5 / 2 == 2); cast for floats: (double)a / b.
Functions: declare prototypes before use (in headers): int add(int a, int b); — arguments are passed by value; pass pointers to modify the caller's variables (void inc(int *n) { (*n)++; }). static functions/variables at file scope are private to that file; static locals keep their value between calls.
Headers: util.h with include guards (#ifndef UTIL_H #define UTIL_H ... #endif or #pragma once) holds declarations; util.c holds definitions. extern for shared globals.
Preprocessor: #include, #define, macros with parentheses #define SQ(x) ((x) * (x)), #ifdef DEBUG, #if/#endif.`),

  c('pointers-memory', 'C pointers, arrays, strings, malloc/free, dynamic memory, structs', ['c pointers', 'malloc free', 'c arrays', 'c strings', 'strcpy strncpy', 'c struct', 'dynamic array c', 'linked list c', 'memory leak c', 'pointer to pointer'],
    `Pointers: int x = 5; int *p = &x; *p = 10; NULL checks; p + 1 moves by sizeof(*p). Arrays decay to pointers to their first element when passed to functions — pass the length too: void sum(const int *a, size_t n).
Arrays: int a[5] = {1, 2, 3}; (rest zero) size: sizeof a / sizeof a[0] (only where the array is declared). No bounds checking — out-of-range access is undefined behaviour. 2D: int grid[3][4].
Strings = char arrays ending with '\\0': char name[32] = "Ana"; <string.h>: strlen, strcmp (0 when equal — never compare strings with ==), strncpy (may not terminate) / snprintf(dst, sizeof dst, "%s", src) (safe copy), strcat/strncat, strchr, strstr, strtok, memcpy, memset, memmove. String literals are read-only (const char *s = "hi"). Convert: atoi (no error check) → strtol(s, &end, 10).
Dynamic memory (<stdlib.h>): int *arr = malloc(n * sizeof *arr); if (!arr) { /* out of memory */ } ... free(arr); arr = NULL; calloc(n, size) zeroes; realloc grows: int *tmp = realloc(arr, new_n * sizeof *arr); if (tmp) arr = tmp; (keep the old pointer on failure). Every malloc needs exactly one free.
Structs: typedef struct { char name[32]; int hp; } Player; Player p = { .name = "Ana", .hp = 100 }; p.hp; via pointer: pp->hp. Pass large structs by pointer (const Player *p).
Linked list: typedef struct Node { int value; struct Node *next; } Node; Node *push(Node *head, int v) { Node *n = malloc(sizeof *n); n->value = v; n->next = head; return n; } free nodes in a loop.
Function pointers: int (*op)(int, int) = add; op(2, 3); qsort(arr, n, sizeof arr[0], cmp) with int cmp(const void *a, const void *b) { int x = *(const int *)a, y = *(const int *)b; return (x > y) - (x < y); }
Bugs: segfaults (NULL/dangling/out of bounds), buffer overflows (gets — never use; scanf("%s") without width; strcpy), use-after-free, double free, leaks, uninitialised variables, off-by-one on '\\0'. Tools: -fsanitize=address, valgrind --leak-check=full ./app, gdb/lldb, -Wall -Wextra.`),

  c('files-system', 'C file I/O, command-line arguments, errors, system programming, embedded', ['c file io', 'fopen fread', 'argc argv', 'errno perror', 'c system calls', 'arduino c', 'embedded c', 'c makefile', 'bit manipulation c'],
    `Files: FILE *f = fopen("data.txt", "r"); if (!f) { perror("fopen"); return 1; } char line[256]; while (fgets(line, sizeof line, f)) {...} fclose(f); modes "r" "w" (truncate) "a" "rb"/"wb" (binary); fprintf/fscanf; fread(buf, 1, n, f)/fwrite; fseek/ftell; feof only after a read failed.
Arguments: int main(int argc, char *argv[]) — argv[0] is the program name; check argc before reading argv[1].
Errors: return codes, errno + perror("msg") / strerror(errno); exit(EXIT_FAILURE). Clean up with a single goto cleanup label in long functions.
POSIX (Linux/macOS): open/read/write/close, fork/exec/wait, pipe, signal handling, pthreads (pthread_create, pthread_mutex_lock), sockets (socket/bind/listen/accept). Windows uses Win32 APIs.
Bit manipulation: set bit x |= (1u << n); clear x &= ~(1u << n); toggle x ^= (1u << n); test (x >> n) & 1u; masks with unsigned types; shifts of negative numbers / by ≥ width are undefined.
Embedded/Arduino (C/C++): void setup() { pinMode(13, OUTPUT); Serial.begin(9600); } void loop() { digitalWrite(13, HIGH); delay(500); digitalWrite(13, LOW); delay(500); } — volatile for hardware registers/ISR-shared variables, avoid malloc, fixed-width types, millis() instead of delay for non-blocking timing.
Makefile: app: main.o util.o\\n\\t$(CC) -o $@ $^ (recipe lines start with a TAB); CFLAGS = -Wall -Wextra -O2.
Undefined behaviour to know: signed overflow, reading uninitialised values, out-of-bounds, modifying a string literal, i = i++ style sequence bugs, dereferencing NULL. The compiler may assume UB never happens.`),
];
