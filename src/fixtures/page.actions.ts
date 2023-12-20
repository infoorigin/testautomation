import { NavigationType } from "../page/pageobject";
import { PageWorld } from "../steps/world";

export const navigateToCurrentPage = async (world: PageWorld) => {
    const navigationType = world.currentPageConfig?.navigation.navigationType;
    switch (navigationType) {
        case NavigationType.URL:
            const url = world.currentPageConfig?.navigation.navigationValue;
            if (!url) {
                throw new Error(`Navigation URL is not defined for page ${world.currentPageConfig?.pageName}`);
            }
            await world.page.goto(url);
            break;
        default:
            throw new Error(`Unsupported or Not yet implemented Navigation Type ${navigationType}`);
    }
}