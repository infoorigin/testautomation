import { Given, When, Then } from '@cucumber/cucumber';
import { PageWorld } from './world';
import { findLocatorElseThrowError, pageElementLocator } from '../fixtures/locator';
import { executeOutcome } from '../fixtures/action.outcomes';
import { findActionElementElseThrowError } from '../fixtures/elements.find';



  Given<PageWorld>('(U)(u)ser {string} on {string} {string}', async function (eventType:string, elemenName:string, elementType:string) {
      const actionElement = findActionElementElseThrowError(elemenName, this)
      const elementLocator = await findLocatorElseThrowError(actionElement, this);
      await elementLocator.click();
  });


