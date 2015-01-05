//Grab our environment properties
var env = require('./environment.js');

// A small suite to make sure the cucumber framework works.
exports.config = {
    seleniumAddress: env.seleniumAddress,

    framework: 'cucumber',

    // Spec patterns are relative to this directory.
    specs: [
      'Features/*.feature'
    ],

    capabilities: env.capabilities,

    baseUrl: env.baseUrl,

    cucumberOpts: {
        require: 'Steps/NavigationToPage.js',
        tags: '@test',
        format: 'summary'
    }
};