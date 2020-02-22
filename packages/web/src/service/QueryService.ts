import { AxiosInstance } from 'axios';
import {
  ChargeSession,
  ChargeState,
  DriveSession,
  DriveState,
  Product
} from '@teslapp/common';

export class QueryService {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getProducts(syncFromTesla = false): Promise<Product[]> {
    const result = await this.api.get('/product', {
      params: { syncUpstream: syncFromTesla },
      headers: { 'Cache-Control': 'no-cache' }
    });
    return result && result.data;
  }

  async getRecentSessions(
    id: string,
    limit = 1
  ): Promise<[ChargeSession | DriveSession]> {
    const result = await this.api.get(
      `/session?limit=${limit}&productId=${id}`
    );
    return result && result.data;
  }

  async getSessionDetails(
    sessionId: string
  ): Promise<ChargeState[] | DriveState[]> {
    const result = await this.api.get(`/session/${sessionId}`);
    return result && result.data;
  }

  async addTag(sessionId: string, tag: string): Promise<string[]> {
    if (!tag.match(/^[a-z0-9\w].+$/i)) {
      throw Error('tags must contain only letters, numbers, and spaces');
    }
    const sanitizedTag = tag.replace(' ', '_').toLowerCase();
    const result = await this.api.post(
      `/session/${sessionId}/tag/${sanitizedTag}`,
      { sanitizedTag }
    );
    return result && result.data;
  }

  async removeTag(sessionId: string, tag: string): Promise<string[]> {
    if (!tag.match(/^[a-z0-9\w].+$/i)) {
      throw Error('tags must contain only letters, numbers, and spaces');
    }
    const sanitizedTag = tag.replace(' ', '_').toLowerCase();
    const result = await this.api.delete(
      `/session/${sessionId}/tag/${sanitizedTag}`
    );
    return result && result.data;
  }

  async removeSession(sessionId: string): Promise<string[]> {
    const result = await this.api.delete(`/session/${sessionId}`);
    return result && result.data;
  }
}
