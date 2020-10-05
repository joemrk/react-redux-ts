import axios from 'axios';

export const ai = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '7ef6c5de-2ee3-412d-baad-f169d2b8fbc5'
    }
})

export type ApiResponseType<T = {}> = {
    data: T
    resultCode: StatusCode
    fieldsErrors: string[]
    messages: string[]
}
export enum StatusCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
  }






