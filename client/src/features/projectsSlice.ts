


import { chatType, projectType, promptType } from '@/types'
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
    }
  }
})

export const { setUserProjects, addProject, deleteProject, renameProject } = projectsSlice.actions
export default projectsSlice.reducer