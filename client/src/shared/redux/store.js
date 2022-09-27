import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer, resetPasswordReducer } from './reducers/auth'
import {
	getStudentSpacesReducer,
	postStudentJoinSpaceReducer
} from './reducers/student'
import {
	getInstructorSpacesReducer,
	postInstructorCreateSpaceReducer
} from './reducers/instructor'
import {
	getUserProfileReducer,
	patchUserProfilePictureReducer,
	patchUserProfileReducer
} from './reducers/user'

const reducer = combineReducers({
	auth: authReducer,
	resetPassword: resetPasswordReducer,
	getUserProfile: getUserProfileReducer,
	patchUserProfile: patchUserProfileReducer,
	patchProfilePicture: patchUserProfilePictureReducer,
	getStudentSpaces: getStudentSpacesReducer,
	postJoinSpace: postStudentJoinSpaceReducer,
	getInstructorSpaces: getInstructorSpacesReducer,
	postInstructorCreate: postInstructorCreateSpaceReducer
})

const middleware = [thunk]

const storedUserData = localStorage.getItem('userData')
	? JSON.parse(localStorage.getItem('userData'))
	: {
			isLoggedIn: false,
			userId: null,
			token: null,
			isStudent: false,
			message: null,
			success: false
	  }

const INITIAL_STATE = {
	auth: {
		loading: false,
		error: null,
		signup: { success: false, message: null },
		login: storedUserData
	}
}

const store = createStore(
	reducer,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
