import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import MovieResults, {
  loder as resultLoader,
} from "./components/MovieResults.jsx";
import { loader as GenresLoader } from "./components/Sidebar.jsx";
import SearchMovies, {
  loader as SearchLoader,
} from "./components/SearchMovies.jsx";
import DetailPage, {
  loader as detailLoader,
} from "./components/DetailsPage.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <App />,
    loader: GenresLoader,
    children: [
      {
        id: "home",
        index: true,
        element: <Home />,
      },
      {
        id: "detail",
        path: "/detail/movie/:movieId",
        element: <DetailPage />,
        loader: detailLoader,
      },
      {
        id: "movieList",
        path: "/movieList",
        element: <MovieResults />,
        loader: resultLoader,
      },
      {
        id: "searchMovies",
        path: "/search/movie",
        element: <SearchMovies />,
        loader: SearchLoader,
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
