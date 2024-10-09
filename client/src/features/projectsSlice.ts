


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
    deleteProject: (state, action: PayloadAction<string | undefined>) => {
        state.allProjects = state.allProjects.filter((project) => project._id != action.payload)
    },
    renameProject: (state, action: PayloadAction<{projectIdx: number, newName: string}>) => {
        state.allProjects[action.payload.projectIdx].name = action.payload.newName
    },
    addChatToProject: (state, action: PayloadAction<{projectIdx: number, chat: chatType}>) => {
        state.allProjects[action.payload.projectIdx].chats.push(action.payload.chat)
    },
    deleteChatFromProject: (state, action: PayloadAction<{projectId: string, chatId: string}>) => {
        let projectIdx = state.allProjects.findIndex((project) => project._id == action.payload.projectId)
        state.allProjects[projectIdx].chats = state.allProjects[projectIdx].chats.filter((chat) => chat._id != action.payload.chatId)
    }
  }
})

export const { addProject, deleteProject, renameProject, addChatToProject, deleteChatFromProject } = projectsSlice.actions
export default projectsSlice.reducer