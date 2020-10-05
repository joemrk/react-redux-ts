import { ai, ApiResponseType } from "./api";

export type AuthType = {
  id: number | null
  email: string | null
  login: string | null
}
type LoginType = {
  userId: number
}

export const authApi = {
  CheckAuth() {
      try {
          return ai.get<ApiResponseType<AuthType>>(`auth/me`).then(res => res.data)
      } catch (error) {
          console.log(error);
      }
  },
  Login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
      try {
          return ai.post<ApiResponseType<LoginType>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
      } catch (error) {
          console.log(error);
      }
  },
  Logout() {
      try {
          return ai.delete<ApiResponseType<any>>(`auth/login`).then(res => res.data)
      } catch (error) {
          console.log(error);
      }
  }
}