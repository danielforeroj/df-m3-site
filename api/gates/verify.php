<?php
require_once __DIR__.'/../common.php';

$in = body(); // {gate_id, doc_id?, email?, password?, payload?}
$gate_id = (int)($in['gate_id'] ?? 0);
if (!$gate_id) json(['error'=>'gate_required'], 400);

$g = db()->prepare('SELECT type,config FROM gates WHERE id=?');
$g->execute([$gate_id]);
$gate = $g->fetch();
if (!$gate) json(['error'=>'not_found'], 404);

$config = $gate['config'] ? json_decode($gate['config'], true) : [];

if ($gate['type'] === 'password') {
  if (($in['password'] ?? '') !== ($config['password'] ?? '')) {
    json(['ok'=>false,'reason'=>'bad_password'], 401);
  }
}
if ($gate['type'] === 'email') {
  if (empty($in['email'])) json(['ok'=>false,'reason'=>'email_required'], 400);
}

db()->prepare('INSERT INTO gate_submissions(gate_id,doc_id,email,payload) VALUES (?,?,?,?)')
  ->execute([$gate_id, $in['doc_id'] ?? null, $in['email'] ?? null, json_encode($in['payload'] ?? (object)[])]);
json(['ok'=>true]);
