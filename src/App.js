import React from 'react'
import { useState } from 'react'
import BookCreate from './components/BookCreate'
import './index.css'
import BookList from './components/BookList'

function App() {
    const [books,setBooks] = useState([])

    const deleteBookById = (id) =>{
      const updateBook = books.filter((book)=>{
        return book.id !== id;
      })
      setBooks(updateBook)
    }

    const createBook = (title) => {
      const id = Math.random() * 9999
        console.log('need to add book with :', title)
        const updatedarr = [
            ...books,
            {id, title}
        ]
        setBooks(updatedarr)
        
    }

    const updateBook = (id, newTitle) =>{
      const updateBooks = books.map((book)=>{
          if(book.id === id){
            return{...book, title:newTitle}
          }

          return book;
      });

      setBooks(updateBooks) 
    }
    
  return (
    <div className='app'>
      <h1>Reading list</h1>
        <BookList onEdit={updateBook} books={books} onDelete= {deleteBookById} />
        <BookCreate onCreate = {createBook} />
    </div>
  )
}

export default App