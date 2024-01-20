import { useEffect, useState } from "react";
import style from "./Herobanner.module.css";
import { tmdbAxios } from "../api/axiosConfig";
import { imageBaseURL } from "../api/keys";
import playCircleSrc from "../assets/play_circle.png";
import { genreId_Name } from "../store/atoms";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

export default function Herobanner() {
  const [movieList, setMovieList] = useState([]);
  const [curSliderControl, setCurSliderControl] = useState(0);
  const genreId_NameList = useRecoilValue(genreId_Name);

  function controlItemHandler(e) {
    const target = e.target;
    const controlNumber = Number(target.dataset["item"]);
    setCurSliderControl(controlNumber);
  }

  /**
   * convert Geners Ids [25,45,9456] to Geners Name ["Horror","Mystery","Thriller"]
   * @param {Array} genre_ids Array of genres Ex. [25,45,9456]
   * @returns {Array} Array of genres Names Ex. ["Horror","Mystery","Thriller"]
   */
  function getGernreNames(genre_ids) {
    let genreNameList = [];
    for (const id of genre_ids) {
      const genreName = genreId_NameList.find((value) => value.id === id);
      if (genreName) genreNameList.push(genreName.name);
    }
    return genreNameList.join(", ");
  }


  useEffect(() => {
    async function fetchPopularMovies() {
      const response = await tmdbAxios.get("movie/popular", {
        params: { page: "1" },
      });
      const { results } = response.data;
      setMovieList(results);
    }

    fetchPopularMovies();
  }, []);

  return (
    <section className={style["banner"]} aria-label="Popular Movies">
      <div className={style["banner-slider"]}>
        {movieList &&
          movieList.map((movie, index) => {
            const {
              backdrop_path,
              title,
              release_date,
              genre_ids,
              overview,
              vote_average,
              id,
            } = movie;

            return (
              <div
                key={index}
                className={`${style["slider-item"]} ${
                  index === curSliderControl && style["active"]
                }`}
              >
                <img
                  src={`${imageBaseURL}w1280${backdrop_path}`}
                  alt={title}
                  className={style["img-cover"]}
                  loading={index === 0 ? "eager" : "lazy"}
                />

                <div className={style["banner-content"]}>
                  <h2 className={style["heading"]}>{title}</h2>

                  <div className={style["meta-list"]}>
                    <div className={style["meta-item"]}>
                      {release_date.split("-")[0]}
                    </div>
                    <div
                      className={`${style["meta-item"]} ${style["card-badge"]}`}
                    >
                      {vote_average.toFixed(1)}
                    </div>
                  </div>

                  <p className={style["genre"]}>{getGernreNames(genre_ids)}</p>

                  <p className={style["banner-text"]}>{overview}</p>

                  <Link to={`/detail/movie/${id}`} className={style["btn"]}>
                    <img
                      src={playCircleSrc}
                      width="24"
                      height="24"
                      aria-hidden="true"
                      alt="play circle"
                    />
                    <span className={style["span"]}>Watch Now</span>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      <div className={style["slider-control"]}>
        <div className={style["control-inner"]}>
          {movieList &&
            movieList.map((movie, index) => {
              const { title, poster_path } = movie;

              return (
                <button
                  key={index}
                  className={`${style["poster-box"]} ${style["slider-item"]} 
                  ${index === curSliderControl && style["active"]}
                  `}
                >
                  <img
                    src={`${imageBaseURL}w154${poster_path}`}
                    alt={`Slide to ${title}`}
                    loading="lazy"
                    draggable="false"
                    data-item={index}
                    onClick={controlItemHandler}
                    className={style["img-cover"]}
                  />
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}
