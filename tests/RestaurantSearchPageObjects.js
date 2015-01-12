'use strict';

var RestaurantSearchPage = function (){
    this.changeRestaurantButton = element(by.id("storeChange"));
    this.restaurantNumberText = element(by.id("txtIdSearch"));
    this.changeRestaurantSearchButton = element(by.id("idSearch"));
    this.restaurantStoreNameText = element(by.id("storeName"));
};


RestaurantSearchPage.prototype = Object.create({}, {
    clickChangeRestaurantButton : { value: function () { return this.changeRestaurantButton.click(); }},
    typeRestaurantNumberText : { value: function (keys) { return this.restaurantNumberText.sendKeys(keys); }},
    clickChangeRestaurantSearchButton : { value: function () { return this.changeRestaurantSearchButton.click(); }},
    getRestaurantStoreNameText : { value: function () { return this.restaurantStoreNameText.getText(); }},
    clickRestaurantStoreNameText : { value: function () { return this.restaurantStoreNameText.click(); }}
});

module.exports = RestaurantSearchPage;
