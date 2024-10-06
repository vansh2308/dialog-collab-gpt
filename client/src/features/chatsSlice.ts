


import { chatType, promptType } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// WIP: Remove activeChat 
export interface chats {
  allChats: chatType[],
  activeChat: chatType | null
}


const initialState: chats = {
  allChats: [],
  activeChat: null
}


// WIP: ChatTile.tsx:33 A non-serializable value was detected in the state, in the path: `chats.allChats.0.dateCreated`. Value: Sun Oct 06 2024 18:30:53 GMT+0530 (India Standard Time) 
// Take a look at the reducer(s) handling this action type: chats/renameChat.

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<chatType>) => {
      state.allChats.push(action.payload)
    },
    setChats: (state, action: PayloadAction<chatType[]>) => {
      state.allChats = action.payload
    },
    setActiveChat: (state, action: PayloadAction<chatType>) => {
      state.activeChat = action.payload
    },
    renameChat: (state, action: PayloadAction<{ idx: number, newName: string }>) => {
      state.allChats[action.payload.idx].name = action.payload.newName
    },
    addPrompt: (state, action: PayloadAction<{idx: number, newPrompt:promptType}>) => {
      state.allChats[action.payload.idx].allPrompts?.push(action.payload.newPrompt)
    }
  }
})

export const { addChat, setChats, setActiveChat, renameChat, addPrompt} = chatsSlice.actions
export default chatsSlice.reducer