import { PICK_A_REPO, FILTER_REPOS } from './actionTypes';

export const pickARepo = (selected_repo) => ({
	type: PICK_A_REPO,
	payload: selected_repo,
});

export const filterRepos = (filter) => ({
	type: FILTER_REPOS,
	payload: filter
});
