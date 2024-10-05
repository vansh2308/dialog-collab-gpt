
import { userType } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface user {
  value: userType
}


const initialState: user = {
  value: null,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.value = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer