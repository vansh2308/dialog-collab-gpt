import Landing from "./pages/Landing";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";



export default function App({ }) {
  return (
    <GoogleOAuthProvider clientId="450573825188-knimn3ieiu2k9cp8bjpe4p835glbvpkt.apps.googleusercontent.com">
      <div className="w-screen h-screen overflow-hidden">
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  )
}