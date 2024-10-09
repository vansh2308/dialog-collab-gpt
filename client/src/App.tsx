
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/themeProvider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";



export default function App({ }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    let user = JSON.parse(window.localStorage.getItem('user') || '{}')

    dispatch(setUser(user))
    navigate(`/${user._id}`)
  }, [])




  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId="450573825188-knimn3ieiu2k9cp8bjpe4p835glbvpkt.apps.googleusercontent.com">
        <div className="w-screen h-screen overflow-hidden dark">
          <Outlet />
        </div>
      </GoogleOAuthProvider>
    </ThemeProvider>
  )
}