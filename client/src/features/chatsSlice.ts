


import { chatType } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface chats {
  allChats: chatType[],
  activeChat: chatType | null
}


const initialState: chats = {
  allChats: [],
  activeChat: null
}


export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action:PayloadAction<chatType>) => {
        state.allChats.push(action.payload)
    },
    setChats: (state, action:PayloadAction<chatType[]>) => {
        state.allChats = action.payload
    },
    setActiveChat: (state, action:PayloadAction<chatType>) => {
        state.activeChat = action.payload
    },
    renameChat: (state, action:PayloadAction<{idx: number, newName: string}>) => {
      state.allChats[action.payload.idx].name = action.payload.newName
    }
  }
})

export const { addChat, setChats, setActiveChat, renameChat } = chatsSlice.actions
export default chatsSlice.reducer