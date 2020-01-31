import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./App.css";
import Film from "./components/film";
import { fetchMovies } from "./api/movies";

function App() {
  const [list, setList] = useState([]);
  const [element, setElement] = useState(null);

  const fetch = async () => {
    try {
      const data = await fetchMovies();
      setList(data.films);
    } catch (e) {
      console.log(e);
      alert("Api error");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="container">
      {list.map(el => (
        <div onClick={() => setElement(el)} className="row">
          <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
            <Film key={el.id} element={el} />
          </div>
        </div>
      ))}
      <Modal isOpen={!!element} toggle={() => setElement(null)}>
        <ModalHeader toggle={() => setElement(null)}>
          {element && <p> {element.localized_name}</p>}
        </ModalHeader>
        <ModalBody>
          {element && (
            <>
              <div className="row">
                <div className="col-md-6">
                  <img className="col" src={element.image_url} alt={"..."} />
                </div>
                <div className="col-md-6">
                  <p className="text-muted">{element.name}</p>
                  <p>Год: {element.year}</p>
                  <p>Рейтинг: {element.rating}</p>
                </div>
              </div>
              <p className="mt-4 md-4">{element.description}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setElement(null)}>
            Закрыть
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
