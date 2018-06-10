import React, { Component } from 'react'

import { Product } from '../../components/products/product'
import './home.scss'
import '../../components/products/product.scss'
import config from '../../clientConfig'

const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class Home extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
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
            path={`${server}${product.path}`}
          />
        )
      })
    }
    return false
  }

  async callApi() {
    const response = await fetch(`${server}products`)
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
