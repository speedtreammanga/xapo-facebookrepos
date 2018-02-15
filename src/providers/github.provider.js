const MAX_REPOS_PER_PAGE = 100;

class GithubProvider {
	repos = [];

	details = {
		method: 'GET',
		headers: {
			'Authorization': 'token dc701b1b1e8b5b14b0c7422bfeb840ffe386e965'
		}
	}

	/**
	 * Fetches basic information about a GitHub account.
	 * @param {string} type The type of the GitHub account, `users` || `orgs`.
	 * @param {string} name The name of the account, e.g `facebook`.
	 */
	fetchGithubAccount = async ({type, name}) => {
		let repo;
		try {
			repo = await (await fetch(`https://api.github.com/${type}/${name}`, this.details)).json();
		} catch (err) {
			console.error('Something went wrong', err);
		}
		return repo;
	}

	/**
	 * Fetches all repos for a given GitHub account.
	 * @param {string} repos_url The api url to the account's repos.
	 * @param {number} public_repos The total amount of repos an account has.
	 */
	fetchRepos = async (repos_url, public_repos) => {
		const nbPage = Math.ceil(public_repos / MAX_REPOS_PER_PAGE);
		let repos = [];
		try {
			for (let i = 1; i <= nbPage; i++) {
				const res = await (await fetch(`${repos_url}?per_page=${public_repos}&page=${i}`, this.details)).json();
				repos.push(...res);
			}
			this.repos = repos;
		} catch (err) {
			console.error('Something went wrong', err);
		}
		return repos;
	}

	/**
	 * Fetch the contributors for a given repository.
	 * @param {number} repoId The Id of the repo you're fetching.
	 * @param {number} pageId The Id of the page you're fetching. `?page={pageId}`
	 */
	fetchRepoContributorsByRepoId = async (repoId, pageId) => {
		const repo = this.repos.find((repo) => repo.id === repoId);
		const contributors = await (await fetch(
			`${repo.contributors_url}?page=${pageId}`
		)).json();
		return contributors;
	}

	/**
	 * Returns a repo by a given repo id.
	 * @param {number} id A repository id.
	 */
	getRepoByRepoId = (id) => {
		return this.repos.find((repo) => repo.id === id);
	}
}

export default new GithubProvider();
