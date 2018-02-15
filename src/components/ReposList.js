import React, { Component } from 'react';
import RepoListItem from './RepoListItem';
import styled from 'styled-components';

import GithubProvider from '../providers/github.provider';

class ReposList extends Component {
	state = {
		repos: [],
		loading: false
	}

	async componentDidMount() {
		this._isLoading(true);
		const res = await GithubProvider.fetchGithubAccount({
			type: 'orgs',
			name: 'facebook'
		});
		const repos = await GithubProvider.fetchRepos(res.repos_url, res.public_repos);
		this.setState({ repos });
		this._isLoading(false);
	}

	_isLoading = (bool) => {
		this.setState({ loading: bool });
	}

	_handleRepoSelection = (repo) => {
		console.log('CLICKED ON', repo.name);
	}

	render() {
		const { loading, repos } = this.state;

		if (loading)
			return <LoadingP>Loading...</LoadingP>

		return (
			<div>
				{repos.map((repo, index) =>
					(<RepoListItem onClick={this._handleRepoSelection} key={index} repo={repo} />)
				)}
			</div>
		);
	}
}

const LoadingP = styled.p`
	background-color: #f9f9f9;
	text-align: center;
	margin: 0;
	padding: 0;
`;

export default ReposList;
