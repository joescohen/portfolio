import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { ANGARSProject } from './pages/ANGARSProject'
import { VoyageProject } from './pages/VoyageProject'
import { GarraProject } from './pages/GarraProject'
import { SystemValidatorProject } from './pages/SystemValidatorProject'
import { SepalProject } from './pages/SepalProject'
import { CEIProject } from './pages/CEIProject'
import { Journey } from './pages/Journey'
import { NotFound } from './pages/NotFound'

function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects/angars', element: <ANGARSProject /> },
      { path: '/projects/voyage', element: <VoyageProject /> },
      { path: '/projects/garra', element: <GarraProject /> },
      { path: '/projects/claude-skills', element: <SystemValidatorProject /> },
      { path: '/projects/sepal', element: <SepalProject /> },
      { path: '/projects/cei', element: <CEIProject /> },
      { path: '/journey', element: <Journey /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
