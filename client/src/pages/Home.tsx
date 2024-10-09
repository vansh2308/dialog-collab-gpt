import { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { FaMeteor } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { IoIosAddCircle } from "react-icons/io";
import { createNewChat, createNewProject } from "@/lib/utils";
import { addChat } from "@/features/chatsSlice";
import { chatType } from "@/types";
import { SlOptions } from "react-icons/sl";
import { useEffect, useState } from "react";
import ChatTile from "@/components/ChatTile";
import { Item } from "@radix-ui/react-menubar";
import { addProject } from "@/features/projectsSlice";
import ProjectTile from "@/components/ProjectTile";





export default function Home() {
    const user = useSelector((state: RootState) => state.user.value)
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [filterText, setFilterText] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleStartChat = () => {
        let newChat = createNewChat({ owner: user, name: "Untitled Chat", question: null, _id: (allChats.length + 1).toString() })
        navigate(`/${user?._id}/${newChat._id}`)
        dispatch(addChat(newChat))
    }


    const handleCreateProject = () => {
        let newProject = createNewProject({ owner: user, name: "Untitled Project", _id: `p100${allProjects.length + 1}` })
        navigate(`/${user?._id}/project/${newProject._id}`)
        dispatch(addProject(newProject))
    }


    return (
        <div className="w-screen h-screen flex flex-col  text-card-foreground">

            <Menubar className="w-full bg-popover border-none rounded-none p-5 px-12 flex justify-between items-center h-[10vh]">
                <FaMeteor className="text-[2.5rem] text-popover-foreground" onClick={() => navigate("/")} />
                <MenubarMenu>
                    <MenubarTrigger className="focus:bg-popover w-fit h-fit p-0 rounded-full">
                        <Avatar>
                            <AvatarImage src={user?.image} />
                        </Avatar>
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Hey {user?.name.slice(0, user.name.indexOf(' '))} ! </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Settings</MenubarItem>
                        <MenubarItem>Logout</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <div className="h-[90vh] flex flex-1">
                <div className="bg-popover h-full w-1/4 flex flex-col px-12 pt-6 gap-5 text-muted-foreground">
                    <Input type="text" placeholder="Browse projects/chats" className="focus:border-input 
                    focus:outline-none focus:text-white "
                        onChange={(e) => setFilterText(e.target.value)}
                    />

                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold mt-3 h-full"> Projects </h4>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="h-min" onClick={handleCreateProject}>
                                    <IoIosAddCircle className="text-xl text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-accent">
                                    <p>Create new</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="max-h-[30vh] h-fit  overflow-y-scroll text-center text-foreground text-xs">
                        {/* <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" /> */}

                        {
                            allProjects.length == 0 ? <h4>No Project. Create one!</h4> :
                                allProjects.filter((project) => project.name.toLowerCase().includes(filterText.toLowerCase())).map((project) => (
                                    <ProjectTile project={project} userId={user?._id} key={project._id} />
                                ))
                        }
                    </div>

                    <div className="flex justify-between items-center mt-10">
                        <h4 className="font-semibold mt-3 h-full"> Chats </h4>
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
                    <div className="max-h-[30vh] h-fit  overflow-y-scroll text-center text-foreground text-xs">
                        {/* <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" /> */}


                        {
                            allChats.length == 0 ? <h4>No Chats. Start one!</h4> :
                                allChats.filter((chat) => chat.name.toLowerCase().includes(filterText.toLowerCase())).map((chat) => (
                                    <ChatTile name={chat.name} chatId={chat._id} userId={user?._id} key={chat._id} />
                                ))
                        }
                    </div>
                </div>


                <div className="w-3/4 h-full text-foreground bg-accent/30">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}



