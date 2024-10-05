import { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { FaMeteor } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";



export default function Home() {
    const user = useSelector((state: RootState) => state.user.value)


    return (
        <div className="w-screen h-screen flex flex-col  text-card-foreground">

            <Menubar className="w-full bg-popover border-none rounded-none p-5 px-12 flex justify-between items-center h-max">
                <FaMeteor className="text-[2.5rem] text-popover-foreground" />
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

                    <h4 className="font-semibold mt-3"> Projects </h4>
                    <div className="max-h-[30vh] h-fit  overflow-y-scroll">
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                    </div>

                    <h4 className="font-semibold mt-5"> Chats </h4>
                    <div className="max-h-[30vh] h-fit  overflow-y-scroll">
                        <Skeleton className="h-6 mt-3 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                        <Skeleton className="h-6 mt-4 w-full rounded-full" />
                    </div>
                </div>


                <div className="w-3/4 h-full  text-foreground">
                    <Outlet />
                </div>

            </div>


        </div>
    )
}