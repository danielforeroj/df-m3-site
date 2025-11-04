<?php
require_once __DIR__.'/../common.php';
require_admin();

$in   = body();
$id   = $in['id']   ?? null;
$type = $in['type'] ?? 'post';
$title= trim($in['title'] ?? '');
$slug = $in['slug'] ? slugify($in['slug']) : slugify($title);
$excerpt = $in['excerpt'] ?? null;
$body    = $in['body'] ?? '';
$cover   = $in['cover_url'] ?? null;
$status  = $in['status'] ?? 'draft';
$seo_t   = $in['seo_title'] ?? null;
$seo_d   = $in['seo_description'] ?? null;
$vis     = $in['visibility'] ?? 'public';       // public | gated | private
$gate_id = $in['gate_id'] ?? null;
$pub     = ($status==='published') ? ($in['published_at'] ?? date('Y-m-d H:i:s')) : null;

if (!$title) json(['error'=>'title_required'], 400);

if ($id) {
  $st = db()->prepare('UPDATE documents
    SET type=?, slug=?, title=?, excerpt=?, body=?, cover_url=?, status=?, visibility=?, gate_id=?, seo_title=?, seo_description=?, published_at=?, updated_at=NOW()
    WHERE id=?');
  $st->execute([$type,$slug,$title,$excerpt,$body,$cover,$status,$vis,$gate_id,$seo_t,$seo_d,$pub,$id]);
  json(['ok'=>true,'id'=>$id,'slug'=>$slug]);
}

$st = db()->prepare('INSERT INTO documents(type,slug,title,excerpt,body,cover_url,status,visibility,gate_id,seo_title,seo_description,published_at,created_by)
                     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
$st->execute([$type,$slug,$title,$excerpt,$body,$cover,$status,$vis,$gate_id,$seo_t,$seo_d,$pub,$_SESSION['uid']]);
json(['ok'=>true,'id'=>db()->lastInsertId(),'slug'=>$slug]);
