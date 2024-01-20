import { useState, useEffect, Suspense, useTransition } from "react";
import style from "./MovieList.module.css";
import { tmdbAxios } from "../api/axiosConfig";
import MovieCard from "./UI/MovieCard";
import Slider from "./UI/Slider";

export default function MovieList({ title, path }) {
  const [movieList, setMovieList] = useState([]);
  const [isPending, startTransition] = useTransition();

  /**
   * Fetch movies and send results
   * @param {url} path
   * @returns {Array} movies
   */

  useEffect(() => {
    async function fetchMovies(path) {
      const response = await tmdbAxios.get(path, {
        params: {
          page: 1,
        },
      });
      const { results } = response.data;

      startTransition(() => {
        setMovieList(results);
      });
    }
    fetchMovies(path);

  }, [path, title]);

  return (
    <section className={style["movie-list"]} aria-label={title}>
      <div className={style["title-wrapper"]}>
        <h3 className={style["title-large"]}>{title}</h3>
      </div>

      {
        movieList.length === 0 && <h4>Not found {title}</h4>
      }

      {/* Todo add Suspence to slider innner  */}
      <Slider>
        {movieList &&
          movieList.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
      </Slider>
    </section>
  );
}
