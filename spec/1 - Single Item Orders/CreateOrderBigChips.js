var helper = require('../../src/Helper.js');
var topNavigationPageObj = require('../../src/TopNavigationPageObjects.js');
var restaurantSearchPageObj = require('../../src/RestaurantSearchPageObjects.js');
var orderDetailsPageObj = require('../../src/OrderDetailsPageObjects.js');
var customerDataPageObj = require('../../src/CustomerDataPageObjects.js');
var chipsPageObj = require('../../src/ChipsPageObjects.js');
var orderSummaryPageObj = require('../../src/OrderSummaryPageObjects.js');
var orderManagerPageObj = require('../../src/OrderManagerPageObjects.js');

var topNavigationPage = new topNavigationPageObj();
var restaurantSearchPage = new restaurantSearchPageObj();
var orderDetailsPage = new orderDetailsPageObj();
var customerDataPage = new customerDataPageObj();
var chipsPage = new chipsPageObj();
var orderSummaryPage = new orderSummaryPageObj();
var orderManagerPage = new orderManagerPageObj();

///////////////////////////////////////////////////////////////////////////////////////////////////
// Create New Order with Big Chips from Catering Manager
// Create a 4 Big Chips order.  This test will created the order, go to View/Edit Order page, and
// verify that the store info, customer contact info, items we ordered, and the order summary info
// comes back to us correctly.
///////////////////////////////////////////////////////////////////////////////////////////////////
describe('Create New Order with 4 Big Chips from Catering Manager', function() {
    it('Create a Big Chips order', function() {
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc");
        topNavigationPage.clickCreateNewOrder();

        restaurantSearchPage.clickChangeRestaurantButton();
        restaurantSearchPage.typeRestaurantNumberText("74");
        restaurantSearchPage.clickChangeRestaurantSearchButton();
        expect(restaurantSearchPage.getRestaurantSearchStoreNameText()).toBe('88TH & WADSWORTH');
        restaurantSearchPage.clickRestaurantSearchStoreNameText();
        expect(orderDetailsPage.restaurantNameText.getText()).toBe('88th & Wadsworth');

        var tomorrowsDate = (new Date());
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
        var day = tomorrowsDate.getDate();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Format the date and store date in our Helper.js to be used later
        ///////////////////////////////////////////////////////////////////////////////////////////
        var tomorrowsDateStr = (('0' + (tomorrowsDate.getMonth()+1)).slice(-2) + '/' + ('0' + tomorrowsDate.getDate()).slice(-2) + '/' + tomorrowsDate.getFullYear());
        helper.setOrderDate(tomorrowsDateStr.toString());

        orderDetailsPage.typePickupDateText('');
        browser.driver.findElement(by.linkText(day.toString())).click();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Store our Time in our Helper.js to be used later and then enter in Time of Catering order
        ///////////////////////////////////////////////////////////////////////////////////////////
        helper.setOrderTime('11:15 AM');
        orderDetailsPage.typePickupTimeText(helper.getOrderTime());

        customerDataPage.typeCcFirstNameText("Test");
        customerDataPage.typeCcLastNameText("Automation");
        customerDataPage.typeCcCompanyText("Chipotle");
        customerDataPage.typeCcPhoneText("111-222-3333");
        customerDataPage.typeCcExtensionText("9999");
        customerDataPage.typeCcEmailText("chipotleautomation@gmail.com");
        customerDataPage.typeCcEventText("My Automation Test");

        chipsPage.clickChipsBigButton();
        chipsPage.typeChipsBigQtyText('4');

        orderSummaryPage.clickSubmitOrderButton();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // AngularJS wait for Order Manager page to return so we can interact with the page some more
        ///////////////////////////////////////////////////////////////////////////////////////////
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /number/.test(url);
            })
        });
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Wait for Notification Notice to go away because we can't interact with the page until
        // this is gone
        ///////////////////////////////////////////////////////////////////////////////////////////
        browser.getCurrentUrl().then(function(url) {
            expect(url).toContain("OrderManager?message=saved&number");
            // Now that we know the page is loaded let's get the Order Number from the URL, putting a 15 seconds wait on this because initial load up takes some time
            var getOrderNumber = url;
            getOrderNumber = getOrderNumber.toString().replace("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc/Order/OrderManager?message=saved&number=", "");
            // Store our order number in our helper.js file
            helper.setOrderNumber(getOrderNumber);
        }, 15000);
    });

    it('View our Big Chips order', function() {
        orderManagerPage.typeSearchByOrderIdText(helper.getOrderNumber());
        browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Click the first and only row in the grid table that has our newly created order
        ///////////////////////////////////////////////////////////////////////////////////////////
        orderManagerPage.getRowsInSearchGridTable().then(function () {
            // Click on our search result
            orderManagerPage.clickRowInSearchGridTable();
            // Wait for the View/Edit Order page to appear
            expect(orderDetailsPage.getOrderNumberText()).toBe('ORDER ' + helper.getOrderNumber())
        });

        // Verify our BBTB and Big Spread order displays correctly
        // Verify Pick Up Details information
        //expect(orderDetailsPage.getPickupDateText).toBe(helper.getOrderDate());
        //expect(orderDetailsPage.getPickupTimeText()).toBe(helper.getOrderTime());

        expect(restaurantSearchPage.getRestaurantStoreIdText()).toBe('74');
        expect(restaurantSearchPage.getRestaurantStoreNameText()).toBe('88th & Wadsworth');
        expect(restaurantSearchPage.getRestaurantStoreAddressText()).toBe('8797 Wadsworth Blvd.');
        expect(restaurantSearchPage.getRestaurantStoreCityStateZipText()).toBe('Arvada CO 80003');
        expect(restaurantSearchPage.getRestaurantStoreCrossStreetsText()).toBe('at/near 88th & Wadsworth');

        expect(customerDataPage.getCcFirstNameText()).toBe('Test');
        expect(customerDataPage.getCcLastNameText()).toBe('Automation');
        expect(customerDataPage.getCcCompanyText()).toBe('Chipotle');
        expect(customerDataPage.getCcPhoneText()).toBe('(111) 222-3333');
        expect(customerDataPage.getCcExtensionText()).toBe('9999');
        expect(customerDataPage.getCcEmailText()).toBe('chipotleautomation@gmail.com');
        expect(customerDataPage.getCcEventText()).toBe('My Automation Test');

        expect(chipsPage.getChipsBigQtyText()).toBe('4');

        element.all(by.repeater('summaryItem in order.OrderItems')).get(0).then(function (row) {
            row.element(by.className('summaryOrderName')).getText().then(function (name) {
                expect(name).toBe('Chips & Salsa Spread');
            });
            row.element(by.className('summaryOrderDes')).getText().then(function (description) {
                expect(description).toBe('4 Big; 0 Bigger;');
            });
            row.element(by.className('summaryOrderCost')).getText().then(function (cost) {
                expect(cost).toBe('$160.00');
            });
        });
    });
});