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
import ProjectChatTile from "@/components/ProjectChatTile"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import useFetchProjectChats from "@/app/hooks/useFetchProjectChats"



export default function ProjectDetails() {
    let { projectId } = useParams()
    const navigate = useNavigate()
    const { userId } = useParams()
    const [project, setProject] = useState<projectType>()
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.value)
    const { allProjectChats, loading } = useFetchProjectChats()

    useEffect(() => {
        setProject(allProjects.filter((project) => project._id == projectId)[0])
    }, [allProjects, projectId])

    const handleRename = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            setEditMode(false)
            let newName = (e.target as HTMLInputElement).value.trim() == '' ? "Untitled Project" : (e.target as HTMLInputElement).value

            let response = await axios.put(`http://localhost:8000/api/v1/project/${projectId}`, {
                type: "rename",
                name: newName
            })
            if(response.status == 200 || response.status == 201){
                let projectIdx = allProjects.findIndex(project => project._id == projectId)
                dispatch(renameProject({ projectIdx, newName }))
            }
        }
    }

    const handleDelete = async () => {
        let response = await axios.delete(`http://localhost:8000/api/v1/project/${projectId}`)
        if(response.status == 200)[
            dispatch(deleteProject(projectId))
        ]
        navigate(`/${userId}`)
    }


    return (
        <div className="w-full h-full p-6 sm:p-9 overflow-x-hidden overflow-y-scroll">
            <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-3">
                
                <div className="flex gap-3 items-baseline flex-wrap">
                    {
                        !editMode ?
                            <>
                                <h2 className="text-2xl sm:text-3xl font-semibold mr-4 capitalize">
                                    {project?.name}
                                </h2>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger onClick={() => setEditMode(true)}><FaPencil className="text-lg sm:text-xl" /></TooltipTrigger>
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
                                    className="w-[18rem] sm:w-[22rem] text-xl sm:text-3xl font-semibold"
                                    onKeyDown={(e) => handleRename(e)}
                                />

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger onClick={handleDelete}>
                                            <MdDelete className="text-xl sm:text-2xl" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-accent">
                                            <p>Delete Project</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>
                    }
                </div>

                <TeamManagement user={user} />
            </div>

            <NewProjectChatDialog user={user} project={project!} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
                {
                    loading ? 
                    [1, 1,1 ,1, 1,1].map((item, index) => (
                        <Skeleton key={index} className="w-full aspect-square bg-secondary" />
                    ))
                    :
                    allProjectChats?.map((chat) => (
                        <ProjectChatTile chat={chat} key={chat._id} />
                    ))
                }
            </div>



        </div>
    )
}