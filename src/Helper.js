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
    }
};
