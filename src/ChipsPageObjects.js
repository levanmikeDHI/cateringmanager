'use strict';

var ChipsPage = function (){
    this.chipsBiggerButton = element(by.css('[ng-disabled="menuItemDisabled(selectedRestaurant, 2, 1)"]'));
    this.chipsBigButton = element(by.css('[ng-disabled="menuItemDisabled(selectedRestaurant, 2, 0)"]'));
    this.chipsBiggerQty = element(by.model("orderItem.OrderSubItems[1].Quantity"));
    this.chipsBigQty = element(by.model("orderItem.OrderSubItems[0].Quantity"));
};


ChipsPage.prototype = Object.create({}, {
    clickChipsBiggerButton : { value: function () { return this.chipsBiggerButton.click(); }},
    clickChipsBigButton : { value: function () { return this.chipsBigButton.click(); }},
    typeChipsBiggerQtyText : { value: function (keys) { return this.chipsBiggerQty.sendKeys(keys); }},
    getChipsBiggerQtyText : { value: function () { return this.chipsBiggerQty.getAttribute('value'); }},
    typeChipsBigQtyText : { value: function (keys) { return this.chipsBigQty.sendKeys(keys); }},
    getChipsBigQtyText : { value: function () { return this.chipsBigQty.getAttribute('value'); }}
});

module.exports = ChipsPage;
