import React from 'react'
import './App.css'
// import Button from 'react-bootstrap/Button'
import Home from './components/Home'
import Department from './components/Department'
import Employee from './components/Employee'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
