module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            '../client/bower_components/angular/angular.js',
            '../client/bower_components/angular-route/angular-route.js',
            '../client/bower_components/angular-resource/angular-resource.js',
            '../client/bower_components/angular-animate/angular-animate.js',
            '../client/bower_components/angular-mocks/angular-mocks.js',
            '../client/app/components/version/**/*.js',
            '../client/js/**/*.js',
            'tests/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome', 'Firefox'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};