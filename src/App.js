import React from 'react'
import './App.css'
// import Button from 'react-bootstrap/Button'
import Home from './components/Home'
import Department from './components/Department'
import Employee from './components/Employee'

function App () {
  return (
    <div className='App'>
      <Home />
      <Department />
      <Employee />
    </div>
  )
}

export default App
