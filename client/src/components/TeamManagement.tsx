
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoLink } from "react-icons/io5";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { projectType, userType } from "@/types";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "./ui/input";
import axios from "axios";
import { addMember, deleteMember } from "@/features/projectsSlice";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Root } from "node_modules/react-markdown/lib";


export default function TeamManagement({ user }: { user: userType }) {
    const { projectId } = useParams()
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [project, setProject] = useState(allProjects.filter((project) => project._id == projectId)[0])
    const dispatch = useDispatch()
    const { toast } = useToast()

    useEffect(() => {
        console.log(user, project)
    }, [])

    useEffect(() => {
        setProject(allProjects.filter((project) => project._id == projectId)[0])
    }, [allProjects, projectId])


    const handleAddMember = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // WIP: Add email validation & assert person is not already a member 
        e.stopPropagation()
        if (e.key == 'Enter') {
            let email = (e.target as HTMLInputElement).value.trim()
            let alreadyMember = project.members.find((member) => member.user?.email == email)

            if (alreadyMember) {
                toast({
                    variant: "destructive",
                    title: "Couldn't Add member",
                    description: "Member already exists!",
                })
                return
            }

            let response = await axios.put(`http://localhost:8000/api/v1/project/${projectId}`, {
                type: "add member",
                email: email
            })
            if (response.data) {
                dispatch(addMember({ projectId: projectId!, newMember: response.data }))
            } else {
                // user doesn't exist
                toast({
                    variant: "destructive",
                    title: "Couldn't Add member",
                    description: "No such user registered!",
                })
                return
            }

        }
    }

    const handleDeleteMember = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, memberEmail: string) => {
        // WIP: delete member from backend as well  
        let response = await axios.put(`http://localhost:8000/api/v1/project/${projectId}`, {
            type: "delete member",
            email: memberEmail
        })
        if (response.data) {
            dispatch(deleteMember({ projectId: projectId!, memberEmail }))
        }
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex pr-5 cursor-pointer">
                    {
                        project.members.slice(0, 3).map((member) => (
                            <Avatar className="border-4 border-popover -mr-3"> <AvatarImage src={member.user?.image} alt="@shadcn" /> </Avatar>
                        ))
                    }

                    {
                        (project.members.length > 3) && 
                        <Avatar className="border-4 border-popover -mr-3">
                            <AvatarImage src="" alt="@shadcn" />
                            <AvatarFallback className="bg-accent">+{project.members.length - 3}</AvatarFallback>
                        </Avatar>
                    }
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-10 mt-3 min-w-[20vw]">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-light">
                    Invite Link
                </DropdownMenuLabel>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(project?.inviteLink!)}>
                    <IoLink className="mr-4 text-[1.2rem]" /> Copy Link
                </DropdownMenuItem>

                {
                    (user?.email == project.members[0].user?.email) &&

                    <Input type="email" className="focus:bg-popover my-2" placeholder="emailtoshare@gmail.com" name="email" required
                        onClick={(e) => e.preventDefault()}
                        onKeyDown={(e) => handleAddMember(e)}
                    />
                }

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs text-muted-foreground font-light">
                    Project Members
                </DropdownMenuLabel>


                <Table>
                    <TableBody>
                        {
                            project.members?.map((member) => (
                                member.status == 'Owner' ?

                                    <TableRow key={member.user?._id}>
                                        <TableCell className="">
                                            <Avatar className="max-w-8 max-h-8">
                                                <AvatarImage src={member.user?.image} />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="text-sm flex flex-col">
                                            {member.user?.name}
                                            <span className="text-muted-foreground text-xs"> {member.user?.email} </span>
                                        </TableCell>
                                        <TableCell> {member.status} </TableCell>
                                    </TableRow>

                                    :

                                    <TooltipProvider>
                                        <Tooltip delayDuration={100}>
                                            <TableRow key={member.user?._id}>
                                                <TableCell className="">
                                                    <TooltipTrigger>
                                                        <Avatar className="max-w-8 max-h-8">
                                                            <AvatarImage src={member.user?.image} />
                                                        </Avatar>
                                                    </TooltipTrigger>
                                                </TableCell>
                                                <TableCell className="text-sm flex flex-col">
                                                    {member.user?.name}
                                                    <span className="text-muted-foreground text-xs"> {member.user?.email} </span>
                                                </TableCell>
                                                <TableCell> {member.status} </TableCell>
                                            </TableRow>

                                            {
                                                (user?.email == project.members[0].user?.email) &&
                                                <TooltipContent side="left" asChild className="bg-popover border border-muted">
                                                    <Button variant={'destructive'} onClick={(e) => handleDeleteMember(e, member.user?.email!)}>
                                                        Delete User
                                                    </Button>
                                                </TooltipContent>
                                            }
                                        </Tooltip>
                                    </TooltipProvider>
                            ))
                        }
                    </TableBody>
                </Table>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}