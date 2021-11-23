import React, {Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './i18n'

const rootElement = document.getElementById('root')


if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<Suspense fallback={<div>Loading...</div>}><App /></Suspense>, rootElement)
} else {
  ReactDOM.render(<Suspense fallback={<div>Loading...</div>}><App /></Suspense>, rootElement)
}