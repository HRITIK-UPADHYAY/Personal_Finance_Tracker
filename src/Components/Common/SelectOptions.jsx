import React from 'react'
import './Style/selectOptions.css'

const SelectOptions = ({setFilterType}) => {
  return (
    <select className='options' onClick={(e) => setFilterType(e.target.value)}>
        <option value={"all"}> All </option>
        <option value={"income"}> Income </option>
        <option value={"expense"}> Expense </option>
    </select>
  )
}

export default SelectOptions
