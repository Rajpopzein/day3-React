import React from 'react'
import { useState } from 'react'
import BookEdit from './BookEdit'

function BookShow({book, onDelete , onEdit}) {

  const [showEdit ,setShowEdit] = useState(false)

  const handleDeleteClick = () =>{
    onDelete(book.id)
  }

  const handleEditClick = () =>{
      setShowEdit(!showEdit)
  }

  const hideShowEdit = (id, newTitle) =>{
      setShowEdit(false)
      onEdit(id, newTitle)
  }

  let content = <h3>{book.title}</h3>
  if(showEdit){
    content = <BookEdit books={book} onSubmit={hideShowEdit} /> 
  }

  return (
    <div className='book-show'>
      <img alt='books'
      src = {`https://picsum.photos/seed/${book.id}/300/200`}/>
      <div>{content}</div>
      <div className='actions'>
         <button className='edit' onClick={handleEditClick}>edit</button>
         <button className='delete' onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  )
}
                                 
export default BookShow