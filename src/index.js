import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import burgerReducer from './Store/reducers/burgerBuilder'
import orderReducer from './Store/reducers/order'
import authReducer  from './Store/reducers/auth'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// const logger = (store) => {
// 	return (next) => {
// 		return (action) => {
// 			console.log('[MiddleWare] Dispatching ', action)
// 			const result = next(action)
// 			console.log('[MidleWare] next state :', store.getState())
// 			return result
// 		}
// 	}
// }

const rootReducer = combineReducers({ burgerBuilder: burgerReducer, order: orderReducer, auth : authReducer })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
