<?php

namespace Concrete\Package\StructuredData\Block\StructuredData;

use Concrete\Core\Block\BlockController;
use Concrete\Core\Database\Connection\Connection;
use Concrete\Core\Error\ErrorList\ErrorList;

class Controller extends BlockController
{
    protected $btTable = 'btStructuredData';
    protected $btInterfaceWidth = 400;
    protected $btInterfaceHeight = 500;
    protected $btCacheBlockOutputLifetime = 300;

    public function getBlockTypeDescription(): string
    {
        return t('Add structured data using this block type with built-in JSON editing and ready-to-use schema templates.');
    }

    public function getBlockTypeName(): string
    {
        return t("Structured Data");
    }
}