<?php
require_once __DIR__.'/../common.php';
session_unset();
session_destroy();
json(['ok'=>true]);
