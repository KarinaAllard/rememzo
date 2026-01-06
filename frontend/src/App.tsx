import { RouterProvider } from "react-router"
import { router } from "./Router"
import { ToastProvider } from "./context/ToastContext"
import { useResetGuestOnLogin } from "./hooks/useResetGuestOnLogin";


function App() {
    useResetGuestOnLogin();

  return (
    <>
      <ToastProvider>
        <RouterProvider router={router}></RouterProvider>
      </ToastProvider>
    </>
  )
}

export default App
