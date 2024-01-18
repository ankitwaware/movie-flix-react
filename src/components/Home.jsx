import Container from "./UI/Container";
import Herobanner from "../components/Herobanner";
import MovieList from "../components/MovieList";

export default function Home() {
  return (
    <Container>
      <Herobanner />

      <MovieList title={"Upcoming Movies"} path="movie/upcoming" />

      <MovieList title={"Weekly Trending Movies"} path="trending/movie/week" />

      <MovieList title={"Top Rated Movies"} path="movie/top_rated" />
    </Container>
  );
}
