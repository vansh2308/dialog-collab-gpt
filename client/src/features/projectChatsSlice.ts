import { chatType, projectType, promptType } from '@/types'
import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface projectChats {
    allProjectChats: chatType[],
}


const initialState: projectChats = {
    allProjectChats: []
}


export const projectChatsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectChats: (state, action: PayloadAction<chatType[]>) => {
        state.allProjectChats = action.payload
    },
    addProjectChat: (state, action: PayloadAction<chatType>)=>{
        state.allProjectChats.push(action.payload)
    },
    deleteProjectChat: (state, action: PayloadAction<string | undefined>) => {
        state.allProjectChats = state.allProjectChats.filter((chat) => chat._id != action.payload)
    },

  }
})

export const { setProjectChats, deleteProjectChat, addProjectChat } = projectChatsSlice.actions
export default projectChatsSlice.reducer