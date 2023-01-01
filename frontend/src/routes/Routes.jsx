import {Route, Routes} from "react-router-dom";
import React from "react";
import Loading from "../components/loading/LoadingComponent";
import Authenticate from "../guards/AuthenticateRoutes";
import {
    FORGOT_PASSWORD_URI,
    HOME_URI,
    MEMBER_URI,
    PRESENTATION_EDIT_URI,
    PRESENTATION_PRIVATE,
    GROUP_CREATED_DETAIL,
    PRESENTATION_SEE_URI,
    PRESENTATION_SHOW_URI,
    CREATED_GROUP_URI,
    REDIRECT_URI,
    VERIFY_INVITE_URI, JOINED_GROUP_URI, GROUP_JOINED_DETAIL, PRESENTATION_URI, PRESENTATION_SEE_URI_CO_OWNER
} from "../configs/url";
import RegisterPage from "../pages/register/RegisterPage";

const HomePageLazy = React.lazy(() => import("../pages/home/HomePage"));
const LoginPageLazy = React.lazy(() => import("../pages/login/LoginPage"))
const RegisterPageLazy = React.lazy(() => import("../pages/register/SignUpPage"))
const ProfilePageLazy = React.lazy(() => import("../pages/profile/ProfilePage"))
const ListGroupPageLazy = React.lazy(() => import("../pages/group/ListGroupPage"))
const GroupDetailPageLazy = React.lazy(() => import("../pages/group/GroupDetailPage"))
const InvitePageLazy = React.lazy(() => import("../authors/invite/InvitePage"))
const PresentationMainPageLazy = React.lazy(() => import("../pages/presentation/MainPresentation"))
const PresentationSeeGuestPageLazy = React.lazy(() => import("../pages/presentation/PresentationUser"))
const PresentationEditPageLazy = React.lazy(() => import("../pages/presentation/Presentation"))
const PublicGroupPageLazy = React.lazy(() => import("../pages/group/public/PublicGroupPage"))
const PublicGroupDetailPageLazy = React.lazy(() => import("../pages/group/public/PublicGroupDetailPage"))
const MemberPageLazy = React.lazy(() => import("../pages/member/MemberPage"))
const ForgotPageLazy = React.lazy(() => import("../pages/forgotpassword/ForgotPasswordPage"))
const ErrorPageLazy=React.lazy(()=>import("../pages/error/ErrorPage"))
const PresentationListLazy=React.lazy(()=>import("../pages/presentation/PresentationList"))
const PresentationSeeCoOwnerLazy=React.lazy(()=>import("../pages/presentation/PresentationCoOwner"))

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
        path={PRESENTATION_EDIT_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={"/"}>
              <PresentationEditPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />

      <Route
        path={PRESENTATION_SHOW_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={"/"}>
              <PresentationMainPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />

      <Route
        path={PRESENTATION_SEE_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={"/"}>
              <PresentationSeeGuestPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />

        <Route
            path={PRESENTATION_SEE_URI_CO_OWNER}
            element={
                <React.Suspense fallback={<Loading/>}>
                    {" "}
                    <Authenticate path={"/"}>
                        <PresentationSeeCoOwnerLazy/>
                    </Authenticate>
                </React.Suspense>
            }
        />



        <Route
        path={CREATED_GROUP_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={CREATED_GROUP_URI}>
              <PublicGroupPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />

        <Route
            path={JOINED_GROUP_URI}
            element={
                <React.Suspense fallback={<Loading/>}>
                    {" "}
                    <Authenticate path={JOINED_GROUP_URI}>
                        <PublicGroupPageLazy/>
                    </Authenticate>
                </React.Suspense>
            }
        />

      <Route
        path={GROUP_CREATED_DETAIL + "/:groupId"}
        element={

          <React.Suspense fallback={<Loading/>}>
            {" "}
            <Authenticate path={GROUP_CREATED_DETAIL + "/:groupId"}>
              <PublicGroupDetailPageLazy/>
            </Authenticate>
          </React.Suspense>
        }
      />

        <Route
            path={GROUP_JOINED_DETAIL + "/:groupId"}
            element={

                <React.Suspense fallback={<Loading/>}>
                    {" "}
                    <Authenticate path={GROUP_JOINED_DETAIL + "/:groupId"}>
                        <PublicGroupDetailPageLazy/>
                    </Authenticate>
                </React.Suspense>
            }
        />
      {/*<Route*/}
      {/*  path={PRESENTATION_PRIVATE + "/:groupId"}*/}
      {/*  element={*/}
      {/*    <React.Suspense fallback={<Loading/>}>*/}
      {/*      {" "}*/}
      {/*      <Authenticate path={PRESENTATION_PRIVATE}>*/}
      {/*        <PublicGroupDetailPageLazy/>*/}
      {/*      </Authenticate>*/}
      {/*    </React.Suspense>*/}
      {/*  }*/}
      {/*/>*/}
      <Route
        path={MEMBER_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <MemberPageLazy/>
          </React.Suspense>
        }
      />
      <Route
        path={FORGOT_PASSWORD_URI}
        element={
          <React.Suspense fallback={<Loading/>}>
            {" "}
            <ForgotPageLazy/>
          </React.Suspense>
        }
      />

        <Route
            path={PRESENTATION_URI}
            element={
              <Authenticate path={PRESENTATION_URI}>
                <React.Suspense fallback={<Loading/>}>
                    {" "}
                    <PresentationListLazy/>
                </React.Suspense>
              </Authenticate>
            }
        />



      <Route path="*" element={<React.Suspense fallback={<Loading/>} >  <ErrorPageLazy/> </React.Suspense>}/>
    </Routes>
  );
}

export default RoutesPage;
