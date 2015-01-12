'use strict';

var OrderDetailsPage = function (){
    this.pickupDateText = element(by.model('order.PickupDate'));
    this.pickupTimeText = element(by.model("order.PickupTime"));
    this.restaurantNameText = element(by.id("lblStoreName"));
};


OrderDetailsPage.prototype = Object.create({}, {
    typePickupDateText : { value: function (keys) { return this.pickupDateText.sendKeys(keys); }},
    typePickupTimeText : { value: function (keys) { return this.pickupTimeText.sendKeys(keys); }},
    typeRestaurantNameText : { value: function (keys) { return this.restaurantNameText.sendKeys(keys); }}
});

module.exports = OrderDetailsPage;
