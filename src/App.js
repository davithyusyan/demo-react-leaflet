import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import OpenMap from './pages/openMap';
import './App.css';
import Locations from "./components/Locations";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="btn-container">
        <Link className='btn-primary btn' to="map">OPEN MAP</Link>
        <Locations />
      </div>
    ),
  },
  {
    path: "map",
    element: <OpenMap />
  }
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
