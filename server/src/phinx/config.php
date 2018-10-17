<?php
require __DIR__ . '/../vendor/autoload.php';

use OptimusCrime\Helpers\SettingsParser;

$settingsParser = new SettingsParser();
return $settingsParser->getPhinxConfig();