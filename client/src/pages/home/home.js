import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'

import { Product } from '../../components/products/product'
import './home.scss'
import '../../components/products/product.scss'
import config from '../../clientConfig'

import { getProducts } from './selectors/home.selectors'
import { fetchProducts } from './actionCreators/home.actionCreators'

const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class Home extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  /* state = {
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
    const response = await fetch('products')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }
  */

  getAllProducts(products) {
    console.log('get products', products)
    if (products.length > 0) {
      return products.map(product => {
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

  render() {
    const {
      products,
    } = this.props

    return (
      <main>
        <div className="products-wrapper">
          {this.getAllProducts(products)}
        </div>
      </main>
    )
  }
}

Home.propTypes = {
  fetchProducts: propTypes.func.isRequired,
  products: propTypes.array.isRequired, // eslint-disable-line
}

const mapStateToProps = (state) => (
  {
    products: getProducts(state),
  }
)

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
