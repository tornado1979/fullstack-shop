import React, { Component } from 'react'
import Form from '../../components/form/form'
import Order from '../../components/order'

import './checkout.scss'

class Checkout extends Component {
  handleSubmit = (values => {
    console.log('form submit...', values)
  })

  render() {
    return (
      <main>
        <div className="billing-details">
          <div className="title">
            <h2>Checkout</h2>
          </div>
          <Form
            onSubmit={this.handleSubmit}
          />
          <Order />
        </div>
      </main>
    )
  }
}

export default Checkout
