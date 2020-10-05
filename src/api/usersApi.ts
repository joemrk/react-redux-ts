import { ai, ApiResponseType } from "./api";
import { ProfilePhotosType } from '../types/types';


export type UsersType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
export type UserType = {
    id: number
    name: string
    status: string | null
    photos: ProfilePhotosType
    followed: boolean
}
export const usersApi = {
    GetUsers(currentPage = 1, pageSize = 5) {
        try {
            return ai.get<UsersType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    GetPageUsers(pageIndex: number, pageSize: number) {
        try {
            return ai.get<ApiResponseType<UsersType>>(`users?page=${pageIndex}&count=${pageSize}`).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    FollowOnUser(userId: number) {
        try {
            return ai.post<ApiResponseType>(`follow/${userId}`).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
    UnfollowFromUser(userId: number) {
        try {
            return ai.delete<ApiResponseType>(`follow/${userId}`).then(res => res.data)
        } catch (error) {
            console.log(error);
        }
    },
}