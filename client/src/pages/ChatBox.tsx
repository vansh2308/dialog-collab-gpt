import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMeteor } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { createNewChat, createNewPrompt } from "@/lib/utils";
import { addChat, setChats, setActiveChat } from "@/features/chatsSlice";
import { Outlet } from "react-router-dom";


export default function ChatBox() {
    const activeChat = useSelector((state: RootState) => state.chats.activeChat)
    const user = useSelector((state: RootState) => state.user.value)
    const [promptValue, setPromptValue] = useState<string>("")
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(promptValue)
    }, [promptValue])

    const handlePromptSubmit = () => {
        
    }

    return (
        <div className="w-full h-full relative px-10 flex flex-col gap-5 pb-10">

            <div className="flex-1 w-full relative ">
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
                    disabled={promptValue == ""}
                >
                    <FaArrowUp />
                </Button>
            </div>

        </div>
    )
}