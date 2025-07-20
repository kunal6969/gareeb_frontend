// API Base URL - can be configured via environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// Helper function to get auth token from localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

// Helper function to clear auth data
function clearAuthData(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');

  // Handle 401 Unauthorized - token expired or invalid
  if (response.status === 401) {
    clearAuthData();
    // Redirect to login page
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  if (contentType && contentType.includes('application/json')) {
    const jsonResponse = await response.json() as ApiResponse<T>;
    
    if (response.ok && jsonResponse.success) {
      // Return the data directly if it exists, otherwise return the whole response
      return (jsonResponse.data !== undefined ? jsonResponse.data : jsonResponse) as T;
    } else {
      // Handle error response
      throw new ApiError(
        jsonResponse.message || `An unexpected error occurred (HTTP ${response.status}).`,
        response.status
      );
    }
  }

  if (response.ok) {
    // Handle 204 No Content or non-JSON success responses
    return Promise.resolve({} as T);
  }

  // Handle non-JSON error responses
  throw new ApiError(
    `An unexpected error occurred (HTTP ${response.status}).`,
    response.status
  );
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add Authorization header if token exists
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    // Remove credentials: 'include' - no longer needed for JWT
  };

  const config: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  return handleResponse<T>(response);
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};