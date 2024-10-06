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
import { createNewChat } from "@/lib/utils";
import { addChat } from "@/features/chatsSlice";
import { chatType } from "@/types";
import { SlOptions } from "react-icons/sl";
import { useEffect, useState } from "react";
import ChatTile from "@/components/ChatTile";





export default function Home() {
    const user = useSelector((state: RootState) => state.user.value)
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleStartChat = () => {
        let newChat = createNewChat({ owner: user, name: "Untitled Chat", question: null, _id: (allChats.length + 1).toString() })

        navigate(`/${user?._id}/${newChat._id}`)
        dispatch(addChat(newChat))
    }

    


    return (
        <div className="w-screen h-screen flex flex-col  text-card-foreground">

            <Menubar className="w-full bg-popover border-none rounded-none p-5 px-12 flex justify-between items-center h-max">
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

            <div className="h-full flex flex-1">
                <div className="bg-popover h-full w-1/4 flex flex-col px-12 pt-6 gap-5 text-muted-foreground">
                    <Input type="text" placeholder="Browse projects/chats" className="focus:border-input focus:outline-none focus:text-white " />

                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold mt-3 h-full"> Projects </h4>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild className="h-min">
                                    <button>
                                        <IoIosAddCircle className="text-xl text-muted-foreground" />
                                    </button>
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
                        No projects. Create one!
                    </div>

                    <div className="flex justify-between items-center mt-10">
                        <h4 className="font-semibold mt-3 h-full"> Chats </h4>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="h-min" onClick={handleStartChat}>
                                    <IoIosAddCircle className="text-xl text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-accent">
                                    <p>Start new</p>
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
                                allChats.map((item, userId, key) => (
                                    <ChatTile item={item} userId={user?._id} />
                                ))
                        }
                    </div>
                </div>


                <div className="w-3/4 h-[90%] text-foreground overflow-y-scroll">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}



