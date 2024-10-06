
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/userSlice'
import chatsReducer from '@/features/chatsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer
  }
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>