import React, { useState } from 'react';
import { Button, Input, Spin} from 'antd';
import 'antd/dist/antd.css'
import '../src/App.css';

const Movies = () => {
    const [movies, setMovie] = useState({});
    const [errors, setErros] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showSpinner, setSpinner] = useState(false);

    async function fetchData() { 
        setShowData(true);
        setSpinner(true);
        const movie_name = document.getElementById("movie_name").value;
        if(movie_name) {
            const res = await fetch(`http://www.omdbapi.com/?t=${movie_name}&apikey=fc2ffe8a`)
            res  
                .json()  
                .then(res => setMovie(res))
                .catch(err => setErros(err));
            setSpinner(false);
        }
        else {
            setSpinner(false);
            setShowData(false);
            setMovie({});
         }
    };

   const renderTags = () => {
        return (
            <div className="content-body">
                <img alt="example" src={movies.Poster} />
                <h2> Title: {movies.Title} </h2>
                <h2> Year: {movies.Year} </h2>
                <h2> Genre: {movies.Genre} </h2>
                <h2>Imdb ratings {movies.imdbRating}</h2>
                <h2> Actors: {movies.Actors} </h2> 
                <h2>Plot: {movies.Plot}</h2>
            </div>
        );
    };

    return (
        <div>
            <h1 className="heading">Movie Engine</h1>
            <Input 
                id="movie_name"
                className="movie-input"
                placeholder="Movie Name..."
                style={{ width: "14rem", marginLeft: "1rem" }}
            />
            <Button style={{ marginLeft: "5px" }} onClick={fetchData}>
                Search
            </Button>
            <Spin spinning={showSpinner} size="large">
                { showData === true && renderTags() } 
            </Spin>
        </div>
    );
};

export default Movies;