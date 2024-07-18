import style from "./SearchMoviesPage.module.css";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useState, useEffect, Suspense, useTransition, lazy } from "react";
import { tmdbAxios } from "../api/axiosConfig";

import Container from "../components/UI/Container";

// lazy loading components
const GridList = lazy(() => import("../components/UI/GridList"));
const MovieCard = lazy(() => import("../components/UI/MovieCard"));

export async function SearchPageloader({ request }) {
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

export function SearchMoviesPage() {
  const response = useLoaderData();
  const { results } = response.data;
  const [SearchMovies, setSearchMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const [queryText, setQueryText] = useState("");
  const query = searchParams.get("query");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setSearchMovies(results);
      setQueryText(query);
    });
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
          <Suspense fallback={<h2>LOading list ...</h2>}>
            <GridList>
              {SearchMovies &&
                SearchMovies.map((movie, index) => {
                  if (!movie.poster_path) return;
                  return (
                    <Suspense key={index} fallback={<h2>LOading card...</h2>}>
                      <MovieCard key={index} movie={movie} />
                    </Suspense>
                  );
                })}
            </GridList>
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
