import React, { useState , useContext} from 'react'
import BooksContext from '../context/books'

function BookEdit({books,onSubmit}) {
  const [title,setTitle] = useState(books.title)


  const {updateBook} = useContext(BooksContext)

  const handleSubmit = (e) =>{
    e.preventDefault()
    onSubmit()
    updateBook(books.id,title)
    
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