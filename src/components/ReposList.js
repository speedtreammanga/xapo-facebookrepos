import React, { Component } from 'react';

const MAX_REPOS_PER_PAGE = 100;

class ReposList extends Component {
	state = {
		repos: [],
		loading: false
	}

	async componentDidMount() {
		this._isLoading(true);
		const res = await (await fetch('https://api.github.com/orgs/facebook')).json();
		const repos = await this._fetchRepos(res.repos_url, res.public_repos);
		this.setState({ repos });
		this._isLoading(false);
	}

	async _fetchRepos(repos_url, public_repos) {
		const nbPage = Math.ceil(public_repos / MAX_REPOS_PER_PAGE);
		const repos = [];
		for (let i = 1; i <= nbPage; i++) {
			const res = await (await fetch(`${repos_url}?per_page=${public_repos}&page=${i}`)).json();
			repos.push(...res);
		}
		return repos;
	}

	_isLoading(bool) {
		this.setState({ loading: bool });
	}

	render() {
		const { loading, repos } = this.state;

		if (loading)
			return <p>Loading...</p>

		return (
			<div>
				{repos.map((repo, index) => (<p key={index}>{index + 1}.{' '}{repo.name}</p>))}
			</div>
		);
	}
}

export default ReposList;
