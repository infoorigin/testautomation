import { ITestCaseHookParameter, setWorldConstructor } from '@cucumber/cucumber';
import { BddWorld, BddWorldOptions } from 'playwright-bdd';
import { findStepDefinition, getLocationInFile, getStepCode, runStepWithCustomLocation } from './world.utils';
import { testInit } from '../page/page.factory';
import * as dotenv from 'dotenv';
import { PageElement, PageObject } from '../page/pageobject';

// Load dotenv to read variables from .env file
dotenv.config();

export class PageWorld extends BddWorld {
  private _appConfig;
  private _currentPageConfig?: PageObject;
  private _activePageElement?:PageElement;

  constructor(public options: BddWorldOptions) {
    super(options);
    this._appConfig = testInit();
  }

  get pageObjects(): PageObject[] {
    return this._appConfig.pageObjects;
  }

  get currentPageConfig(): PageObject | undefined {
    return this._currentPageConfig;
  }

  get activePageElement(): PageElement | undefined {
    return this._activePageElement;
  }

  public setActivePageElement(element:PageElement){
    this._activePageElement = element;
  }

  public setCurrentPage(value: string) {
    const pageConfig = this.pageObjects.find(p => p.pageName.toLowerCase() === value.toLowerCase());
    if (!pageConfig) {
      throw new Error(`Page ${value} is not configured`)
    }
    this._currentPageConfig = pageConfig;
  }

  async invokeStep(text: string, argument?: unknown, customFixtures?: unknown) {
    const stepDefinition = findStepDefinition(
      this.options.supportCodeLibrary,
      text,
      this.testInfo.file,
    );

    if (!stepDefinition) {
      throw new Error(`Undefined step: "${text}"`);
    }

    // attach custom fixtures to world - the only way to pass them to cucumber step fn
    //this.customFixtures = customFixtures;
    const code = getStepCode(stepDefinition);

    // Get location of step call in generated test file.
    // This call must be exactly here to have correct call stack.
    const location = getLocationInFile(this.test.info().file);

    const { parameters } = await stepDefinition.getInvocationParameters({
      hookParameter: {} as ITestCaseHookParameter,
      step: { text, argument } as any,
      world: this,
    });

    const modeifiedtext = stepDefinition.keyword + ":: " + text;
    const res = await runStepWithCustomLocation(this.test, modeifiedtext, location, () =>
      code.apply(this, parameters),
    );

    //delete this.customFixtures;

    return res;
  }

  async openHomePage() {
    await this.page.goto('https://playwright.dev');
  }

  async clickLink(name: string) {
    await this.page.getByRole('link', { name }).click();
  }
}

setWorldConstructor(PageWorld);
