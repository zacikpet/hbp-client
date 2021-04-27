import axios from 'axios'
import { User } from './auth'

export const getAdminRequests = async (): Promise<User[]> => {
  return axios.get<User[]>('/api/admin-requests').then(response => response.data)
}

export const verifyAdmin = async (id: string): Promise<void> => {
  return axios.post(`/api/admin-requests/verify/${id}`)
}

export const declineAdmin = async (id: string): Promise<void> => {
  return axios.post(`/api/admin-requests/decline/${id}`)
}
