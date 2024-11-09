


import { chatType, projectType, promptType, userType } from '@/types'
import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react'



export interface projects {
    allProjects: projectType[],
}


const initialState: projects = {
    allProjects: []
}


export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setUserProjects: (state, action: PayloadAction<projectType[]>) => {
        state.allProjects = action.payload
    },
    addProject: (state, action: PayloadAction<projectType>)=>{
        state.allProjects.push(action.payload)
    },
    deleteProject: (state, action: PayloadAction<string | undefined>) => {
        state.allProjects = state.allProjects.filter((project) => project._id != action.payload)
    },
    renameProject: (state, action: PayloadAction<{projectIdx: number, newName: string}>) => {
        state.allProjects[action.payload.projectIdx].name = action.payload.newName
    },
    addMember: (state, action: PayloadAction<{projectId: string, newMember: userType}>) => {
        let projectIdx = state.allProjects.findIndex(project => project._id == action.payload.projectId)
        state.allProjects[projectIdx].members.push({ user: action.payload.newMember, status: 'Joined'})
    },
    deleteMember: (state, action: PayloadAction<{projectId: string, memberEmail: string}>) => {
        let projectIdx = state.allProjects.findIndex(project => project._id == action.payload.projectId)
        state.allProjects[projectIdx].members = state.allProjects[projectIdx].members.filter((member) => member.user?.email != action.payload.memberEmail)
    }
  }
})

export const { setUserProjects, addProject, deleteProject, renameProject, addMember, deleteMember } = projectsSlice.actions
export default projectsSlice.reducer