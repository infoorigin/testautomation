import { expect } from "playwright/test";
import { findLocatorElseThrowError, pageElementLocator } from "./locator";
import { PageWorld } from "../steps/world";
import { PageElementState } from "../page/pageobject";
import { findActionElement, findActionElementElseThrowError, findPageElement, findPageElementElseThrowError } from "./elements.find";


export const asserElementValue = async (elemenName: string, assertValue: string, world: PageWorld) => {
  const pageElement = findPageElementElseThrowError(elemenName, world);
  const elementLocator = await findLocatorElseThrowError(pageElement, world);
  await expect(elementLocator).toHaveText(assertValue);
}

export const assertElementState = async (elementName: string, elementState: PageElementState, world: PageWorld) => {
  const pageElement = findPageElement(elementName, world) || findActionElement(elementName, world); 
  if(!pageElement){
    throw new Error(`Element ${elementName} is not present in page config ${world.currentPageConfig?.pageName}`);
  }
  const elementLocator = await findLocatorElseThrowError(pageElement, world);
  switch (elementState) {
    case PageElementState.DISABLED:
      await expect(elementLocator).toBeDisabled();
      //await expect(elementLocator.isDisabled()).toEqual(true)
      break;

    case PageElementState.ENABLED:
      await expect(elementLocator).toBeEnabled();
      break;

    case PageElementState.AVAILABLE:
        await expect(elementLocator).toBeTruthy();
        break;

    case PageElementState.EDITABLE:
      await expect(elementLocator).toBeEditable();
      break;

    case PageElementState.HIDDEN:
      await expect(elementLocator).toBeHidden();
      break;

    case PageElementState.VISIBLE:
      await expect(elementLocator).toBeVisible();
      break;

    default:
      throw (`Unsupported element state : ${elementState}`);
  }
}