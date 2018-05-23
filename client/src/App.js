import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
  }

  async callApi() {
    const response = await fetch('/users')
    const body = await response.json()

    if(response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  componentDidMount(){
    this.callApi()
    .then(res => this.setState({
      response: res.express,
    }))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <div>
         {this.state.response}
       </div>
      </div>
    );
  }
}

export default App;
