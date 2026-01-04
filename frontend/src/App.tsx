import { RouterProvider } from "react-router"
import { router } from "./Router"
import { ToastProvider } from "./context/ToastContext"


function App() {

  return (
    <>
      <ToastProvider>
        <RouterProvider router={router}></RouterProvider>
      </ToastProvider>
    </>
  )
}

export default App
