import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/users.css';
import { ChangeFollowStatus, requestUsers, UsersFilterType } from '../redux/usersReducer';
import Preloader from './Common/Preloader/Preloader';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { getUsersSelector, getPageSize, getTotalUsers, getCurrentPage, getIsFetching, getFollowProcess, getUsersFilter } from '../redux/selectors/userSelector'
import { Pagination } from './Common/Pagination/Pagination';
import { AppStateType } from '../redux/reduxStore';
import { UserType } from '../api/usersApi';
import { Formik, Field } from 'formik';

// type UsersListType = {
//     requestUsers: (cp: number, ps: number, term: string) => void
//     ChangeFollowStatus: (id: number) => void
//     usersData: UserType[]
//     currentPage: number
//     pageSize: number
//     isFetching: boolean
//     totalUsers: number
//     followProcess: number[]
// }

let Users: React.FC<MstpType & MdtpType> = React.memo((props) => {
    useEffect(() => {
        props.requestUsers(props.currentPage, props.pageSize, props.usersFilter)
    }, [])

    let setFilter = (filter: UsersFilterType) => {
        props.requestUsers(1, props.pageSize, filter)
    }
    return (
        <div className="users-wrap">
            <Preloader show={props.isFetching} />
            <div className="top-controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Pagination pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    totalUsers={props.totalUsers}
                    filter={props.usersFilter}
                    requestUsers={props.requestUsers} />

                <FindUsersForm submitHandler={setFilter} />
            </div>

            {
                props.usersData.map(u =>
                    <UserItem key={u.id} user={u} followProcess={props.followProcess}
                        ChangeFollowStatus={props.ChangeFollowStatus} />
                )
            }
        </div>
    )
})

type DispatchFilterType = {
    submitHandler: (filter: UsersFilterType) => void
}
type UsersFilterFriendFormType = {
    term: string 
    friend: 'null'| 'true' | 'false'
}
let FindUsersForm: React.FC<DispatchFilterType> = React.memo(({ submitHandler }) => {
    let formSubmit = (values: UsersFilterFriendFormType, { setSubmitting }: { setSubmitting: (isSubmit: boolean) => void }) => {
        let filter: UsersFilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        submitHandler(filter);
        setSubmitting(false)
    }
    let formValidate = (values: UsersFilterFriendFormType) => {
        const errors = {}
        return errors
    }
    return (
        <div>
            <Formik initialValues={{ term: '', friend: 'null' }}
                onSubmit={formSubmit}
                validate={formValidate} >
                {({ values, errors, touched,
                    handleChange, handleBlur, handleSubmit,
                    isSubmitting,
                }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.term}
                                style={{ backgroundColor: '#fff', color: '#000' }}
                            />
                            <Field name="friend" as="select"
                            style={{ backgroundColor: '#fff', color: '#000'}}>
                                <option value="null">All</option>
                                <option value="true">Followed</option>
                                <option value="false">Unfollowed</option>
                            </Field>
                            <button type="submit" disabled={isSubmitting}> Find </button>
                        </form>
                    )}
            </Formik>
        </div>
    )
})

type UserItemType = {
    followProcess: number[]
    user: UserType
    ChangeFollowStatus: (id: number, status: boolean) => void
}
let UserItem: React.FC<UserItemType> = ({ followProcess, ChangeFollowStatus, user }) => {
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
    usersData: UserType[]
    pageSize: number
    totalUsers: number
    currentPage: number
    isFetching: boolean
    followProcess: number[]
    usersFilter: UsersFilterType
}
type MdtpType = {
    requestUsers: (cp: number, ps: number, filter: UsersFilterType) => void
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
    usersFilter: getUsersFilter(state)
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
