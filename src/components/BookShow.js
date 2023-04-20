import React from 'react'
import { useState, useContext } from 'react'
import BookEdit from './BookEdit'
import BooksContext from '../context/books'


function BookShow({book}) {

  const {deleteBookById} = useContext(BooksContext)

  const [showEdit ,setShowEdit] = useState(false)

  const handleDeleteClick = () =>{
    deleteBookById(book.id)
  }

  const handleEditClick = () =>{
      setShowEdit(!showEdit)
  }

  const hideShowEdit = () =>{
      setShowEdit(false)
  }

  let content = <h3>{book.title}</h3>
  if(showEdit){
    content = <BookEdit books={book} onSubmit={hideShowEdit} /> 
  }

  return (
    <div className='book-show'>
      <img alt='books'
      src = {`https://picsum.photos/seed/${book._id}/300/200`}/>
      <div>{content}</div>
      <div className='actions'>
         <button className='edit' onClick={handleEditClick}>edit</button>
         <button className='delete' onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  )
}
                                 
export default BookShow