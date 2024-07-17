const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

     it('should enter the address', async () => {
        await browser.url('/');

        // Locate the "from" address input field and set its value
        const fromField = await $('#from');
        await fromField.setValue('East 2nd Street, 601');
        expect(await fromField.getValue()).toBe('East 2nd Street, 601');

        // Locate the "to" address input field and set its value
        const toField = await $('#to');
        await toField.setValue('1300 1st St');
        expect(await toField.getValue()).toBe('1300 1st St');
    });

     it('Taxi Plan Selection', async () => {
        await browser.url('/');

        // this class: 'tcard' selects all taxi plans different types of taxi's
        const allTaxiPlans = await $('.tcard');
        await allTaxiPlans.click();

        // Verify taxi plan, the message popup
        const confirmMessagePopup = await $('.order-body');
        expect(confirmMessagePopup).toBeDisplayed();
     });

     it('Filling in the phone number, input field', async () => {
        await browser.url('/');

        // Fill the input with phone number
        const fillNumber = await $('#phone');
        await fillNumber.setValue('+12345678907');

        // Verify the phone number entered correctly
        const enteredValue = await fillNumber.getValue();
        expect(enteredValue).toBe('+12345678907');
     });

     it('Credit Card number entry', async () => {
        await browser.url('/');

        // Fill the credit card number field
        const cardNumberInput = await $('.card-number');
        await cardNumberInput.setValue('123400005678');

        // Fill the cvv input of credit card
        const cvvInput = await $('.card-input');
        await cvvInput.setValue('19');

        // Submit button of credit card named: 'Link'
        const submitButton = await $('.button full');
        await submitButton.click();

        // Cancel button of credit card named: 'Cancel'
        const cancelButton = await $('//button[contains(text(), "Cancel")]');
        await cancelButton.click();
     });

     it('Write a message for the driver input', async () => {
        await browser.url('/');

        // Input field and enter a message to driver
        const messageDriverInput = await $('#comment');
        const messageDriver = 'get me coffee please';
        await messageDriverInput.setValue(messageDriver);

        // Verify the message was entered correctly
        const enterdMessage = await messageDriverInput.getValue();
        expect(enterdMessage).toBe(messageDriver);
     });
});

