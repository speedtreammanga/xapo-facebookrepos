import { PICK_A_REPO } from '../actions/actionTypes';

function repos(state = [], action) {
	switch (action.type) {
		case PICK_A_REPO:
			return [
				...state,
				{
					type: PICK_A_REPO,
					repo: action.repo
				}
			]
		default:
			return state;
	}
}

export default repos;
