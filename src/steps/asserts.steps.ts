
import { Given, When, Then } from '@cucumber/cucumber';
import { PageWorld } from './world';
import { asserElementValue, assertElementState } from '../fixtures/asserts';
import { PageElementState } from '../page/pageobject';

// The System should navigate user to 'Home' Page
//System should show 'Firstname' as 'Ashishkumar'

Then<PageWorld>('(S)(s)ystem should show {string} as {string}', async function ( elemenName: string, assertValue: string) {
  await asserElementValue(elemenName, assertValue, this);
});

//System should Display 'Password is required' in 'Password Message' field

Then<PageWorld>('(S)(s)ystem should (D)(d)isplay {string} in {string} field', async function (  assertValue: string, elemenName: string) {
  await asserElementValue(elemenName, assertValue, this);
});

//System should Disable 'Login' 'Button'
Then<PageWorld>('(S)(s)ystem should (D)(d)isable {string} {string}', async function ( elementName: string, elemenType: string) {
  await assertElementState(elementName,PageElementState.DISABLED, this)
});

//System should Enable 'Login' 'Button'
Then<PageWorld>('(S)(s)ystem should (E)(e)nable {string} {string}', async function ( elementName: string, elemenType: string) {
  await assertElementState(elementName,PageElementState.ENABLED, this)
});



