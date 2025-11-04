<?php
require_once __DIR__.'/../common.php';
$st = db()->query('SELECT * FROM logos WHERE visible=1 ORDER BY position ASC');
json(['items'=>$st->fetchAll()]);
