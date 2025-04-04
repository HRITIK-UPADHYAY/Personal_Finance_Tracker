import React from 'react'
import './Style/button.css'

const Button = ({text, outlined, onClick, loading}) => {

  return (
    <div>
      <button className={outlined ? 'outlined-btn': 'colored-btn'} onClick={onClick} disabled={loading}> {loading? "Loading..." : text} </button>
    </div>
  )
}

export default Button
