import { Suspense } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Header />
        <main>
          <Sidebar />
          <Outlet />
        </main>
      </Suspense>
    </>
  );
}
