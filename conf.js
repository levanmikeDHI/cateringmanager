//Grab our environment properties
var env = require('./environment.js');

// A small suite to make sure the cucumber framework works.
exports.config = {
    seleniumAddress: env.seleniumAddress,

    // Which tests should we run?
    suites: {
        connection: 'tests/CreateOrderBBTB.js'
    },

    capabilities: env.capabilities,

    baseUrl: env.baseUrl,

    // Setting our window size to max before the test starts
    onPrepare: function() {
        browser.driver.manage().window().maximize()
    },

    framework: 'jasmine',

    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        defaultTimeoutInterval: 30000,
        // If true, display spec names.
        isVerbose: true,
        // If true, include stack traces in failures.
        includeStackTrace: true
        // Function called to print jasmine results
        //print: function() {}
    },

    // Setting to help with 'Timed out waiting for Protractor to sync with page' error
    allScriptsTimeout:
        15000
};