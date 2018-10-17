<?php
namespace OptimusCrime;

use OptimusCrime\Middleware\IdentifierMiddleware;
use Slim\App as Slim;

use OptimusCrime\Endpoints\Status;
use OptimusCrime\Endpoints\Entry;
use OptimusCrime\Endpoints\Auth;
use OptimusCrime\Containers\InternalServerError;
use OptimusCrime\Containers\Database;
use OptimusCrime\Containers\PageNotFound;
use OptimusCrime\Middleware\AuthMiddleware;

class App
{
    private $app;

    public function __construct(array $settings)
    {
        session_start();

        $this->app = new Slim($settings);
    }

    public function run()
    {
        $this->routes();
        $this->dependencies();

        $this->app->run();
    }

    private function routes()
    {
        $this->app->get('/status', Status::class . ':get');
        $this->app->get('/entry', Entry::class . ':get');
        $this->app->put('/entry', Entry::class . ':put')
            ->add(new AuthMiddleware($this->app->getContainer()))
            ->add(new IdentifierMiddleware($this->app->getContainer()));
        $this->app->get('/auth', Auth::class . ':get');
        $this->app->post('/auth', Auth::class . ':post');
    }

    private function dependencies()
    {
        $containers = [
            InternalServerError::class,
            Database::class,
            PageNotFound::class,
        ];

        foreach ($containers as $container) {
            call_user_func([$container, 'load'], $this->app->getContainer());
        }
    }
}
