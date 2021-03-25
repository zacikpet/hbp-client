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
export type Model = 'sm' | 'bsm'
export type Stage = 'preliminary' | 'submitted' | 'published'

export type Paper = {
  _id: string
  category: Category
  experiment: Experiment
  type: Type
  title: string
  abstract?: string
  files: string[]
  date: Date
  luminosity: number[]
  energy: number[]
  particles: {
    original: string[]
    intermediate: string[]
    product: string[]
  }
  model: Model
  stage: Stage
  lower_limit?: number
}

type DBPaper = Omit<Paper, 'date'> & { date: string }

function strToDate(paper: DBPaper): Paper {
  return { ...paper, date: new Date(paper.date) }
}

export const getPapers = (): Promise<Paper[]> => {
  return axios.get<DBPaper[]>('/papers').then(response => response.data.map(strToDate))
}

export const getPaper = (id: string): Promise<Paper> => {
  return axios.get<DBPaper>(`/papers/${id}`).then(response => strToDate(response.data))
}

export const patchPaper = (id: string, data: Paper): Promise<void> => {
  return axios.put(`/papers/${id}`, data)
}

export type LowerLimitPaper = {
  experiment: Experiment
  date: number
  lower_limit: number
  _id: string
}

export const getLowerLimits = (): Promise<LowerLimitPaper[]> => {
  return axios.get<DBPaper[]>(`/mass-limit`).then(response =>
    response.data
      .map(strToDate)
      .filter(paper => paper.lower_limit)
      .map(paper => ({
        experiment: paper.experiment,
        date: paper.date.getTime(),
        lower_limit: paper.lower_limit || 0,
        _id: paper._id,
      }))
  )
}
