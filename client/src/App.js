import React, { Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import './App.scss'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import { Routes } from './components/routes/routes'

// const server = 'https://damp-brook-72767.herokuapp.com' // Heroku deployed application url
const App = () => {
  return (
    <div className="App">
      <CssBaseline>
        <Router>
          <Fragment>
            <Header />
            <Routes />
            <Footer
              bgTemplate="template1"
            />
          </Fragment>
        </Router>
      </CssBaseline>
    </div>
  )
}

export default App
