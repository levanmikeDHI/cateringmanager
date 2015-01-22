'use strict';

var BbtbPage = function (){
    this.bbtbButton = element(by.css('[ng-click="addOrderItem(selectedRestaurant.Categories[0].MenuItems[0])"]'));
    this.bbtbQtyText = element(by.name("OrderItemQty"));
    this.bbtbAssortmentButton = element(by.css('[ng-click="getAssortment(orderItem,orderItemForm.OrderItemQty.$viewValue); orderItem.assorted = !orderItem.assorted;"]'));
    this.bbtbAssortmentTotalText = element(by.name("txtBbtbSubTotal"));
    this.bbtbSteakQtyText = element(by.id('subItemQuantity_1'));
    this.bbtbChickenQtyText = element(by.id('subItemQuantity_2'));
    this.bbtbBrownRiceRadioButton = element(by.css('[for="bbtbRiceOption_0_8"]'))
};


BbtbPage.prototype = Object.create({}, {
    clickBbtbButton : { value: function () { return this.bbtbButton.click(); }},
    getBbtbQtyText : { value: function() { return this.bbtbQtyText.getText(); }},
    typeBbtbQtyText : { value: function(keys) { return this.bbtbQtyText.sendKeys(keys); }},
    getBbtbQtyTextAttribute : { value: function() { return this.bbtbQtyText.getAttribute('value'); }},
    typeBbtbSteakQtyText : { value: function(keys) {
        this.bbtbSteakQtyText.clear();
        this.bbtbSteakQtyText.sendKeys(keys);
        return browser.actions().sendKeys(protractor.Key.TAB).perform();
    }},
    getBbtbSteakQtyTextAttribute : { value: function() { return this.bbtbSteakQtyText.getAttribute('value'); }},
    typeBbtbChickenQtyText : { value: function(keys) {
        this.bbtbChickenQtyText.clear();
        this.bbtbChickenQtyText.sendKeys(keys);
        return browser.actions().sendKeys(protractor.Key.TAB).perform();
    }},
    getBbtbChickenQtyTextAttribute : { value: function() { return this.bbtbChickenQtyText.getAttribute('value'); }},
    clickBbtbBrownRiceRadioButton : { value: function() { return this.bbtbBrownRiceRadioButton.click(); }},
    clickBbtbAssortmentButton : { value: function () { return this.bbtbAssortmentButton.click(); }},
    getBbtbAssortmentTotalText : { value : function() { return this.bbtbAssortmentTotalText.getAttribute('value'); }}
});

module.exports = BbtbPage;
