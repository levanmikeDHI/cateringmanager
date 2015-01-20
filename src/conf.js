// A small suite to make sure the cucumber framework works.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress : 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName' : 'chrome',
        'version' : 'ANY'
    },

    // Which tests should we run?
    suites: {
        connection : '../spec/CreateOrderBBTBAndBigSpread.js'
    },

    // Setting our window size to max before the test starts
    onPrepare: function() {
        browser.driver.manage().window().maximize()
    },

    framework : 'jasmine',

    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors : true,
        defaultTimeoutInterval : 60000,
        // If true, display spec names.
        isVerbose : true,
        // If true, include stack traces in failures.
        includeStackTrace : true
        // Function called to print jasmine results
        //print: function() {}
    },

    // Setting to help with 'Timed out waiting for Protractor to sync with page' error
    allScriptsTimeout : 15000
};