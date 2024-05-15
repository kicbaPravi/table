import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import appRoutes from './routes';

const router = createBrowserRouter(appRoutes);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <BrowserRouter />
    </>
  );
};

export default App;
