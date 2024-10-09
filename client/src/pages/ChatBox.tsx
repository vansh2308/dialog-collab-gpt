import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPaperclip } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useState } from "react";
import { addPrompt } from "@/features/chatsSlice";
import { Outlet, useParams } from "react-router-dom";
import { promptType } from "@/types";
import { addPromptToProjectChat } from "@/features/projectsSlice";
import { v4 as uuid } from 'uuid'


export default function ChatBox() {
    const user = useSelector((state: RootState) => state.user.value)
    const [promptValue, setPromptValue] = useState<string>('')
    const dispatch = useDispatch()
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    let { projectId, chatId } = useParams();



    const handlePromptSubmit = () => {
        if (projectId) {
            let newPrompt: promptType = [{
                version: 0,
                madeBy: user,
                question: promptValue,
                reply: "Just a demo reply",
                _id: uuid()
            }]

            dispatch(addPromptToProjectChat({projectId, chatId: chatId!, newPrompt}))
        } else {
            let chatIdx = allChats.findIndex(chat => chat._id == chatId)

            // WIP: Fetch reply from API key 
            let newPrompt: promptType = [{
                version: 0,
                madeBy: user,
                question: promptValue,
                reply: "Just a demo reply",
                _id: allChats[chatIdx].allPrompts?.length ? (allChats[chatIdx].allPrompts?.length + 1).toString() : '1'
            }]
            dispatch(addPrompt({ idx: chatIdx, newPrompt }))
        }
    }

    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter'){
            handlePromptSubmit()
            setPromptValue('')
        }
    }

    

    return (

        <div className="w-full h-full relative p-6 flex flex-col gap-5">

            <div className="flex-1 max-h-[90%] w-full overflow-y-scroll  relative ">
                <Outlet />
            </div>


            <div className="bg-accent rounded-full w-full h-16 p-[0.4rem] flex gap-3">
                <Button variant="secondary" className="h-full aspect-square rounded-full hover:bg-popover bg-popover/50">
                    <FaPaperclip />
                </Button>

                <Input
                    type="text"
                    placeholder={"Give me a startup idea..."}
                    className="h-full"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    onKeyDown={(e) => handleInputEnter(e)}
                />

                <Button variant="secondary" className="h-full aspect-square rounded-full hover:bg-popover bg-popover/50"
                    onClick={handlePromptSubmit}
                    disabled={promptValue == "" || !chatId}
                >
                    <FaArrowUp />
                </Button>
            </div>

        </div>
    )
}