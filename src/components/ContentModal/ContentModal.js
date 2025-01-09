import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContentModal.css";

export default function ContentModal({ children, media_type, id }) {
  const [content, setContent] = useState();
  const [savedMovieId, setSavedMovieId] = useState(null);
  const [saved, setSaved] = useState("");
  const fetchData = async () => {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=d310343`
    );
    setContent(data);
  };

  useEffect(() => {
    fetchData();
    const savedMovie = localStorage.getItem("savedMovies");

    if (savedMovie) {
      const movieData = JSON.parse(savedMovie);
    }
    // eslint-disable-next-line
  }, []);

  const handleSaveToLocalStorage = () => {
    if (content) {
      const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

      // If the movie is already saved, remove it
      if (savedMovies.some((movie) => movie.imdbID === content.imdbID)) {
        const updatedMovies = savedMovies.filter(
          (movie) => movie && movie.imdbID !== content.imdbID
        );

        localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
        alert("Movie removed from saved list!");
      } else {
        // If the movie is not saved, add it
        savedMovies.push(content);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        alert("Movie saved successfully!");
      }

      // Update the savedMovieId to reflect the current movie ID
      setSavedMovieId(content.imdbID);
    }
  };

  return (
    <div>
      <div type="button" className="media" onClick={handleSaveToLocalStorage}>
        {children}
      </div>
    </div>
  );
}
