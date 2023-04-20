import { createContext, useState,useCallback } from "react";
import axios from "axios";

const BooksContext = createContext()

function Provider({children}){
    const [books, setBooks] = useState([]);
    const [deleteres, setDeleteres] = useState(false);
    const [dat, setDat] = useState(false);

    const fetchBook = useCallback(async () => {
        const responce = await axios.get(
          "https://bookdhowapi.onrender.com/user/all"
        );
        setBooks(await responce.data.data);
      },[]);

      const deleteBookById = async (id) => {
        setDeleteres(true);
        await axios.delete(`https://bookdhowapi.onrender.com/user/${id}`);
        const updateBook = books.filter((book) => {
          return book.id !== id;
        });
        setBooks(updateBook);
      };
    
      const createBook = async (title) => {
        setDeleteres(true);
        const responce = await axios.post("https://bookdhowapi.onrender.com/user", {
          title,
        });
        const updatedarr = [...books, await responce.data.data];
        setBooks(updatedarr);
      };
    
      const updateBook = async (id, newTitle) => {
        setDeleteres(true);
        var responce = await axios.put(`https://bookdhowapi.onrender.com/user/${id}`, {
          title: newTitle,
        });
        const updateBooks = books.map((book) => {
          if (book.id === id) {
            return { ...book, ...responce.data.data };
          }
          return book;
        });
        setBooks(updateBooks);
      };
      
      const valueTOShare = {
        deleteBookById,
        createBook,
        fetchBook,
        dat,
        setDat,
        setDeleteres,
        deleteres,
        updateBook,
        books
      }
    
   
    return <BooksContext.Provider value={valueTOShare}>
        {children}
    </BooksContext.Provider>
}

export {Provider};
export default BooksContext  