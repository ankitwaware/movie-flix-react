import { useEffect } from "react";
import MovieCard from "./UI/MovieCard";
import style from "./MovieList.module.css";
import { useState } from "react";
import { tmdbAxios } from "../api/axiosConfig";
import Slider from "./UI/Slider";

// eslint-disable-next-line react/prop-types
export default function MovieList({ title, path }) {
  const [movieList, setMovieList] = useState([]);

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
      setMovieList(results);
    }
    fetchMovies(path);
  }, [path]);

  return (
    <section className={style["movie-list"]} aria-label={title}>
      <div className={style["title-wrapper"]}>
        <h3 className={style["title-large"]}>{title}</h3>
      </div>

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
