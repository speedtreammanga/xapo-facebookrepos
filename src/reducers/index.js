import { combineReducers, createStore } from 'redux';
import { selectedRepoReducer, filterReposReducer } from './repos.reducer';

const reducer = combineReducers(
	{
		selectedRepo: selectedRepoReducer,
		filter: filterReposReducer
	}
);
// Creating the store...
const store = createStore(reducer);
export default store;
