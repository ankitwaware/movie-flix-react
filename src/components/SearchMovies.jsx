import style from "./SearchMovies.module.css";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { tmdbAxios } from "../api/axiosConfig";
import MovieCard from "./UI/MovieCard";
import { useState, useEffect } from "react";
import Container from "./UI/Container";
import GridList from "./UI/GridList";

export default function SearchMovies() {
  const response = useLoaderData();
  const { results } = response.data;
  const [SearchMovies, setSearchMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const [queryText, setQueryText] = useState("");
  const query = searchParams.get("query");

  useEffect(() => {
    setSearchMovies(results);
    setQueryText(query);
  }, [results, searchParams, query]);

  
  return (
    <Container>
      <div className={style["search-model"]}>
        <p className={style["label"]}>Results for</p>

        {SearchMovies.length === 0 && (
          <h1 className={style["heading"]}>Not found {queryText}</h1>
        )}

        {SearchMovies.length > 0 && (
          <h1 className={style["heading"]}>{queryText}</h1>
        )}

        <div className={style["movie-list"]}>
          <GridList>
            {SearchMovies &&
              SearchMovies.map((movie, index) => {
                if (!movie.poster_path) return;
                return <MovieCard key={index} movie={movie} />;
              })}
          </GridList>
        </div>
      </div>
    </Container>
  );
}

export async function loader({ request }) {
  const queryParams = new URL(request.url).searchParams;
  const queryText = queryParams.get("query");
  const response = await tmdbAxios.get("search/movie", {
    params: {
      query: queryText,
      page: "1",
      include_adult: "false",
    },
  });

  return response;
}
