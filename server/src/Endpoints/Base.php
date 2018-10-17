<?php
namespace OptimusCrime\Endpoints;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;

class Base
{
    protected $container;
    protected $sessionHandler;
    protected $templateData;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    protected function output(ResponseInterface $response, array $data)
    {
        return $response->withJson($data);
    }
}