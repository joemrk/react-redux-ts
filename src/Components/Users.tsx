import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import '../styles/users.css';
import { ChangeFollowStatus, requestUsers, UsersFilterType } from '../redux/usersReducer';
import Preloader from './Common/Preloader/Preloader';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { getUsersSelector, getPageSize, getTotalUsers, getCurrentPage, getIsFetching, getFollowProcess, getUsersFilter } from '../redux/selectors/userSelector'
import { Pagination } from './Common/Pagination/Pagination';
import { UserType } from '../api/usersApi';
import { Formik, Field } from 'formik';

let Users: React.FC = React.memo((props) => {

    let usersData = useSelector(getUsersSelector)
    let pageSize = useSelector(getPageSize)
    let totalUsers = useSelector(getTotalUsers)
    let currentPage = useSelector(getCurrentPage)
    let isFetching = useSelector(getIsFetching)
    let usersFilter = useSelector(getUsersFilter)
    
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, usersFilter))
    }, [])
    let onPageChanged = (pageNumber:number) => {
        dispatch(requestUsers(pageNumber, pageSize, usersFilter))
    }
    let setFilter = (filter: UsersFilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    return (
        <div className="users-wrap">
            <Preloader show={isFetching} />
            <div className="top-controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Pagination pageSize={pageSize}
                    currentPage={currentPage}
                    totalUsers={totalUsers}
                    filter={usersFilter}
                    requestUsers={onPageChanged} />

                <FindUsersForm submitHandler={setFilter} />
            </div>

            {
                usersData.map(u =>
                    <UserItem key={u.id} user={u} />
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
    user: UserType
}
let UserItem: React.FC<UserItemType> =  React.memo(({ user }) => {
    let followProcess = useSelector(getFollowProcess)
    let dispatch = useDispatch()

    return (
        <div className="one-user-wrap page-block" style={{ marginBottom: '40px', padding: '20px' }}>

            <NavLink to={`/profile/${user.id}`}>
                <div><img src={(user.photos.small) ? user.photos.small : '/static/profiles/default_user.png'} alt="" width="100s" /></div>
            </NavLink>

            <div>{user.name}</div>
            <div><button disabled={followProcess.some(id => id === user.id)}
                onClick={() => { dispatch(ChangeFollowStatus(user.id, user.followed)) }}>
                {user.followed ? 'Unfollow' : 'Follow'}</button></div>
        </div>
    )
})

export default compose(
    withRouter,
    withAuthRedirect
)(Users)
