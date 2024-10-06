import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMeteor } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { createNewChat, createNewPrompt } from "@/lib/utils";
import { addChat, setChats, setActiveChat, addPrompt } from "@/features/chatsSlice";
import { Outlet, useParams } from "react-router-dom";
import { version } from "os";
import { promptType } from "@/types";


export default function ChatBox() {
    const user = useSelector((state: RootState) => state.user.value)
    const [promptValue, setPromptValue] = useState<string>("")
    const dispatch = useDispatch()
    const allChats = useSelector((state: RootState) => state.chats.allChats)
    let { chatId } = useParams();

    useEffect(() => {
        console.log(promptValue)
    }, [promptValue])

    const handlePromptSubmit = () => {
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

    return (
        // WIP: Fix chatbox height styles 
        <div className="w-full h-full relative px-10 flex flex-col gap-5 pb-10 overflow-y-scroll">

            <div className="h-[90%] overflow-y-scroll w-full relative ">
                <Outlet />
            </div>


            <div className="bg-accent rounded-full w-full h-fit p-[0.4rem] flex gap-3  ">
                <Button variant="secondary" className="h-full aspect-square rounded-full hover:bg-popover bg-popover/50">
                    <FaPaperclip />
                </Button>

                <Input
                    type="text"
                    placeholder="Give me a startup idea..." className="h-full"
                    onChange={(e) => setPromptValue(e.target.value)}
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