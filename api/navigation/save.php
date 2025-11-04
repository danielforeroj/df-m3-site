<?php
require_once __DIR__.'/../common.php';
require_admin();

$in = body(); // {id?, label, href, target, position, visible}
if (!isset($in['label'],$in['href'])) json(['error'=>'missing'], 400);

if (!empty($in['id'])) {
  $st=db()->prepare('UPDATE nav_links SET label=?,href=?,target=?,position=?,visible=? WHERE id=?');
  $st->execute([
    $in['label'], $in['href'], $in['target'] ?? '_self',
    (int)($in['position'] ?? 0), (int)($in['visible'] ?? 1), (int)$in['id']
  ]);
  json(['ok'=>true]);
}

$st=db()->prepare('INSERT INTO nav_links(label,href,target,position,visible) VALUES (?,?,?,?,?)');
$st->execute([$in['label'],$in['href'],$in['target'] ?? '_self',(int)($in['position'] ?? 0),(int)($in['visible'] ?? 1)]);
json(['ok'=>true,'id'=>db()->lastInsertId()]);
