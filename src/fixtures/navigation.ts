import { error } from "console";
import { Navigation, NavigationType, PageElementState } from "../page/pageobject";
import { PageWorld } from "../steps/world";
import { findPageConfig, findPageConfigElseThrowError, findPageIdentifier } from "./elements.find";
import { navigateToCurrentPage } from "./page.actions";
import { assertElementState } from "./asserts";

export const navigationActionToPage = async (pageName: string, world: PageWorld) => {
    world.setCurrentPage(pageName)
    await navigateToCurrentPage(world);
    const pageElement = findPageIdentifier(world);
    if (pageElement) {
        await assertElementState(pageElement.elementName, PageElementState.AVAILABLE, world);
    }
}