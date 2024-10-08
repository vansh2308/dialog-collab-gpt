


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
    addChat: (state, action: PayloadAction<chatType>) => {
      state.allChats.push(action.payload)
    },
    setChats: (state, action: PayloadAction<chatType[]>) => {
      state.allChats = action.payload
    },
    renameChat: (state, action: PayloadAction<{ idx: number, newName: string }>) => {
      state.allChats[action.payload.idx].name = action.payload.newName
    },
    addPrompt: (state, action: PayloadAction<{idx: number, newPrompt:promptType}>) => {
      state.allChats[action.payload.idx].allPrompts?.push(action.payload.newPrompt)
    }
  }
})

export const { addChat, setChats, renameChat, addPrompt} = chatsSlice.actions
export default chatsSlice.reducer