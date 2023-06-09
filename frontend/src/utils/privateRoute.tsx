import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setUser, setToken, setErrMsg, setPending } from "app/auth/auth";

// @ts-ignore
function PrivateRoute({ children, ...rest }) {

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);

  const user = auth.user;
  const token = auth.token;
  const pending = auth.pending;
  const BASE_API_URL = auth.BASE_API_URL;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }
            }
          />
        )
      }
    />
  );
}

export default PrivateRoute;

