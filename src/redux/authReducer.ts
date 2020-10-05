import { AuthType } from './../api/authApi';
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { StatusCode } from '../api/api';
import { authApi } from '../api/authApi';
import { securityApi } from '../api/sequrityApi';
import { AppStateType, ActionObjectType, BaseThunkType } from './reduxStore';

const actions = {
    userLogin: (data: AuthDataType) => ({ type: 'auth/LOGIN', data } as const),
    userLogout: () => ({ type: 'auth/LOGOUT' } as const),
    getCaptcha: (data: string | undefined) => ({ type: 'auth/GET_CAPTCHA', data } as const)
}

type ActionsType = ReturnType<ActionObjectType<typeof actions>>
type ThunkType = BaseThunkType<ActionsType>


export const CheckAuth = ():ThunkType => async dispatch => {
        const data = await authApi.CheckAuth()

        if (data?.resultCode === StatusCode.Success) {
            dispatch(actions.userLogin(data.data))
        }
    }

export const Login = (email: string, pass: string, remember: boolean, captcha = null):ThunkType => async dispatch => {
        const data = await authApi.Login(email, pass, remember, captcha)
        if (data?.resultCode === StatusCode.Success) {
            dispatch(CheckAuth())
        } else {
            if (data?.resultCode === StatusCode.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let errMess = data?.messages.length! > 0 ? data?.messages[0] : 'login error'
            dispatch(stopSubmit('login', { _error: errMess }))
        }
    }
export const Logout = ():ThunkType => async dispatch => {
        const data = await authApi.Logout()
        if (data?.resultCode === 0) {
            dispatch(actions.userLogin({ id: null, login: null, email: null }))
            dispatch(actions.userLogout())
        }
    }

export const getCaptchaUrl = ():ThunkType => async dispatch => {
        const data = await securityApi.GetCaptchaUrl()
        dispatch(actions.getCaptcha(data?.url))
    }


export type AuthDataType = {
    id: number | null
    login: string | null,
    email: string | null,
    isAuth?: boolean 
    captchaUrl?: string | null
}
let initState: AuthDataType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initState, action: ActionsType): AuthDataType => {

    switch (action.type) {
        case 'auth/LOGIN':
            return {
                ...state,
                id: action.data.id,
                login: action.data.login,
                email: action.data.email,
                isAuth: true
            }
        case 'auth/LOGOUT': return { ...state, isAuth: false }
        case 'auth/GET_CAPTCHA': return { ...state, captchaUrl: action.data }
        default:
            return state
    }
}


export default authReducer