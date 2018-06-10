import React, { Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.scss'

import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Routes } from './components/routes/routes'

// const server = 'https://damp-brook-72767.herokuapp.com' // Heroku deployed application url
const App = () => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Header />
          <Routes />
          <Footer
            bgTemplate="template1"
          />
        </Fragment>
      </Router>
    </div>
  )
}

export default App
