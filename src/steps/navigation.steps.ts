import { Given, When, Then } from '@cucumber/cucumber';
import { PageWorld } from './world';
import { findActionElementElseThrowError, findPageIdentifier } from '../fixtures/elements.find';
import { navigateToCurrentPage } from '../fixtures/page.actions';
import { assertElementState } from '../fixtures/asserts';
import { PageElementState } from '../page/pageobject';
import { findLocatorElseThrowError } from '../fixtures/locator';
import { navigationActionToPage } from '../fixtures/navigation';

When<PageWorld>('I {} link {string}', async function (plcholder1: string, link: string) {
  await this.clickLink(link);
});


Given<PageWorld>('(U)(u)ser (is on)(goes to) {string} Page', async function (pageName: string) {
  await navigationActionToPage(pageName, this);
});

Then<PageWorld>('System should navigate user to {string} Page', async function (pageName: string) {
  this.setCurrentPage(pageName)
  //await navigateToCurrentPage(this);
});

//When User 'clicks' on 'Register' 'Link' and navigate to 'Register' page
When<PageWorld>('(U)(u)ser {string} on {string} {string} and navigate to {string} page', async function (eventType:string, elemenName:string, elementType:string, pageName:string) {
  const actionElement = findActionElementElseThrowError(elemenName, this);
  const elementLocator = await findLocatorElseThrowError(actionElement, this);
  await elementLocator.click();
  this.setCurrentPage(pageName);
  const pageElement = findPageIdentifier(this);
  if(!pageElement){
    throw Error('Page element identifier is not configured for :'+pageName);
  }
  await assertElementState(pageElement.elementName, PageElementState.AVAILABLE,  this);
});

