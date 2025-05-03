<?php

defined('C5_EXECUTE') or die('Access denied');

use Concrete\Core\Support\Facade\Application;
use Concrete\Core\Form\Service\Form;
use Concrete\Core\View\View;

/** @var string|null $json */

$json = $json ?? null;

$app = Application::getFacadeApplication();
/** @var Form $form */
/** @noinspection PhpUnhandledExceptionInspection */
$form = $app->make(Form::class);

/** @noinspection PhpUnhandledExceptionInspection */
View::element("dashboard/help_blocktypes", [], "structured_data");

/** @noinspection PhpUnhandledExceptionInspection */
View::element("dashboard/did_you_know", [], "structured_data");

echo $form->textarea("json", $json, ["class" => "d-none"]);
?>

<div id="structured-data-editor"></div>

<script>
    (function ($) {
        $(function () {
            $("#structured-data-editor").initStructuredDataEditor(<?php echo json_encode([
                'title' => t('Structured Data Editor'),
                'selectLabel' => t('Choose a template:'),
                'selectPlaceholder' => t('-- Please select --'),
                'jsonInputId' => 'json',
                'templates' => [
                    'article' => t('Article'),
                    'newsarticle' => t('NewsArticle'),
                    'blogposting' => t('BlogPosting'),
                    'product' => t('Product'),
                    'faq' => t('FAQPage'),
                    'howto' => t('HowTo'),
                    'event' => t('Event'),
                    'jobposting' => t('JobPosting'),
                    'localbusiness' => t('LocalBusiness'),
                    'organization' => t('Organization'),
                    'recipe' => t('Recipe'),
                    'video' => t('VideoObject'),
                    'breadcrumblist' => t('BreadcrumbList'),
                    'review' => t('Review'),
                    'aggregaterating' => t('AggregateRating'),
                    'course' => t('Course'),
                    'softwareapplication' => t('SoftwareApplication'),
                    'dataset' => t('Dataset'),
                    'website' => t('WebSite'),
                    'speakablespecification' => t('SpeakableSpecification'),
                    'subscription' => t('Subscription'),
                    'book' => t('Book'),
                    'offer' => t('Offer'),
                    'aggregateoffer' => t('AggregateOffer')
                ]
            ])?>)
        });
    })(jQuery);
</script>
