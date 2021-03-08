import axios from 'axios'

export type Experiment = 'atlas' | 'cms' | 'delphi' | 'aleph' | 'opal' | 'l3' | 'cdf' | 'd0'

export type Category =
  | 'atlas_papers'
  | 'atlas_notes'
  | 'cms_papers'
  | 'cms_notes'
  | 'aleph_papers'
  | 'delphi_papers'
  | 'opal_papers'
  | 'l3_papers'

export type Type = 'paper' | 'note'

export type Paper = {
  category: Category
  experiment: Experiment
  type: Type
  title: string
  abstract?: string
  files: string[]
  date: string
  luminosity: number[]
  energy: number[]
  particles: {
    original: string[]
    intermediate: string[]
    product: string[]
  }
  cds_id: string
}

axios.defaults.baseURL = 'https://hbp-server.herokuapp.com'

export const getPapers = (): Promise<Paper[]> => {
  return axios.get('/papers').then(response => response.data)
}
