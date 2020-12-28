/* global JSX */
import React from 'react'

import workflows, { WorkflowStep } from '../../dist/workflow'
import features, { Feature } from '../../features/features'
import FeatureUi from '../components/feature-ui'
import WorkflowUi from '../components/workflow-ui'
import clear from './clear'
import custom from './custom'
import DirectExecute from './execute'

type CommandType = {
  command: string
  description: string
  ui?: JSX.Element | string
  child?: Array<CommandType>
  steps: Array<WorkflowStep | Feature>
}

type RunnableFeature = {
  [command: string]: {
    description: string
    run: () => JSX.Element
  }
}

/**
 * Generates the CLUI command for all workflows and passes to custom ui component
 * Uses {@link WorkflowUi} to generate UI for workflows
 */
const generateWorkflows: () => Array<CommandType> = () => {
  const finalWorkflows: Array<CommandType> = []
  const workflowsArray = Object.values(workflows)
  for (const workflow of workflowsArray) {
    const newWorkflow: CommandType = {
      command: workflow.name,
      description: workflow.description,
      ui: <WorkflowUi steps={workflow.steps} />,
      steps: workflow.steps
    }
    if (workflow.ui) {
      newWorkflow.ui = workflow.ui
    }
    if (workflow.child) {
      newWorkflow.child = workflow.child
    }
    finalWorkflows.push(newWorkflow)
  }
  return finalWorkflows
}

/**
 * Generates CLUI command for all Features and passes it to custom component
 * Uses {@link FeatureUi} to generate UI for all Features
 */
const generateFeatures = () => {
  const featuresWithUI: Array<CommandType> = []
  const featuresWithoutUI: Array<RunnableFeature> = []
  const featureKeys = Object.keys(features)
  for (const key of featureKeys) {
    const currentFeature = features[key as keyof typeof features]
    if (!currentFeature.noDisplay) {
      if (currentFeature.ui) {
        const newFeature: CommandType = {
          command: `${currentFeature.name}`,
          description: currentFeature.description,
          ui: (
            <FeatureUi
              ui={currentFeature.ui}
              featureKey={key as keyof typeof features}
            />
          ),
          steps: [currentFeature.feature]
        }
        featuresWithUI.push(newFeature)
      } else {
        const runnableFeature = {
          [currentFeature.name]: {
            description: currentFeature.description,
            // eslint-disable-next-line react/display-name
            run: () => <DirectExecute featureKey={key as string} />
          }
        }
        featuresWithoutUI.push(runnableFeature)
      }
    }
  }
  const renderedFeatures = custom(featuresWithUI)
  const { commands } = renderedFeatures
  const directActionFeatures = {}
  for (const directActionFeature of featuresWithoutUI) {
    Object.assign(directActionFeatures, directActionFeature)
  }
  const output = { ...commands, ...directActionFeatures }
  return { commands: output }
}

const { CUSTOM_RUN } = features

const customRunCommand = () => {
  const customRunFeature: CommandType = {
    command: `${CUSTOM_RUN.name}`,
    description: CUSTOM_RUN.description,
    ui: <FeatureUi ui={CUSTOM_RUN.ui as JSX.Element} featureKey="CUSTOM_RUN" />,
    steps: [CUSTOM_RUN.feature]
  }
  return custom([customRunFeature])
}

const command = {
  commands: {
    Features: { description: 'All Available Features', ...generateFeatures() },
    Workflows: {
      description: 'Automated Workflows',
      ...custom(generateWorkflows())
    },
    ...customRunCommand().commands,
    Clear: clear
  }
}

export default command

// eslint-disable-next-line no-undef
export type { CommandType }
