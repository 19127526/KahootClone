import {Route, Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";
import Authenticate from "../guards/AuthenticateRoutes";
import {
  HOME_URI, MEMBER_URI, PRESENTATION_PRIVATE,
  PRESENTATION_PUBLIC,
  PRESENTATION_URI,
  PUBLIC_GROUP_URI,
  REDIRECT_URI,
  VERIFY_INVITE_URI
} from "../configs/url";
import Oauth2Page from "../authors/oauth2/Oauth2Page";
import SignUpPage from "../pages/register/SignUpPage";
import RegisterPage from "../pages/register/RegisterPage";

const HomePageLazy = React.lazy(() => import("../pages/home/HomePage"));
const LoginPageLazy = React.lazy(() => import("../pages/login/LoginPage"))
const RegisterPageLazy = React.lazy(() => import("../pages/register/SignUpPage"))
const ProfilePageLazy = React.lazy(() => import("../pages/profile/ProfilePage"))
const ListGroupPageLazy = React.lazy(() => import("../pages/group/ListGroupPage"))
const GroupDetailPageLazy = React.lazy(() => import("../pages/group/GroupDetailPage"))
const InvitePageLazy = React.lazy(() => import("../authors/invite/InvitePage"))
const PresentationPageLazy = React.lazy(() => import("../pages/presentation/Presentation"))
const PublicGroupPageLazy = React.lazy(() => import("../pages/group/public/PublicGroupPage"))
const PublicGroupDetailPageLazy = React.lazy(() => import("../pages/group/public/PublicGroupDetailPage"))
const MemberPageLazy =React.lazy(()=>import("../pages/member/MemberPage"))
const RoutesPage = () => {
  return (
    <Routes>
      <Route
        path={HOME_URI}
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
        path="/register1"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <RegisterPage/>
          </React.Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={"/profile"}>
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
            <Authenticate path={"/group"}>
              <ListGroupPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />
      <Route
        path={"/group/detail/:name"}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={"/group/detail/:name"}>
              <GroupDetailPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />
      <Route
        path={"/group/detail"}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            {/*<Authenticate path={"/group/detail"}>*/}
              <GroupDetailPageLazy/>
          {/*  </Authenticate>*/}
          </React.Suspense>
        }
      />
      <Route
        path={REDIRECT_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Oauth2Page/>
          </React.Suspense>
        }
      />
      <Route
        path={VERIFY_INVITE_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={VERIFY_INVITE_URI}>
              <InvitePageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />
      <Route
          path={PRESENTATION_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <PresentationPageLazy/>
          </React.Suspense>
        }
      />
      <Route
        path={PUBLIC_GROUP_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <PublicGroupPageLazy/>
          </React.Suspense>
        }
      />
      <Route
        path={PRESENTATION_PUBLIC}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <PublicGroupDetailPageLazy/>
          </React.Suspense>
        }
      />
      <Route
        path={PRESENTATION_PRIVATE}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <PublicGroupDetailPageLazy/>
          </React.Suspense>
        }
      />
      <Route
        path={MEMBER_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <MemberPageLazy/>
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default RoutesPage;
