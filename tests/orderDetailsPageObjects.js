var OrderDetailsPageObjects = function() {
    this.pickupDateTxt = element(by.id("txtPickUpDate"));
    this.pickupDateNextMonthIcon = element(by.css("span.ui-icon.ui-icon-circle-triangle-e"));
    this.pickupTimeTxt = element(by.id("txtPickUpTime"));
};
module.exports = OrderDetailsPageObjects;