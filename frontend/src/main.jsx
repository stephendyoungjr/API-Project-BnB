
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import * as sessionActions from './store/session'
import SpotDetailsPage from "./components/SpotDetailsPage";

import ManageSpotsPage from "./components/ManageSpotsPage";
import CreateSpotPage from "./components/SpotFormPage/CreateSpotPage";
import EditSpotPage from "./components/SpotFormPage/EditSpotPage";


const Layout = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)})
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet /> }
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'spots/:spotId/edit',
        element: <EditSpotPage />
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetailsPage />,
      },
      {
        path: 'spots/new',
        element: <CreateSpotPage/>
      },
      {
        path: 'spots/current',
        element: <ManageSpotsPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;