import { AppError } from '../error-handling';
import { API_URL } from './config';
import type { FetchOptions } from './types';

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new AppError(
      data.message || 'API request failed',
      data.code,
      response.status
    );
  }

  return data;
}

export async function makeRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    const { params, ...init } = options;
    const url = new URL(endpoint, API_URL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Network request failed');
  }
}