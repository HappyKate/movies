import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./App.css";
import Film from "./components/film";
import { fetchMovies } from "./api/movies";

function App() {
  const [list, setList] = useState([]);
  const [element, setElement] = useState(null);
  const [yearsDropdown, setYearsDropdown] = useState(false);
  const toggleYearsDropdown = () => setYearsDropdown(el => !el);
  const [yearsSort, setYearsSort] = useState("up");

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
  const sortNumber = (a, b) => {
    if (yearsSort === "down") return b - a;
    return a - b;
  };
  const years = [...new Set(list.map(el => el.year))].sort(sortNumber);
  const sortRating = (a, b) => {
    return a.rating - b.rating;
  };

  return (
    <div className="container">
      <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
        <ButtonDropdown isOpen={yearsDropdown} toggle={toggleYearsDropdown}>
          <DropdownToggle caret>Сортировка по годам</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setYearsSort("up")}>
              {yearsSort === "up" && "✓ "}По возрастанию
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => setYearsSort("down")}>
              {yearsSort === "down" && "✓ "}По убыванию
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      {years.map(year => (
        <>
          <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
            <div className="card  mt-3 md-3">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h6 key={year} className="card-title text-center">
                      {year}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {list
            .filter(el => el.year === year)
            .sort(sortRating)
            .map(el => (
              <div onClick={() => setElement(el)} className="row">
                <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
                  <Film key={el.id} element={el} />
                </div>
              </div>
            ))}
        </>
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
