import React, { useState, useEffect, Fragment } from "react";
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
  const [ratingDropdown, setRatingDropdown] = useState(false);
  const toggleRatingDropdown = () => setRatingDropdown(el => !el);
  const [ratingSort, setRatingSort] = useState("up");
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
    if (ratingSort === "down") return b.rating - a.rating;
    return a.rating - b.rating;
  };
  return (
    <div className="container">
      <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
        <div className="row">
          <div className="col text-center mt-3 md-3">
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
          <div className="col text-center mt-3 md-3">
            <ButtonDropdown
              isOpen={ratingDropdown}
              toggle={toggleRatingDropdown}
            >
              <DropdownToggle caret>Сортировка по рейтингу</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setRatingSort("up")}>
                  {ratingSort === "up" && "✓ "}По возрастанию
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => setRatingSort("down")}>
                  {ratingSort === "down" && "✓ "}По убыванию
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </div>
      {years.map(year => (
        <Fragment key={year}>
          <div className="row">
            <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
              <div className="card  mt-3 md-3">
                <div className="card-body">
                  <h6 key={year} className="card-title text-center">
                    {year}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {list
            .filter(el => el.year === year)
            .sort(sortRating)
            .map(el => (
              <div key={el.id} onClick={() => setElement(el)} className="row">
                <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3">
                  <Film element={el} />
                </div>
              </div>
            ))}
        </Fragment>
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
