import axios from "axios";

export const fetchMovies = () =>
  axios({
    url: "https://s3-eu-west-1.amazonaws.com/sequeniatesttask/films.json",
    headers: {
      "Content-type": "application/json"
    },
    method: "GET"
  }).then(response => {
    console.log("fetchMovies", response);
    return response.data;
  });
