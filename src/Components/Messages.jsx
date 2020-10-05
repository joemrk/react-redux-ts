import React from 'react'
import '../styles/messages.css'
import { NavLink } from 'react-router-dom'
import TextWriter from './TextWriter'
import { actionDraftDialogMes, actionAddDialogMes } from '../redux/dialogReducer'
import { connect } from 'react-redux'


const Messages = (props) => {



    return (
        <div className="page-block page-messages">
            <div className="dialogs-list">
                <DialogsContainer />
            </div>
            <div className="dialog-messages">
                <DialogMessagesContainer />
            </div>
        </div>
    )
}
const Dialogs = (props) => {

    return (
        <div className="">
            {props.dialogsDataList}
        </div>
    )
}



let DialogsContainer = connect(
    (state) => ({
        dialogsDataList: state.messData.dialogsList.map(d =>
            <Dialog dialogId={d.dialogId}
                dialogAvatar={d.dialogAvatar}
                dialogName={d.dialogName}
                dialogLastMess={d.dialogLastMess} />)
    }), () => { })(Dialogs)


const Dialog = (props) => {
    let dialogId = props.dialogId
    let dialogAvatar = props.dialogAvatar
    let dialogName = props.dialogName
    let dialogLastMess = props.dialogLastMess

    let dialogAvatarStyle = {
        backgroundImage: `url(${dialogAvatar})`
    }
    return (
        <NavLink activeClassName='active-dialog' to={`/messages/${dialogId}`}>
            <div className="dialog-item">
                <div className="dialogs-item">
                    <div className="dialog-avatar" style={dialogAvatarStyle}></div>
                    <div className="dialog-tittle">
                        <div className="dialog-name">{dialogName}</div>
                        <div className="dialog-last-mess">{dialogLastMess}</div>
                    </div>
                </div>
            </div>
        </NavLink>

    )
}
const Message = (props) => {
    let messText = props.text
    return (
        <div className="message-cloud">{messText}</div>
    )
}
const DialogMessages = (props) => {
    return (
        <div className="dialog-chat">
            <div className="messages-lis">{props.dialogMessages}</div>
            <div className="message-write-area">
                <TextWriter dispatch={props.dispatch}
                    draftValue={props.draftValue}
                    onChange={props.onChange}
                    onClick={props.onClick} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dialogMessages: state.messData.messagesList.map((m) => <Message text={m.text} />),
    draftValue: state.messData.draftMess
})


const mapDispatchToProps = (dispatch) => {
    return ({
        onClick: () => { dispatch(actionAddDialogMes()) },
        onChange: (value) => { dispatch(actionDraftDialogMes(value)) }
    })
}

let DialogMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(DialogMessages)


export default Messages