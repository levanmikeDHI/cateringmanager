'use strict';

var helper = require('../src/Helper.js');

var TwoMeatSpreadPage = function (){
    this.twoMeatSpreadButton = element(by.css('[ng-click="addOrderItem(selectedRestaurant.Categories[1].MenuItems[0])"]'));
    this.twoMeatSpreadQty = element(by.name("OrderItemQty"));
    this.twoMeatSpreadOptionFirst = element(by.model('orderItem.OrderSubItems[0].SubMenuItemId'));
    this.twoMeatSpreadOptionSecond = element(by.model('orderItem.OrderSubItems[1].SubMenuItemId'));
};


TwoMeatSpreadPage.prototype = Object.create({}, {
    clickTwoMeatSpreadButton : { value: function () { return this.twoMeatSpreadButton.click(); }},
    typeTwoMeatSpreadQtyText : { value: function (keys) { return this.twoMeatSpreadQty.sendKeys(keys); }},
    getTwoMeatSpreadQtyText : { value: function () { return this.twoMeatSpreadQty.getAttribute('value'); }},
    selectTwoMeatSpreadOptionFirst : { value: function(option) {
        var optionFirst = this.twoMeatSpreadOptionFirst;
        helper.selectDropdownByValue(optionFirst, option)
    }},
    selectTwoMeatSpreadOptionSecond : { value: function(option) {
        var optionSecond = this.twoMeatSpreadOptionSecond;
        helper.selectDropdownByValue(optionSecond, option)
    }}
});

module.exports = TwoMeatSpreadPage;
