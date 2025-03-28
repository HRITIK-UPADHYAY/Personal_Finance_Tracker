import React from 'react'
import './Style/header.css'

const Header = ({text}) => {
  return (
    <div className='header'>
      <p> Financly. </p>
      <p> {text} </p>
    </div>
  )
}

export default Header
