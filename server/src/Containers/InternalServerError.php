<?php
namespace OptimusCrime\Containers;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class InternalServerError
{
    public static function load(ContainerInterface $container)
    {
        $container['errorHandler'] = function ($c) {
            return function (ServerRequestInterface $request, ResponseInterface $response, $exception) use ($c) {
                error_log($exception->getMessage(), 0);

                $jsonResponse = $response->withJson([]);
                return $jsonResponse->withStatus(500);
            };
        };
    }
}


