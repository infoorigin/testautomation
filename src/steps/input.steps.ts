
import { Given, When, Then } from '@cucumber/cucumber';
import { PageWorld } from './world';
import { findLocatorElseThrowError, pageElementLocator } from '../fixtures/locator';
import { findPageElementElseThrowError } from '../fixtures/elements.find';
import { KEY, toKeyEnum } from '../page/page.keys';
// User enters 'First name' as 'Ashishkumar'
//When User enters 'First name' as 'Ashishkumar'
When<PageWorld>('(U)(u)ser enters/entered {string} as {string}', async function (elemenName: string, inputValue: string) {
  const pageElement = findPageElementElseThrowError(elemenName, this);
  const elementLocator = await findLocatorElseThrowError(pageElement, this);
  await elementLocator?.fill(inputValue);
  this.setActivePageElement(pageElement)
  
});

When<PageWorld>('(U)(u)ser selects/selected {string} as {string}', async function (elemenName: string, inputValue: string) {
  const pageElement = findPageElementElseThrowError(elemenName, this);
  const elementLocator = await findLocatorElseThrowError(pageElement, this);
  await elementLocator?.selectOption(inputValue);
  this.setActivePageElement(pageElement)
});

When<PageWorld>('(U)(u)ser checks/checked {string} as {string}', async function (elemenName: string, inputValue: string) {
  const pageElement = findPageElementElseThrowError(elemenName, this);
  const elementLocator = await findLocatorElseThrowError(pageElement, this);
  const valueLocator = elementLocator.getByLabel(inputValue, { exact: true });
  if(!valueLocator){
    throw new Error(`Value ${inputValue} is not found for Element ${elemenName} in Page ${this.currentPageConfig?.pageName}`);
  }
  await elementLocator.getByLabel(inputValue, { exact: true }).check();
  this.setActivePageElement(pageElement)
});

When<PageWorld>('(U)(u)ser unchecks/unchecked {string} as {string}', async function (elemenName: string, inputValue: string) {
  const pageElement = findPageElementElseThrowError(elemenName, this);
  const elementLocator = await findLocatorElseThrowError(pageElement, this);
  const valueLocator = elementLocator.getByLabel(inputValue, { exact: true });
  if(!valueLocator){
    throw new Error(`Value ${inputValue} is not found for Element ${elemenName} in Page ${this.currentPageConfig?.pageName}`);
  }
  await elementLocator.getByLabel(inputValue, { exact: true }).uncheck();
  this.setActivePageElement(pageElement)
});

//When user hits 'backspace' Key
When<PageWorld>('(U)(u)ser hits {string} (K)(k)ey', async function (keyName: string) {
  const activePageElement = this.activePageElement;
  if (activePageElement) {
    const elementLocator = await findLocatorElseThrowError(activePageElement, this);
    const key = toKeyEnum(keyName);
    switch (key) {
      case KEY.BACKSPACE:
        await elementLocator.focus(); // Focus the input field
        await elementLocator.press('End');
        await elementLocator.press('Backspace');
        break;
      default:
        throw new Error(`Uppsupported key operation :${key}`)
    }

  }
});

//TODO  //`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
// `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`,