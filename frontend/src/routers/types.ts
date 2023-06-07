import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/archive/:slug"?: {};
  "/archive-video/:slug"?: {};
  "/archive-audio/:slug"?: {};
  //
  "/home-header-style2"?: {};
  "/home-header-style2-logedin"?: {};
  //
  "/author/:slug"?: {};
  "/author-v2/:slug"?: {};
  //
  "/single/:slug"?: {};
  "/single-template-2/:slug"?: {};
  "/single-template-3/:slug"?: {};
  "/single-sidebar/:slug"?: {};
  "/single-2-sidebar/:slug"?: {};
  "/single-3-sidebar/:slug"?: {};
  "/single-4-sidebar/:slug"?: {};
  "/single-gallery/:slug"?: {};
  "/single-audio/:slug"?: {};
  "/single-video/:slug"?: {};
  //
  "/transcriptor"?: {};
  //
  "/search"?: {};
  "/search-v2"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/dashboard"?: {};
  "/subscription"?: {};
  //
  "/theme-cyan-blueGrey"?: {};
  "/theme-blue-blueGrey"?: {};
  "/theme-purple-blueGrey"?: {};
  "/theme-teal-blueGrey"?: {};
  "/theme-blueGrey-blueGrey"?: {};
  "/theme-red-warmGrey"?: {};
  "/theme-cyan-warmGrey"?: {};
  "/theme-blue-coolGrey"?: {};
  "/theme-lightBlue-coolGrey"?: {};
  "/theme-pink-coolGrey"?: {};
  "/theme-green-grey"?: {};
  "/theme-yellow-grey"?: {};
  "/theme-orange-grey"?: {};
  "/theme-fuchsia-blueGrey"?: {};
  //
  "/home-demo-1"?: {};
  "/home-demo-2"?: {};
  "/home-demo-3"?: {};
  "/home-demo-4"?: {};
  "/home-demo-5"?: {};
  "/home-demo-6"?: {};
  "/home-demo-7"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
