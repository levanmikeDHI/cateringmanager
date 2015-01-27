var helper = require('../src/Helper.js');
var topNavigationPageObj = require('../src/topNavigationPageObjects.js');
var restaurantSearchPageObj = require('../src/restaurantSearchPageObjects.js');
var orderDetailsPageObj = require('../src/orderDetailsPageObjects.js');
var customerDataPageObj = require('../src/CustomerDataPageObjects.js');
var bbtbPageObj = require('../src/BbtbPageObjects.js');
var orderSummaryPageObj = require('../src/OrderSummaryPageObjects.js');
var orderManagerPageObj = require('../src/OrderManagerPageObjects.js');

var topNavigationPage = new topNavigationPageObj();
var restaurantSearchPage = new restaurantSearchPageObj();
var orderDetailsPage = new orderDetailsPageObj();
var customerDataPage = new customerDataPageObj();
var bbtbPage = new bbtbPageObj();
var orderSummaryPage = new orderSummaryPageObj();
var orderManagerPage = new orderManagerPageObj();

///////////////////////////////////////////////////////////////////////////////////////////////////
// Create New Order by searching by zip code 80202
// Create a 25 BBTB order by selecting the first store when searching by 80202.  This test will
// created the order, go to View/Edit Order page, and verify that the store info, customer contact
// info, items we ordered, and the order summary info comes back to us correctly.
// This tests DE811 - Pagination of restaurant search displays audit log text
///////////////////////////////////////////////////////////////////////////////////////////////////
describe('Create New Order searching by zip code', function() {
    it('Create a 25 BBTB order', function() {
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc");
        topNavigationPage.clickCreateNewOrder();
        restaurantSearchPage.clickChangeRestaurantButton();
        restaurantSearchPage.typeRestaurantZipCodeText('80202');
        restaurantSearchPage.clickChangeRestaurantSearchButton();
        expect(restaurantSearchPage.getRestaurantSearchStoreNameText()).toBe('LODO');
        ///////////////////////////////////////////////////////////////////////////////////////////
        // Ugly way to check 'Page 1 of 8' but there is no other way I could get this to work
        ///////////////////////////////////////////////////////////////////////////////////////////
        expect(restaurantSearchPage.getRestaurantPaginationText()).toContain('Page');
        expect(restaurantSearchPage.getRestaurantPaginationText()).toContain('1');
        expect(restaurantSearchPage.getRestaurantPaginationText()).toContain('8');
        restaurantSearchPage.clickRestaurantSearchStoreNameText();
        expect(orderDetailsPage.restaurantNameText.getText()).toBe('Lodo');

        var tomorrowsDate = (new Date());
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
        var day = tomorrowsDate.getDate();
        var tomorrowsDateStr = (('0' + (tomorrowsDate.getMonth()+1)).slice(-2) + '/' + ('0' + tomorrowsDate.getDate()).slice(-2) + '/' + tomorrowsDate.getFullYear());
        helper.setOrderDate(tomorrowsDateStr.toString());

        orderDetailsPage.typePickupDateText('');
        browser.driver.findElement(by.linkText(day.toString())).click();
        helper.setOrderTime('11:15 AM');
        orderDetailsPage.typePickupTimeText(helper.getOrderTime());

        customerDataPage.typeCcFirstNameText("Test");
        customerDataPage.typeCcLastNameText("Automation");
        customerDataPage.typeCcCompanyText("Chipotle");
        customerDataPage.typeCcPhoneText("111-222-3333");
        customerDataPage.typeCcExtensionText("9999");
        customerDataPage.typeCcEmailText("chipotleautomation@gmail.com");
        customerDataPage.typeCcEventText("My Automation Test");

        bbtbPage.clickBbtbButton();
        expect(bbtbPage.getBbtbQtyText()).toBe('');
        bbtbPage.typeBbtbQtyText("25");
        bbtbPage.clickBbtbAssortmentButton();
        browser.waitForAngular().then(function() {
            expect(bbtbPage.getBbtbAssortmentTotalText()).toBe('25');
        });

        orderSummaryPage.clickSubmitOrderButton();

        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /number/.test(url);
            })
        });

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

describe('View newly created order with BBTB from Catering Manager', function() {
    it('View our 25 BBTB order', function() {
        orderManagerPage.typeSearchByOrderIdText(helper.getOrderNumber());
        browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
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
        expect(restaurantSearchPage.getRestaurantStoreIdText()).toBe('73');
        expect(restaurantSearchPage.getRestaurantStoreNameText()).toBe('Lodo');
        expect(restaurantSearchPage.getRestaurantStoreAddressText()).toBe('1480 16th St.');
        expect(restaurantSearchPage.getRestaurantStoreCityStateZipText()).toBe('Denver CO 80202');
        expect(restaurantSearchPage.getRestaurantStoreCrossStreetsText()).toBe('at/near 16th & Blake');

        expect(customerDataPage.getCcFirstNameText()).toBe('Test');
        expect(customerDataPage.getCcLastNameText()).toBe('Automation');
        expect(customerDataPage.getCcCompanyText()).toBe('Chipotle');
        expect(customerDataPage.getCcPhoneText()).toBe('(111) 222-3333');
        expect(customerDataPage.getCcExtensionText()).toBe('9999');
        expect(customerDataPage.getCcEmailText()).toBe('chipotleautomation@gmail.com');
        expect(customerDataPage.getCcEventText()).toBe('My Automation Test');

        expect(bbtbPage.getBbtbQtyTextAttribute()).toBe('25');
        expect(bbtbPage.getBbtbAssortmentTotalText()).toBe('25');

        element.all(by.repeater('summaryItem in order.OrderItems')).get(0).then(function (row) {
            row.element(by.className('summaryOrderName')).getText().then(function (name) {
                expect(name).toBe('Burritos By The Box');
            });
            row.element(by.className('summaryOrderDes')).getText().then(function (description) {
                expect(description).toBe('Serving 25   ( Steak 5 , Chicken 12 , Carnitas 3 , Barbacoa 2 , Fajita Veggies 2 , Sofritas 1 ) ; White');
            });
            row.element(by.className('summaryOrderCost')).getText().then(function (cost) {
                expect(cost).toBe('$218.75');
            });
        });
    });
});