'use strict';

var RestaurantSearchPage = function (){
    this.changeRestaurantButton = element(by.id("storeChange"));
    this.restaurantNumberText = element(by.id("txtIdSearch"));
    this.changeRestaurantSearchButton = element(by.id("idSearch"));
    this.restaurantSearchStoreNameText = element(by.id("storeName"));
    this.restaurantStoreIdText = element(by.id("lblStoreId"));
    this.restaurantStoreNameText = element(by.id("lblStoreName"));
    this.restaurantStoreAddressText = element(by.id("lblAddress"));
    this.restaurantStoreCityStateZipText = element(by.id("lblStoreInfo"));
    this.restaurantStoreCrossStreetsText = element(by.id("haveCrossStreet"));
    this.restaurantZipCodeText = element(by.id("txtZipSearch"));
    this.restaurantPaginationText = element(by.id('divZipPaging'));
};


RestaurantSearchPage.prototype = Object.create({}, {
    clickChangeRestaurantButton : { value: function () { return this.changeRestaurantButton.click(); }},
    typeRestaurantNumberText : { value: function (keys) { return this.restaurantNumberText.sendKeys(keys); }},
    clickChangeRestaurantSearchButton : { value: function () { return this.changeRestaurantSearchButton.click(); }},
    getRestaurantSearchStoreNameText : { value: function () { return this.restaurantSearchStoreNameText.getText(); }},
    clickRestaurantSearchStoreNameText : { value: function () { return this.restaurantSearchStoreNameText.click(); }},
    getRestaurantStoreIdText : { value: function () { return this.restaurantStoreIdText.getText(); }},
    getRestaurantStoreNameText : { value: function () { return this.restaurantStoreNameText.getText(); }},
    getRestaurantStoreAddressText : { value: function () { return this.restaurantStoreAddressText.getText(); }},
    getRestaurantStoreCityStateZipText : { value: function () { return this.restaurantStoreCityStateZipText.getText(); }},
    getRestaurantStoreCrossStreetsText : { value: function () { return this.restaurantStoreCrossStreetsText.getText(); }},
    typeRestaurantZipCodeText : { value: function (keys) { return this.restaurantZipCodeText.sendKeys(keys); }},
    getRestaurantPaginationText : { value: function () { return this.restaurantPaginationText.getText(); }}
});

module.exports = RestaurantSearchPage;
