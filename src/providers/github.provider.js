const MAX_REPOS_PER_PAGE = 100;

class GithubProvider {
	/**
	 * Fetches basic information about a GitHub account.
	 * @param {string} type The type of the GitHub account, `users` || `orgs`.
	 * @param {string} name The name of the account, e.g `facebook`.
	 */
	fetchGithubAccount = async ({type, name}) => {
		const res = await (await fetch(`https://api.github.com/${type}/${name}`)).json();
		return res;
	}

	/**
	 * Fetches all repos for a given GitHub account.
	 * @param {string} repos_url The api url to the account's repos.
	 * @param {number} public_repos The total amount of repos an account has.
	 */
	fetchRepos = async (repos_url, public_repos) => {
		const nbPage = Math.ceil(public_repos / MAX_REPOS_PER_PAGE);
		const repos = [];
		for (let i = 1; i <= nbPage; i++) {
			const res = await (await fetch(`${repos_url}?per_page=${public_repos}&page=${i}`)).json();
			repos.push(...res);
		}
		return repos;
	}
}

export default new GithubProvider();
