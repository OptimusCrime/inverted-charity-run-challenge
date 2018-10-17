<?php
namespace OptimusCrime\Containers;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PageNotFound
{
    public static function load(ContainerInterface $container)
    {
        $container['notFoundHandler'] = function ($c) {
            return function (ServerRequestInterface $request, ResponseInterface $response) use ($c) {
                $jsonResponse = $response->withJson([]);
                return $jsonResponse->withStatus(404);
            };
        };
    }
}


