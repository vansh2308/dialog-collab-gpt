
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/themeProvider";



export default function App({ }) {
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