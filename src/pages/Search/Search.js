import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const apiKey = "d310343"; // Your OMDb API key
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          searchText
        )}&type=movie&page=${page}`
      );
      setContent(data.Search);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page, searchText]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
      </ThemeProvider>
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
        {searchText && !content && <h2>No Movies Found</h2>}
      </div>
    </div>
  );
};

export default Search;
