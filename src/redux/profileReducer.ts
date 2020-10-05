import { StatusCode } from '../api/api'
import { profileApi, ProfileType, ProfilePhotoType } from '../api/profileApi'
import { PostType } from '../types/types'
import { AppStateType, BaseThunkType, ActionObjectType } from './reduxStore'


const actions = {
    setProfileData: (data: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', data } as const),
    setProfileStatus: (data: string | null) => ({ type: 'profile/SET_STATUS', data } as const),
    setProfilePhoto: (data: ProfilePhotoType) => ({ type: 'profile/SET_PROFILE_PHOTO', data } as const)
}

type ActionsType = ReturnType<ActionObjectType<typeof actions>>
type ThunkType = BaseThunkType<ActionsType>

export const GetProfile = (profileId: number):ThunkType => async dispatch => {
    const data = await profileApi.GetProfile(profileId)
    if (data) dispatch(actions.setProfileData(data))
}

export const GetProfileStatus = (profileId: number):ThunkType => async dispatch => {
    const data = await profileApi.GetStatus(profileId)
   if(data !== undefined ) dispatch(actions.setProfileStatus(data))
}

export const UpdateProfileStatus = (statusText: string | null):ThunkType => async dispatch => {
    const data = await profileApi.UpdateStatus(statusText)
    if (data?.resultCode === StatusCode.Success) {        
        dispatch(actions.setProfileStatus(statusText))
    }
}
export const changeProfilePhoto = (fileName: any):ThunkType => async dispatch => {
    const data = await profileApi.UpdateProfilePhoto(fileName)
    if (data?.resultCode === StatusCode.Success) {
        dispatch(actions.setProfilePhoto(data.data.photos))
    }
}
export const ChangeProfileInfo = (profileInfo: ProfileType):ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const data = await profileApi.UpdateProfileInfo(profileInfo)
    if (data.resultCode === 0) {
        dispatch(GetProfile(userId))
    }
}

type ProfileDataType = {
    currentProfile: ProfileType | null
    draftPost: string | null
    postsData: PostType[]
    profileStatus: string | null
  }
let initialState: ProfileDataType = {
    currentProfile: null,
    draftPost: '',
    postsData: [],
    profileStatus: ''

}

const profileReducer = (state = initialState, action: ActionsType): ProfileDataType => {

    switch (action.type) {
        case 'profile/SET_USER_PROFILE': return { ...state, currentProfile: action.data }
        case 'profile/SET_STATUS': return { ...state, profileStatus: action.data }
        case 'profile/SET_PROFILE_PHOTO': return { ...state, currentProfile: {...state.currentProfile, photos: action.data} as ProfileType }
        default:
            return state
    }

}
export default profileReducer