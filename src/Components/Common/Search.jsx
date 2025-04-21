import React from 'react'
import './Style/search.css'

const Search = ({text, setText}) => {

  return (
    <div className='search'>
      <input type='text' placeholder='Search' value={text} onChange={(e) => setText(e.target.value)}/>
    </div>
  )
}

export default Search
