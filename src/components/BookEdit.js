import React, { useState } from 'react'

function BookEdit({books,onSubmit}) {
  const [title,setTitle] = useState(books.title)

  
  console.log(books.id)

  console.log(books)

  const handleSubmit = (e) =>{
    e.preventDefault()
    onSubmit(books.id,title)
    
  }

  const handlechange = (e) =>{
      setTitle(e.target.value)
     
  }
  return (
  <form className='book-edit' onSubmit={handleSubmit}>
    <label>title</label>
    <input className='input' value={title} onChange={handlechange}/>
    <button className='button is-primary'>
      Save
    </button>
  </form>
  )
}

export default BookEdit 