<?php
require_once __DIR__.'/../common.php';
require_admin();

$in = body(); // {id?, image_url, alt_text, position, visible}
if (!isset($in['image_url'])) json(['error'=>'missing'], 400);

if (!empty($in['id'])) {
  $st=db()->prepare('UPDATE logos SET image_url=?,alt_text=?,position=?,visible=? WHERE id=?');
  $st->execute([$in['image_url'],$in['alt_text'] ?? null,(int)($in['position'] ?? 0),(int)($in['visible'] ?? 1),(int)$in['id']]);
  json(['ok'=>true]);
}

$st=db()->prepare('INSERT INTO logos(image_url,alt_text,position,visible) VALUES (?,?,?,?)');
$st->execute([$in['image_url'],$in['alt_text'] ?? null,(int)($in['position'] ?? 0),(int)($in['visible'] ?? 1)]);
json(['ok'=>true,'id'=>db()->lastInsertId()]);
