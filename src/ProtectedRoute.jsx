import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to='/' />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
