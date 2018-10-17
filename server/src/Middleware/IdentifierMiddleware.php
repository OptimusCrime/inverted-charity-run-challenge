<?php
namespace OptimusCrime\Middleware;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class IdentifierMiddleware
{
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, $next)
    {
        $payload = json_decode($request->getBody()->getContents(), true);

        // Be kind and rewind the seek in case we read the body again in the endpoint
        $request->getBody()->rewind();

        return $this->isValidIdentifier($payload) ? $next($request, $response) : $response->withStatus(400);
    }

    private function isValidIdentifier($payload)
    {
        if (!is_array($payload)) {
            return false;
        }

        if (!isset($payload['identifier'])) {
            return false;
        }

        foreach ($this->container->get('settings')['challenges'] as $challenge) {
            if ($challenge['identifier'] === $payload['identifier'] and $challenge['active']) {
                return true;
            }
        }

        return false;
    }
}