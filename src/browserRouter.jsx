import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Loaders
import { Sidebarloader } from "./components/Sidebar.jsx";
import { DetailPageloader } from "./Pages/DetailPage.jsx";
import { MoviePageloader } from "./Pages/MoviesPage.jsx";
import { SearchPageloader } from "./Pages/SearchMoviesPage.jsx";

// Pages
const RootPage = lazy(() => import("./Pages/RootPage.jsx"));
const HomePage = lazy(() => import("./Pages/HomePage.jsx"));
const DetailPage = lazy(() => import("./Pages/DetailPage.jsx"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage.jsx"));
const SearchMoviesPage = lazy(() => import("./Pages/SearchMoviesPage.jsx"));

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: RootPage,
    loader: Sidebarloader,
    errorElement: <div>Error Page</div>,
    children: [
      {
        id: "home",
        index: true,
        Component: HomePage,
      },
      {
        id: "detail",
        path: "/detail/movie/:movieId",
        loader: DetailPageloader,
        Component: DetailPage,
      },
      {
        id: "movieList",
        path: "/movieList",
        Component: MoviesPage,
        loader: MoviePageloader,
      },
      {
        id: "searchMovies",
        path: "/search/movie",
        Component: SearchMoviesPage,
        loader: SearchPageloader,
      },
    ],
  },
]);

export default router;
