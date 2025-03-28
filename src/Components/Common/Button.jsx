import React from 'react'
import './Style/button.css'

const Button = ({text, outlined}) => {

  return (
    <div>
      <button className={outlined ? 'outlined-btn': 'colored-btn'}> {text} </button>
    </div>
  )
}

export default Button
