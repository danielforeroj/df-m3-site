<?php
require_once __DIR__.'/../common.php';
$st = db()->query('SELECT * FROM nav_links WHERE visible=1 ORDER BY position ASC');
json(['items'=>$st->fetchAll()]);
