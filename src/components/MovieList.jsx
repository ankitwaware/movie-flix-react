import { useEffect } from "react";
import MovieCard from "./MovieCard";
import style from "./MovieList.module.css";
import { useState } from "react";
import { tmdbAxios } from "../api/axiosConfig";

// eslint-disable-next-line react/prop-types
export default function MovieList({ title, path }) {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function fetchMovies(path) {
      const response = await tmdbAxios.get(path, {
        params: {
          page: 1,
        },
      });
      const { results } = response.data;
      setMovieList(results);
    }
    fetchMovies(path);
  }, [path]);

  return (
    <section className={style["movie-list"]} aria-label={title}>
      <div className={style["title-wrapper"]}>
        <h3 className={style["title-large"]}>{title}</h3>
      </div>

      <div className={style["slider-list"]}>
        <div className={style["slider-inner"]}>
          {movieList &&
            movieList.map((movie, index) => {
              return <MovieCard key={index} movie={movie} />;
            })}
        </div>
      </div>
    </section>
  );
}
