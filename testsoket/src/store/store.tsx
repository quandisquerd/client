
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userApi from '../api/user'


const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,

})
const middleReducer = [userApi.middleware,]
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({}).concat(...middleReducer)
})