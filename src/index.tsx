import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Router } from 'react-router-dom'
import axios from 'axios'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

axios.defaults.withCredentials = true
axios.interceptors.response.use(
  res => res,
  error => {
    if (error?.response?.status === 401) history.push('/expired')
    throw error
  }
)

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
