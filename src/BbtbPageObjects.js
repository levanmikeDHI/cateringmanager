'use strict';

var BbtbPage = function (){
    this.bbtbButton = element(by.css('[ng-click="addOrderItem(selectedRestaurant.Categories[0].MenuItems[0])"]'));
    this.bbtbQtyText = element(by.name("OrderItemQty"));
    this.bbtbAssortmentButton = element(by.css('[ng-click="getAssortment(orderItem,orderItemForm.OrderItemQty.$viewValue); orderItem.assorted = !orderItem.assorted;"]'));
    this.bbtbAssortmentTotalText = element(by.name("txtBbtbSubTotal"));
};


BbtbPage.prototype = Object.create({}, {
    clickBbtbButton : { value: function () { return this.bbtbButton.click(); }},
    getBbtbQtyText : { value: function() { return this.bbtbQtyText.getText(); }},
    typeBbtbQtyText : { value: function(keys) { return this.bbtbQtyText.sendKeys(keys); }},
    getBbtbQtyTextAttribute : { value: function() { return this.bbtbQtyText.getAttribute('value'); }},
    clickBbtbAssortmentButton : { value: function () { return this.bbtbAssortmentButton.click(); }},
    getBbtbAssortmentTotalText : { value : function() { return this.bbtbAssortmentTotalText.getAttribute('value'); }}
});

module.exports = BbtbPage;
