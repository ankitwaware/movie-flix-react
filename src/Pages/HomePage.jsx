import { Suspense, lazy } from "react";

import Container from "../components/UI/Container";
// lazy loading components
const Herobanner = lazy(() => import("../components/Herobanner"));
const MovieList = lazy(() => import("../components/MovieList"));

import { homePageSections } from "../api/data";

export function HomePage() {
  return (
    <Container>
      {/*todo sus comp. for hero banner */}
      <Suspense fallback={<h2>Banner loading ...</h2>}>
        <Herobanner />
      </Suspense>

      {/*todo sus comp. for movie List */}
      {homePageSections.map((value, index) => {
        const { path, title } = value;
        return (
          <Suspense key={index} fallback={<h2>List loading...</h2>}>
            <MovieList key={index} title={title} path={path} />
          </Suspense>
        );
      })}
    </Container>
  );
}
