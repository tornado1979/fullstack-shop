import React, { Component } from 'react'

import { Product } from '../../components/products/product'
import './home.scss'
import '../../components/products/product.scss'

class Home extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
    console.log('component mounted') // eslint-disable-line
    this.callApi()
      .then(res => {
        this.setState({
          products: res,
        })
      })
      .catch(err => {
        console.error(err) // eslint-disable-line
      })
  }

  getProducts() {
    if (this.state.products.length > 0) {
      return this.state.products.map(product => {
        return (
          <Product
            description={product.description}
            key={product._id} // eslint-disable-line
            name={product.name}
            path={product.path}
          />
        )
      })
    }
    return false
  }

  async callApi() {
    const response = await fetch('/products')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render() {
    return (
      <main>
        <div className="products-wrapper">
          {this.getProducts()}
        </div>
      </main>
    )
  }
}

export default Home
