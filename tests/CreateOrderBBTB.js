var topNavigationPageObjects = {
    createNewOrderLink : element(by.id("lnkCreateOrder"))
};

var orderDetailsPageObjects = {
    pickupDateTxt : element(by.id("txtPickUpDate")),
    pickupDateNextMonthIcon : element(by.css("span.ui-icon.ui-icon-circle-triangle-e")),
    pickupTimeTxt : element(by.id("txtPickUpTime"))
};

// Start our test
describe('Create New Order with BBTB from Catering Manager', function() {
    it('Create a 20 BBTB order', function() {
        browser.get("http://user:pass@cateringmanagerqa.chipotle.esc");
        // Click 'Create New Order' link
        topNavigationPageObjects.createNewOrderLink.click();
        //Enter in Date and Time of Catering order
        orderDetailsPageObjects.pickupDateTxt.sendKeys("1/15/2015");
        orderDetailsPageObjects.pickupTimeTxt.sendKeys("11:15am");
    });
});