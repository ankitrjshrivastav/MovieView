import SingleContent from "../../components/SingleContent/SingleContent";

import React, { useEffect, useState } from "react";

export default function SavedMoviesPage() {
  const [savedMovies, setSavedMovies] = useState([]);

  // Fetch saved movies from localStorage
  useEffect(() => {
    const savedMoviesFromStorage =
      JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMovies(savedMoviesFromStorage);
  }, [savedMovies]);
  return (
    <div className="saved-movies-page">
      {savedMovies.length === 0 ? (
        <p>No saved movies found!</p>
      ) : (
        <div>
          <span className="pageTitle">🔥🔥Enjoy your Saved Movie🔥🔥</span>

          <div className="trending">
            {savedMovies &&
              savedMovies.map((c) => (
                <SingleContent
                  key={c.imdbID}
                  id={c.imdbID}
                  poster={c.Poster}
                  title={c.Title || c.name}
                  date={c.first_air_date || c.Year}
                  media_type={c.Type}
                  vote_average={c.vote_average}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
