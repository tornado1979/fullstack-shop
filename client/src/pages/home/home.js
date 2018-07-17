import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'

import Product from '../../components/products/product'
import './home.scss'
import '../../components/products/product.scss'
import config from '../../clientConfig'

import { getProducts } from './selectors/home.selectors'
import { fetchProducts } from './actionCreators/home.actionCreators'
import { addItemToCart } from '../../container/cart/actionCreators/cart.actionCreators'
import { getCart } from '../../globalSelectors/globalSelectors'
import { getUser } from '../../container/auth/selectors/auth.selectors'

const server = process.env.NODE_ENV === 'development' ? config.server_dev : config.server_prod

class Home extends Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  addItem(val) { // eslint-disable-line
    this.props.addItemToCart(val, this.props.JwtToken)
  }

  checkItem(val) {
    const { orderItems } = this.props

    return orderItems.some(item => item.productId === val)

    /* const res = this.props.isItemOnCartt(val)()
    return res */
  }

  getAllProducts(products) {
    if (products.length > 0) {
      return products.map(product => {
        return (
          <Product
            click={this.addItem}
            description={product.description}
            isItemOnBasket={this.checkItem(product._id)}
            key={product._id}
            name={product.name}
            path={`${server}${product.path}`}
            productId={product._id}
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
  addItemToCart: propTypes.func.isRequired,
  fetchProducts: propTypes.func.isRequired,
  JwtToken: propTypes.string,
  orderItems: propTypes.array.isRequired, // eslint-disable-line
  products: propTypes.array.isRequired, // eslint-disable-line
}

Home.defaultProps = {
  JwtToken: null,
}

const mapStateToProps = (state) => {
  const user = getUser(state)
  return {
    JwtToken: user.token,
    orderItems: getCart(state),
    products: getProducts(state),
  }
}

// pass property JwtToken to actioncreator
const mapDispatchToProps = (dispatch) => bindActionCreators({
  addItemToCart: (item, JwtToken) => addItemToCart(item, JwtToken),
  fetchProducts,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
