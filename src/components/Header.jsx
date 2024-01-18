import styles from "./Header.module.css";
// image srces
import logoSrc from "../assets/logo.png";
import searchIconSrc from "../assets/search.png";
import closeIconSrc from "../assets/close.png";
import menuIconSrc from "../assets/menu.png";
import menuCloseIconSrc from "../assets/menu-close.png";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuOpenAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const [isSeraching, setIsSeraching] = useState(false);
  const navigate = useNavigate();
  // atom
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenAtom);
  const [inputValue, setInputValue] = useState("");

  function SearchToggleHandler() {
    setIsMenuOpen(false);
    setSearchActive((prev) => !prev);
  }

  useEffect(() => {
    if (!inputValue.trim()) {
      setIsSeraching(false);
      return;
    }

    setIsSeraching(true);
    // todo send resuest to movie list  after userstop typing use debounce
    let timer = setTimeout(() => {
      // send request to specified path with query
      navigate(`/search/movie?query=${inputValue}`);
      setIsSeraching(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, navigate]);

  return (
    <header className={styles["header"]}>
      <a href="./index.html" className={styles["logo"]}>
        <img src={logoSrc} width="140" height="32" alt="Movie-flix home" />
      </a>

      <div
        className={`${styles["search-box"]} ${
          searchActive && styles["search-box-active"]
        }`}
      >
        <div
          className={`${styles["search-wrapper"]} ${
            isSeraching && styles["searching"]
          }`}
          data-search-wrapper
        >
          <input
            type="text"
            name="search"
            aria-label="search movies"
            placeholder="Search any movies..."
            className={styles["search-field"]}
            autoComplete="off"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <img
            src={searchIconSrc}
            width="24"
            height="24"
            alt="search"
            className={styles["leading-icon"]}
          />
        </div>

        <button
          className={styles["search-btn"]}
          onClick={SearchToggleHandler}
          data-search-toggler
        >
          <img
            src={closeIconSrc}
            width="24"
            height="24"
            alt="close search box"
          />
        </button>
      </div>

      <button className={styles["search-btn"]} onClick={SearchToggleHandler}>
        <img src={searchIconSrc} width="24" height="24" alt="open search box" />
      </button>

      <button
        className={styles["menu-btn"]}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <img
          src={isMenuOpen ? menuCloseIconSrc : menuIconSrc}
          width="24"
          height="24"
          alt="openClose menu"
        />
      </button>
    </header>
  );
}
