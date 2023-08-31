import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import FetchData from "./views/Fetchdata";
import Currency from "./views/Currency";
import Capital from "./views/Capital";
import Language from "./views/Language";
import Navlink from "./views/Navlink";
import './App.css';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Navlink/>,
    children:[
      {
        index: true,
        element: <FetchData/>
      },
      {
        path: '/Currency',
        element: <Currency/>
      },
      {
        path: '/Capital',
        element: <Capital/>
      },
      {
        path: '/Language',
        element: <Language/>
      },
      
      {
        path: '#',
        element: <h1>PAGE NOT FOUND</h1>
      }
    ]
  },
]);



function App(){
  return(
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default App;
