<?php

namespace Concrete\Package\StructuredData;

use Bitter\StructuredData\Provider\ServiceProvider;
use Concrete\Core\Entity\Package as PackageEntity;
use Concrete\Core\Package\Package;

class Controller extends Package
{
    protected string $pkgHandle = 'structured_data';
    protected string $pkgVersion = '0.0.2';
    protected $appVersionRequired = '9.0.0';
    protected $pkgAutoloaderRegistries = [
        'src/Bitter/StructuredData' => 'Bitter\StructuredData',
    ];

    public function getPackageDescription(): string
    {
        return t('Structured Data is a Concrete CMS add-on that lets you easily add structured data to your website using a block-type, built-in JSON editor, and ready-to-use templates.');
    }

    public function getPackageName(): string
    {
        return t('Structured Data');
    }

    public function on_start()
    {
        /** @var ServiceProvider $serviceProvider */
        /** @noinspection PhpUnhandledExceptionInspection */
        $serviceProvider = $this->app->make(ServiceProvider::class);
        $serviceProvider->register();
    }

    public function install(): PackageEntity
    {
        $pkg = parent::install();
        $this->installContentFile("data.xml");
        return $pkg;
    }

    public function upgrade()
    {
        parent::upgrade();
        $this->installContentFile("data.xml");
    }
}