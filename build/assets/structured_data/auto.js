(function($) {
    $.fn.initStructuredDataEditor = function(options) {
        const defaults = {
            title: 'Structured Data Editor',
            selectLabel: 'Choose a template:',
            selectPlaceholder: '-- Please select --',
            jsonInputId: null, // ID of the input field for JSON data
            templates: {
                article: 'Article',
                newsarticle: 'NewsArticle',
                blogposting: 'BlogPosting',
                product: 'Product',
                faq: 'FAQPage',
                howto: 'HowTo',
                event: 'Event',
                jobposting: 'JobPosting',
                localbusiness: 'LocalBusiness',
                organization: 'Organization',
                recipe: 'Recipe',
                video: 'VideoObject',
                breadcrumblist: 'BreadcrumbList',
                review: 'Review',
                aggregaterating: 'AggregateRating',
                course: 'Course',
                softwareapplication: 'SoftwareApplication',
                dataset: 'Dataset',
                website: 'WebSite',
                speakablespecification: 'SpeakableSpecification',
                subscription: 'Subscription',
                book: 'Book',
                offer: 'Offer',
                aggregateoffer: 'AggregateOffer'
            }
        };

        const settings = $.extend(true, {}, defaults, options);

        const schemas = {
            article: {
                title: settings.templates.article,
                type: "object",
                required: ["@context", "@type", "headline", "author"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Article" },
                    "headline": { type: "string", title: "Headline" },
                    "author": {
                        type: "object",
                        title: "Author",
                        properties: {
                            "@type": { type: "string", default: "Person" },
                            "name": { type: "string", title: "Author Name" }
                        }
                    }
                }
            },
            newsarticle: {
                title: settings.templates.newsarticle,
                type: "object",
                required: ["@context", "@type", "headline", "author"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "NewsArticle" },
                    "headline": { type: "string", title: "Headline" },
                    "author": {
                        type: "object",
                        title: "Author",
                        properties: {
                            "@type": { type: "string", default: "Person" },
                            "name": { type: "string", title: "Author Name" }
                        }
                    },
                    "dateline": { type: "string", title: "Dateline" }
                }
            },
            blogposting: {
                title: settings.templates.blogposting,
                type: "object",
                required: ["@context", "@type", "headline", "author"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "BlogPosting" },
                    "headline": { type: "string", title: "Headline" },
                    "author": {
                        type: "object",
                        title: "Author",
                        properties: {
                            "@type": { type: "string", default: "Person" },
                            "name": { type: "string", title: "Author Name" }
                        }
                    }
                }
            },
            product: {
                title: settings.templates.product,
                type: "object",
                required: ["@context", "@type", "name"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Product" },
                    "name": { type: "string", title: "Product Name" },
                    "description": { type: "string", title: "Description" },
                    "offers": {
                        type: "object",
                        title: "Offer",
                        properties: {
                            "@type": { type: "string", default: "Offer" },
                            "price": { type: "string", title: "Price" },
                            "priceCurrency": { type: "string", default: "EUR", title: "Currency" }
                        }
                    }
                }
            },
            faq: {
                title: settings.templates.faq,
                type: "object",
                required: ["@context", "@type", "mainEntity"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "FAQPage" },
                    "mainEntity": {
                        type: "array",
                        title: "Questions",
                        items: {
                            type: "object",
                            properties: {
                                "@type": { type: "string", default: "Question" },
                                "name": { type: "string", title: "Question" },
                                "acceptedAnswer": {
                                    type: "object",
                                    properties: {
                                        "@type": { type: "string", default: "Answer" },
                                        "text": { type: "string", title: "Answer" }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            howto: {
                title: settings.templates.howto,
                type: "object",
                required: ["@context", "@type", "name", "step"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "HowTo" },
                    "name": { type: "string", title: "How-To Name" },
                    "step": {
                        type: "array",
                        title: "Steps",
                        items: {
                            type: "object",
                            properties: {
                                "@type": { type: "string", default: "HowToStep" },
                                "name": { type: "string", title: "Step Name" },
                                "text": { type: "string", title: "Instruction" }
                            }
                        }
                    }
                }
            },
            event: {
                title: settings.templates.event,
                type: "object",
                required: ["@context", "@type", "name", "startDate"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Event" },
                    "name": { type: "string", title: "Event Name" },
                    "startDate": { type: "string", title: "Start Date", format: "date-time" },
                    "endDate": { type: "string", title: "End Date", format: "date-time" },
                    "location": {
                        type: "object",
                        title: "Location",
                        properties: {
                            "@type": { type: "string", default: "Place" },
                            "name": { type: "string", title: "Location Name" },
                            "address": { type: "string", title: "Address" }
                        }
                    }
                }
            },
            jobposting: {
                title: settings.templates.jobposting,
                type: "object",
                required: ["@context", "@type", "title", "hiringOrganization"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "JobPosting" },
                    "title": { type: "string", title: "Job Title" },
                    "hiringOrganization": {
                        type: "object",
                        title: "Organization",
                        properties: {
                            "@type": { type: "string", default: "Organization" },
                            "name": { type: "string", title: "Organization Name" }
                        }
                    },
                    "datePosted": { type: "string", title: "Date Posted", format: "date" }
                }
            },
            localbusiness: {
                title: settings.templates.localbusiness,
                type: "object",
                required: ["@context", "@type", "name", "address"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "LocalBusiness" },
                    "name": { type: "string", title: "Business Name" },
                    "address": {
                        type: "object",
                        title: "Address",
                        properties: {
                            "@type": { type: "string", default: "PostalAddress" },
                            "streetAddress": { type: "string", title: "Street" },
                            "addressLocality": { type: "string", title: "City" },
                            "postalCode": { type: "string", title: "Postal Code" },
                            "addressCountry": { type: "string", title: "Country" }
                        }
                    },
                    "telephone": { type: "string", title: "Phone Number" }
                }
            },
            organization: {
                title: settings.templates.organization,
                type: "object",
                required: ["@context", "@type", "name"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Organization" },
                    "name": { type: "string", title: "Organization Name" },
                    "url": { type: "string", title: "Website URL" },
                    "address": {
                        type: "object",
                        title: "Address",
                        properties: {
                            "@type": { type: "string", default: "PostalAddress" },
                            "streetAddress": { type: "string", title: "Street" },
                            "addressLocality": { type: "string", title: "City" },
                            "postalCode": { type: "string", title: "Postal Code" },
                            "addressCountry": { type: "string", title: "Country" }
                        }
                    }
                }
            },
            recipe: {
                title: settings.templates.recipe,
                type: "object",
                required: ["@context", "@type", "name", "recipeIngredient"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Recipe" },
                    "name": { type: "string", title: "Recipe Name" },
                    "recipeIngredient": {
                        type: "array",
                        title: "Ingredients",
                        items: { type: "string" }
                    },
                    "recipeInstructions": {
                        type: "array",
                        title: "Instructions",
                        items: {
                            type: "object",
                            properties: {
                                "@type": { type: "string", default: "HowToStep" },
                                "text": { type: "string", title: "Step" }
                            }
                        }
                    }
                }
            },
            video: {
                title: settings.templates.video,
                type: "object",
                required: ["@context", "@type", "name", "description"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "VideoObject" },
                    "name": { type: "string", title: "Video Title" },
                    "description": { type: "string", title: "Description" },
                    "thumbnailUrl": { type: "string", title: "Thumbnail URL" },
                    "uploadDate": { type: "string", title: "Upload Date", format: "date" }
                }
            },
            breadcrumblist: {
                title: settings.templates.breadcrumblist,
                type: "object",
                required: ["@context", "@type", "itemListElement"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "BreadcrumbList" },
                    "itemListElement": {
                        type: "array",
                        title: "Breadcrumbs",
                        items: {
                            type: "object",
                            properties: {
                                "@type": { type: "string", default: "ListItem" },
                                "position": { type: "integer", title: "Position" },
                                "name": { type: "string", title: "Name" },
                                "item": { type: "string", title: "URL" }
                            }
                        }
                    }
                }
            },
            review: {
                title: settings.templates.review,
                type: "object",
                required: ["@context", "@type", "itemReviewed", "reviewRating"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Review" },
                    "itemReviewed": {
                        type: "object",
                        title: "Item Reviewed",
                        properties: {
                            "@type": { type: "string", default: "Thing" },
                            "name": { type: "string", title: "Item Name" }
                        }
                    },
                    "reviewRating": {
                        type: "object",
                        title: "Rating",
                        properties: {
                            "@type": { type: "string", default: "Rating" },
                            "ratingValue": { type: "string", title: "Rating Value" }
                        }
                    }
                }
            },
            aggregaterating: {
                title: settings.templates.aggregaterating,
                type: "object",
                required: ["@context", "@type", "ratingValue", "reviewCount"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "AggregateRating" },
                    "ratingValue": { type: "string", title: "Average Rating" },
                    "reviewCount": { type: "integer", title: "Number of Reviews" },
                    "itemReviewed": {
                        type: "object",
                        title: "Item Reviewed",
                        properties: {
                            "@type": { type: "string", default: "Thing" },
                            "name": { type: "string", title: "Item Name" }
                        }
                    }
                }
            },
            course: {
                title: settings.templates.course,
                type: "object",
                required: ["@context", "@type", "name"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Course" },
                    "name": { type: "string", title: "Course Name" },
                    "description": { type: "string", title: "Description" },
                    "provider": {
                        type: "object",
                        title: "Provider",
                        properties: {
                            "@type": { type: "string", default: "Organization" },
                            "name": { type: "string", title: "Provider Name" }
                        }
                    }
                }
            },
            softwareapplication: {
                title: settings.templates.softwareapplication,
                type: "object",
                required: ["@context", "@type", "name"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "SoftwareApplication" },
                    "name": { type: "string", title: "Application Name" },
                    "operatingSystem": { type: "string", title: "Operating System" },
                    "applicationCategory": { type: "string", title: "Category" }
                }
            },
            dataset: {
                title: settings.templates.dataset,
                type: "object",
                required: ["@context", "@type", "name", "description"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Dataset" },
                    "name": { type: "string", title: "Dataset Name" },
                    "description": { type: "string", title: "Description" },
                    "distribution": {
                        type: "object",
                        title: "Distribution",
                        properties: {
                            "@type": { type: "string", default: "DataDownload" },
                            "contentUrl": { type: "string", title: "Download URL" }
                        }
                    }
                }
            },
            website: {
                title: settings.templates.website,
                type: "object",
                required: ["@context", "@type", "name", "url"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "WebSite" },
                    "name": { type: "string", title: "Website Name" },
                    "url": { type: "string", title: "Website URL" },
                    "potentialAction": {
                        type: "object",
                        title: "Search Action",
                        properties: {
                            "@type": { type: "string", default: "SearchAction" },
                            "target": { type: "string", title: "Search URL Template" },
                            "query-input": { type: "string", default: "required name=search_term_string", title: "Query Input" }
                        }
                    }
                }
            },
            speakablespecification: {
                title: settings.templates.speakablespecification,
                type: "object",
                required: ["@context", "@type"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "SpeakableSpecification" },
                    "cssSelector": {
                        type: "array",
                        title: "CSS Selectors",
                        items: { type: "string" }
                    },
                    "xpath": {
                        type: "array",
                        title: "XPath",
                        items: { type: "string" }
                    }
                }
            },
            subscription: {
                title: settings.templates.subscription,
                type: "object",
                required: ["@context", "@type", "name"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Subscription" },
                    "name": { type: "string", title: "Subscription Name" },
                    "description": { type: "string", title: "Description" },
                    "price": { type: "string", title: "Price" },
                    "priceCurrency": { type: "string", default: "EUR", title: "Currency" }
                }
            },
            book: {
                title: settings.templates.book,
                type: "object",
                required: ["@context", "@type", "name"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Book" },
                    "name": { type: "string", title: "Book Title" },
                    "author": {
                        type: "object",
                        title: "Author",
                        properties: {
                            "@type": { type: "string", default: "Person" },
                            "name": { type: "string", title: "Author Name" }
                        }
                    },
                    "isbn": { type: "string", title: "ISBN" }
                }
            },
            offer: {
                title: settings.templates.offer,
                type: "object",
                required: ["@context", "@type", "price"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "Offer" },
                    "price": { type: "string", title: "Price" },
                    "priceCurrency": { type: "string", default: "EUR", title: "Currency" },
                    "itemOffered": {
                        type: "object",
                        title: "Item Offered",
                        properties: {
                            "@type": { type: "string", default: "Product" },
                            "name": { type: "string", title: "Product Name" }
                        }
                    }
                }
            },
            aggregateoffer: {
                title: settings.templates.aggregateoffer,
                type: "object",
                required: ["@context", "@type", "lowPrice", "highPrice"],
                properties: {
                    "@context": { type: "string", default: "https://schema.org" },
                    "@type": { type: "string", default: "AggregateOffer" },
                    "lowPrice": { type: "string", title: "Lowest Price" },
                    "highPrice": { type: "string", title: "Highest Price" },
                    "priceCurrency": { type: "string", default: "EUR", title: "Currency" },
                    "offerCount": { type: "integer", title: "Number of Offers" }
                }
            }
        };

        return this.each(function() {
            const $container = $(this);
            $container.addClass('container');

            // Add CSS
            $('<style>').text(`
                .structured-data-editor {
                    font-family: sans-serif;
                    padding: 40px;
                    background-color: #f8f9fa;
                }
                .structured-data-editor select {
                    font-size: 16px;
                    padding: 6px 10px;
                    margin-bottom: 20px;
                }
                .structured-data-editor #editor_holder {
                    margin-top: 30px;
                }
            `).appendTo('head');

            // HTML structure
            $container.addClass('structured-data-editor').html(`
                <h2 class="mb-4">${settings.title}</h2>
                <div class="mb-3">
                    <label for="template-select" class="form-label">${settings.selectLabel}</label>
                    <select class="form-select" id="template-select">
                        <option value="">${settings.selectPlaceholder}</option>
                        ${Object.keys(settings.templates).map(key =>
                `<option value="${key}">${settings.templates[key]}</option>`
            ).join('')}
                    </select>
                </div>
                <div id="editor_holder" class="card card-body shadow-sm bg-white border"></div>
            `);

            // Initialize editor
            let editor;

            const updateJsonInput = () => {
                if (settings.jsonInputId) {
                    const $jsonInput = $(`#${settings.jsonInputId}`);
                    if ($jsonInput.length) {
                        $jsonInput.val(JSON.stringify(editor.getValue(), null, 2));
                    }
                }
            };

            const initEditor = (schema, initialData = null) => {
                if (editor) {
                    editor.destroy();
                }
                editor = new JSONEditor($container.find('#editor_holder')[0], {
                    schema: schema,
                    theme: 'bootstrap4',
                    disable_collapse: true,
                    disable_edit_json: true,
                    disable_properties: true,
                    startval: initialData
                });

                // Update JSON input on change
                editor.on('change', updateJsonInput);
            };

            // Load initial JSON data if provided
            if (settings.jsonInputId) {
                const $jsonInput = $(`#${settings.jsonInputId}`);
                if ($jsonInput.length && $jsonInput.val()) {
                    try {
                        const initialData = JSON.parse($jsonInput.val());
                        const type = initialData['@type']?.toLowerCase();
                        const key = Object.keys(schemas).find(k => schemas[k].properties['@type'].default.toLowerCase() === type);
                        if (key && schemas[key]) {
                            initEditor(schemas[key], initialData);
                            $container.find('#template-select').val(key);
                        }
                    } catch (e) {
                        console.error('Invalid JSON in input field:', e);
                    }
                }
            }

            // Event listener
            $container.find('#template-select').on('change', function() {
                const selected = $(this).val();
                if (selected && schemas[selected]) {
                    initEditor(schemas[selected]);
                }
            });
        });
    };
})(jQuery);