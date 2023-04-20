import React, { useEffect ,useContext} from "react";
import BookCreate from "./components/BookCreate";
import "./index.css";
import BookList from "./components/BookList";
import { Dna } from "react-loader-spinner";
import { Col, Row } from "antd";
import BooksContext from "./context/books";

function App() {
  const {fetchBook,dat,setDat,deleteres,setDeleteres} = useContext(BooksContext)
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
    }, 7000);
  }, [deleteres]);

  
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
            />
          </div>
        )}
        <BookCreate/>
      </div>
    </>
  );
}

export default App;
