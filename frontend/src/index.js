import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
