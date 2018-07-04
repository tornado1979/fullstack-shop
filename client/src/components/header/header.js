import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import Badge from '@material-ui/core/Badge'

import { getCartItems } from '../../container/cart/selectors/cart.selectors'
import { CartWrapped } from '../../container/cart'

import { getUser } from '../../container/auth/selectors/auth.selectors'

const Header = ({ cartItems, isUserLoggedIn }) => {
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
          {!isUserLoggedIn &&
          <NavLink
            activeStyle={
              { color: '#959E05' }
            }
            to="/login"
          >Sign in
          </NavLink>}
          {isUserLoggedIn &&
          <NavLink
            activeStyle={
              { color: '#959E05' }
            }
            to="/signout"
          >Sign out
          </NavLink>}
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
  isUserLoggedIn: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const user = getUser(state)
  return ({
    cartItems: getCartItems(state),
    isUserLoggedIn: !!Object.keys(user).length,
  })
}

export default connect(mapStateToProps, null)(Header)
