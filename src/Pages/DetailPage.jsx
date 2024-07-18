import style from "./DetailPage.module.css";
import { useLoaderData } from "react-router-dom";
import { Suspense, lazy } from "react";
import { imageBaseURL } from "../api/data";
import startImageSrc from "../assets/star.png";
import { tmdbAxios } from "../api/axiosConfig";
import Container from "../components/UI/Container";

export async function DetailPageloader({ params }) {
  const { movieId } = params;

  const response = await tmdbAxios.get(`movie/${movieId}`, {
    params: {
      append_to_response: "casts,videos,releases,images",
    },
  });

  return response;
}

// lazy component
const MovieList = lazy(() => import("../components/MovieList"));
const Slider = lazy(() => import("../components/UI/Slider"));
const VideoCard = lazy(() => import("../components/UI/VideoCard"));

// todo add sus ele to detail page
export function DetailPage() {
  const response = useLoaderData();

  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    genres,
    id,
    releases: {
      countries: [{ certification }],
    },
    overview,
    casts: { cast, crew },
    videos: { results: videos },
  } = response.data;

  const YouTubeVideos = filterVideos(videos);

  function getGenres(genreList) {
    const newGenreList = genreList.map((value) => value.name);

    return newGenreList.join(", ");
  }

  function getCastes(castList) {
    const newCastList = [];

    for (let i = 0, len = castList.length; i < len && i < 10; i++) {
      const { name } = castList[i];
      newCastList.push(name);
    }

    return newCastList.join(", ");
  }

  function getDirectors(crewList) {
    const directors = crewList.filter(({ job }) => job === "Director");

    const directorsList = directors.map((value) => value.name);

    return directorsList.join(", ");
  }

  // return all trailers and teasers as array
  function filterVideos(videoList) {
    return videoList.filter(
      ({ type, site }) =>
        (type === "Trailer" || type === "Teaser") && site === "YouTube"
    );
  }

  document.title = `${title} Movie-flix`;

  // todo fix backdrop image

  return (
    <Container>
      <div className={style["movie-detail"]}>
        <div
          className={style["backdrop-image"]}
          style={{
            backgroundImage: `url(${imageBaseURL}original${
              backdrop_path || poster_path
            })`,
          }}
        ></div>

        <Suspense fallback={<h2>Image loading...</h2>}>
          <figure className={`${style["poster-box"]} ${style["movie-poster"]}`}>
            <img
              src={`${imageBaseURL}w342${poster_path}`}
              alt={title}
              className={style["img-cover"]}
            />
          </figure>
        </Suspense>

        <Suspense fallback={<h2>detail content loading...</h2>}>
          <div className={style["detail-box"]}>
            <div className={style["detail-content"]}>
              <h1 className={style["heading"]}>{title}</h1>

              <div className={style["meta-list"]}>
                <div className={style["meta-item"]}>
                  <img
                    src={startImageSrc}
                    width="20"
                    height="20"
                    alt="rating"
                  />
                </div>

                <span className={style["span"]}>{vote_average.toFixed(1)}</span>

                <div className={style["separator"]}></div>

                <div className={style["meta-item"]}>{runtime}m</div>

                <div className={style["separator"]}></div>

                <div className={style["meta-item"]}>
                  {release_date.split("-")[0]}
                </div>

                <div className={`${style["meta-item"]} ${style["card-badge"]}`}>
                  {certification}
                </div>
              </div>

              <p className={style["genre"]}>{getGenres(genres)}</p>

              <p className={style["overview"]}>{overview}</p>

              <ul className={style["detail-list"]}>
                <div className={style["list-item"]}>
                  <p className={style["list-name"]}>Starring</p>

                  <p>{getCastes(cast)}</p>
                </div>

                <div className={style["list-item"]}>
                  <p className={style["list-name"]}>Directed By</p>

                  <p>{getDirectors(crew)}</p>
                </div>
              </ul>
            </div>

            <div className={style["title-wrapper"]}>
              <h3 className={style["title-large"]}>Trailers and Clips</h3>
            </div>

            <Slider>
              {YouTubeVideos.length === 0 && (
                <h3>No Trailers and Clips found</h3>
              )}
              {YouTubeVideos.map((video, index) => {
                return <VideoCard key={index} video={video} />;
              })}
            </Slider>
          </div>
        </Suspense>
      </div>

      <Suspense fallback={<h2>Suggestion loading...</h2>}>
        <MovieList
          title={"You May Also Like"}
          path={`movie/${id}/recommendations`}
        />
      </Suspense>
    </Container>
  );
}
