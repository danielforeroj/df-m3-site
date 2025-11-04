<?php
require_once __DIR__.'/../common.php';
require_admin();

$id = (int)($_GET['id'] ?? 0);
if (!$id) json(['error'=>'id_required'], 400);

db()->prepare('DELETE FROM documents WHERE id=? LIMIT 1')->execute([$id]);
json(['ok'=>true]);
