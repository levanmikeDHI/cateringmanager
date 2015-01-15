'use strict';

var CustomerDataPage = function (){
    this.ccFirstName = element(by.id("txtBcFirstName"));
    this.ccLastName = element(by.id("txtBcLastName"));
    this.ccCompany = element(by.id("txtBcCompany"));
    this.ccPhone = element(by.id("txtBcPhoneNumber"));
    this.ccExtension = element(by.id("txtBcExtension"));
    this.ccEmail = element(by.id("txtBcEmail"));
    this.ccEvent = element(by.id("txtBcEventType"));
};


CustomerDataPage.prototype = Object.create({}, {
    typeCcFirstNameText : { value: function (keys) { return this.ccFirstName.sendKeys(keys); }},
    getCcFirstNameText : { value: function () { return this.ccFirstName.getAttribute('value'); }},
    typeCcLastNameText : { value: function (keys) { return this.ccLastName.sendKeys(keys); }},
    getCcLastNameText : { value: function () { return this.ccLastName.getAttribute('value'); }},
    typeCcCompanyText : { value: function (keys) { return this.ccCompany.sendKeys(keys); }},
    getCcCompanyText : { value: function () { return this.ccCompany.getAttribute('value'); }},
    typeCcPhoneText : { value: function (keys) { return this.ccPhone.sendKeys(keys); }},
    getCcPhoneText : { value: function () { return this.ccPhone.getAttribute('value'); }},
    typeCcExtensionText : { value: function (keys) { return this.ccExtension.sendKeys(keys); }},
    getCcExtensionText : { value: function () { return this.ccExtension.getAttribute('value'); }},
    typeCcEmailText : { value: function (keys) { return this.ccEmail.sendKeys(keys); }},
    getCcEmailText : { value: function () { return this.ccEmail.getAttribute('value'); }},
    typeCcEventText : { value: function (keys) { return this.ccEvent.sendKeys(keys); }},
    getCcEventText : { value: function () { return this.ccEvent.getAttribute('value'); }}
});

module.exports = CustomerDataPage;

