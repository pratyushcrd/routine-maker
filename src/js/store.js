import { createStore, compose, applyMiddleware } from 'redux'
import root from './reducers/root'
import thunk from 'redux-thunk'

window.store = compose(applyMiddleware(thunk))(createStore)(root)
export default window.store
