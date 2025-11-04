<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// Sessions (7 days)
session_set_cookie_params([
  'lifetime' => 60*60*24*7,
  'path'     => '/',
  'domain'   => '',
  'secure'   => true,
  'httponly' => true,
  'samesite' => 'Strict',
]);
if (session_status() === PHP_SESSION_NONE) session_start();

require_once __DIR__ . '/config.php';

function db(): PDO {
  static $pdo;
  if (!$pdo) {
    $pdo = new PDO(
      'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8mb4',
      DB_USER, DB_PASS,
      [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      ]
    );
  }
  return $pdo;
}

function body(): array {
  $raw = file_get_contents('php://input');
  if (!$raw) return [];
  $d = json_decode($raw, true);
  return is_array($d) ? $d : [];
}

function json($data, int $code = 200): void {
  http_response_code($code);
  echo json_encode($data);
  exit;
}

function is_logged_in(): bool { return isset($_SESSION['uid']); }
function require_login(): void { if (!is_logged_in()) json(['error'=>'auth_required'], 401); }
function is_admin(): bool {
  return (bool)($_SESSION['is_admin'] ?? false) || (($_SESSION['role'] ?? '') === 'superadmin');
}
function require_admin(): void {
  require_login();
  if (!is_admin()) json(['error'=>'forbidden'], 403);
}

function slugify(string $t): string {
  $t = preg_replace('~[^\pL\d]+~u', '-', $t);
  $t = trim($t, '-');
  $t = iconv('utf-8', 'us-ascii//TRANSLIT', $t);
  $t = strtolower($t);
  $t = preg_replace('~[^-\w]+~', '', $t);
  return $t ?: bin2hex(random_bytes(4));
}
