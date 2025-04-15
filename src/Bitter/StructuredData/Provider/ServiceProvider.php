<?php

namespace Bitter\StructuredData\Provider;

use Concrete\Core\Application\Application;
use Concrete\Core\Asset\AssetList;
use Concrete\Core\Foundation\Service\Provider;
use Concrete\Core\Routing\RouterInterface;
use Bitter\StructuredData\Routing\RouteList;

class ServiceProvider extends Provider
{
    protected RouterInterface $router;

    public function __construct(
        Application     $app,
        RouterInterface $router
    )
    {
        parent::__construct($app);

        $this->router = $router;
    }

    public function register()
    {
        $this->registerRoutes();
        $this->registerAssets();
    }

    private function registerRoutes()
    {
        $this->router->loadRouteList(new RouteList());
    }

    private function registerAssets()
    {
        $al = AssetList::getInstance();

        $al->register("javascript", "jsoneditor", "js/jsoneditor.js", [], "structured_data");
    }
}