import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import "./App.css"
import { ToastContainer } from "react-toastify"
import { useState } from "react"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import Error from "./components/Error"


const App = () => {
  const status = localStorage.getItem("isLoading");

  const [isLoading , setisLoading] = useState( status === "true");
  const router = createBrowserRouter([
       {
        path:"/",
        element:<Home isLoading={isLoading} setisLoading={setisLoading} />
       },
       {
        path:"/register",
        element:<Register isLoading={isLoading} setisLoading={setisLoading} />
       },
       {
        path:"/login",
        element:<Login isLoading={isLoading} setisLoading={setisLoading}/>
       },
       {
        path:"/forgot-password",
        element:<ForgotPassword />
       },
       {
        path:"/reset-password/:token",
        element:<ResetPassword />
       }
       ,
       {
        path:"/*",
        element:<Error />
       }
  ])
  return (
    <>

    <RouterProvider router={router}>
      
    </RouterProvider>
    <ToastContainer   position="top-right" autoClose={3000}/>
    </>
  )
}

export default App