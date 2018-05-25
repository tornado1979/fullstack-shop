import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const server = 'https://damp-brook-72767.herokuapp.com' // Heroku deployed application url
class App extends Component {
  state = {
    response: '',
  }

  async callApi() {
    const response = await fetch(`/products`)
    const body = await response.json()

    if(response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  componentDidMount(){
    this.callApi()
    .then(res => {
      return this.setState({
        response: res,
      })
    })
    .catch(err => console.log(err))
  }

  getProducts(){
    console.log('inside products')
    if(Array.isArray(this.state.response)) {
      return this.state.response.map((product, idx) => <li key={idx}>{product.name}</li>)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <div>
         <p>Data from backend: expressjs + mondoDB!</p>
         <ul>
           {this.getProducts()}
         </ul>
       </div>
      </div>
    );
  }
}

export default App;
