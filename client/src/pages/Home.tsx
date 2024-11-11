import { RootState } from "@/app/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FaMeteor } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import { addChat } from "@/features/chatsSlice";
import { useState } from "react";
import ChatTile from "@/components/ChatTile";
import { addProject } from "@/features/projectsSlice";
import ProjectTile from "@/components/ProjectTile";
import { setUser } from "@/features/userSlice";
import useFetchUserChats from "@/app/hooks/useFetchUserChats";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import useFetchUserProjects from "@/app/hooks/useFetchUserProjects";

export default function Home() {
  const { allChats, loading } = useFetchUserChats();
  const { allProjects, projectsLoading } = useFetchUserProjects();

  const user = useSelector((state: RootState) => state.user.value);
  const [filterText, setFilterText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStartChat = async () => {
    let response = await axios.post("http://localhost:8000/api/v1/chat", {
      name: "Untitled Chat",
      userId: user?._id,
    });
    if (response.status == 201) {
      dispatch(addChat(response.data));
      navigate(`/${user?._id}/${response.data._id}`);
      setSidebarOpen(false);
    }
  };

  const handleCreateProject = async () => {
    let response = await axios.post("http://localhost:8000/api/v1/project", {
      name: "Untitled Project",
      userId: user?._id,
    });

    if (response.status == 201) {
      navigate(`/${user?._id}/project/${response.data._id}`);
      dispatch(addProject(response.data));
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/");
  };

  const handleSelectChat = (chatId) => {
    navigate(`/${user?._id}/${chatId}`);
    setSidebarOpen(false);
  };

  const handleSelectProject = (projectId) => {
    navigate(`/${user?._id}/project/${projectId}`);
    setSidebarOpen(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col text-card-foreground">
      <Menubar className="w-full bg-popover border-none rounded-none p-5 px-12 flex justify-between items-center h-[10vh]">
        <FaMeteor
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[2.5rem] text-popover-foreground cursor-pointer"
        />
        <MenubarMenu>
          <MenubarTrigger className="focus:bg-popover w-fit h-fit p-0 rounded-full">
            <Avatar>
              <AvatarImage src={user?.image} />
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Hey {user?.name} ! </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Settings</MenubarItem>
            <MenubarItem
              className="cursor-pointer text-destructive font-semibold hover:!text-destructive"
              onClick={handleLogout}
            >
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="h-[90vh] flex flex-col lg:flex-row">
        <div
          className={`bg-popover h-full w-full lg:w-1/4 fixed lg:static top-0 left-0 z-40 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:translate-none`}
        >
          <div className="px-4 lg:px-12 pt-6 gap-5 text-muted-foreground flex flex-col">
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-2xl text-popover-foreground lg:hidden"
              >
                <IoIosClose />
              </button>
            )}
            <Input
              type="text"
              placeholder="Browse projects/chats"
              className="focus:border-input focus:outline-none focus:text-white mb-4"
              onChange={(e) => setFilterText(e.target.value)}
            />

            <div className="flex justify-between items-center">
              <h4 className="font-semibold mt-3"> Projects </h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="h-min"
                    onClick={handleCreateProject}
                  >
                    <IoIosAddCircle className="text-xl text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-accent">
                    <p>Create new</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="max-h-[30vh] h-fit overflow-y-scroll text-center text-foreground text-xs mb-6">
              {projectsLoading ? (
                <>
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                </>
              ) : allProjects.length == 0 ? (
                <h4>No Project. Create one!</h4>
              ) : (
                allProjects
                  .filter((project) =>
                    project.name
                      .toLowerCase()
                      .includes(filterText.toLowerCase())
                  )
                  .map((project) => (
                    <ProjectTile
                      project={project}
                      userId={user?._id}
                      key={project._id}
                      onClick={() => handleSelectProject(project._id)}
                    />
                  ))
              )}
            </div>

            <div className="flex justify-between items-center mt-10">
              <h4 className="font-semibold"> Chats </h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="h-min" onClick={handleStartChat}>
                    <IoIosAddCircle className="text-xl text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-accent">
                    <p>Start new chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="max-h-[30vh] h-fit overflow-y-scroll text-center text-foreground text-xs mt-6">
              {loading ? (
                <>
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                  <Skeleton className="h-6 mt-4 w-full rounded-lg" />
                </>
              ) : allChats!.length == 0 ? (
                <h4>No Chats. Start one!</h4>
              ) : (
                allChats!
                  .filter((chat) =>
                    chat.name.toLowerCase().includes(filterText.toLowerCase())
                  )
                  .map((chat) => (
                    <ChatTile
                      name={chat.name}
                      chatId={chat._id}
                      userId={user?._id}
                      key={chat._id}
                      onClick={() => handleSelectChat(chat._id)}
                    />
                  ))
              )}
            </div>
          </div>
        </div>

        <div
          className={`w-full lg:w-3/4 h-full text-foreground bg-accent/30 ${
            sidebarOpen ? "hidden lg:block" : "block"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
