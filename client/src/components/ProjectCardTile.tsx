import { chatType } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteChatFromProject } from "@/features/projectsSlice";


export default function ProjectCardTile({ chat }: { chat: chatType }) {
    const user = useSelector((state: RootState) => state.user.value)
    const [isHovering, setIsHovering] = useState(false)
    let { projectId } = useParams()
    const dispatch = useDispatch()
    

    const handleChatDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(deleteChatFromProject({projectId: projectId as string, chatId: chat._id }))
    }

    return (
        <Link
            to={`/${user?._id}/${chat._id}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <CardTitle className="capitalize max-w-[75%] overflow-x-hidden text-nowrap overflow-y-clip h-[1.7rem]">{chat.name.slice(0, 15) + (chat.name.length > 15 ? '...' : '')}</CardTitle>

                        <MdDelete
                            className={isHovering ? `opacity-100 hover:text-popover-foreground/60` : `opacity-0`}
                            onClick={(e) => handleChatDelete(e)}
                        />
                    </div>
                    <CardDescription className="text-xs"> Created: {chat.dateCreated.toDateString()} </CardDescription>
                </CardHeader>

                {/* WIP: Last edit  */}
                <CardFooter className="flex flex-col items-start gap-3 overflow-hidden">
                    <p className="text-xs font-medium ">Last Edited by</p>
                    {
                        <div className="flex gap-3 max-w-[100%]">
                            <Avatar className="border-3 border-popover">
                                <AvatarImage
                                    src={chat?.allPrompts?.length ? chat.allPrompts?.slice(-1)[0][0].madeBy?.image : user?.image}
                                />
                            </Avatar>
                            <div className="flex flex-col gap-1 flex-1">
                                <h5 className="text-xs text-nowrap overflow-x-hidden"> {chat?.allPrompts?.length ? chat.allPrompts?.slice(-1)[0][0].madeBy?.name : user?.name} </h5>
                                <span className="text-muted-foreground text-[0.65rem] text-nowrap overflow-x-hidden"> {chat?.allPrompts?.length ? chat.allPrompts?.slice(-1)[0][0].madeBy?.email : user?.email} </span>
                            </div>
                        </div>
                    }
                </CardFooter>
            </Card>
        </Link>
    )
}