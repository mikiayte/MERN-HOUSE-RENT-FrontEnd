import { configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import houseReducer from './slices/houseSlice'
import {apiSlice} from './slices/apiSlice'



const store = configureStore({
    reducer: {
        auth: authReducer,
        house:houseReducer, 
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
}
) 

export default store;