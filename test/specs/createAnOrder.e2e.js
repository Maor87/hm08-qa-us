const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
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
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

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
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        // phone number fill process
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();

        // saving the phone number
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
     });


    it('Credit Card number entry', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

   //  // Wait for overlay to disappear before clicking the button
   //  const overlay = await $('.workflow-subcontainer');
   //  await overlay.waitForDisplayed({ timeout: 10000, reverse: true });

     // this class: 'tcard' selects all taxi plans different types of taxi's
     const firstTaxiPlan = await $$('.tariff-cards')[0];

    // Ensure the element is in view
    await firstTaxiPlan.scrollIntoView();

        // Use JavaScript to click the element, approach helps bypass any issues with elements being obscured 
        await browser.execute("arguments[0].click();", firstTaxiPlan);

        // Verify taxi plan, the message popup
        const confirmMessagePopup = await $('.order-body');
        expect(confirmMessagePopup).toBeDisplayed();

    // phone number process and model
      const phoneNumberModal = await $(page.phoneNumberModal);
      await expect(phoneNumberModal).toBeExisting();

      // saving phone number
      const phoneNumber = helper.getPhoneNumber("+1");
      await page.submitPhoneNumber(phoneNumber);
      await expect(await helper.getElementByText(phoneNumber)).toBeExisting();

    // Click the payment option button
    const paymentMethodButton = await $('div.pp-button.filled');
    await paymentMethodButton.waitForClickable({ timeout: 10000 });
    await paymentMethodButton.click();

    // Ensure the payment method popup picker is open
    const overlay = await $('.overlay');
    await expect(overlay).toBeExisting();
    const paymentMethodPopup = await $('.section.active');
    await expect(paymentMethodPopup).toBeExisting();

    // Click on the credit card option in the first popup
    const creditCardOption = await $('.pp-row');
    await creditCardOption.waitForClickable({ timeout: 10000 });
    await creditCardOption.click();

    // Ensure the second popup for credit card info is open
    const secondOverlay = await $('.overlay');
    await expect(secondOverlay).toBeExisting();
    const creditCardInfoPopup = await $('.section');
    await expect(creditCardInfoPopup).toBeExisting();

    // info card wrapper of the popup
    const infoWrapper = await $('.card-wrapper');
    await infoWrapper.scrollIntoView();
    await expect(infoWrapper).toBeExisting();

    // Fill in the credit card number
    const cardInput = await $('#number');
    await cardInput.scrollIntoView();
    await cardInput.setValue('1234 0000 4321');

    // Fill in the CVV code and change focus
    const codeInput = await $('input#code.card-input');
    await codeInput.scrollIntoView();
    await codeInput.setValue('12');

    // Click the "Link" button to submit
    const linkButton = await $('//button[contains(text(), "Link")]');
    await linkButton.waitForClickable({ timeout: 10000 });
    await linkButton.click();

});

   
     it('Write a message for the driver input', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        // Input field and enter a message to driver
        const messageDriverInput = await $('.input');
        const messageDriver = 'Get some whiskey';
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

