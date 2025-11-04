<?php
require_once __DIR__.'/../common.php';
require_admin();

$in = body(); // {type:'email'|'password', config:{}}
$type = in_array($in['type'] ?? 'email', ['email','password']) ? $in['type'] : 'email';

$st = db()->prepare('INSERT INTO gates(type,config) VALUES (?,?)');
$st->execute([$type, json_encode($in['config'] ?? (object)[])]);
json(['ok'=>true,'id'=>db()->lastInsertId()]);
