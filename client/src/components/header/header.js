import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import Badge from '@material-ui/core/Badge'

import { getCartItems } from '../../container/cart/selectors/cart.selectors'
import { CartWrapped } from '../../container/cart'

const Header = ({ cartItems }) => {
  const hasItems = !!cartItems.length
  return (
    <header>
      <nav className="navBar">
        <NavLink className="logo" to="/">
          <div className="logo" />
        </NavLink>
        <input id="menu-toggle" type="checkbox" />
        <label className="label-toggle" htmlFor="menu-toggle" />
        <div className="menu" role="navigation">
          <NavLink
            activeStyle={
              { color: '#959E05' }
            }
            to="/"
          >Home
          </NavLink>
          <NavLink
            activeStyle={
              { color: '#959E05' }
            }
            to="/aboutus"
          >About us
          </NavLink>
          <NavLink
            activeStyle={
              { color: '#959E05' }
            }
            to="/gallery"
          >Gallery
          </NavLink>
          <NavLink
            activeStyle={
              { color: '#959E05' }
            }
            to="/contact"
          >Contact us
          </NavLink>
          <div style={{ display: 'inline-block' }}>
            {hasItems &&
            <Badge badgeContent={cartItems.length} color="secondary">
              <CartWrapped />
            </Badge>}
            {!hasItems && <CartWrapped />}
          </div>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  cartItems: propTypes.array.isRequired, // eslint-disable-line
}

const mapStateToProps = (state) => ({
  cartItems: getCartItems(state),
})

export default connect(mapStateToProps, null)(Header)
