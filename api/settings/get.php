<?php
require_once __DIR__.'/../common.php';

$public = isset($_GET['public']);

$st = db()->query('SELECT data FROM site_settings WHERE id=1');
$s  = $st->fetchColumn();
$settings = $s ? json_decode($s, true) : [];

if ($public) {
  json([
    'brand'  => $settings['brand']  ?? [],
    'social' => $settings['social'] ?? [],
    'pixels' => [
      'gtm' => $settings['pixels']['gtm'] ?? '',
    ],
  ]);
}

require_admin(); // full settings require admin
json($settings);
