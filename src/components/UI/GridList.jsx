import style from "./GridList.module.css";

export default function GridList({ children }) {
  return <div className={style["grid-list"]}>{children}</div>;
}
