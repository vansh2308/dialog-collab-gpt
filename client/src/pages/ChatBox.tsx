import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPaperclip } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { addPrompt } from "@/features/chatsSlice";
import { Outlet, useParams } from "react-router-dom";
import { promptType } from "@/types";
import { addPromptToProjectChat } from "@/features/projectChatsSlice";
import { v4 as uuid } from 'uuid'
import axios from "axios";


export default function ChatBox() {
    const user = useSelector((state: RootState) => state.user.value)
    const [promptValue, setPromptValue] = useState<string>('')
    const dispatch = useDispatch()
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    const allProjectChats = useSelector((state: RootState) => state.projectChats.allProjectChats)
    let { projectId, chatId } = useParams();


    const handlePromptSubmit = async () => {
        let chatIdx = projectId ? allProjectChats.findIndex(chat => chat._id == chatId) : allChats.findIndex(chat => chat._id == chatId)

        let responseMessage = 'FAILED_TO_GET_RESPONSE'
        try {
            // Fetch reply from OpenAI API key 
            const promptResponse = await axios.post(`http://localhost:8000/api/v1/chat/${chatId}`, {
                prompt: promptValue
            })
            responseMessage = promptResponse.data.promptResponse;
        } catch (err) {
            console.error(err)
        }

        if (responseMessage !== 'FAILED_TO_GET_RESPONSE') {
            let response = await axios.put(`http://localhost:8000/api/v1/chat/${chatId}`, {
                type: "add prompt",
                prompt: {
                    madeBy: user?._id,
                    question: promptValue,
                    reply: responseMessage,
                }
            })
            
            if(projectId){
                dispatch(addPromptToProjectChat({ idx: chatIdx, newPrompt: response.data }))
            } else {
                dispatch(addPrompt({ idx: chatIdx, newPrompt: response.data }))
            }
        }
    }


    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
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