import { useEffect, useState } from "react";
import MovieCard from "./UI/MovieCard";
import style from "./MovieResults.module.css";
import { tmdbAxios } from "../api/axiosConfig";
import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { genreId_Name } from "../store/atoms";
import { languageObject } from "../api/keys";
import Container from "./UI/Container";
import GridList from "./UI/GridList";

export default function MovieResults() {
  const response = useRouteLoaderData("movieList");
  const { results, total_pages } = response.data;
  const genreid_name = useRecoilValue(genreId_Name);
  const [SearchParams] = useSearchParams();

  const [SearchMovies, setSearchMovies] = useState([]);
  const [currentPage, setcurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function genername(genreId) {
    const genre = genreid_name.find((value) => value.id === Number(genreId));
    if (genre) return genre.name;
    return genre;
  }

  let ResultFor;
  if (SearchParams.has("genreId")) {
    ResultFor = genername(SearchParams.get("genreId"));
  }
  if (SearchParams.has("lang")) {
    const language = SearchParams.get("lang");
    ResultFor = languageObject[language];
  }

  /* set Header Title Tag */
  document.title = `${ResultFor} Movies - Tvflix`;

  useEffect(() => {
    setSearchMovies(results);
    setTotalPages(total_pages);
  }, [results, total_pages]);

  async function loadMoreHandler() {
    setIsLoading(true);
    setcurrentPage((prev) => prev + 1);
    const response = await tmdbAxios.get("discover/movie", {
      params: {
        page: currentPage,
        include_adult: "false",
        include_video: "false",
        sort_by: "popularity.desc",
        ...(SearchParams.has("genreId") && {
          with_genres: SearchParams.get("genreId"),
        }),
        ...(SearchParams.has("lang") && {
          with_original_language: SearchParams.get("lang"),
        }),
      },
    });
    const { results } = response.data;

    setIsLoading(false);
    setSearchMovies((prev) => [...prev, ...results]);
  }

  return (
    <Container>
      <section
        className={`${style["movie-list"]} ${style["genre-list"]}`}
        aria-label={`${ResultFor} Movies`}
      >
        <div className={style["title-wrapper"]}>
          <h1 className={style["heading"]}>All {ResultFor} Movies</h1>
        </div>

        <GridList>
          {SearchMovies &&
            SearchMovies.map((movie, index) => {
              if (!movie.poster_path) return;
              return <MovieCard key={index} movie={movie} />;
            })}
        </GridList>

        {currentPage <= totalPages && (
          <button
            className={`${style["btn"]} ${style["load-more"]} ${
              isLoading && style["loading"]
            }}`}
            onClick={loadMoreHandler}
          >
            Load More
          </button>
        )}
      </section>
    </Container>
  );
}

export async function loder({ request }) {
  const params = new URL(request.url).searchParams;

  const response = await tmdbAxios.get("discover/movie", {
    params: {
      page: "1",
      include_adult: "false",
      include_video: "false",
      sort_by: "popularity.desc",
      ...(params.has("genreId") && { with_genres: params.get("genreId") }),
      ...(params.has("lang") && { with_original_language: params.get("lang") }),
    },
  });
  return response;
}
