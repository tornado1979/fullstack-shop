import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
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
        </div>
      </nav>
    </header>
  )
}
