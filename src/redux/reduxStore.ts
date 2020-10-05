import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import profileReducer from "./profileReducer"
import dialogReducer from "./dialogReducer"
import usersReducer from "./usersReducer"
import authReducer from './authReducer'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'


let RootReducer = combineReducers({
    profileData: profileReducer,
    messData: dialogReducer,
    usersData: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof RootReducer

export type AppStateType = ReturnType<RootReducerType>
export type ActionObjectType<T> = T extends {[type:string]: infer U } ? U : any
export type BaseThunkType<T extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, T>


let store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store