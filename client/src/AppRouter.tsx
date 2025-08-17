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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<DashboardLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='employee' element={<Employee />} />
      </Route>
    </Route>
  )
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
