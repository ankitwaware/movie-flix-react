import styles from "./Sidebar.module.css";
import { Suspense, useEffect, useTransition } from "react";
import tmdbLogoSrc from "../assets/tmdb-logos.png";
import { menuOpenAtom, genreId_Name } from "../store/atoms";
import { useRecoilState } from "recoil";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { languageObject } from "../api/keys";
import { tmdbAxios } from "../api/axiosConfig";

export async function Sidebarloader() {
  const response = await tmdbAxios.get("genre/movie/list", {
    params: { language: "en" },
  });
  const { genres } = response.data;
  return genres;
}

export default function Sidebar() {
  const [genreList, setGenreList] = useRecoilState(genreId_Name);
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenAtom);
  const genres = useRouteLoaderData("root");
  const languageArray = Object.entries(languageObject);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setGenreList(genres);
    });
  }, [genres, setGenreList]);

  return (
    <nav
      className={`${styles["sidebar"]} ${isMenuOpen && styles["active"]}`}
      onClick={() => setIsMenuOpen((prev) => !prev)}
    >
      <div className={styles["sidebar-inner"]}>
        <div className={styles["sidebar-list"]}>
          <p className={styles["title"]}>Genre</p>
          {genreList &&
            genreList.map((genre, index) => {
              const { id, name } = genre;
              return (
                /* todo close menu when click on link */
                /* todo add suspense element to genername */
                <Suspense key={id} fallback={<h3>Loading ...</h3>}>
                  <NavLink
                    key={index}
                    to={`/movieList?genreId=${id}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className={`${styles["sidebar-link"]}`}
                  >
                    {name}
                  </NavLink>
                </Suspense>
              );
            })}
        </div>
        <div className={styles["sidebar-list"]}>
          <p className={styles["title"]}>Language</p>

          {languageArray.map((value, index) => {
            const [shortLang, language] = value;
            /* todo add suspense element to genername */
            return (
              <Suspense key={index} fallback={<h3>Loading ...</h3>}>
                <NavLink
                  key={index}
                  to={`/movieList?lang=${shortLang}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={styles["sidebar-link"]}
                >
                  {language}
                </NavLink>
              </Suspense>
            );
          })}
        </div>

        <div className={styles["sidebar-footer"]}>
          {/* todo add twitter link */}
          <p className={styles["copyright"]}>
            Copyright 2024 <a href="#twitter-a">Ankit</a>
          </p>
          <img
            src={tmdbLogoSrc}
            width="130"
            height="17"
            alt="the movie database logo"
          />
        </div>
      </div>
    </nav>
  );
}


