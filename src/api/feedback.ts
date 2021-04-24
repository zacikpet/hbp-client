import axios from 'axios'

export type Feedback = {
  description: string
  articles: string[]
  comments: string
  email: string
}

export const postFeedback = async (feedback: Feedback): Promise<void> => {
  return axios.post('/api/feedback', feedback).then(response => response.data)
}

export const getFeedback = async (): Promise<Feedback[]> => {
  return axios.get('/api/feedback').then(response => response.data)
}
