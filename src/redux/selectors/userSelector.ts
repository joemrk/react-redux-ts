import { createSelector } from 'reselect'
import { AppStateType } from '../reduxStore';

export const getUsers = (state: AppStateType) => {
   return state.usersData.users
}

//сложный селектор если полученые из стейта данные еще нужно обрабоать
//юзаю либу reselect
//она не перерисовывает лишний раз компоненту
//решает проблемы вручную написаныых сложных селекторов
// принимает простые селекторы через запятую, последняя функция описывает логику селектора
export const getUsersSelector = createSelector(getUsers /*,getTotalUsers */, (users /*,totalUsers */) => {
   //типа сложная логика
   //
   return users
})

//просто селектор, если нужно просто вернуть данные
export const getPageSize = (state: AppStateType) => {
   
   return state.usersData.pageSize
}

export const getTotalUsers = (state: AppStateType) => {
   return state.usersData.totalUsers
}
export const getCurrentPage = (state: AppStateType) => {
   return state.usersData.currentPage
}

export const getIsFetching = (state: AppStateType) => {
   return state.usersData.isFetching
}

export const getFollowProcess = (state: AppStateType) => {
   return state.usersData.followProcess
}
export const getUsersFilter = (state: AppStateType) => {
   return state.usersData.filters
}