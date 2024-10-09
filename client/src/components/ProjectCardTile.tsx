import { chatType } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


export default function ProjectCardTile({ chat }: { chat: chatType }) {
    const user = useSelector((state: RootState) => state.user.value)

    return (
        <Link to={`/${user?._id}/${chat._id}`}>

            <Card>
                <CardHeader>
                    <CardTitle className="capitalize max-w-[75%] overflow-x-hidden text-nowrap overflow-y-clip h-[1.7rem]">{chat.name}</CardTitle>
                    <CardDescription className="text-xs"> Created: {chat.dateCreated.toDateString()} </CardDescription>
                </CardHeader>

                {/* WIP: Last edit  */}
                <CardFooter>
                    <p className="text-xs font-medium">Last Edited by</p>
                </CardFooter>
            </Card>
        </Link>
    )
}