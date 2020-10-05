import { DialogType , MessagesListType} from "../types/types"

type DraftDialogMessageActionType = {
    type: typeof DRAFT_DIALOG_MESSAGE
    data: string | null
}
type AddDialogMessageActionType = { type: typeof ADD_DIALOG_MESSAGE }



const DRAFT_DIALOG_MESSAGE = 'DRAFT_DIALOG_MESSAGE'
export const actionDraftDialogMes = (data: string | null): DraftDialogMessageActionType => ({ type: DRAFT_DIALOG_MESSAGE, data })

const ADD_DIALOG_MESSAGE = 'ADD_DIALOG_MESSAGE'
export const actionAddDialogMes = (): AddDialogMessageActionType => ({ type: ADD_DIALOG_MESSAGE })


type DialogDataType = {
    dialogsList: DialogType[]
    draftMess: string | null
    messagesList: MessagesListType[]
}
let initialState: DialogDataType = {
    dialogsList: [
        {
            dialogId: '1',
            dialogAvatar: "https://i.pinimg.com/originals/bf/0e/fe/bf0efef164126fe5ad26196ef0728300.jpg",
            dialogName: "Taylor Swift",
            dialogLastMess: "Message 1"
        },
        {
            dialogId: '2',
            dialogAvatar: "https://myinstagirls.com/wp-content/uploads/2019/04/Margot-Robbie.jpg",
            dialogName: "Margot Robbie",
            dialogLastMess: "Message 2"
        },
        {
            dialogId: '3',
            dialogAvatar: "https://www.kino-teatr.ru/news/16439/148117.jpg",
            dialogName: "Ana de Armas",
            dialogLastMess: "Message 3"
        },
    ],
    draftMess: '',
    messagesList: [
        {
            text: 'some message'
        },
    ]
}


const dialogReducer = (state = initialState, action: any): DialogDataType => {

    switch (action.type) {
        case DRAFT_DIALOG_MESSAGE:
            return { ...state, draftMess: action.data }
        case ADD_DIALOG_MESSAGE:
            return {
                ...state,
                draftMess: '',
                messagesList: [...state.messagesList, {
                    text: state.draftMess
                }]
            }
        default:
            return state
    }
}
export default dialogReducer