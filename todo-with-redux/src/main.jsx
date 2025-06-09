import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './layouts/Home.jsx'
import DonateUs from './layouts/donateUs.jsx'
import LogIn from './layouts/LogIn.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {index:true, element:<Home/>},
      {path:"donate-us", element:<DonateUs/>},
      {path:"log-in", element:<LogIn/>},
    ],
  },
]);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>,
)
