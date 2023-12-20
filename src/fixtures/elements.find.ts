import { PageWorld } from "../steps/world";


export const findPageConfig = (pageName:string, world:PageWorld) => {
    return world.pageObjects.find(p => p.pageName === pageName)
}

export const findPageElement = (elementName:string, world:PageWorld) => {
    const pageElements = world.currentPageConfig?.pageElements;
    return pageElements?.find(a => a.elementName == elementName);
}

export const findPageIdentifier = (world:PageWorld) => {
    const pageElements = world.currentPageConfig?.pageElements;
    return pageElements?.find(a => a.isPageIdentifier == "Yes");
}

export const findActionElement = (elementName:string, world:PageWorld) => {
    const actionElements = world.currentPageConfig?.actionElements;
    return actionElements?.find(a => a.elementName == elementName);
}

const  notfoundError = (errorMessage: string): never => {
    throw new Error(errorMessage);
  }

export const findPageConfigElseThrowError = (pageName:string, world:PageWorld) => {
    return findPageConfig(pageName, world) 
            ?? notfoundError(`Page ${pageName} is not present in configuration`)
}

export const findPageElementElseThrowError = (elementName:string, world:PageWorld) => {
    return findPageElement(elementName, world) 
    ?? notfoundError(`Page Element ${elementName} is not present in page config ${world.currentPageConfig?.pageName}`)
}

export const findActionElementElseThrowError = (elementName:string, world:PageWorld) => {
    return findActionElement(elementName, world) 
    ?? notfoundError(`Action Element ${elementName} is not present in page config ${world.currentPageConfig?.pageName}`)

}
