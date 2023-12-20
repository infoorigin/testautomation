import { ISupportCodeLibrary } from "@cucumber/cucumber/api";
import { GherkinStepKeyword } from "@cucumber/cucumber/lib/models/gherkin_step_keyword";
import StepDefinition from "@cucumber/cucumber/lib/models/step_definition";
import { DefineStepPattern, TestStepFunction } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import { isMainThread } from 'node:worker_threads';
import { BddWorld } from "playwright-bdd/index";
import fs from 'node:fs';
import path from 'node:path';
import { TestTypeCommon } from "playwright-bdd/dist/playwright/types";
import url from 'url';

class ExitError extends Error {
    get stack() {
      return '';
    }
  }

  export type StepConfig = {
    keyword: GherkinStepKeyword;
    pattern: DefineStepPattern;
    // eslint-disable-next-line @typescript-eslint/ban-types
    fn: Function;
    hasCustomTest: boolean;
    pomNode?: any; // for decorator steps
  };

  export type CucumberStepFunction = TestStepFunction<BddWorld> & {
    stepConfig?: StepConfig;
  };

export function exit(...messages: string[]) {
  messages = messages.filter(Boolean);
  if (isMainThread) {
    if (messages.length) console.error('Error:', ...messages);
    process.exit(1);
  } else {
    throw new ExitError(messages.join(' '));
  }
}

export function findStepDefinition(
    supportCodeLibrary: ISupportCodeLibrary,
    stepText: string,
    file: string,
  ) {
    const matchedSteps = supportCodeLibrary.stepDefinitions.filter((step) => {
      return step.matchesStepName(stepText);
    });
    if (matchedSteps.length === 0) return;
    if (matchedSteps.length > 1)
      exit(
        [
          `Several step definitions found for text: ${stepText} (${file})`,
          ...matchedSteps.map((s) => `- ${s.pattern}`),
        ].join('\n'),
      );
    // todo: check stepDefinition.keyword with PickleStepType
    return matchedSteps[0];
  }

  export function getStepCode(stepDefinition: StepDefinition) {
    return stepDefinition.code as CucumberStepFunction;
  }

  export function requirePlaywrightModule(modulePath: string) {
    const absPath = path.isAbsolute(modulePath) ? modulePath : getPlaywrightModulePath(modulePath);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(absPath);
  }

  export function resolvePackageRoot(packageName: string) {
    const packageJsonPath = require.resolve(`${packageName}/package.json`);
    return path.dirname(packageJsonPath);
  }
  // cache playwright root
let playwrightRoot = '';
  
  function getPlaywrightRoot() {
    if (!playwrightRoot) {
      // Since 1.38 all modules moved from @playwright/test to playwright.
      // Here we check existance of 'lib' dir instead of checking version.
      // See: https://github.com/microsoft/playwright/pull/26946
      const playwrightTestRoot = resolvePackageRoot('@playwright/test');
      const libDir = path.join(playwrightTestRoot, 'lib');
      playwrightRoot = fs.existsSync(libDir) ? playwrightTestRoot : resolvePackageRoot('playwright');
    }
    
  return playwrightRoot;
}

  export function getPlaywrightModulePath(relativePath: string) {
    return path.join(getPlaywrightRoot(), relativePath);
  }

  export function getLocationInFile(filePath: string) {
    const { sourceMapSupport } = requirePlaywrightModule('lib/utilsBundle.js');
    const oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (error, stackFrames) => {
      const frameInFile = stackFrames.find((frame) => frame.getFileName() === filePath);
      if (!frameInFile) return { file: '', line: 0, column: 0 };
      const frame: NodeJS.CallSite = sourceMapSupport.wrapCallSite(frameInFile);
      const fileName = frame.getFileName();
      // Node error stacks for modules use file:// urls instead of paths.
      const file =
        fileName && fileName.startsWith('file://') ? url.fileURLToPath(fileName) : fileName;
      return {
        file,
        line: frame.getLineNumber(),
        column: frame.getColumnNumber(),
      };
    };
    // commented stackTraceLImit modification, todo: check if it has perf impact
    // const oldStackTraceLimit = Error.stackTraceLimit;
    // Error.stackTraceLimit = level + 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: { stack: Location } = {} as any;
    Error.captureStackTrace(obj);
    const location = obj.stack;
    // Error.stackTraceLimit = oldStackTraceLimit;
    Error.prepareStackTrace = oldPrepareStackTrace;
    return location;
  }
  
  /**
 * Run step with location pointing to Given, When, Then call.
 */
// eslint-disable-next-line max-params
export async function runStepWithCustomLocation(
    test: TestTypeCommon,
    stepText: string,
    location: Location,
    body: () => unknown,
  ) {
    const testInfo = test.info();
  
    // See: https://github.com/microsoft/playwright/blob/main/packages/playwright/src/common/testType.ts#L221
    // @ts-expect-error _runAsStep is hidden from public
    return testInfo._runAsStep({ category: 'test.step', title: stepText, location }, async () => {
      return await body();
    });
  }