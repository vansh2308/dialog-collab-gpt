
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/themeProvider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/userSlice";
import { RootState } from "./app/store";



export default function App({ }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.value)


  useEffect(( ) => {
    if(user){
      navigate(`/${user?._id}`)
    }
  }, [user])



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