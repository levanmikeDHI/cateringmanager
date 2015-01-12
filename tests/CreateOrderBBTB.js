// Including js code of the Page Objects we will need for this Spec
var topNavigationPageObj = require('./topNavigationPageObjects.js');
var restaurantSearchPageObj = require('./restaurantSearchPageObjects.js');
var orderDetailsPageObj = require('./orderDetailsPageObjects.js');

// Declaring those Page Objects so we can use them later
var topNavigationPage = new topNavigationPageObj();
var restaurantSearchPage = new restaurantSearchPageObj();
var orderDetailsPage = new orderDetailsPageObj();

var customerDataPageObjects = {
    ccFirstName : element(by.id("txtBcFirstName")),
    ccLastName : element(by.id("txtBcLastName")),
    ccCompany : element(by.id("txtBcCompany")),
    ccPhone : element(by.id("txtBcPhoneNumber")),
    ccExtension : element(by.id("txtBcExtension")),
    ccEmail : element(by.id("txtBcEmail")),
    ccEvent : element(by.id("txtBcEventType"))
};

var bbtbPageObjects = {
    bbtbButton : element(by.css('[ng-click="addOrderItem(selectedRestaurant.Categories[0].MenuItems[0])"]')),
    bbtbQtyTxt : element(by.name("OrderItemQty")),
    bbtbAssortmentButton : element(by.css('[ng-click="getAssortment(orderItem,orderItemForm.OrderItemQty.$viewValue); orderItem.assorted = !orderItem.assorted;"]')),
    bbtbAssortmentTotal : element(by.name("txtBbtbSubTotal"))
};

var orderSummaryPageObjects = {
    submitOrderButton : element(by.className("lblCreateOrder"))
};

var orderManagerPageObjects = {
    searchByOrderIdTxt : element(by.model("searchParameters.orderNumber")),
    searchGridTable : element(by.repeater('row in renderedRows'))
};

// Start our test
describe('Create New Order with BBTB from Catering Manager', function() {
    it('Create a 20 BBTB order', function() {
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc");
        // Click 'Create New Order' link
        topNavigationPage.clickCreateNewOrder();
        // Change default store #9999 to #74
        restaurantSearchPage.clickChangeRestaurantButton();
        restaurantSearchPage.typeRestaurantNumberText("74");
        restaurantSearchPage.clickChangeRestaurantSearchButton();
        expect(restaurantSearchPage.getRestaurantStoreNameText()).toBe('88TH & WADSWORTH');
        restaurantSearchPage.clickRestaurantStoreNameText();
        expect(orderDetailsPage.restaurantNameText.getText()).toBe('88th & Wadsworth');

        // Get today's date so we can make an order for the next day
        var tomorrowsDate = (new Date());
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
        // Set tomorrow's day that we are going to pass in
        var day = tomorrowsDate.getDate();

        // Enter in Date of Catering order
        orderDetailsPage.typePickupDateText('');
        browser.driver.findElement(by.linkText(day.toString())).click();
        // Enter in Time of Catering order
        orderDetailsPage.typePickupTimeText('11:15am');

        // Enter Customer Contact Information
        customerDataPageObjects.ccFirstName.sendKeys("Test");
        customerDataPageObjects.ccLastName.sendKeys("Automation");
        customerDataPageObjects.ccCompany.sendKeys("Chipotle");
        customerDataPageObjects.ccPhone.sendKeys("111-222-3333");
        customerDataPageObjects.ccExtension.sendKeys("9999");
        customerDataPageObjects.ccEmail.sendKeys("chipotleautomation@gmail.com");
        customerDataPageObjects.ccEvent.sendKeys("My Automation Test");

        // Click BBTB button
        bbtbPageObjects.bbtbButton.click();
        expect(bbtbPageObjects.bbtbQtyTxt.getText()).toBe('');

        // Enter in Qty of 20
        bbtbPageObjects.bbtbQtyTxt.sendKeys("20");

        // Click Assortment button
        bbtbPageObjects.bbtbAssortmentButton.click();

        // Verify that the Total = 20
        browser.waitForAngular().then(function() {
            expect(bbtbPageObjects.bbtbAssortmentTotal.getAttribute('value')).toBe('20');
        });

        // Click Submit Order
        orderSummaryPageObjects.submitOrderButton.click();

        // Wait for Order Manager page to return
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /number/.test(url);
            })
        });

        // Wait for Notification Notice to go away
        browser.getCurrentUrl().then(function(url) {
            expect(url).toContain("OrderManager?message=saved&number");
            // Now that we know the page is loaded let's get the Order Number from the URL, putting a 15 seconds wait on this because initial load up takes some time
            var orderNumber = url;
            orderNumber = orderNumber.toString().replace("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc/Order/OrderManager?message=saved&number=", "");

            orderManagerPageObjects.searchByOrderIdTxt.sendKeys(orderNumber);
            //orderManagerPageObjects.searchByOrderIdTxt.actions().sendKeys(protractor.)
        }, 15000);

        browser.waitForAngular();

        // Click on our search result
        element(by.repeater('row.in.renderedRows').row(0)).element(by.className('ngCell.col1.colt1')).click();
        browser.waitForAngular();
    });
});