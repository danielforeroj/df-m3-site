<?php
require_once __DIR__.'/../common.php';

$in = body();
$email = trim($in['email'] ?? '');
$pass  = $in['password'] ?? '';

if (!$email || !$pass) json(['error'=>'missing_credentials'], 400);

$st = db()->prepare('SELECT id,email,full_name,password_hash,is_admin,role FROM users WHERE email=? LIMIT 1');
$st->execute([$email]);
$u = $st->fetch();

if (!$u || !password_verify($pass, $u['password_hash'])) {
  json(['error'=>'invalid_credentials'], 401);
}

$_SESSION['uid']       = (int)$u['id'];
$_SESSION['email']     = $u['email'];
$_SESSION['full_name'] = $u['full_name'];
$_SESSION['is_admin']  = (bool)$u['is_admin'];
$_SESSION['role']      = $u['role'];

db()->prepare('UPDATE users SET last_login=NOW() WHERE id=?')->execute([$u['id']]);

json([
  'ok'=>true,
  'user'=>[
    'id'=>(int)$u['id'],
    'email'=>$u['email'],
    'full_name'=>$u['full_name'],
    'is_admin'=>(bool)$u['is_admin'],
    'role'=>$u['role'],
  ]
]);
