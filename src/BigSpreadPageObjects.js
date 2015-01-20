'use strict';

var helper = require('../src/Helper.js');

var BigSpreadPage = function (){
    this.bigSpreadButton = element(by.css('[ng-click="addOrderItem(selectedRestaurant.Categories[1].MenuItems[1])"]'));
    this.itemsOrderList = element.all(by.repeater('orderItem in order.OrderItems'));
    this.bigSpreadQtyText = element(by.name("OrderItemQty"));
};


BigSpreadPage.prototype = Object.create({}, {
    clickBigSpreadButton : { value: function () { return this.bigSpreadButton.click(); }},
    getBigSpreadQtyText : { value: function() { return this.bigSpreadQtyText.getText(); }},
    getLastItemsOrderList : { get: function() { return this.itemsOrderList; }},
    typeBigSpreadQtyText : { value: function(keys) {
        element.all(by.repeater('orderItem in order.OrderItems')).last().then(function(row) {
            var lastQtyElement = row.element(by.name("OrderItemQty"));
            lastQtyElement.sendKeys(keys);
        })
    }},
    selectBigSpreadOptionFirst : { value: function(option) {
        element.all(by.repeater('orderItem in order.OrderItems')).last().then(function(row) {
            var lastOptionFirst = row.element(by.model('orderItem.OrderSubItems[0].SubMenuItemId'));
            helper.selectDropdownByValue(lastOptionFirst, option)
        })
    }},
    selectBigSpreadOptionSecond : { value: function(option) {
        element.all(by.repeater('orderItem in order.OrderItems')).last().then(function(row) {
            var lastOptionFirst = row.element(by.model('orderItem.OrderSubItems[1].SubMenuItemId'));
            helper.selectDropdownByValue(lastOptionFirst, option)
        })
    }},
    selectBigSpreadOptionThird : { value: function(option) {
        element.all(by.repeater('orderItem in order.OrderItems')).last().then(function(row) {
            var lastOptionFirst = row.element(by.model('orderItem.OrderSubItems[2].SubMenuItemId'));
            helper.selectDropdownByValue(lastOptionFirst, option)
        })
    }},
    getBigSpreadOptionFirst : { get: function() {
        element.all(by.repeater('orderItem in order.OrderItems')).last().then(function(row) {
            var lastOptionFirst = row.element(by.model('orderItem.OrderSubItems[0].SubMenuItemId')).getText();
            return lastOptionFirst;
        })
    }}
});

module.exports = BigSpreadPage;
