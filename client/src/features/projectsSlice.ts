


import { chatType, projectType, promptType } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


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
    addProject: (state, action: PayloadAction<projectType>)=>{
        state.allProjects.push(action.payload)
    },



    // addChat: (state, action: PayloadAction<chatType>) => {
    //   state.allChats.push(action.payload)
    // },
    // setChats: (state, action: PayloadAction<chatType[]>) => {
    //   state.allChats = action.payload
    // },
    // renameChat: (state, action: PayloadAction<{ idx: number, newName: string }>) => {
    //   state.allChats[action.payload.idx].name = action.payload.newName
    // },
    // addPrompt: (state, action: PayloadAction<{idx: number, newPrompt:promptType}>) => {
    //   state.allChats[action.payload.idx].allPrompts?.push(action.payload.newPrompt)
    // }
  }
})

export const { addProject } = projectsSlice.actions
export default projectsSlice.reducer