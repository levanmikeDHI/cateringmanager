var topNavigationPageObj = require('./topNavigationPageObjects.js');

var topNavigationPage = new topNavigationPageObj();

var restaurantSearchPageObjects = {
    changeRestaurantButton : element(by.id("storeChange")),
    restaurantNumberTxt : element(by.id("txtIdSearch")),
    changeRestaurantSearchButton : element(by.id("idSearch")),
    restaurantStoreNameButton : element(by.id("storeName"))
};

var orderDetailsPageObjects = {
    pickupDateTxt : element(by.model('order.PickupDate')),
    pickupTimeTxt : element(by.model("order.PickupTime")),
    restaurantNameTxt : element(by.id("lblStoreName"))
};

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

// Start our test
describe('Create New Order with BBTB from Catering Manager', function() {
    it('Create a 20 BBTB order', function() {
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc");
        // Click 'Create New Order' link
        topNavigationPage.createNewOrder();
        // Change default store #9999 to #74
        restaurantSearchPageObjects.changeRestaurantButton.click();
        restaurantSearchPageObjects.restaurantNumberTxt.sendKeys("74");
        restaurantSearchPageObjects.changeRestaurantSearchButton.click();
        expect(restaurantSearchPageObjects.restaurantStoreNameButton.getText()).toBe('88TH & WADSWORTH');
        restaurantSearchPageObjects.restaurantStoreNameButton.click();
        expect(orderDetailsPageObjects.restaurantNameTxt.getText()).toBe('88th & Wadsworth');

        // Get today's date so we can make an order for the next day
        var tomorrowsDate = (new Date());
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
        // Set tomorrow's day that we are going to pass in
        var day = tomorrowsDate.getDate();

        // Enter in Date of Catering order
        orderDetailsPageObjects.pickupDateTxt.sendKeys('');
        browser.driver.findElement(by.linkText(day.toString())).click();
        // Enter in Time of Catering order
        orderDetailsPageObjects.pickupTimeTxt.sendKeys('11:15am');

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
        browser.waitForAngular().then(function() {
            // Check for successful order
            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return /number/.test(url);
                })
            });
        });

        // Validate that the notification order number matches what we see in the URL
        browser.getTitle(function(title){
            browser.waitForAngular();
            var orderNumber = element(by.model("order.Number"));
            expect(browser.getCurrentUrl()).toContain("number=" + orderNumber);
            assert(title === 'Order Manager - Chipotle Catering');
        })
    });
});