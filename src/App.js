import React, { useEffect } from 'react'
import { useState } from 'react'
import BookCreate from './components/BookCreate'
import './index.css'
import BookList from './components/BookList'
import axios from 'axios'

function App() {
    const [books,setBooks] = useState([])

    const fetchBook = async()=>{
      const responce = await axios.get('htttp://localhost:3002/books')
      setBooks(responce.data)
    }

    useEffect(()=>{
      fetchBook()
    },[])

    const deleteBookById = (id) =>{
      const updateBook = books.filter((book)=>{
        return book.id !== id;
      })
      setBooks(updateBook)
    }


    const createBook = async(title) => {
      const responce = await axios.post('http://localhost:3002/books',{
        title
      })
        const updatedarr = [
            ...books,
            responce.data
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