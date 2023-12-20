import { LocatorType, PageElement } from "../page/pageobject";
import { PageWorld } from "../steps/world";

const  notfoundError = (errorMessage: string): never => {
    throw new Error(errorMessage);
  }

export const findLocatorElseThrowError = async(element: PageElement, world: PageWorld) => {
    return await pageElementLocator(element, world) ?? notfoundError(`Page element locator not found for ${element.elementName} in page ${world.currentPageConfig?.pageName} `)
}


export const pageElementLocator = async(element: PageElement, world: PageWorld) => {

    switch (element.locatorType) {
        case LocatorType.ID:
            return world.page.locator('#' + element.locatorValue);
        case LocatorType.XPATH:
            return world.page.locator('xpath=' + element.locatorValue);
        case LocatorType.CSS:
            return world.page.locator('css=' + element.locatorValue);
        case LocatorType.ELEMENT:
            return element.elementType? world.page.getByRole(element.elementType as any, { name: element.elementName }):undefined;  
        case LocatorType.LABEL:
            return element.locatorValue ? world.page.getByLabel(element.locatorValue):undefined;      
        case LocatorType.TEXT:
            return element.locatorValue ? world.page.getByText(element.locatorValue):undefined;      
        case LocatorType.PLACEHOLDER:
            return element.locatorValue? world.page.getByPlaceholder(element.locatorValue):undefined;      
        case LocatorType.SELECTOR:
        default:
            return element.locatorValue? world.page.locator(element.locatorValue):undefined;
    }

}