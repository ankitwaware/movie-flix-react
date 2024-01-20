import { Suspense, lazy, useEffect, useState, useTransition } from "react";
import style from "./MoviesPage.module.css";
import { tmdbAxios } from "../../api/axiosConfig";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { genreId_Name } from "../../store/atoms";
import { languageObject } from "../../api/keys";

import Container from "../UI/Container";
// lazy loading components
const GridList = lazy(() => import("../UI/GridList"));
const MovieCard = lazy(() => import("../UI/MovieCard"));

export default function MoviesPage() {
  const response = useLoaderData();
  const { results, total_pages } = response.data;
  const genreid_name = useRecoilValue(genreId_Name);
  const [SearchParams] = useSearchParams();

  const [SearchMovies, setSearchMovies] = useState([]);
  const [currentPage, setcurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

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
  document.title = `${ResultFor} Movie-flix`;

  useEffect(() => {
    startTransition(() => {
      setSearchMovies(results);
      setTotalPages(total_pages);
    });
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
    startTransition(() => {
      setSearchMovies((prev) => [...prev, ...results]);
    });
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
              {
                /* todo add sus eleme for movie card */
              }
              return (
                <Suspense key={index} fallback={<h2>LOading Card ...</h2>}>
                  <MovieCard key={index} movie={movie} />
                </Suspense>
              );
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
