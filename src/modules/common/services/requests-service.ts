import { DEFAULT_HEADERS, VENUS_BACKEND_URL } from '../constants/requests-constants';
import router from '@/router';
import { useAuthStore } from '@/stores/auth-store';
import type { VenusResponse } from '../types/response-types';

export class RequestsService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || VENUS_BACKEND_URL;
  }

  private buildHeaders(): HeadersInit {
    const authStore = useAuthStore();
    const token = authStore.token;
    const headers = {
      ...DEFAULT_HEADERS,
      ...(token && { authorization: `Bearer ${token}` }),
    };
    return headers;
  }

  private async makeRequest<T>(
    method: string,
    path: string,
    data: any = null,
  ): Promise<VenusResponse<T>> {
    const headers = this.buildHeaders();
    const response = await fetch(`${this.baseUrl}/${path}`, {
      method,
      headers,
      credentials: 'include',
      ...(data && { body: JSON.stringify(data) }),
    });
    if (response.status === 401) {
      useAuthStore().logout();
      router.push({ name: 'login-view' });
    }

    const responseJson = await response.json();
    return responseJson as VenusResponse<T>;
  }

  public async get<T>(path: string): Promise<VenusResponse<T>> {
    return this.makeRequest('get', path);
  }

  public async post<T>(path: string, data: any = null): Promise<VenusResponse<T>> {
    return this.makeRequest('post', path, data);
  }

  public async patch<T>(path: string, data: any): Promise<VenusResponse<T>> {
    return this.makeRequest('PATCH', path, data);
  }

  public async put<T>(path: string, data: any): Promise<VenusResponse<T>> {
    return this.makeRequest('put', path, data);
  }
};

export default RequestsService;
