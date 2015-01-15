'use strict';

var TopNavigationPage = function (){
    this.createNewOrderLink = element(by.id("lnkCreateOrder"));
};


TopNavigationPage.prototype = Object.create({}, {
    clickCreateNewOrder : { value: function () { return this.createNewOrderLink.click(); }}
});

module.exports = TopNavigationPage;