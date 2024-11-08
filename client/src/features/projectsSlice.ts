


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
    },

    setUserProjectChats: (state, action: PayloadAction<{projectId: string, projectChats: chatType[]}>) => {
        // console.log(action.payload)

        // const currentAllProjects = current(state.allProjects)
        // let projectIdx = currentAllProjects.findIndex((project) => project._id == action.payload.projectId)
        // // console.log(projectIdx)
        // // console.log(currentAllProjects)
        // console.log(currentAllProjects[projectIdx])

        // currentAllProjects[projectIdx].chats = [...action.payload.projectChats]
        // console.log(currentAllProjects[projectIdx])
        // // state.allProjects[projectIdx].chats = action.payload.projectChats
        // // console.log(state.allProjects[projectIdx].chats.length)
    },

    addChatToProject: (state, action: PayloadAction<{projectIdx: number, chat: chatType}>) => {
        // console.log(current(state.allProjects))
        // const currentAllProjects = current(state.allProjects)

        // state.allProjects[action.payload.projectIdx].chats.push(action.payload.chat)        
    },


    deleteChatFromProject: (state, action: PayloadAction<{projectId: string, chatId: string}>) => {
        // let projectIdx = state.allProjects.findIndex((project) => project._id == action.payload.projectId)
        // state.allProjects[projectIdx].chats = state.allProjects[projectIdx].chats.filter((chat) => chat._id != action.payload.chatId)
    },
    addPromptToProjectChat: (state, action: PayloadAction<{projectId: string, chatId: string, newPrompt: promptType}>) => {
        // let projectIdx = state.allProjects.findIndex((project) => project._id == action.payload.projectId)
        // let chatIdx = state.allProjects[projectIdx].chats.findIndex((chat) => chat._id == action.payload.chatId)
        // state.allProjects[projectIdx].chats[chatIdx].allPrompts?.push(action.payload.newPrompt)
    }
  }
})

export const { setUserProjects, addProject, deleteProject, renameProject,setUserProjectChats, addChatToProject, deleteChatFromProject, addPromptToProjectChat } = projectsSlice.actions
export default projectsSlice.reducer