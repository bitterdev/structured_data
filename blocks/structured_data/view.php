<?php

defined('C5_EXECUTE') or die('Access denied');

use Concrete\Core\Page\Page;

/** @var string|null $json */

$json = $json ?? null;

$c = Page::getCurrentPage();

?>

<?php if (is_object($c) && $c->isEditMode()) { ?>
    <div class="ccm-edit-mode-disabled-item">
        <div style="padding: 8px;">
            <?php echo t('Content disabled in edit mode.'); ?>
        </div>
    </div>
<?php } else { ?>
    <script type="application/ld+json">
    <?php echo $json; ?>
    </script>
<?php } ?>