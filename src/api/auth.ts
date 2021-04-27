import axios from 'axios'

export type User = {
  email: string
  firstname: string
  lastname: string
  verified: string
  _id: string
}

type AuthResult = {
  message: string
}

export const register = (firstname: string, lastname: string, email: string, password: string): Promise<AuthResult> => {
  return axios
    .post<AuthResult>('/api/register', { firstname, lastname, email, password })
    .then(response => response.data)
}

type LoginResult = AuthResult & {
  user: User
}

export const login = (email: string, password: string): Promise<LoginResult> => {
  return axios
    .post<LoginResult>('/api/login', { email, password })
    .then(response => response.data)
}

export const signup = (email: string, password: string, firstname: string, lastname: string): Promise<AuthResult> => {
  return axios
    .post<AuthResult>('/api/register', { email, password, firstname, lastname })
    .then(response => response.data)
}

export const logout = (): Promise<AuthResult> => {
  return axios.post<AuthResult>('/api/logout').then(response => response.data)
}

type VerifyAuthResult = AuthResult & {
  logged_in: true
  user: User | null
}

export const verifyAuth = (): Promise<VerifyAuthResult> => {
  return axios.get<VerifyAuthResult>('/api/verify-auth').then(response => response.data)
}

export const getCurrentUser = (): Promise<User> => {
  return axios.get<User>('/api/users/current').then(response => response.data)
}
