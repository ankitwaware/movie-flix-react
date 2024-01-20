import style from "./VideoCard.module.css";

export default function VideoCard({ video }) {
  const { key, name } = video;

  console.log(video);

  return (
    <div className={style["video-card"]}>
      <iframe
        width="500"
        height="294"
        src={`https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0`}
        frameBorder="0"
        allowFullScreen="1"
        title={name}
        className={style["img-cover"]}
        loading="lazy"
      />
    </div>
  );
}
