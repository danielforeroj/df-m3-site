<?php
require_once __DIR__.'/../common.php';

$type = $_GET['type'] ?? null;     // post | research | lead_magnet
$slug = $_GET['slug'] ?? null;
$page = max(1, (int)($_GET['page'] ?? 1));
$limit= min(50,max(1,(int)($_GET['limit'] ?? 20)));
$off  = ($page-1)*$limit;

$w=[]; $p=[];
if ($slug) { $w[]='slug=?'; $p[]=$slug; }
else {
  if ($type) { $w[]='type=?'; $p[]=$type; }
  if (!is_admin()) { $w[]="status='published'"; }
}

$sql = 'SELECT id,type,slug,title,excerpt,body,cover_url,status,visibility,gate_id,seo_title,seo_description,published_at,updated_at
        FROM documents ' . (count($w)?('WHERE '.implode(' AND ',$w)):'') .
       ' ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?';

$p[] = $limit; $p[] = $off;
$st = db()->prepare($sql);
$st->execute($p);

json(['items'=>$st->fetchAll(),'page'=>$page,'limit'=>$limit]);
