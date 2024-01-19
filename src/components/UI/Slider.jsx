import style from "./Slider.module.css";

export default function Slider({ children, className }) {
  return (
    <div className={`${style["slider-list"]} ${className}`}>
      <div className={`${style["slider-inner"]} ${className}`}>{children}</div>
    </div>
  );
}
