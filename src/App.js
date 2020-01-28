import React from "react";
import './App.css';
import Films from "./data/films";
import movies from "./data/movies";


export default class App extends React.Component {
    render() {

        return (
            <div className="App">
                {movies.map(el => <Films{...el}/>)}
                <Films/>
            </div>
        );
    }
}
