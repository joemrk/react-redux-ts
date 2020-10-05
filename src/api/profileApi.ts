import { ai, ApiResponseType } from "./api";


export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string  | null
    fullName: string
    aboutMe: string  | null
    contacts: ProfileContactsType
    photos: ProfilePhotoType
}
export type ProfileContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type ProfilePhotoType = {
    small: string | null
    large: string | null
}
type ProfilePhotosResponseType = {
    photos: ProfilePhotoType
}
export const profileApi = {
    GetProfile(profileId: number) {
        try {
            return ai.get<ProfileType>(`profile/${profileId}`).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    GetStatus(profileId: number) {
        try {
            return ai.get<string>(`profile/status/${profileId}`).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    UpdateStatus(status: string | null) {
        try {
            return ai.put<ApiResponseType>(`profile/status`, { status: status }).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    UpdateProfilePhoto(photo: any) {
        try {
            const formData = new FormData()
            formData.append("image", photo)
            return ai.put<ApiResponseType<ProfilePhotosResponseType>>(`profile/photo`, formData, {
                headers: {
                    'content-type': 'multiple/form-data'
                }
            }).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    UpdateProfileInfo(data: ProfileType) {
        try {
            return ai.put(`profile`, data).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    }
}