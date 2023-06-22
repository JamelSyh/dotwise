// @ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const RequireAuth = () => {

  const location = useLocation();
  const auth = useSelector(state => state.auth.auth);

  return (
    auth ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
