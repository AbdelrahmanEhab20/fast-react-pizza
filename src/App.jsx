import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./ui/Home"
import Error from "./ui/Error"
import AppLayout from "./ui/AppLayout"
import Menu from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order from "./features/order/Order"

// loader function to fetch menu data
import { loaderMenuData } from "./features/menu/data/getData"
import { loaderOrderData } from "./features/order/data/getData"

// Prepare the router with the routes
const router = createBrowserRouter([{
  element: <AppLayout />,
  children: [{
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
    loader: loaderMenuData,
    errorElement: <Error />,

  },
  {
    path: "/cart",
    element: <Cart />
  }, {
    path: "/order/:orderId",
    element: <Order />,
    loader: loaderOrderData,
    errorElement: <Error />,

  },
  {
    path: "/order/new",
    element: <CreateOrder />
  }]
}
])

function App() {
  return <RouterProvider router={router} />

}

export default App
