import { RootState } from "@/app/store";
import { chatType, promptType } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { json } from "stream/consumers";


export default function Chat({ }) {
    let { chatId } = useParams();

    // WIP: Fetch chat from backend 
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    const [chat, setChat] = useState<chatType>()

    useEffect(() => {
        setChat(allChats.filter((chat) => chat._id == chatId)[0])
        // console.log(chat?.allPrompts && chat?.allPrompts[0][0].question)
    })


    return (
        <div className="w-full max-h-full text-foreground flex flex-col gap-5 overflow-y-scroll">

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