import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";
const apiKey = "d310343";
const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const fetchTrending = async (year) => {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&y=${year}&page=${page}`
    );
    return data.Search;
  };

  const fetchMoviesByYearRanges = async (ranges) => {
    let combinedResults = [];
    for (const range of ranges) {
      const [startYear, endYear] = range;
      for (let year = startYear; year <= endYear; year++) {
        const movies = await fetchTrending(year);
        combinedResults = [...combinedResults, ...movies];
      }
    }
    return combinedResults;
  };
  const fetchTrendingfunc = async () => {
    const parseYearRanges = (yearRangeString) => {
      return yearRangeString.split(",").map((range) => {
        const [start, end] = range.split("-").map((year) => parseInt(year, 10));
        return [start, end];
      });
    };
    if (genreforURL.length === 0) {
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&page=${page}`;
      const { data } = await axios.get(url);
      setContent(data.Search);
    } else {
      const yearRanges = parseYearRanges(genreforURL);
      const movies = await fetchMoviesByYearRanges(yearRanges);
      setContent(movies);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrendingfunc();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle"> 😎 Movies 😜 </span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
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
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
