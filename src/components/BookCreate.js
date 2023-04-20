import React from 'react'
import { useState , useContext} from 'react'
import BooksContext from '../context/books'

function BookCreate({onCreate}) {
    const{createBook} = useContext(BooksContext)

    const [title, setTitle] = useState('')
    const handleChange = (e) =>{
        setTitle(e.target.value)
        

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        createBook(title)
        setTitle('')
    }
  return (
    <div className='book-create'>
        <h3>Add a Book</h3>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input className='input' value={title} onChange={handleChange}/>
            <button className='button'>
                Create!
            </button>
        </form>
    </div>
  )
}

export default BookCreate