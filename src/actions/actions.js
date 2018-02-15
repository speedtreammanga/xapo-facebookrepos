import { PICK_A_REPO } from ''

export const pickARepo = (repo_id) => ({
	type: PICK_A_REPO,
	repo: repo_id,
});
