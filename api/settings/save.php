<?php
require_once __DIR__.'/../common.php';
require_admin();

$in = body();
if (!is_array($in)) json(['error'=>'invalid_body'], 400);

$st = db()->prepare('UPDATE site_settings SET data=?, updated_at=NOW() WHERE id=1');
$st->execute([json_encode($in, JSON_UNESCAPED_SLASHES)]);
json(['ok'=>true]);
