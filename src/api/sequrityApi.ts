import { ai, ApiResponseType } from "./api";

type SecurityCaptchaType = {
  url: string
}
export const securityApi = {
  GetCaptchaUrl() {
      try {
          return ai.get<SecurityCaptchaType>(`security/get-captcha-url`).then(res => res.data)
      } catch (error) {
          console.log(error);
      }
  }
}