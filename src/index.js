import React from 'react'
import ReactDOM from 'react-dom'



import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'


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
