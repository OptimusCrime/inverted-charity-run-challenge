<?php
namespace OptimusCrime\Containers;

use Psr\Container\ContainerInterface;

class Challenges
{
    const CHALLENGES_DIR = 'challenges';
    const CHALLENGES_FILE_DEFAULT = 'challenges-default';
    const CHALLENGES_FILE = 'challenges';

    public static function load(ContainerInterface $container)
    {
        $container[Challenges::class] = function () use ($container) {
            $challengesPath = getenv('BASE_PATH') . static::CHALLENGES_DIR . DIRECTORY_SEPARATOR;

            $defaultFile = $challengesPath . static::CHALLENGES_FILE_DEFAULT . '.php';
            $productionFile = $challengesPath . static::CHALLENGES_FILE . '.php';

            if (file_exists($productionFile)) {
                return include $productionFile;
            }

            return include $defaultFile;
        };
    }
}
