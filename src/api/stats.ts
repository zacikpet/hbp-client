import axios from 'axios'

export type Stats = {
  updates: { date: string }[]
  total_papers: number
}

export const getStats = (): Promise<Stats> => {
  return axios.get<Stats>('/api/stats').then(response => response.data)
}
