import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export function RootPage() {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </Suspense>
  );
}
