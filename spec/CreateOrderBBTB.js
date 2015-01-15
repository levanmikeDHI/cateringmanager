///////////////////////////////////////////////////////////////////////////////////////////////////
// Including js code of the Page Objects we will need for this Spec
///////////////////////////////////////////////////////////////////////////////////////////////////
var helper = require('../src/Helper.js');
var topNavigationPageObj = require('../src/topNavigationPageObjects.js');
var restaurantSearchPageObj = require('../src/restaurantSearchPageObjects.js');
var orderDetailsPageObj = require('../src/orderDetailsPageObjects.js');
var customerDataPageObj = require('../src/CustomerDataPageObjects.js');
var bbtbPageObj = require('../src/BbtbPageObjects.js');
var orderSummaryPageObj = require('../src/OrderSummaryPageObjects.js');
var orderManagerPageObj = require('../src/OrderManagerPageObjects.js');

///////////////////////////////////////////////////////////////////////////////////////////////////
// Declaring those Page Objects so we can use them later
///////////////////////////////////////////////////////////////////////////////////////////////////
var topNavigationPage = new topNavigationPageObj();
var restaurantSearchPage = new restaurantSearchPageObj();
var orderDetailsPage = new orderDetailsPageObj();
var customerDataPage = new customerDataPageObj();
var bbtbPage = new bbtbPageObj();
var orderSummaryPage = new orderSummaryPageObj();
var orderManagerPage = new orderManagerPageObj();

///////////////////////////////////////////////////////////////////////////////////////////////////
// Start our test of creating a new order
///////////////////////////////////////////////////////////////////////////////////////////////////
describe('Create New Order with BBTB from Catering Manager', function() {
    it('Create a 20 BBTB order', function() {
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc");
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Click 'Create New Order' link
        ///////////////////////////////////////////////////////////////////////////////////////////
        topNavigationPage.clickCreateNewOrder();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Select store #74
        ///////////////////////////////////////////////////////////////////////////////////////////
        restaurantSearchPage.clickChangeRestaurantButton();
        restaurantSearchPage.typeRestaurantNumberText("74");
        restaurantSearchPage.clickChangeRestaurantSearchButton();
        expect(restaurantSearchPage.getRestaurantSearchStoreNameText()).toBe('88TH & WADSWORTH');
        restaurantSearchPage.clickRestaurantSearchStoreNameText();
        expect(orderDetailsPage.restaurantNameText.getText()).toBe('88th & Wadsworth');

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Get today's date so we can make an order for the next day
        ///////////////////////////////////////////////////////////////////////////////////////////
        var tomorrowsDate = (new Date());
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Format the string we are going to pass in
        ///////////////////////////////////////////////////////////////////////////////////////////
        var day = tomorrowsDate.getDate();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Format and store date in our Helper.js to be used later
        ///////////////////////////////////////////////////////////////////////////////////////////
        var tomorrowsDateStr = (('0' + (tomorrowsDate.getMonth()+1)).slice(-2) + '/' + ('0' + tomorrowsDate.getDate()).slice(-2) + '/' + tomorrowsDate.getFullYear());
        helper.setOrderDate(tomorrowsDateStr.toString());

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Enter in Date of Catering order
        ///////////////////////////////////////////////////////////////////////////////////////////
        orderDetailsPage.typePickupDateText('');
        browser.driver.findElement(by.linkText(day.toString())).click();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Store our Time in our Helper.js to be used later and then enter in Time of Catering order
        ///////////////////////////////////////////////////////////////////////////////////////////
        helper.setOrderTime('11:15 AM');
        orderDetailsPage.typePickupTimeText(helper.getOrderTime());

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Enter Customer Contact Information
        ///////////////////////////////////////////////////////////////////////////////////////////
        customerDataPage.typeCcFirstNameText("Test");
        customerDataPage.typeCcLastNameText("Automation");
        customerDataPage.typeCcCompanyText("Chipotle");
        customerDataPage.typeCcPhoneText("111-222-3333");
        customerDataPage.typeCcExtensionText("9999");
        customerDataPage.typeCcEmailText("chipotleautomation@gmail.com");
        customerDataPage.typeCcEventText("My Automation Test");

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Click BBTB button
        ///////////////////////////////////////////////////////////////////////////////////////////
        bbtbPage.clickBbtbButton();
        expect(bbtbPage.getBbtbQtyText()).toBe('');

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Enter in Qty of 20
        ///////////////////////////////////////////////////////////////////////////////////////////
        bbtbPage.typeBbtbQtyText("20");

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Click Assortment button
        ///////////////////////////////////////////////////////////////////////////////////////////
        bbtbPage.clickBbtbAssortmentButton();

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Verify that the Total = 20
        ///////////////////////////////////////////////////////////////////////////////////////////
        browser.waitForAngular().then(function() {
            expect(bbtbPage.getBbtbAssortmentTotalText()).toBe('20');
        });

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Click Submit Order
        ///////////////////////////////////////////////////////////////////////////////////////////
        orderSummaryPage.clickSubmitOrderButton();

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Wait for Order Manager page to return
        ///////////////////////////////////////////////////////////////////////////////////////////
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /number/.test(url);
            })
        });

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Wait for Notification Notice to go away
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
});

///////////////////////////////////////////////////////////////////////////////////////////////////
// Start our test of viewing our newly created order
///////////////////////////////////////////////////////////////////////////////////////////////////
describe('View newly created order with BBTB from Catering Manager', function() {
    it('View our 20 BBTB order', function() {
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Enter our newly created order number in the Search By ID text
        ///////////////////////////////////////////////////////////////////////////////////////////
        orderManagerPage.typeSearchByOrderIdText(helper.getOrderNumber());
        browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Click the first and only row in the grid table that has our newly created order
        ///////////////////////////////////////////////////////////////////////////////////////////
        orderManagerPage.getRowsInSearchGridTable().then(function() {
            // Click on our search result
            orderManagerPage.clickRowInSearchGridTable();
            // Wait for the View/Edit Order page to appear
            expect(orderDetailsPage.getOrderNumberText()).toBe('ORDER ' + helper.getOrderNumber())
        });

        // Verify our BBTB order displays correctly
        // Verify Pick Up Details information
        //expect(orderDetailsPage.getPickupDateText).toBe(helper.getOrderDate());
        //expect(orderDetailsPage.getPickupTimeText()).toBe(helper.getOrderTime());
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Verify Restaurant information displays correctly
        ///////////////////////////////////////////////////////////////////////////////////////////
        expect(restaurantSearchPage.getRestaurantStoreIdText()).toBe('74');
        expect(restaurantSearchPage.getRestaurantStoreNameText()).toBe('88th & Wadsworth');
        expect(restaurantSearchPage.getRestaurantStoreAddressText()).toBe('8797 Wadsworth Blvd.');
        expect(restaurantSearchPage.getRestaurantStoreCityStateZipText()).toBe('Arvada CO 80003');
        expect(restaurantSearchPage.getRestaurantStoreCrossStreetsText()).toBe('at/near 88th & Wadsworth');
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Verify Customer Contact information displays correctly
        ///////////////////////////////////////////////////////////////////////////////////////////
        expect(customerDataPage.getCcFirstNameText()).toBe('Test');
        expect(customerDataPage.getCcLastNameText()).toBe('Automation');
        expect(customerDataPage.getCcCompanyText()).toBe('Chipotle');
        expect(customerDataPage.getCcPhoneText()).toBe('(111) 222-3333');
        expect(customerDataPage.getCcExtensionText()).toBe('9999');
        expect(customerDataPage.getCcEmailText()).toBe('chipotleautomation@gmail.com');
        expect(customerDataPage.getCcEventText()).toBe('My Automation Test');
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Verify BBTB order displays correctly
        ///////////////////////////////////////////////////////////////////////////////////////////
        expect(bbtbPage.getBbtbQtyTextAttribute()).toBe('20');
        expect(bbtbPage.getBbtbAssortmentTotalText()).toBe('20');
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Verify Order Summary displays our order correctly
        ///////////////////////////////////////////////////////////////////////////////////////////
        expect(orderSummaryPage.getOrderItemNameText()).toBe('Burritos By The Box');
        expect(orderSummaryPage.getBbtbOrderDescriptionText()).toBe('Serving 20   ( Steak 4 , Chicken 9 , Carnitas 2 , Barbacoa 2 , Fajita Veggies 2 , Sofritas 1 ) ; White');
        expect(orderSummaryPage.getOrderItemCostText()).toBe('$175.00');
    });
});