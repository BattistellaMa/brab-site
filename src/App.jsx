import { useState } from 'react'
import './App.css'
import Header from './components/header'
import AppRoutes from './routes'

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  )
}

export default App
