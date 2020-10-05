import { AppStateType, BaseThunkType, ActionObjectType } from './reduxStore';
import { CheckAuth } from './authReducer'


export type IniStateType = {
     initialized: boolean
}
const actions = {
     setInitialized: () => ({ type: 'app/SET_INITIALIZED' } as const)
}
type ActionsType = ReturnType<ActionObjectType<typeof actions> >
type ThunkType = BaseThunkType<ActionsType>


export const initApp = ():ThunkType => async dispatch => {
     let checkAuthResult = dispatch(CheckAuth())
     await Promise.all([checkAuthResult])
     dispatch(actions.setInitialized())
}

let iniState: IniStateType = {
     initialized: false
}

let appReducer = (state = iniState, action: ActionsType): IniStateType => {
     switch (action.type) {
          case 'app/SET_INITIALIZED':
               return { ...state, initialized: true }
          default:
               return state
     }
}

export default appReducer