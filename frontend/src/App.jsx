
import {RouterProvider} from "react-router"
import { router } from "./AppRoutes"
import "./features/shared/global.scss"

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
