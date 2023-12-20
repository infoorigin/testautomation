export enum FeatureFileType {
    SCENARIO = 'Scenario:',
    FEATURE = "Feature:",
    DESCRIPTION = "Description:",
    BACKGROUND = "Background:"


}
export enum LocatorType {
    ID = 'ID',
    XPATH = 'XPATH',
    CSS = 'CSS',
    SELECTOR = 'selector',
    ELEMENT = 'ELEMENT',
    LABEL = 'LABEL',
    TEXT = 'TEXT',
    PLACEHOLDER = 'PLACEHOLDER'
}

export enum NavigationType {
    URL = 'URL',
    PAGE = "PAGE",
    MENUACTION = 'MENUACTION'
}

export enum PageElementState {
    DISABLED = 'DISABLED',
    ENABLED = 'ENABLED',
    EDITABLE = 'EDITABLE',
    EMPTY = 'EMPTY',
    HIDDEN = 'HIDDEN',
    VISIBLE = 'VISIBLE',
    AVAILABLE = 'AVAILABLE',
  }
  

export enum OutcomeType {
    NAVIGATION = 'NAVIGATION'
}

export type BaseElement = {
    pageId:string;
    elementId:string;
    elementName: string;
    locatorType: LocatorType;
    locatorValue ?: string;
    elementType ?: "outputtext"|"alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem";
}

export type PageElement = BaseElement & {
    isPageIdentifier ?: string;
}

export type Outcome = {
    outcomeType:OutcomeType;
    outcomeValue:string;
}

export type ActionElement = BaseElement & {
    eventName : string
}

export type Navigation = {
    navigationType: NavigationType ;
    navigationValue : string;
}

export type PageObject = {
    pageElements: PageElement[];
    actionElements: ActionElement[];
    pageId:string;
    pageName: string;
    navigation:Navigation;
}