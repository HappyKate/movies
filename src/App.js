import React from "react";
import './App.css';
import Films from "./data/films";
import movies from "./data/movies";


export default class App extends React.Component {
    render() {

        return (
            <div className="container">
                {movies.map(el => <Films{...el}/>)}
                <Films/>
            </div>
        );
    }
}
