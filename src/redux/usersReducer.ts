
import { ThunkAction } from 'redux-thunk';
import { ApiResponseType, StatusCode } from '../api/api';
import { usersApi, UserType } from '../api/usersApi';
import { AppStateType, BaseThunkType, ActionObjectType } from './reduxStore';


export const actions = {
    changeFollowStatusAC: (data: number) => ({ type: 'users/CHANGE_FOLLOW_STATUS', data } as const),
    getUsersData: (data: UserType[]) => ({ type: 'users/GET_USERS_DATA', data } as const),
    changeCurrentPage: (data: number) => ({ type: 'users/CHANGE_CURRENT_PAGE', data } as const),
    setTotalUsers: (data: number) => ({ type: 'users/SET_TOTAL_USERS_COUNT', data } as const),
    toggleFetching: (data: boolean) => ({ type: 'users/TOGGLE_FETCHING', data } as const),
    toggleFollowProcessAC: (value: boolean, userId: number) => ({ type: 'users/FOLLOW_PROCESS', data: { value, userId } } as const)
}

type ActionsType = ReturnType<ActionObjectType<typeof actions>>
type ThunkType = BaseThunkType<ActionsType>

export const requestUsers = (pageIndex: number = 1, pageSize: number):ThunkType => async dispatch => {
    dispatch(actions.toggleFetching(true))
    dispatch(actions.changeCurrentPage(pageIndex))
    const data = await usersApi.GetUsers(pageIndex, pageSize)
    if (data !== undefined) {
        dispatch(actions.toggleFetching(false))
        dispatch(actions.getUsersData(data.items))
        dispatch(actions.setTotalUsers(500))    
    }
}

export const ChangeFollowStatus = (userId: number, currentStatus: boolean):ThunkType => async dispatch => {
    dispatch(actions.toggleFollowProcessAC(true, userId))
    let data: ApiResponseType | undefined

    if (currentStatus) data = await usersApi.UnfollowFromUser(userId)
    else data = await usersApi.FollowOnUser(userId)

    if (data?.resultCode === StatusCode.Success) dispatch(actions.changeFollowStatusAC(userId))
    dispatch(actions.toggleFollowProcessAC(false, userId))
}

export type UsersDataType = {
    users: UserType[]
    currentPage: number
    totalUsers: number
    pageSize: number
    isFetching: boolean,
    followProcess: number[]
}
let initState: UsersDataType = {
    users: [],
    currentPage: 1,
    totalUsers: 0,
    pageSize: 10,
    isFetching: false,
    followProcess: []
}

let usersReducer = (state = initState, action: ActionsType): UsersDataType => {
    switch (action.type) {
        case 'users/CHANGE_FOLLOW_STATUS': {
            return {
                ...state,
                users: state.users?.map(u => {
                    if (u.id === action.data) {
                        return { ...u, followed: !u.followed }
                    }
                    else return u
                })
            }
        }
        case 'users/GET_USERS_DATA':
            return {
                ...state, users: action.data
            }
        case 'users/CHANGE_CURRENT_PAGE':
            return {
                ...state, currentPage: action.data
            }
        case 'users/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsers: action.data
            }
        case 'users/TOGGLE_FETCHING':
            return {
                ...state, isFetching: action.data
            }
        case 'users/FOLLOW_PROCESS':
            return {
                ...state,
                followProcess: action.data.value
                    ? [...state.followProcess, action.data.userId]
                    : state.followProcess.filter(id => id !== action.data.userId)
            }
        default:
            return state
    }
}


export default usersReducer