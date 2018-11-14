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
        $cookieValue = $request->getCookieParam(getenv('COOKIE_KEY'));

        return $this->output($response, [
            'status' => $cookieValue === getenv('COOKIE_VALUE')
        ]);
    }

  public function post(ServerRequestInterface $request, ResponseInterface $response)
  {
      $payload = json_decode($request->getBody()->getContents(), true);
      if (!isset($payload['pw']) or !password_verify($payload['pw'], getenv('AUTH'))) {
          return $response->withStatus(401);
      }

      return $response = FigResponseCookies::set($response, SetCookie::create(getenv('COOKIE_KEY'))
        ->withValue(getenv('COOKIE_VALUE'))
        ->withPath('/')
        ->rememberForever()
      );
  }
}
