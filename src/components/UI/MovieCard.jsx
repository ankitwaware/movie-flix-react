/* eslint-disable react/prop-types */
import style from "./MovieCard.module.css";
import { imageBaseURL } from "../../api/keys";
import startImageSrc from "../../assets/star.png";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { poster_path, title, vote_average, release_date, id } = movie;

  return (
    <div className={style["movie-card"]}>
      <figure className={`${style["poster-box"]} ${style["card-banner"]}`}>
        <img
          src={`${imageBaseURL}w342${poster_path}`}
          alt={title}
          className={style["img-cover"]}
          loading="lazy"
        />
      </figure>

      <h4 className={style["title"]}>{title}</h4>

      <div className={style["meta-list"]}>
        <div className={style["meta-item"]}>
          <img
            src={startImageSrc}
            width="20"
            height="20"
            loading="lazy"
            alt="rating"
          />
          <span className={style["span"]}>{vote_average.toFixed(1)}</span>
        </div>

        <div className={style["card-badge"]}>{release_date?.split("-")[0]}</div>
      </div>

      <Link to={`/detail/movie/${id}`} className={style["card-btn"]} />
    </div>
  );
}
