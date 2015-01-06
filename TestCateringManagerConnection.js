describe('Test Catering Manager Connection', function () {
    it('Verify that the Catering Manager page connects', function () {
        browser.get("http://username:password@cateringmanagerqa.chipotle.esc/Order/CreateOrder");

        browser.getTitle(function(title){
            assert(title === 'Create Order - Chipotle Catering');
        })
        
    });
});