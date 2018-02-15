import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import RepoListItem from '../components/RepoListItem';
import GithubProvider from '../providers/github.provider';
import { pickARepo } from '../actions/actions';

/**
 * Container component displaying available repositories.
 * Responsible for the `selectedRepoReducer` reducer.
 *
 * Sorts the list of repositories by their `watchers_count` DESC.
*/
class VisibleReposList extends Component {
	state = {
		repos: [],
		loading: false
	}

	async componentDidMount() {
		this._isLoading(true);

		const res = await GithubProvider
			.fetchGithubAccount({ type: 'orgs', name: 'facebook' });

		const repos = (await GithubProvider
			.fetchRepos(res.repos_url, res.public_repos))
			.sort((a, b) => b.watchers_count - a.watchers_count);

		this.setState({ repos });
		this._isLoading(false);
	}

	_isLoading = (bool) => {
		this.setState({ loading: bool });
	}

	render() {
		const { loading, repos } = this.state;
		const visibleRepos = repos.filter((repo) =>
			(repo.name.includes(this.props.filter.filter))
		);
		if (loading)
			return <LoadingP>Loading...</LoadingP>

		return (
			<div>
				{visibleRepos.map((repo, index) =>
					(<RepoListItem
						key={index}
						onClick={this.props.onRepoPick}
						repo={{id: repo.id, name: repo.name}}
					/>)
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

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRepoPick: (repoId) => {
			dispatch(pickARepo(repoId));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisibleReposList);
