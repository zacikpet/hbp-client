import axios from 'axios'
import { config } from 'react-transition-group'

export type User = {
  email: string
  firstname: string
  lastname: string
  verified: string
}

type AuthResult = {
  message: string
}

export const register = (firstname: string, lastname: string, email: string, password: string): Promise<AuthResult> => {
  return axios
    .post<AuthResult>('/register', { firstname, lastname, email, password })
    .then(response => response.data)
}

export const login = (email: string, password: string): Promise<AuthResult> => {
  return axios
    .post<AuthResult>('/login', { email, password }, { headers: { withCredentials: true } })
    .then(response => response.data)
}

export const logout = (): Promise<AuthResult> => {
  return axios.post<AuthResult>('/logout').then(response => response.data)
}

export const verifyAuth = (): Promise<AuthResult> => {
  return axios.get<AuthResult>('/verify-auth').then(response => response.data)
}

export const getCurrentUser = (): Promise<User> => {
  return axios
    .get<User>('/users/current', { withCredentials: true })
    .then(response => response.data)
}
