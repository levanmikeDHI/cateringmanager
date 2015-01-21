'use strict';

var VeggiePage = function (){
    this.veggieButton = element(by.css('[ng-click="addOrderItem(selectedRestaurant.Categories[1].MenuItems[2])"]'));
    this.veggieQty = element(by.name("OrderItemQty"));
};


VeggiePage.prototype = Object.create({}, {
    clickVeggieButton : { value: function () { return this.veggieButton.click(); }},
    typeVeggieQtyText : { value: function (keys) { return this.veggieQty.sendKeys(keys); }},
    getVeggieQtyText : { value: function () { return this.veggieQty.getAttribute('value'); }}
});

module.exports = VeggiePage;
