import { QueryParams, ApiResponse, ApiError } from './types';
import { showError } from '../toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface FetchOptions extends RequestInit {
  params?: QueryParams;
  showToast?: boolean;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    const error: ApiError = {
      message: data.message || 'An error occurred',
      status: response.status,
      errors: data.errors
    };
    throw error;
  }
  
  return data;
}

function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(path, API_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

export async function fetchApi<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, showToast = true, ...init } = options;

  try {
    const url = buildUrl(path, params);
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    return await handleResponse<T>(response);
  } catch (error) {
    if (showToast) {
      showError(error);
    }
    throw error;
  }
}

export const api = {
  get: <T>(path: string, options?: FetchOptions) => 
    fetchApi<T>(path, { method: 'GET', ...options }),

  post: <T>(path: string, data?: unknown, options?: FetchOptions) =>
    fetchApi<T>(path, { 
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),

  put: <T>(path: string, data?: unknown, options?: FetchOptions) =>
    fetchApi<T>(path, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    }),

  patch: <T>(path: string, data?: unknown, options?: FetchOptions) =>
    fetchApi<T>(path, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    }),

  delete: <T>(path: string, options?: FetchOptions) =>
    fetchApi<T>(path, { method: 'DELETE', ...options }),
};