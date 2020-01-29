import React, { useState, useEffect } from "react";
import "./App.css";
import Film from "./components/film";
import { fetchMovies } from "./api/movies";

function App() {
  const [list, setList] = useState([]);

  const fetch = async () => {
    try {
      const data = await fetchMovies();
      setList(data.films);
    } catch (e) {
      console.log(e);
      alert('Api error');
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="container">
      {list.map(el => (
        <Film key={el.id} {...el} />
      ))}
    </div>
  );
}

export default App;
