<?php
namespace OptimusCrime\Containers;

use Psr\Container\ContainerInterface;
use Illuminate\Database\Capsule\Manager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\ConnectionResolver;

class Database
{
    public static function load(ContainerInterface $container)
    {
        $capsule = new Manager;
        $capsule->addConnection([
            'driver' => getenv('DB_DRIVER'),
            'database' => getenv('DB_PATH'),
        ]);

        // Make it possible to use $app->get('db') -> whatever
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        // Make it possible to use Model :: whatever
        $resolver = new ConnectionResolver();
        $resolver->addConnection('default', $capsule->getConnection());
        $resolver->setDefaultConnection('default');
        Model::setConnectionResolver($resolver);

        $container['db'] = function () use ($capsule) {
            return $capsule;
        };
    }
}
