'use strict';

var OrderDetailsPage = function (){
    this.pickupDateText = element(by.model('order.PickupDate'));
    this.pickupTimeText = element(by.model("order.PickupTime"));
    this.restaurantNameText = element(by.id("lblStoreName"));
    this.orderNumberText = element(by.css("#content > div.contPlaceholder > div.title.orderNumberTitle.ng-binding"));
};


OrderDetailsPage.prototype = Object.create({}, {
    typePickupDateText : { value: function (keys) { return this.pickupDateText.sendKeys(keys); }},
    typePickupTimeText : { value: function (keys) { return this.pickupTimeText.sendKeys(keys); }},
    getPickupTimeText : { value: function() { return this.pickupTimeText.getText(); }},
    typeRestaurantNameText : { value: function (keys) { return this.restaurantNameText.sendKeys(keys); }},
    getOrderNumberText : { value : function() { return this.orderNumberText.getText(); }}
});

module.exports = OrderDetailsPage;
