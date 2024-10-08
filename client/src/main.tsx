import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts';
import Landing from './pages/Landing.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import ChatBox from './pages/ChatBox.tsx'
import { FaMeteor } from 'react-icons/fa6'
import Chat from './pages/Chat.tsx'
import ProjectDetails from './pages/ProjectDetails.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/:userId/",
        element: <Home />,
        children: [
          {
            path: "",
            element: <ChatBox />,
            children: [
              {
                path: "",
                element: <FaMeteor className="text-[15rem] text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              },
              {
                path: ":chatId",
                element: <Chat />
              }
            ]
          },
          {
            path: "project/:projectId/",
            element: <ProjectDetails />
          }
        ]
      }

    ]
  },
]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

