import { projectType } from "@/types";
import { NavLink } from "react-router-dom";



export default function ProjectTile({ project, userId, onClick }: { project: projectType, userId: string | undefined, onClick?: () => void }){

    return(
        <NavLink
            to={`/${userId}/project/${project._id}`}
            className={({ isActive }) => isActive ? "flex justify-between items-center p-3 rounded-lg bg-accent" : "flex justify-between items-center p-3 rounded-lg"}
            onClick={onClick}
        >
            <h3 className="capitalize"> {project.name} </h3>
        </NavLink>
    )
}