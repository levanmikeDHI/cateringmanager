'use strict';

var OrderManagerPage = function (){
    this.searchByOrderIdText = element(by.model("searchParameters.orderNumber"));
    this.searchGridTable = element(by.repeater('row in renderedRows'));
};


OrderManagerPage.prototype = Object.create({}, {
    typeSearchByOrderIdText : { value: function (keys) { return this.searchByOrderIdText.sendKeys(keys); }},
    getRowsInSearchGridTable : { value: function () { return this.searchGridTable; }},
    clickRowInSearchGridTable : { value: function(index) { return this.searchGridTable.click()}}
});

module.exports = OrderManagerPage;

