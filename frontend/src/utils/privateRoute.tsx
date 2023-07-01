import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectAuthState } from "app/auth/auth";

// @ts-ignore
function PrivateRoute({ children, ...rest }) {

  const auth = useAppSelector(selectAuthState);

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

