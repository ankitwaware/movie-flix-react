import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import {
  Sidebarloader,
  DetailPageloader,
  MoviePageloader,
  SearchPageloader,
} from "./loader.js";

const HomePage = lazy(() => import("./components/Pages/HomePage.jsx"));
const MoviesPage = lazy(() => import("./components/Pages/MoviesPage"));
const DetailPage = lazy(() => import("./components/Pages/DetailPage.jsx"));
const SearchMoviesPage = lazy(() =>
  import("./components/Pages/SearchMoviesPage.jsx")
);

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <App />,
    loader: Sidebarloader,
    errorElement: <div>Error Page</div>,
    children: [
      {
        id: "home",
        index: true,
        element: <HomePage />,
      },
      {
        id: "detail",
        path: "/detail/movie/:movieId",
        element: <DetailPage />,
        loader: DetailPageloader,
      },
      {
        id: "movieList",
        path: "/movieList",
        element: <MoviesPage />,
        loader: MoviePageloader,
      },
      {
        id: "searchMovies",
        path: "/search/movie",
        element: <SearchMoviesPage />,
        loader: SearchPageloader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
