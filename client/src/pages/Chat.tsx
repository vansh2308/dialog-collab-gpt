import { RootState } from "@/app/store";
import { chatType, promptType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { json } from "stream/consumers";


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
        if(!projectId){
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
                            <div className="p-4 max-w-[50%] bg-primary text-foreground rounded-3xl text-sm self-end mt-7">
                                {prompt[0].question}
                            </div>

                            <div className="p-4 max-w-[65%] w-fit bg-accent text-foreground rounded-3xl text-sm">
                                {prompt[0].reply}
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}