
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Home from "./pages/Home"
import Write from "./pages/Write"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import "./style.scss"
import  {ApolloProvider} from "@apollo/client"
import { client } from './graphql/querries';
import { useEffect } from "react"
import { useCurrentUser } from "./graphql/hooks"


function App() {

  const Layout = () => {
    const { currentUser, error, loading } = useCurrentUser()
    return (
      <>
        <Navbar currentUser={currentUser}/>
        <Outlet context={currentUser}/>
        <Footer />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/post/:id",
          element: <Single />
        },
        {
          path: "/write",
          element: <Write />
        }, 
        {
          path: "*",
          element: <Home />
        }
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },

  ])

 
  return (
    <ApolloProvider client={client}>
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
    </ApolloProvider>
  )
}



export default App
