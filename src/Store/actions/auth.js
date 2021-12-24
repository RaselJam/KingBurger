import * as actionTypes from './actionTypes'

import axios from 'axios'
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}
export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	}
}
export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: err,
	}
}
export const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('expirationTime')
	localStorage.removeItem('userId')
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}
export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		//...
		dispatch(authStart())
		const apiKey = 'AIzaSyAI51ByCDQA3sTTf9vCkD1R4sGwSNbtQVg'
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		}
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
		if (!isSignUp) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
		}
		axios
			.post(url, authData)
			.then((res) => {
				console.log(res)
				const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000)
				localStorage.setItem('token', res.data.idToken)
				localStorage.setItem('expirationTime', expirationTime)
				localStorage.setItem('userId', res.data.localId)
				dispatch(authSuccess(res.data.idToken, res.data.localId))
				dispatch(checkAuthTimeout(res.data.expiresIn))
			})
			.catch((err) => {
				console.log('Error is :', err)
				dispatch(authFail(err.response.data.error))
			})
	}
}
export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	}
}
export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token')
		if (!token) {
			dispatch(logout())
		} else {
			const expirationTime = new Date(localStorage.getItem('expirationTime'))
			if (expirationTime <= new Date()) {
				dispatch(logout())
			} else {
				dispatch(authSuccess(token, localStorage.getItem('userId')))
				console.log(expirationTime.getSeconds() - new Date().getSeconds())
				dispatch(checkAuthTimeout(expirationTime.getTime() - new Date().getTime())/1000)
			}
		}
	}
}
