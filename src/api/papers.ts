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
export type Production = 'ggf' | 'vbf' | 'whzh' | 'tth'
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
  production: Production[]
  lower_limit?: number
  precision?: {
    higgs_mass: number
    stat_error_up: number
    stat_error_down: number
    sys_error_up: number
    sys_error_down: number
  }
}

type DBPaper = Omit<Paper, 'date'> & { date: string }

function strToDate(paper: DBPaper): Paper {
  return { ...paper, date: new Date(paper.date) }
}

export const getPapers = (): Promise<Paper[]> => {
  return axios.get<DBPaper[]>('/api/papers').then(response => response.data.map(strToDate))
}

export const getPaper = (id: string): Promise<Paper> => {
  return axios.get<DBPaper>(`/api/papers/${id}`).then(response => strToDate(response.data))
}

export const patchPaper = (id: string, data: Paper): Promise<void> => {
  return axios.patch(`/api/papers/${id}`, data)
}

export type LowerLimitPaper = {
  experiment: Experiment
  date: number
  lower_limit: number
  _id: string
}

export const getLowerLimits = (): Promise<LowerLimitPaper[]> => {
  return axios.get<DBPaper[]>(`/api/mass-limit`).then(response =>
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

export type PrecisionPaper = {
  _id: string
  experiment: Experiment
  date: number
  higgs_mass: number
  stat_error_up: number
  stat_error_down: number
  sys_error_up: number
  sys_error_down: number
}

export const getPrecision = (): Promise<PrecisionPaper[]> => {
  return axios.get<DBPaper[]>(`/api/precision`).then(response =>
    response.data
      .map(strToDate)
      .filter(paper => paper.precision)
      .map(paper => ({
        experiment: paper.experiment,
        date: paper.date.getTime(),
        _id: paper._id,
        higgs_mass: paper.precision?.higgs_mass || 0,
        stat_error_up: paper.precision?.stat_error_up || 0,
        stat_error_down: paper.precision?.stat_error_down || 0,
        sys_error_up: paper.precision?.sys_error_up || 0,
        sys_error_down: paper.precision?.sys_error_down || 0,
      }))
  )
}
