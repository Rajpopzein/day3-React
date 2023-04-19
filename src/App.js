import React, { useEffect } from 'react'
import { useState } from 'react'
import BookCreate from './components/BookCreate'
import './index.css'
import BookList from './components/BookList'
import axios from 'axios'

function App() {
    const [deleteres,setDeleteres] = useState()
    const [books,setBooks] = useState([])
    const [dat,setDat] = useState(null)

    useEffect(()=>{
      setTimeout(()=>{
        fetchBook()
      },5000)
    },[])

    const fetchBook = async()=>{
      const responce = await axios.get('https://bookdhowapi.onrender.com/user/all')
      setBooks(await responce.data.data)
    }

    const deleteBookById = (id) =>{
      console.log('clicked')
      const updateBook = books.filter(async(book)=>{
        if(book.id === id){
          console.log(book)
          await axios.delete(`https://bookdhowapi.onrender.com/user/${id}`).then((res)=>{
            fetchBook()
          })
          // setDeleteres(res)
        }
        return book.id !== id
      })
      setBooks(updateBook)
    }

    useEffect(()=>{
      setTimeout(()=>{
        fetchBook()
      },5000)
       
     
    },[dat])

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

    const updateBook = async(id, newTitle) =>{
       const updateBooks =  books !== undefined && books.map(async(book)=>{
          if(book.id === id){
            await axios.put(`https://bookdhowapi.onrender.com/user/${id}`,{"title":newTitle}).then((res)=>{
              fetchBook()
            })
            return{...book, title:newTitle}
          }
          return book;
      });
      setBooks(...books, updateBooks) 
      
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