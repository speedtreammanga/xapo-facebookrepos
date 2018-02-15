import { PICK_A_REPO, FILTER_REPOS } from '../actions/actionTypes';

const defaultSelectedRepoReducerState = {
	type: PICK_A_REPO,
	id: null,
	previousActions: [],
};
export function selectedRepoReducer(state = defaultSelectedRepoReducerState, action) {
	switch (action.type) {
		case PICK_A_REPO:
			const newAction = { type: PICK_A_REPO, id: action.payload };
			return {
				...state,
				...newAction,
				previousActions: [...state.previousActions, newAction]
			}
		default:
			return state;
	}
}

const defaultFilterRepoReducerState = {
	type: FILTER_REPOS,
	filter: '',
	previousActions: []
};
export function filterReposReducer(state = defaultFilterRepoReducerState, action) {
	switch (action.type) {
		case FILTER_REPOS:
			const newAction = { type: FILTER_REPOS, filter: action.payload };
			return {
				...state,
				...newAction,
				previousActions: [...state.previousActions, newAction]
			}
		default:
			return state;
	}
}
