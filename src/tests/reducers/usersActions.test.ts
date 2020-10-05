import usersReducer, { UsersDataType, actions } from '../../redux/usersReducer';


let state: UsersDataType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 1, name: 'user1', status: 'status1', followed: false, photos: {
          small: null, large: null
        }
      },
      {
        id: 2, name: 'user2', status: 'status2', followed: false, photos: {
          small: null, large: null
        }
      },
      {
        id: 3, name: 'user3', status: 'status3', followed: true, photos: {
          small: null, large: null
        }
      },
      {
        id: 4, name: 'user4', status: 'status4', followed: true, photos: {
          small: null, large: null
        }
      }
    ],
    currentPage: 1,
    totalUsers: 0,
    pageSize: 10,
    isFetching: false,
    followProcess: []
  }
})

test('Follow & Unfollow', () => {

  const newState = usersReducer(state, actions.changeFollowStatusAC(2))

  expect(newState.users[1].followed).toBeTruthy()
  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeTruthy()
  expect(newState.users[0].followed).toBeFalsy()

})