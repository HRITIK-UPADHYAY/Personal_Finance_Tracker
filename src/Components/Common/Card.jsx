import React from 'react'
import './Style/card.css'
import Button from './Button'

const Card = ({heading, btnText, amount, onClick}) => {
  return (
    <div className='card'>
      <h3> {heading} </h3>
      <p> {amount} </p>
      <Button text={btnText} onClick={onClick}/>
    </div>
  )
}

export default Card
