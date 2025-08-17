import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/dashBoard';
import Employee from './pages/dashBoard/components/Employee';
import DashboardLayout from './pages/dashBoard/DashBoardLayout';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/authProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='employee' element={<Employee />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
