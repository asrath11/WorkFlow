import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
