import { RootState } from "@/app/store";
import { Avatar } from "@/components/ui/avatar";
import { chatType, promptType } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";
import { FaMeteor } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



export default function Chat({ }) {
    let { projectId, chatId } = useParams();

    // WIP: Fetch chat from backend 
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [chat, setChat] = useState<chatType>()
    const chatRef = useRef() as React.MutableRefObject<HTMLDivElement>

    // WIP: Fix scroll to bottom 
    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!projectId) {
            setChat(allChats.filter((chat) => chat._id == chatId)[0])
        } else {
            let projectIdx = allProjects.findIndex((project) => project._id == projectId)
            setChat(allProjects[projectIdx].chats.filter((chat) => chat._id == chatId)[0])
        }
        // scrollToBottom()
    })


    return (
        <div className="w-full max-h-full text-foreground flex flex-col gap-5 overflow-y-scroll" ref={chatRef}>

            {
                chat?.allPrompts &&
                chat?.allPrompts?.map((prompt: promptType) => {
                    return (
                        prompt &&
                        <>
                            <div className="self-end flex gap-5 mt-6">
                                <div className="p-4 h-fit px-4 bg-primary max-w-[35vw] text-foreground rounded-2xl text-sm">
                                    {prompt.question}
                                </div>
                                <Avatar className="">
                                    <AvatarImage src={prompt.madeBy?.image} />
                                </Avatar>
                            </div>

                            <div className="flex gap-5">
                                <Avatar className="bg-accent flex items-center justify-center">
                                    <FaMeteor
                                        className="text-popover-foreground"
                                    />
                                </Avatar>
                                <div className="max-w-[65vw] w-fit text-foreground rounded-2xl text-sm">
                                    {prompt.reply}
                                </div>
                            </div>


                        </>
                    )
                })
            }
        </div>
    )
}