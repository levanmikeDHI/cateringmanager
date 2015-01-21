'use strict';

var ChipsPage = function (){
    this.chipsBiggerButton = element(by.css('[ng-disabled="menuItemDisabled(selectedRestaurant, 2, 1)"]'));
    this.chipsBiggerQty = element(by.model("orderItem.OrderSubItems[1].Quantity"));
};


ChipsPage.prototype = Object.create({}, {
    clickChipsBiggerButton : { value: function () { return this.chipsBiggerButton.click(); }},
    typeChipsBiggerQtyText : { value: function (keys) { return this.chipsBiggerQty.sendKeys(keys); }},
    getChipsBiggerQtyText : { value: function () { return this.chipsBiggerQty.getAttribute('value'); }}
});

module.exports = ChipsPage;
