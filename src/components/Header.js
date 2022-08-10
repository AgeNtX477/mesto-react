import React from 'react'
import logo from '../images/header-logo.svg'

function Header () {
  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='логотип_сайта' />
    </header>
  )
}

export default Header
