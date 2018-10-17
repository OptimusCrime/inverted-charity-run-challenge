<?php
namespace OptimusCrime\Endpoints;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use OptimusCrime\Controllers\GetStatus;

class Status extends Base
{
    public function get(ServerRequestInterface $request, ResponseInterface $response)
    {
        return $this->output(
            $response,
            GetStatus::get($this->container->get('settings')['challenges'])
        );
    }
}

