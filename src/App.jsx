import './App.css'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },
    {
      path: '/main',
      element: <><Sidebar/><Main/></>,
    }
  ])

  return (
   <>
   <RouterProvider router={router} />
   {/* <Login/> */}
   {/* <Sidebar /> */}
   {/* <Main /> */}
   </>
  )
}

export default App
