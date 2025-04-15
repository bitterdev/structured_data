let mix = require('laravel-mix');

mix.webpackConfig({
    externals: {
        jquery: "jQuery",
        bootstrap: true
    }
});

mix.setResourceRoot('./');
mix.setPublicPath('../');

mix
    .js("assets/structured_data/auto.js", "../blocks/structured_data/auto.js")
    .copy("node_modules/@json-editor/json-editor/dist/jsoneditor.js", "../js/jsoneditor.js")
    .copy("node_modules/@json-editor/json-editor/dist/jsoneditor.js.LICENSE.txt", "../js/jsoneditor.js.LICENSE.txt")
