import axios, { type AxiosInstance } from 'axios'

export class ApiService {
  protected api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
