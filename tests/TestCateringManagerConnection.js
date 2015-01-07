describe('Test Catering Manager Connection', function () {
    it('Verify that the Catering Manager page connects', function () {
        setInterval(function() {}, 5000);
        browser.get("http://CateringAutomation:rGh37kKoQsP!@cateringmanagerqa.chipotle.esc/Order/CreateOrder");
        setInterval(function() {}, 5000);
        browser.getTitle(function(title){
            assert(title === 'Create Order - Chipotle Catering');
        })
        
    });
});