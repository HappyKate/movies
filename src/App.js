import React, { useState, useEffect } from "react";
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
        <Film setElement={setElement} key={el.id} element={el} />
      ))}
      {element && (
        <div className="card">
          <p>{element.year}</p>
        </div>
      )}
      {element && <div onClick={() => setElement(null)}>Закрыть</div>}
    </div>
  );
}

export default App;
