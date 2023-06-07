import React from "react";
import NcLink from "components/NcLink/NcLink";

const DashboardRoot = () => {
  return (
    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <span className="block text-lg mb-3">
        👋 Hello <strong>admin</strong>, (not <strong>admin</strong>?{" "}
        <NcLink to="#">Sign out</NcLink>)
      </span>
      From your account dashboard you can view your dashboard, manage your
      {` `}
      <NcLink to="#">Posts</NcLink>, <NcLink to="#">Subscription</NcLink>,
      <NcLink to="#">edit your password and profile</NcLink>
    </div>
  );
};

export default DashboardRoot;
