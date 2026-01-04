import { RouterProvider } from "react-router"
import { router } from "./Router"
import { ToastProvider } from "./context/ToastContext"
import { UserProvider } from "./context/UserContext"


function App() {

  return (
    <>
    <UserProvider>
      <ToastProvider>
        <RouterProvider router={router}></RouterProvider>
      </ToastProvider>
    </UserProvider>
    </>
  )
}

export default App
