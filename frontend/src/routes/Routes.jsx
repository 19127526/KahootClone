import {Route, Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";
import Authenticate from "../guards/AuthenticateRoutes";

const HomePageLazy = React.lazy(() => import("../pages/home/HomePage"));
const LoginPageLazy = React.lazy(() => import("../pages/login/LoginPage"))
const RegisterPageLazy = React.lazy(() => import("../pages/register/RegisterPage"))
const ProfilePageLazy = React.lazy(() => import("../pages/profile/ProfilePage"))
const ListGroupPageLazy = React.lazy(() => import("../pages/group/ListGroupPage"))
const GroupDetailPageLazy = React.lazy(() => import("../pages/group/GroupDetailPage"))

const RoutesPage = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <HomePageLazy/>{" "}
          </React.Suspense>
        }
      />
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <HomePageLazy/>{" "}
          </React.Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <LoginPageLazy/>{" "}
          </React.Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <RegisterPageLazy/>{" "}
          </React.Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate>
              <ProfilePageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />
      <Route
        path="/group"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate>
              <ListGroupPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />

      <Route
        path="/group/detail"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate>
              <GroupDetailPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default RoutesPage;
