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

        await browser.pause(2000);

        // this class: 'tcard' selects all taxi plans different types of taxi's
        const firstTaxiPlan = await $$('.tariff-cards')[0];

         // Ensure the element is in view
         await firstTaxiPlan.scrollIntoView();

        // Use JavaScript to click the element, approach helps bypass any issues with elements being obscured 
        await browser.execute("arguments[0].click();", firstTaxiPlan);

        // Verify taxi plan, the message popup
        const confirmMessagePopup = await $('.order-body');
        expect(confirmMessagePopup).toBeDisplayed();
     });

     it('Filling in the phone number, input field', async () => {
        await browser.url('/');

        // Wait for the phone input field to exist and be displayed
        const fillNumber = await $('.input');
        await fillNumber.waitForExist({ timeout: 3000 });
        await fillNumber.waitForDisplayed({ timeout: 3000});

        // Fill the input with phone number
        await fillNumber.setValue('+1 234 567 89 07');

        // Verify the phone number entered correctly
        const enteredValue = await fillNumber.getValue();
        expect(enteredValue).toBe('+1 234 567 89 07');
     });


     it('Credit Card number entry', async () => {
  await browser.url('/')
  await page.fillAddresses('East 2nd Street, 601', '1300 1st St')

  // Click "Call a taxi" button
  await $(page.callATaxiButton).waitForClickable({ timeout: 10000 });

  // Wait for taxi options modal to appear
  await $('div.tcard.active').waitForDisplayed({ timeout: 10000 });

  // phone number message button, then popup
  await $(page.phoneNumberButton).waitForClickable({ timeout: 10000});

  // input phone number in popup window
  await $('#phone').setValue('+1 234 456 78 90');
  await $(page.nextButton).waitForClickable({ timeout: 10000});
  await $(page.confirmButton).waitForClickable({ timeout: 10000});

  // Fill credit card info
  await $('input.card-input').setValue('1234 0000 5678')
  await $('#code').setValue('19')

  // Click Submit and then Cancel buttons
  await $('//button[contains(text(), "Link")]').click()
  await $('//button[contains(text(), "Cancel")]').click()
})
   
     it('Write a message for the driver input', async () => {
        await browser.url('/');

        // Input field and enter a message to driver
        const messageDriverInput = await $('.input');
        const messageDriver = 'get me coffee please';
        await messageDriverInput.setValue(messageDriver);

        // Verify the message was entered correctly
        const enterdMessage = await messageDriverInput.getValue();
        expect(enterdMessage).toBe(messageDriver);
     });


     it('Ordering a Blanket and Handkerchiefs', async () => {
       await browser.url('/');
       await browser.pause(20000); // Wait for page load

       const orderSwitch = await $('//span[@class="slider round"]');

       await orderSwitch.waitForDisplayed({ timeout: 20000 });
       await orderSwitch.click();
    
       expect(await orderSwitch.isDisplayed()).toBe(true);
   });


     it('Ordering 2 ice creams', async () => {
        await browser.url('/');

        // wait 2 seconds to work
        await browser.pause(2000);

        // Locate the + and - buttons for adding and removing ice creams
        const removeButton = await $('//div[@class="counter-minus"]');
        const addButton = await $('//div[@class="counter-plus"]');

        // Click the - button twice to remove 2 ice creams, no less
        await removeButton.click();
        await removeButton.click();

        // Click the + button twice to add 2 ice creams, no more then that
        await addButton.click();
        await addButton.click();

        // check most total count of ice creams is 2
        const iceCreamCount = await $('.counter-plus disabled');
        expect(iceCreamCount).toBe('2');
     });

    it('The car search modal appears', async () => {
  await browser.url('/');

  const callATaxiButton = await $('button=Call a Taxi');
  await callATaxiButton.waitForClickable({ timeout: 10000 });
  await callATaxiButton.click();

  const carSearchModal = await $('div.tariff-picker');
  await carSearchModal.waitForDisplayed({ timeout: 10000 });

  expect(await carSearchModal.isDisplayed()).toBe(true);
});
     
     it('Driver Info Popup to Appear in the Modal', async () => {
  await browser.url('/');
  const submitButton = await $('.smart-button');
  await submitButton.waitForEnabled({ timeout: 20000 });
  await submitButton.click();
  await expect(await $('.order-body').isDisplayed()).toBe(true);
});

});

