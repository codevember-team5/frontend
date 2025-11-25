import { ApiService } from './api.service'

export class HistoryService extends ApiService {
  async getActivitySummary(deviceId: string, startTime: string, endTime: string, groupBy = 'day') {
    const response = await this.api.get(
      `/historical/device/${deviceId}/activity-summary?start_time=${startTime}&end_time=${endTime}&group_by=${groupBy}`,
    )
    return response.data
  }
}

export const historyService = new HistoryService()
