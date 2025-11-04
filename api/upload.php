<?php
require_once __DIR__.'/common.php';
require_admin();

$bucket = $_POST['bucket'] ?? 'public';
$dir = __DIR__.'/uploads/'.($bucket === 'private' ? 'private' : 'public');
if (!is_dir($dir)) mkdir($dir, 0755, true);

if (!isset($_FILES['file'])) json(['error'=>'file_required'], 400);
$f = $_FILES['file'];
if ($f['error'] !== UPLOAD_ERR_OK) json(['error'=>'upload_error','code'=>$f['error']], 400);

$allowed = [
  'image/jpeg'=>'jpg', 'image/png'=>'png', 'image/webp'=>'webp',
  'image/svg+xml'=>'svg', 'application/pdf'=>'pdf'
];

$mime = mime_content_type($f['tmp_name']);
if (!isset($allowed[$mime])) json(['error'=>'unsupported_type','mime'=>$mime], 400);

$name   = time().'-'.preg_replace('/[^A-Za-z0-9\.\-_]/','',$f['name']);
$target = $dir.'/'.$name;

if (!move_uploaded_file($f['tmp_name'], $target)) json(['error'=>'move_failed'], 500);

$url = '/api/uploads/'.($bucket === 'private' ? 'private' : 'public').'/'.$name;
json(['ok'=>true,'url'=>$url]);
