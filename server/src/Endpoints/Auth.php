<?php
namespace OptimusCrime\Endpoints;

use Dflydev\FigCookies\FigResponseCookies;
use Dflydev\FigCookies\SetCookie;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class Auth extends Base
{
    public function get(ServerRequestInterface $request, ResponseInterface $response)
    {
        $cookieValue = $request->getCookieParam($this->container->get('settings')['cookie_key']);

        return $this->output($response, [
            'status' => $cookieValue === $this->container->get('settings')['cookie_value']
        ]);
    }

  public function post(ServerRequestInterface $request, ResponseInterface $response)
  {
      $payload = json_decode($request->getBody()->getContents(), true);
      if (!isset($payload['pw']) or !password_verify($payload['pw'], $this->container->get('settings')['auth'])) {
          return $response->withStatus(401);
      }

      $cookieKey = $this->container->get('settings')['cookie_key'];
      $cookieValue = $this->container->get('settings')['cookie_value'];

      return $response = FigResponseCookies::set($response, SetCookie::create($cookieKey)
        ->withValue($cookieValue)
        ->withPath('/')
        ->rememberForever()
      );
  }
}

