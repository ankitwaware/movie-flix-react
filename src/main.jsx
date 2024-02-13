import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./browserRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={browserRouter} />
    </RecoilRoot>
  </React.StrictMode>
);
