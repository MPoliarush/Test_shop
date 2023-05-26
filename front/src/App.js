import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Root from './Root';
import Header from './components/Header'
import Catalog from './components/Catalog';
import Order from './components/Order';
import History from './components/History';

function App() {

  const router = createBrowserRouter([
    {path:'/', 
    element: <Root />, 
    children:[
      {path:'/', element:< Catalog/>},
      {path:'/order', element:< Order/>},
      {path:'/history', element:< History/>},
      
    ]},
  ])

  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  );
}

export default App;
