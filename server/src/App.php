<?php
namespace OptimusCrime;

use Slim\App as Slim;

use OptimusCrime\Containers\Challenges;
use OptimusCrime\Containers\InternalServerError;
use OptimusCrime\Containers\Database;
use OptimusCrime\Containers\PageNotFound;
use OptimusCrime\Endpoints\Status;
use OptimusCrime\Endpoints\Entry;
use OptimusCrime\Endpoints\Auth;
use OptimusCrime\Middleware\AuthMiddleware;
use OptimusCrime\Middleware\IdentifierMiddleware;
use OptimusCrime\Views\AppView;

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
        $app = $this->app;

        $app->get('/', AppView::class . ':get');

        $app->group('/api', function () use ($app) {
            $app->get('/status', Status::class . ':get');
            $app->get('/entry', Entry::class . ':get');
            $app->put('/entry', Entry::class . ':put')
                ->add(new AuthMiddleware($app->getContainer()))
                ->add(new IdentifierMiddleware($app->getContainer()));
            $app->get('/auth', Auth::class . ':get');
            $app->post('/auth', Auth::class . ':post');
        });
    }

    private function dependencies()
    {
        $containers = [
            InternalServerError::class,
            Database::class,
            PageNotFound::class,
            Challenges::class,
        ];

        foreach ($containers as $container) {
            call_user_func([$container, 'load'], $this->app->getContainer());
        }
    }
}
