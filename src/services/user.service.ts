import { ApiService } from './api.service'

export interface RegisterPayload {
  fullname: string
  email: string
  password: string
}

export class UserService extends ApiService {
  async register(payload: RegisterPayload) {
    const response = await this.api.post('/user', payload)
    return response.data
  }

  async assignDevice(userId: string, deviceId: string) {
    const response = await this.api.post(`/user/assign/${userId}/device/${deviceId}`)
    return response.data
  }

  async unassignDevice(userId: string, deviceId: string) {
    const response = await this.api.delete(`/user/unassign/${userId}/device/${deviceId}`)
    return response.data
  }

  async getUsers(skip: number = 0, limit: number = 10) {
    const response = await this.api.get(`/user?skip=${skip}&limit=${limit}`)
    return response.data
  }

  async updateUser(userId: string, data: any) {
    const response = await this.api.put(`/user/${userId}`, data)
    return response.data
  }

  async deleteUser(userId: string) {
    const response = await this.api.delete(`/user/${userId}`)
    return response.data
  }
}

export const userService = new UserService()
