import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<Signup />} />
    </Route>
  )
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
