import React, { useEffect } from 'react'
import { useState } from 'react'
import BookCreate from './components/BookCreate'
import './index.css'
import BookList from './components/BookList'
import axios from 'axios'

function App() {
    const [deleteres,setDeleteres] = useState()
    const [books,setBooks] = useState([])

    useEffect(()=>{
      fetchBook() 
    },[])

    const fetchBook = async()=>{
      const responce = await axios.get('https://bookdhowapi.onrender.com/user/all')
      // console.log(responce.data.data)
      setBooks(await responce.data.data)
    }

    const deleteBookById = (id) =>{
      console.log('clicked')
      const updateBook = books.filter(async(book)=>{
        if(book.id == id){
          console.log(book)
          const res = await axios.delete(`https://bookdhowapi.onrender.com/user/${id}`)
          setDeleteres(res)
        }
        return book.id !== id
      })
      setBooks(updateBook)
    }

    useEffect(()=>{
      fetchBook()
    },[deleteres])

    const createBook = async(title) => {
      const responce = await axios.post('https://bookdhowapi.onrender.com/user',{
        title
      })
        const  updatedarr = [
            ...books,
           await responce.data.data
        ]
        setBooks(updatedarr)
    }

    const updateBook = (id, newTitle) =>{
      const updateBooks = books !== undefined && books.map((book)=>{
          if(book.id === id){
            return{...book, title:newTitle}
          }

          return book;
      });

      setBooks(...books,updateBooks) 
    }
  return (
    <div className='app'>
      <h1>Reading list</h1>
        <BookList onEdit={updateBook} books={books} onDelete= {deleteBookById}  />
        <BookCreate onCreate = {createBook} />
    </div>
  )
}

export default App