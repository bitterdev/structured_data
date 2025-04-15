<?php

namespace Bitter\StructuredData\Routing;

use Bitter\StructuredData\API\V1\Middleware\FractalNegotiatorMiddleware;
use Bitter\StructuredData\API\V1\Configurator;
use Concrete\Core\Routing\RouteListInterface;
use Concrete\Core\Routing\Router;

class RouteList implements RouteListInterface
{
    public function loadRoutes(Router $router)
    {
        $router
            ->buildGroup()
            ->setNamespace('Concrete\Package\StructuredData\Controller\Dialog\Support')
            ->setPrefix('/ccm/system/dialogs/structured_data')
            ->routes('dialogs/support.php', 'structured_data');
    }
}