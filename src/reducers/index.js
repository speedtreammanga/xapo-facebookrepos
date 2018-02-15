import { combineReducers, createStore } from 'redux';
import repos from './repos';

const reducer = combineReducers({ repos });
const store = createStore(reducer);
export default store;
