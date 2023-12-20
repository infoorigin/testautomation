
export type StepDefinition = {
    stepId:string,
    id: string,
    seqId: number,
    type: string,
    text: string
}

export type Step = {
    id: string,
    seqId: number,
    scenarioId: string,
    name: string,
    stepDefinitions: StepDefinition[]
}

export type Scenario = {
    featureId: string,
    seqId: number,
    id: string,
    name: string,
    tags:string,
    steps: Step[]
}

export type Feature = {
    id: string,
    name: string,
    scenarios: Scenario[]
}