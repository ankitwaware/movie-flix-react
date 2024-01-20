import { Suspense, lazy } from "react";

import Container from "../UI/Container";
// lazy loading components
const Herobanner = lazy(() => import("../Herobanner"));
const MovieList = lazy(() => import("../MovieList"));

import { homePageSections } from "../../api/keys";

export default function Home() {
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
