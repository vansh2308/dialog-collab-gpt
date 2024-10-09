
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6"
import { Input } from "./ui/input"
import { useState } from "react"
import { createNewChat } from "@/lib/utils"
import { useParams } from "react-router-dom"
import { projectType, userType } from "@/types"
import { useDispatch, useSelector } from "react-redux"
import { addChatToProject } from "@/features/projectsSlice"
import { RootState } from "@/app/store"

export default function NewProjectChatDialog({user, project}: {user: userType, project: projectType}) {
    const [nameVal, setNameVal] = useState("Untitled Chat")
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const dispatch = useDispatch()

    const handleCreateNewProjectChat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let newChat = createNewChat({
            owner: user, 
            name: !nameVal || nameVal.trim() == '' ? 'Untitled Chat':  nameVal,
            question: null,
            _id: `${project.chats.length}` 
        })   
        let projectIdx = allProjects.findIndex((item) => item._id == project._id)
        dispatch(addChatToProject({projectIdx, chat: newChat}))
    }



    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" className="bg-primary hover:bg-primary/80 mt-5"> <FaPlus className="mr-3" /> New Chat </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new Chat</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder={nameVal} className="col-span-3" onChange={(e) => setNameVal(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={(e) => handleCreateNewProjectChat(e)}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}