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
    const firstTaxiPlan = await $$('div=Supportive')[0];

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
  const infoWrapper = await $('div=Add card');
  await infoWrapper.scrollIntoView();
  await infoWrapper.click();
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
  await linkButton.scrollIntoView();
  await linkButton.click();

   });

   
   it('Write a message for the driver input', async () => {
  await browser.url('/');
  await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

  // Input field and enter a message to driver
  const messageDriverInput = await $('#comment');
  const messageDriver = 'Get some whiskey';
  await messageDriverInput.scrollIntoView();
  await messageDriverInput.setValue(messageDriver);

  // Verify the message was entered correctly
  const enteredMessage = await messageDriverInput.getValue();
  expect(enteredMessage).toBe(messageDriver);
});


   it('Ordering a Blanket and Handkerchiefs', async () => {
     await browser.url('/');
     await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

     // switch button
     const orderSwitch = await $('.switch');
     await orderSwitch.scrollIntoView();
     await orderSwitch.click();
  
     expect(await orderSwitch.isDisplayed()).toBe(true);
   });


   it('Ordering 2 ice creams', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    // '+' button for adding ice cream
    const addButton = await $('//div[@class="counter-plus"]');

    // 2 clicks for 2 ice creams
    await addButton.click();
    await addButton.click();

   });


  it('The car search modal appears', async () => {
   await browser.url('/');
   await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

   // order taxi button, so driver can come
  const orderTaxiButton = await $('span=Enter the number and order');
  await orderTaxiButton.scrollIntoView();
  await orderTaxiButton.click();

  // the popup after taxi order button which has a number count down until driver gets it
  const orderedTaxiInfoPopup = await $('div=Car search');
  await expect(orderedTaxiInfoPopup).toBeExisting();
  expect(await orderedTaxiInfoPopup.isDisplayed()).toBe(true);
});
   
   it('Driver Info Popup to Appear in the Modal', async () => {
   await browser.url('/');
   await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    // order taxi button, so driver can come
   const orderTaxiButton = await $('span=Enter the number and order');
   await orderTaxiButton.scrollIntoView();
   await orderTaxiButton.click();

   const driverInfoPopup = await $('div.order-header');
   await expect(driverInfoPopup).toBeExisting();
   expect(await driverInfoPopup.isDisplayed()).toBe(true);
 
 });

});

