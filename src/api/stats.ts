import axios from 'axios'

export type Update = {
  date: string
  trigger?: string
}

export type Stats = {
  updates: Update[]
  total_papers: number
}

export const getStats = (): Promise<Stats> => {
  return axios.get<Stats>('/api/stats').then(response => response.data)
}
