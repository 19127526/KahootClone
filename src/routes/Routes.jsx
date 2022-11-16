import { Route, Routes } from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";

const HomePageLazy = React.lazy(() => import("../pages/home/HomePage"));


const RoutesPage = () =>{
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<Loading />}>
            {" "}
            <HomePageLazy />{" "}
          </React.Suspense>
        }
      />
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loading />}>
            {" "}
            <HomePageLazy />{" "}
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default RoutesPage;
