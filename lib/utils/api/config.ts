export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  users: {
    list: '/users',
    create: '/users',
    update: (id: number) => `/users/${id}`,
    delete: (id: number) => `/users/${id}`,
  },
  clients: {
    list: '/clients',
    create: '/clients',
    update: (id: number) => `/clients/${id}`,
    delete: (id: number) => `/clients/${id}`,
  },
  // Add other endpoints as needed
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const REQUEST_TIMEOUT = 30000; // 30 seconds