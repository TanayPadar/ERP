import { toast } from 'sonner';
import { validateRequired } from './validation';

export interface WorkflowStep {
  id: string;
  name: string;
  status: string;
  validate?: () => boolean | Promise<boolean>;
  execute: () => void | Promise<void>;
}

export class WorkflowEngine {
  private steps: WorkflowStep[] = [];
  private currentStepIndex = 0;

  addStep(step: WorkflowStep) {
    validateRequired(step.id, 'Step ID');
    validateRequired(step.name, 'Step Name');
    validateRequired(step.execute, 'Step Execute Function');
    
    this.steps.push(step);
    return this;
  }

  async executeWorkflow() {
    try {
      for (const step of this.steps) {
        if (step.validate) {
          const isValid = await step.validate();
          if (!isValid) {
            throw new Error(`Validation failed for step: ${step.name}`);
          }
        }

        await step.execute();
        this.currentStepIndex++;
      }
      
      toast.success('Workflow completed successfully');
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Workflow failed');
      return false;
    }
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex];
  }

  reset() {
    this.currentStepIndex = 0;
  }
}

// Helper function to create workflow steps
export const createWorkflowStep = (
  id: string,
  name: string,
  status: string,
  execute: () => void | Promise<void>,
  validate?: () => boolean | Promise<boolean>
): WorkflowStep => ({
  id,
  name,
  status,
  execute,
  validate,
});