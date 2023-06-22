import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { selectAuthState, setPending } from "app/auth/auth";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { signup } from "../../components/Forgin/components/blogUtils";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const history = useHistory();
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuthState);

  const user = auth.user;
  const token = auth.token;
  const pending = auth.pending;
  const url = auth.BASE_API_URL;

  const [message, setMessage] = useState();
  const [userState, setUserState] = useState({
    username: "",
    email: "",
    password: "",
    // confirm_password: "",
    bio: "",
    photo: "v1687457552/media/profile/default.jpg",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(userState);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(setPending(true));

    const formData = new FormData();
    formData.append("username", userState.username);
    formData.append("email", userState.email);
    formData.append("password", userState.password);
    formData.append("photo", userState.photo);
    formData.append("bio", userState.bio);

    const response = await signup(url, formData);
    const data = await response.json();

    if (response.status === 200) {
      history.push("/login");
    } else {
      setMessage(data.detail);
    }
    dispatch(setPending(false));
  };


  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🎉"
        heading="Sign up"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit} >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                type="text"
                name="username"
                value={userState.username}
                onChange={handleChange}
                placeholder="username"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                name="email"
                value={userState.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input name="password" value={userState.password} onChange={handleChange} type="password" className="mt-1" />

            </label>
            <ButtonPrimary loading={pending} type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
