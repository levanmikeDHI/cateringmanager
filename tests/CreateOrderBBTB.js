var topNavigationPageObjects = {
    createNewOrderLink : element(by.id("lnkCreateOrder"))
};

var restaurantSearchPageObjects = {
    changeRestaurantButton : element(by.id("storeChange")),
    restaurantNumberTxt : element(by.id("txtIdSearch")),
    changeRestaurantSearchButton : element(by.id("idSearch")),
    restaurantStoreNameButton : element(by.id("storeName"))
};

var orderDetailsPageObjects = {
    pickupDateTxt : element(by.id("txtPickUpDate")),
    pickupDateNextMonthIcon : element(by.css("span.ui-icon.ui-icon-circle-triangle-e")),
    pickupTimeTxt : element(by.id("txtPickUpTime")),
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

// Start our test
describe('Create New Order with BBTB from Catering Manager', function() {
    it('Create a 20 BBTB order', function() {
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc");
        // Click 'Create New Order' link
        topNavigationPageObjects.createNewOrderLink.click();
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
        // Format the string we are going to pass in
        var day = tomorrowsDate.getDate();
        var month = tomorrowsDate.getMonth() + 1;
        var year = tomorrowsDate.getFullYear();

        var tomorrowsDateStr = month + "/" + day + "/" + year;

        //Enter in Date and Time of Catering order
        browser.driver.executeScript("arguments[0].setAttribute('value', arguments[1])",
            orderDetailsPageObjects.pickupDateTxt.getWebElement(), tomorrowsDateStr);
        browser.driver.executeScript("arguments[0].setAttribute('value', arguments[1])",
            orderDetailsPageObjects.pickupTimeTxt.getWebElement(), "11:15am");

        // Enter Customer Contact Information
        customerDataPageObjects.ccFirstName.sendKeys("Test");
        customerDataPageObjects.ccLastName.sendKeys("Automation");
        customerDataPageObjects.ccCompany.sendKeys("Chipotle");
        customerDataPageObjects.ccPhone.sendKeys("111-222-3333");
        customerDataPageObjects.ccExtension.sendKeys("9999");
        customerDataPageObjects.ccEmail.sendKeys("chipotleautomation@gmail.com");
        customerDataPageObjects.ccEvent.sendKeys("My Automation Test");

    });
});