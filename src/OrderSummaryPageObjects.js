'use strict';

var OrderSummaryPage = function (){
    this.orderItemName = element(by.className("summaryOrderName"));
    this.bbtbOrderDescription = element(by.className("pbbtbOrderDesc"));
    this.orderItemCost = element(by.className("summaryOrderCost"));
    this.submitOrderButton = element(by.className("lblCreateOrder"));
};


OrderSummaryPage.prototype = Object.create({}, {
    getOrderItemNameText : { value: function () { return this.orderItemName.getText(); }},
    getBbtbOrderDescriptionText : { value: function () { return this.bbtbOrderDescription.getText(); }},
    getOrderItemCostText : { value: function () { return this.orderItemCost.getText(); }},
    clickSubmitOrderButton : { value: function () { return this.submitOrderButton.click(); }}
});

module.exports = OrderSummaryPage;

