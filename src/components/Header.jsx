import styles from "./Header.module.css";
// image srces
import logoSrc from "../assets/logo_crop.jpg";
import searchIconSrc from "../assets/search.png";
import closeIconSrc from "../assets/close.png";
import menuIconSrc from "../assets/menu.png";
import menuCloseIconSrc from "../assets/menu-close.png";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuOpenAtom } from "../store/atoms";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const [isSeraching, setIsSeraching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // atom
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenAtom);

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
      <Link to={"/"}  className={styles["logo"]}>
        <img src={logoSrc} alt="Movie-flix home" />
      </Link>

      <div
        className={`${styles["search-box"]} ${
          searchActive && styles["active"]
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
            alt="search"
            className={styles["leading-icon"]}
          />
        </div>

        <button className={styles["search-btn"]} onClick={SearchToggleHandler}>
          <img src={closeIconSrc} alt="close search box" />
        </button>
      </div>

      <button className={styles["search-btn"]} onClick={SearchToggleHandler}>
        <img src={searchIconSrc} alt="open search box" />
      </button>

      <button
        className={styles["menu-btn"]}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <img
          src={isMenuOpen ? menuCloseIconSrc : menuIconSrc}
          alt="openClose menu"
        />
      </button>
    </header>
  );
}
