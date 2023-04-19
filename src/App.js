import React, { useEffect } from "react";
import { useState } from "react";
import BookCreate from "./components/BookCreate";
import "./index.css";
import BookList from "./components/BookList";
import axios from "axios";
import { Dna } from "react-loader-spinner";
import { Col, Divider, Row } from "antd";

function App() {
  const [deleteres, setDeleteres] = useState(false);
  const [books, setBooks] = useState([]);
  const [dat, setDat] = useState(false);

  useEffect(() => {
    fetchBook();
    setDat(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDat(false);
    }, 7000);
  }, [dat]);

  useEffect(() => {
    setTimeout(() => {
      setDeleteres(false);
    }, 6600);
  }, [deleteres]);

  const fetchBook = async () => {
    const responce = await axios.get(
      "https://bookdhowapi.onrender.com/user/all"
    );
    setBooks(await responce.data.data);
  };

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
    var responce = await axios.put(`http://localhost:4000/user/${id}`, {
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
  // useEffect(()=>{
  //   document.body.style.overflow="hidden";
  //   return()=>(document.body.style.overflow="scroll");
  // })
  return (
    <>
      <div className="app">
        <h1>Reading list</h1>
        {deleteres === true || dat === true ? (
          <Row justify="space-around" align="middle">
            <Col lg={6}>
              <Dna
                visible={true}
                height="230"
                width="350"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </Col>
          </Row>
        ) : (
          <div>
            <BookList
              onEdit={updateBook}
              books={books}
              onDelete={deleteBookById}
            />
          </div>
        )}
        <BookCreate onCreate={createBook} />
      </div>
    </>
  );
}

export default App;
