


import { chatType, promptType } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface chats {
  allChats: chatType[],
}

const initialState: chats = {
  allChats: [],
}


export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setUserChats: (state, action: PayloadAction<chatType[]>) => {
      state.allChats = action.payload
    },
    addChat: (state, action: PayloadAction<chatType>) => {
      state.allChats.push(action.payload)
    },
    deleteChat: (state, action: PayloadAction<string | undefined>) => {
      state.allChats = state.allChats.filter((chat) => chat._id != action.payload)
    },
    renameChat: (state, action: PayloadAction<{ idx: number, newName: string }>) => {
      state.allChats[action.payload.idx].name = action.payload.newName
    },
    addPrompt: (state, action: PayloadAction<{idx: number, newPrompt:promptType}>) => {
      state.allChats[action.payload.idx].allPrompts?.push(action.payload.newPrompt)
    }
  }
})

export const { setUserChats, addChat, deleteChat, renameChat, addPrompt} = chatsSlice.actions
export default chatsSlice.reducer