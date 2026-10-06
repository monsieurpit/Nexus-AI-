import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('php', slug, title, keywords, content);

export const CODE_PHP = [
  c('basics', 'PHP basics: syntax, variables, arrays, strings, functions, classes, forms, PDO', ['php basics', 'php arrays', 'php forms post', 'php pdo', 'php classes', 'php string functions', 'php sessions', 'php echo', 'php include'],
    `<?php
declare(strict_types=1);
$name = $_GET['name'] ?? 'world';
echo "Hello, " . htmlspecialchars($name, ENT_QUOTES) . "!";   // escape output (XSS)
Run: php -S localhost:8000 (dev server), php script.php (CLI). Variables start with $; statements end with ; ; . concatenates; "double quotes {$var} interpolate", 'single quotes don't'; heredoc <<<EOT.
Types: int, float, string, bool, array, null, objects; === strict comparison (use it), == loose (surprising conversions). var_dump($x) / print_r to debug.
Arrays (ordered maps): $list = [1, 2, 3]; $list[] = 4; $user = ['name' => 'Ana', 'age' => 20]; count, in_array, array_key_exists / isset, array_push, array_pop, array_merge, array_map(fn($x) => $x * 2, $list), array_filter, array_reduce, usort($arr, fn($a, $b) => $a['age'] <=> $b['age']), sort/ksort/asort, implode(', ', $list), explode(',', $s), array_column, array_slice, array_search; foreach ($user as $key => $value) { }.
Strings: strlen, str_contains/str_starts_with (PHP 8), strtolower, ucfirst, trim, str_replace, substr, strpos (returns false — check with === false), sprintf/printf, number_format, preg_match('/\\d+/', $s, $m), preg_replace, mb_* for UTF-8.
Functions: function add(int $a, int $b = 0): int { return $a + $b; } named arguments add(b: 2, a: 1); nullable ?string; union types int|string; arrow fn; match expression: $label = match(true) { $score >= 90 => 'A', default => 'F' };
Classes: class User { public function __construct(public readonly string $name, private int $age = 0) {} public function greet(): string { return "Hi {$this->name}"; } } $u = new User('Ana'); $u->greet(); static::/self::, interfaces, abstract, traits, enums (PHP 8.1), namespaces + Composer autoloading (composer require vendor/pkg; require 'vendor/autoload.php').
Forms: <form method="post"> → $_POST['email']; validate with filter_var($email, FILTER_VALIDATE_EMAIL); CSRF tokens; file uploads via $_FILES + move_uploaded_file.
Sessions: session_start(); $_SESSION['user_id'] = $id; logout session_destroy(). Passwords: password_hash($pw, PASSWORD_DEFAULT) / password_verify.
Database with PDO (prepared statements stop SQL injection):
$pdo = new PDO('mysql:host=localhost;dbname=app;charset=utf8mb4', $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?'); $stmt->execute([$email]); $row = $stmt->fetch(PDO::FETCH_ASSOC);
Errors: try/catch (Exception $e), throw new InvalidArgumentException(). include/require (require_once) for other files. JSON: json_encode($data, JSON_PRETTY_PRINT), json_decode($json, true). Frameworks: Laravel (routes, Eloquent ORM, Blade, artisan), Symfony; WordPress (hooks: add_action('init', fn), add_filter, shortcodes).
Common errors: "Undefined variable/index" (use ?? or isset), "headers already sent" (output before header()/session_start — remove whitespace before <?php), white screen (enable display_errors in development / check the error log).`),
];
