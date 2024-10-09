
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoLink } from "react-icons/io5";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { projectType, userType } from "@/types";


export default function TeamManagement({project, user}: {project: projectType, user: userType}){
    // const user = useSelector((state: RootState) => state.user.value)

    return(
        <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex pr-5 cursor-pointer">
                            <Avatar className="border-4 border-popover -mr-3"> <AvatarImage src={user?.image} alt="@shadcn" /> </Avatar>
                            <Avatar className="border-4 border-popover -mr-3"> <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> </Avatar>
                            <Avatar className="border-4 border-popover -mr-3"> <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> </Avatar>
                            <Avatar className="border-4 border-popover -mr-3">
                                <AvatarImage src="" alt="@shadcn" />
                                <AvatarFallback className="bg-accent">+2</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="mr-10 mt-3 min-w-[20vw]">
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-light">
                            Invite Link
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(project?.inviteLink!)}>
                            <IoLink className="mr-4 text-[1.2rem]" /> Copy Link
                        </DropdownMenuItem>

                        {/* WIP: Send link via email  */}
                        {/* <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(project?.inviteLink!)}>
                            <IoLink className="mr-4 text-[1.2rem]" /> Send via Email
                        </DropdownMenuItem> */}


                        <DropdownMenuSeparator />

                        <DropdownMenuLabel className="text-xs text-muted-foreground font-light">
                            Project Members
                        </DropdownMenuLabel>

                    </DropdownMenuContent>
                </DropdownMenu>
    )
}