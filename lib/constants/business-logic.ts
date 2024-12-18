import { PurchaseOrder, StoreReceived, StoreIssue, WorkshopData } from '@/types';

// Workflow states and transitions
export const WORKFLOW_STATES = {
  STORE_RECEIVED: {
    PENDING: 'Pending',
    INSPECTED: 'Inspected', 
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected'
  },
  
  STORE_ISSUE: {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    ISSUED: 'Issued'
  },

  WORKSHOP: {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    ON_HOLD: 'On Hold'
  }
};

// Business rules for state transitions
export const validateStateTransition = (
  currentState: string,
  nextState: string,
  type: 'STORE_RECEIVED' | 'STORE_ISSUE' | 'WORKSHOP'
) => {
  const states = WORKFLOW_STATES[type];
  
  // Validate state exists
  if (!Object.values(states).includes(nextState)) {
    throw new Error(`Invalid state transition to ${nextState}`);
  }

  // State transition rules
  switch(type) {
    case 'STORE_RECEIVED':
      if (currentState === states.PENDING && nextState === states.REJECTED) return true;
      if (currentState === states.PENDING && nextState === states.INSPECTED) return true;
      if (currentState === states.INSPECTED && nextState === states.ACCEPTED) return true;
      if (currentState === states.INSPECTED && nextState === states.REJECTED) return true;
      break;

    case 'STORE_ISSUE':
      if (currentState === states.PENDING && nextState === states.APPROVED) return true;
      if (currentState === states.PENDING && nextState === states.REJECTED) return true;
      if (currentState === states.APPROVED && nextState === states.ISSUED) return true;
      break;

    case 'WORKSHOP':
      if (currentState === states.PENDING && nextState === states.IN_PROGRESS) return true;
      if (currentState === states.IN_PROGRESS && nextState === states.COMPLETED) return true;
      if (currentState === states.IN_PROGRESS && nextState === states.ON_HOLD) return true;
      if (currentState === states.ON_HOLD && nextState === states.IN_PROGRESS) return true;
      break;
  }

  return false;
};

// Validation rules
export const validateStoreReceipt = (receipt: Partial<StoreReceived>) => {
  const errors: string[] = [];

  if (!receipt.poNo) errors.push('Purchase Order number is required');
  if (!receipt.vendorName) errors.push('Vendor name is required');
  if (!receipt.challanNo) errors.push('Challan number is required');
  if (!receipt.challanDate) errors.push('Challan date is required');
  if (!receipt.items?.length) errors.push('At least one item is required');

  receipt.items?.forEach((item, index) => {
    if (!item.itemName) errors.push(`Item ${index + 1}: Item name is required`);
    if (!item.orderedQty) errors.push(`Item ${index + 1}: Ordered quantity is required`);
    if (!item.receivedQty) errors.push(`Item ${index + 1}: Received quantity is required`);
    if (item.receivedQty > item.orderedQty) {
      errors.push(`Item ${index + 1}: Received quantity cannot exceed ordered quantity`);
    }
  });

  return errors;
};

export const validateStoreIssue = (issue: Partial<StoreIssue>) => {
  const errors: string[] = [];

  if (!issue.department) errors.push('Department is required');
  if (!issue.requestedBy) errors.push('Requester name is required');
  if (!issue.items?.length) errors.push('At least one item is required');

  issue.items?.forEach((item, index) => {
    if (!item.itemName) errors.push(`Item ${index + 1}: Item name is required`);
    if (!item.quantity) errors.push(`Item ${index + 1}: Quantity is required`);
    if (item.quantity > item.stock) {
      errors.push(`Item ${index + 1}: Requested quantity exceeds available stock`);
    }
  });

  return errors;
};

export const validateWorkshopData = (data: Partial<WorkshopData>) => {
  const errors: string[] = [];

  if (!data.projectNo) errors.push('Project number is required');
  if (!data.projectName) errors.push('Project name is required');
  if (!data.partName) errors.push('Part name is required');
  if (!data.material) errors.push('Material is required');
  if (!data.quantity || data.quantity < 1) errors.push('Valid quantity is required');
  if (!data.assignedTo) errors.push('Assignee is required');

  return errors;
};