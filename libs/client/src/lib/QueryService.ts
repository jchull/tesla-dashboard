import { AxiosInstance } from 'axios'
import { Vehicle, VehicleState } from '@tesla-dashboard/types'
import { Operator, QueryResult } from '@tesla-dashboard/util'

export class QueryService {
  private readonly api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  async getProducts(syncFromTesla = false): Promise<Vehicle[]> {
    const result = await this.api.get('/product', {
      params: { syncUpstream: syncFromTesla },
      headers: { 'Cache-Control': 'no-cache' }
    })
    return result?.data
  }

  async syncCurrentActivity(vehicleId: string): Promise<any> {
    const result = await this.api.post(`/product/${vehicleId}`, {
      params: {},
      headers: { 'Cache-Control': 'no-cache' }
    })
    return result?.data
  }

  async getRecentSessions(
    id: string,
    page: { start: number; size: number }
  ): Promise<QueryResult> {
    const result = await this.api.post('/session', {
      sort: [
        {
          field: 'start_date',
          desc: true
        }
      ],
      page,
      predicates: [
        {
          operator: Operator.EQ,
          field: 'vehicle',
          value: id
        }
      ]
    })
    return result && result.data
  }

  async getSessionDetails(sessionId: string): Promise<VehicleState[]> {
    const result = await this.api.get(`/session/${sessionId}`)
    return result?.data
  }

  async addTag(sessionId: string, tag: string): Promise<string[]> {
    if (!tag.match(/^[a-z0-9\w].+$/i)) {
      throw Error('tags must contain only letters, numbers, and spaces')
    }
    const sanitizedTag = tag.replace(' ', '_')
                            .toLowerCase()
    const result = await this.api.post(
      `/session/${sessionId}/tag/${sanitizedTag}`,
      { sanitizedTag }
    )
    return result && result.data
  }

  async removeTag(sessionId: string, tag: string): Promise<string[]> {
    if (!tag.match(/^[a-z0-9\w].+$/i)) {
      throw Error('tags must contain only letters, numbers, and spaces')
    }
    const sanitizedTag = tag.replace(' ', '_')
                            .toLowerCase()
    const result = await this.api.delete(
      `/session/${sessionId}/tag/${sanitizedTag}`
    )
    return result && result.data
  }

  async getAllTags(productId: string): Promise<string[]> {
    const result = await this.api.get(`/tag/${productId}`)
    return result && result.data
  }

  async removeSession(sessionId: string): Promise<number> {
    const result = await this.api.delete(`/session/${sessionId}`)
    return result && result.data
  }
}
