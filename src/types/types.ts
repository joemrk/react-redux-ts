


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
export type ProfilePhotosType = {
  small: string | null
  large: string | null
}
export type CurrentProfileType = {
  aboutMe:  string | null
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string | null
  contacts: ProfileContactsType
  photos: ProfilePhotosType
}
export type PostType = {}


export type UserType={
  name: string
  id: number
  photos: ProfilePhotosType
  status: string | null,
  followed: boolean
}


export type MessagesListType = {text: string | null}
export type DialogType = {
    dialogId: string
    dialogAvatar: string
    dialogName: string
    dialogLastMess: string
}

