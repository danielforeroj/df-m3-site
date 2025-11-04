<?php
require_once __DIR__.'/../common.php';
if (!is_logged_in()) json(['user'=>null]);
json([
  'user'=>[
    'id'       => $_SESSION['uid'],
    'email'    => $_SESSION['email'],
    'full_name'=> $_SESSION['full_name'],
    'is_admin' => (bool)($_SESSION['is_admin'] ?? false),
    'role'     => $_SESSION['role'] ?? 'viewer',
  ]
]);
