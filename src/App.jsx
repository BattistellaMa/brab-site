import { useState } from 'react'
import './App.css'
import Header from './components/header'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
