<?php
namespace OptimusCrime\Endpoints;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use OptimusCrime\Controllers\GetEntry;
use OptimusCrime\Controllers\PutEntry;

class Entry extends Base
{
    public function get(ServerRequestInterface $request, ResponseInterface $response)
    {
        return $this->output(
            $response,
            GetEntry::get($this->container->get('settings')['challenges'])
        );
    }

    public function put(ServerRequestInterface $request, ResponseInterface $response)
    {
        $payload = json_decode($request->getBody()->getContents(), true);

        if ($payload === null) {
            return $response->withStatus(400);
        }



        return $this->output($response, [
            'status' => PutEntry::put(
                $payload['identifier'],
                isset($payload['comment']) ? $payload['comment'] : null
            )
        ]);
    }
}

