import axios from 'axios'

export type Experiment = 'atlas' | 'cms' | 'delphi' | 'aleph' | 'opal' | 'l3' | 'cdf' | 'd0'

export type Paper = {
  experiment: Experiment
  title: string
  abstract: string
  link: string
  date: string
  luminosity: number[]
  energy: number[]
}

axios.defaults.baseURL = 'http://localhost:5000'

export const getPapers = (): Promise<Paper[]> => {
  return axios.get('/papers').then(response => response.data)
}
