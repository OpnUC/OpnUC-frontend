let mix = require('laravel-mix');

const distDir = './dist';

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var paths = {
    'admin_lte': 'node_modules/admin-lte',
    'fontawesome': 'node_modules/font-awesome'
}

mix
    .setPublicPath(distDir)
    .browserSync({
        files: 'dist/**/*',
        server: 'dist/',
        proxy: false
    })

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery', 'window.$', 'jquery', 'window.jquery']
});

mix.js([
        'src/js/app.js',
        'src/js/vue.es6'
    ]
    , 'js')
    .sass('src/sass/app.scss', 'css')
    .combine([
        // Admin LTE
        paths.admin_lte + '/dist/css/AdminLTE.min.css',
        paths.admin_lte + '/dist/css/alt/AdminLTE-select2.min.css',
        paths.admin_lte + '/dist/css/skins/skin-blue-light.min.css',
        // Font Awsome
        paths.fontawesome + '/css/font-awesome.css'
    ], 'dist/css/vendor.css')
    .extract(['libphonenumber-js', 'element-ui', 'bootstrap-sass', 'axios', 'jquery', 'vue', 'vue-router', 'vue-events', 'vue-axios', 'moment', 'encoding-japanese'])
    .copy(
        'node_modules/font-awesome/fonts',
        'dist/fonts'
    );

if (mix.inProduction()) {
    mix.version();
}
