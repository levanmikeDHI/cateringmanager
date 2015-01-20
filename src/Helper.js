module.exports = {
    // Our Catering Order Number
    orderNumber : '',
    getOrderNumber : function(){
         return this.orderNumber;
    },
    setOrderNumber : function(number){
        this.orderNumber = number;
    },

    // Our Catering Order Date and Time
    orderDate : '',
    getOrderDate : function(){
        return this.orderDate;
    },
    setOrderDate : function(date){
        this.orderDate = date;
    },
    orderTime : '',
    getOrderTime : function(){
        return this.orderTime;
    },
    setOrderTime : function(time){
        this.orderTime = time;
    },

    //Function to grab the latest 'Add Item To Order' and send back the web element so we can enter data into it
    getLatestAddItemToOrderQtyWebElement : function(){
        //Get the newly created 'Item To Order'
        var newlyCreatedItemToOrder = element.all(by.repeater('orderItem in order.OrderItems')).last();

        return newlyCreatedItemToOrder;
    },

    //Function to select a value from a dropdown in Protractor using it's index
    selectDropdownByValue : function(element, option){
        // Which value are we looking for?
        var value;
        if(option === 'Chicken') { value = '0'}
        if(option === 'Steak') { value = '1'}
        if(option === 'Carnitas') { value = '2'}
        if(option === 'Barbacoa') { value = '3'}
        if(option === 'Sofritas') { value = '4'}
        if(option === 'Fajita Veggies') { value = '5'}

        element.element(by.css('select option[value="' + value + '"]')).click();
    }
};
