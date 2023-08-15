import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    housesArray :  null
}

const authSlice = createSlice(
    {
        name:'house',
        initialState,
        reducers: {
            setHouses:(state, action) => {
                state.housesArray = action.payload;
            }
        }
    }
)

export const {setHouses} = authSlice.actions 

export default authSlice.reducer;