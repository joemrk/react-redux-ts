import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/users.css';
import { ChangeFollowStatus, requestUsers } from '../redux/usersReducer';
import Preloader from './Common/Preloader/Preloader';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { getUsersSelector, getPageSize, getTotalUsers, getCurrentPage, getIsFetching, getFollowProcess } from '../redux/selectors/userSelector'
import { Pagination } from './Common/Pagination/Pagination';
import { AppStateType } from '../redux/reduxStore';
import { UserType } from '../api/usersApi';

type UsersListType = {
    requestUsers: (cp: number, ps: number) => void
    ChangeFollowStatus: (id: number) => void
    usersData: UserType[]
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsers: number
    followProcess: number[]
}
let Users: React.FC<UsersListType> = React.memo((props) => {
    useEffect(() => {
        props.requestUsers(props.currentPage, props.pageSize)
    }, [])

    return (
        <div className="users-wrap">
            <Preloader show={props.isFetching} />

            <Pagination pageSize={props.pageSize}
                currentPage={props.currentPage}
                totalUsers={props.totalUsers}
                requestUsers={props.requestUsers} />
            {
                props.usersData.map(u =>
                    <UserItem key={u.id} user={u} followProcess={props.followProcess}
                        ChangeFollowStatus={props.ChangeFollowStatus} />
                )
            }
        </div>
    )
})

type UserItemType = {
    followProcess: number[]
    user: UserType
    ChangeFollowStatus: (id: number, status: boolean) => void
}
let UserItem: React.FC<UserItemType> = ({followProcess, ChangeFollowStatus, user }) => {
    return (
        <div className="one-user-wrap page-block" style={{ marginBottom: '40px', padding: '20px' }}>

            <NavLink to={`/profile/${user.id}`}>
                <div><img src={(user.photos.small) ? user.photos.small : '/static/profiles/default_user.png'} alt="" width="100s" /></div>
            </NavLink>

            <div>{user.name}</div>
            <div><button disabled={followProcess.some(id => id === user.id)}
                onClick={() => { ChangeFollowStatus(user.id, user.followed) }}>
                {user.followed ? 'Unfollow' : 'Follow'}</button></div>
        </div>
    )
}


type MstpType = {
    usersData: UserType[] | undefined
    pageSize: number
    totalUsers: number
    currentPage: number
    isFetching: boolean
    followProcess: number[]
}
type MdtpType = {
    requestUsers: (cp: number, ps: number) => void
    ChangeFollowStatus: (id: number, status: boolean) => void
}
type OwnPropsType = {}
let mapStateToProps = (state: AppStateType) => ({
    usersData: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsers: getTotalUsers(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followProcess: getFollowProcess(state),
})

let mapDispatchToProps = {
    requestUsers,
    ChangeFollowStatus
}

export default compose(
    connect<MstpType, MdtpType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(Users)
