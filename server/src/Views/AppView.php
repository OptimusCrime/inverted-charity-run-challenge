<?php
namespace OptimusCrime\Views;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AppView
{
    const REACT_ENTRY_FILE_NAME = 'index.html';

    public function get(ServerRequestInterface $request, ResponseInterface $response)
    {
        $file = getenv('BASE_PATH') . 'react' . DIRECTORY_SEPARATOR . static::REACT_ENTRY_FILE_NAME;

        return $response->write(file_get_contents($file));
    }
}