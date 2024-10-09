import { RootState } from "@/app/store"
import { projectType } from "@/types"
import { useEffect, useState } from "react"



import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { FaPencil } from "react-icons/fa6";


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

import { MdDelete } from "react-icons/md";
import { deleteProject, renameProject } from "@/features/projectsSlice"



import TeamManagement from "@/components/TeamManagement";
import NewProjectChatDialog from "@/components/NewProjectChatDialog"
import ProjectCardTile from "@/components/ProjectCardTile"



export default function ProjectDetails() {
    let { projectId } = useParams()
    const navigate = useNavigate()
    const { userId } = useParams()
    const [project, setProject] = useState<projectType>()
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.value)


    useEffect(() => {
        setProject(allProjects.filter((project) => project._id == projectId)[0])
    })


    const handleRename = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            setEditMode(false)
            let newName = (e.target as HTMLInputElement).value.trim() == '' ? "Untitled Project" : (e.target as HTMLInputElement).value

            let projectIdx = allProjects.findIndex(project => project._id == projectId)
            dispatch(renameProject({ projectIdx, newName }))
        }
    }

    const handleDelete = () => {
        dispatch(deleteProject(projectId))
        navigate(`/${userId}`)
    }


    return (
        <div className="w-full h-full p-9 overflow-x-hidden overflow-y-scroll">
            <div className="flex w-full justify-between">

                <div className="flex gap-3 items-baseline">
                    {
                        !editMode ?
                            <>
                                <h2 className="text-3xl font-semibold mr-4 capitalize">
                                    {project?.name}
                                </h2>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger onClick={() => setEditMode(true)}><FaPencil /></TooltipTrigger>
                                        <TooltipContent className="bg-accent">
                                            <p>Edit</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </> :
                            <>
                                <Input
                                    type="text"
                                    placeholder={project?.name}
                                    className="w-[18rem] text-3xl font-semibold"
                                    onKeyDown={(e) => handleRename(e)}
                                />

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger onClick={handleDelete}>
                                            <MdDelete className="text-xl" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-accent">
                                            <p>Delete Project</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>

                    }
                </div>

                <TeamManagement project={project!} user={user} />
            </div>

            <NewProjectChatDialog user={user} project={project!} />

            <div className="grid-cols-4 mt-10 grid gap-6">
                {
                    project?.chats.map((chat) => (
                        <ProjectCardTile chat={chat} key={chat._id} />
                    ))


                }

            </div>



        </div>
    )
}