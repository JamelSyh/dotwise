import { BrowserRouter, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Page } from "./types";
import { useAppSelector } from "app/hooks";
import PrivateRoute from "utils/privateRoute";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingle from "containers/PageSingle/PageSingle";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import PageDashboard from "containers/PageDashboard/PageDashboard";
// import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import PageHome from "containers/PageHome/PageHome";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
// import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
// import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";
import PageTranscriptor from "containers/PageTranscriptor/PageTranscriptor";
import PageTranslator from "containers/PageTranslator/PageTranslator";
import PageLookup from "containers/PageLookup/PageLookup"
import { selectAuthState } from "app/auth/auth";
import NotifPopup from "components/notifPopup/NotifPopup";


export const privatePages: Page[] = [
  { path: "/dashboard", component: PageDashboard },
  // { path: "/subscription", component: PageSubcription },
]

export const publicPages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },

  { path: "/home-header-style2-logedin", exact: true, component: PageHome },

  { path: "/transcriptor", component: PageTranscriptor },
  { path: "/translator", component: PageTranslator },
  { path: "/lookup", component: PageLookup },
  { path: "/archive/:slug", component: PageArchive },
  { path: "/archive-audio/:slug", component: PageArchiveAudio },
  { path: "/author/:slug", component: PageAuthor },
  {
    path: "/blog/:slug",
    component: PageSingle,
  },
  // {
  //   path: "/single-gallery/:slug",
  //   component: PageSingleGallery,
  // },
  // {
  //   path: "/single-audio/:slug",
  //   component: PageSingleAudio,
  // },
  // {
  //   path: "/single-video/:slug",
  //   component: PageSingleVideo,
  // },

  { path: "/search", component: PageSearch },
  { path: "/about", component: PageAbout },
  { path: "/contact", component: PageContact },
  { path: "/page404", component: Page404 },
];
const publicPagesOnly = [
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/forgot-pass", component: PageForgotPass },
]

const Routes = () => {


  const auth = useAppSelector(selectAuthState);
  const history = useHistory();


  return (
    <BrowserRouter
      basename={
        import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/rtl" : "/"
      }
    >
      <ScrollToTop />
      <HeaderContainer />
      <NotifPopup />
      <Switch>
        {publicPages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              // @ts-ignore
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        {privatePages.map(({ component, path, exact }) => (
          <PrivateRoute key={path} exact={!!exact} path={path}>
            <Route
              key={path}
              // @ts-ignore
              component={component}
              exact={!!exact}
              path={path}
            />
          </PrivateRoute>
        ))}

        {publicPagesOnly.map(({ component, path }) => (
          !auth.user ?
            <Route key={path} component={component} path={path} />
            :
            <Redirect key={path} from={path} to={"/"} />
        ))}
        <Route component={Page404} />

      </Switch>
      <Footer />
      {/* MEDIA */}

      {/* //is Safari on an apple touch-screen device */}
      {isSafariBrowser() ? (
        <MediaRunningContainerForSafari />
      ) : (
        <MediaRunningContainer />
      )}
    </BrowserRouter>
  );
};

export default Routes;
