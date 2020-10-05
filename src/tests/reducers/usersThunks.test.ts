import { usersApi } from './../../api/usersApi';
import usersReducer, { UsersDataType, actions, ChangeFollowStatus } from '../../redux/usersReducer';
import { ApiResponseType, StatusCode } from '../../api/api';

jest.mock('./../../api/usersApi')
const usersApiMok = usersApi as jest.Mocked<typeof usersApi>

const result: ApiResponseType = {
  resultCode: StatusCode.Success,
  messages: [],
  fieldsErrors: [],
  data: {}
}

const dispatchMock = jest.fn()
const stateMock = jest.fn()

let state: UsersDataType;

beforeEach(() => {
  dispatchMock.mockClear()
  stateMock.mockClear()

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


usersApiMok.FollowOnUser.mockReturnValue(Promise.resolve(result))

test('Actions with follow', async () => {
  const thunk = ChangeFollowStatus(1, false)
  
  await thunk(dispatchMock)
  // await thunk(dispatchMock, stateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
})