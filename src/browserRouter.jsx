import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "./Pages/RootPage.jsx";
import { Sidebarloader } from "./components/Sidebar.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: RootPage,
    loader: Sidebarloader,
    ErrorBoundary: ErrorPage,
    children: [
      {
        id: "home",
        index: true,
        async lazy() {
          const { HomePage } = await import("./Pages/HomePage.jsx");
          return { Component: HomePage };
        },
        ErrorBoundary: ErrorPage,
      },
      {
        id: "detail",
        path: "/detail/movie/:movieId",
        async lazy() {
          const { DetailPage, DetailPageloader } = await import(
            "./Pages/DetailPage.jsx"
          );
          return { Component: DetailPage, loader: DetailPageloader };
        },
        ErrorBoundary: ErrorPage,
      },
      {
        id: "movieList",
        path: "/movieList",
        async lazy() {
          const { MoviesPage, MoviePageloader } = await import(
            "./Pages/MoviesPage.jsx"
          );
          return { Component: MoviesPage, loader: MoviePageloader };
        },
        ErrorBoundary: ErrorPage,
      },
      {
        id: "searchMovies",
        path: "/search/movie",
        async lazy() {
          const { SearchMoviesPage, SearchPageloader } = await import(
            "./Pages/SearchMoviesPage.jsx"
          );
          return { Component: SearchMoviesPage, loader: SearchPageloader };
        },
        ErrorBoundary: ErrorPage,
      },
    ],
  },
]);

export default router;
