import { useState, useCallback } from 'react';
import { showError } from '../toast';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState({ data: null, error: null, isLoading: true });
    
    try {
      const data = await promise;
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An error occurred');
      setState({ data: null, error: errorObj, isLoading: false });
      showError(error);
      throw error;
    }
  }, []);

  return { ...state, execute };
}