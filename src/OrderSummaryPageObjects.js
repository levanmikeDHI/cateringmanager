'use strict';

var OrderSummaryPage = function (){
    this.submitOrderButton = element(by.className("lblCreateOrder"));
};


OrderSummaryPage.prototype = Object.create({}, {
    clickSubmitOrderButton : { value: function () { return this.submitOrderButton.click(); }}
});

module.exports = OrderSummaryPage;

