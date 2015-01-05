module.exports = function () {

    this.Given(/^the user navigates to the Catering Manager Create New Order page$/, function (next) {
        browser.get("http://cateringmanagerqa.chipotle.esc/Order/CreateOrder");
        next();
    });

    this.Then(/^the Create New Order page should display correctly$/, function (next) {
        expect(browser.getTitle()).to.eventually.equal("Create Order - Chipotle Catering").and.notify(next);
    });

};