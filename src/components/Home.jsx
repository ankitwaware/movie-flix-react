import Container from "./UI/Container";
import Herobanner from "../components/Herobanner";
import MovieList from "../components/MovieList";
import { homePageSections } from "../api/keys";

export default function Home() {
  return (
    <Container>
      <Herobanner />

      {homePageSections.map((value, index) => {
        const { path, title } = value;
        return <MovieList key={index} title={title} path={path} />;
      })}
    </Container>
  );
}
