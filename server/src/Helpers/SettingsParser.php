<?php
namespace OptimusCrime\Helpers;

use Dotenv\Dotenv;

class SettingsParser
{
    const DEFAULT_FILE = '.env';
    const DEV_FILE = '.env-dev';

    public function __construct()
    {
        $baseDir = dirname(dirname(__DIR__)) . '/';
        $dotFile = static::getDotFile($baseDir);

        $dotenv = new Dotenv($baseDir, $dotFile);
        $dotenv->load();
    }

    public function getSlimConfig()
    {
        return [
            'settings' => [
                'displayErrorDetails' => getenv('DEV') === '1',
                'addContentLengthHeader' => false,
            ]
        ];
    }

    public function getPhinxConfig()
    {
        return [
            'paths' => [
                'migrations' => '%%PHINX_CONFIG_DIR%%/../phinx/migrations',
                'seeds' => '%%PHINX_CONFIG_DIR%%/../phinx/seeds',
            ],
            'environments' => [
                'default_migration_table' => 'phinxlog',
                'default_database' => 'production',
                'production' => [
                    'adapter' => 'sqlite',
                    'name' => getenv('DB_PATH')
                ],
            ]
        ];
    }

    private static function getDotFile($baseDir)
    {
        if (file_exists($baseDir . SettingsParser::DEFAULT_FILE)) {
            return SettingsParser::DEFAULT_FILE;
        }

        return SettingsParser::DEV_FILE;
    }
}
