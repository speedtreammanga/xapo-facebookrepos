import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

import GithubProvider from '../../providers/github.provider';
import RepoTag from './RepoTag';
import Contributor from './Contributor';

/**
 * Component displaying a reposority's detail information
 * based on a `repo id`.
*/
class repo extends Component {
	state = {
		repo: null,
		contributors: [],
		contributors_page: 1,
		contributors_loading: false,
	}

	/**
	 * Fetches a repo by its `repo id`, re-initializes
	 * the state information & fetches a list of
	 * contributors.
	 * @param {*} props Component's props.
	 */
	async componentWillReceiveProps(props) {
		if (props.repoId) {
			// fetching repo...
			const repo = GithubProvider.getRepoByRepoId(props.repoId);
			await this.setState({
				contributors: [],
				contributors_page: 1,
				noContributorsLeft: false,
				contributors_loading: true,
				repo,
			});
			// fetching contributors...
			this._loadMoreContributors();
		}
	}

	render() {
		const { contributors, repo } = this.state;

		if (!repo)
			return (
				<Placeholder>
					<Emoticon><span role="img" aria-label="wave emoticon">👋</span></Emoticon>
					<h1>Hey, nice to see you</h1>
					<p>Pick a repository on your left to get started!</p>
				</Placeholder>
			)

		return (
			<Container>
				<StyledRow>
					<Col xs={24}>
						<RepoName>{repo.name}</RepoName>
					</Col>
				</StyledRow>
				<StyledRow>
					<Col xs={24}>
						<RepoTag color="green" title="Watchers" counter={repo.watchers_count} />
						<RepoTag color="orange" title="Stars" counter={repo.stargazers_count} />
						<RepoTag color="cyan" title="Forks" counter={repo.forks_count} />
						<RepoTag color="red" title="Open Issues" counter={repo.open_issues_count} />
					</Col>
				</StyledRow>
				<StyledRow>
					<Col xs={24}>
						<a href={repo.html_url} target="_blank">
							<RepoTag title="GitHub repo" icon="link"/>
						</a>
						{repo.license &&
							<RepoTag title={repo.license.name} icon="book"/>
						}
					</Col>
				</StyledRow>
				<StyledRow>
					<h3>Description: </h3>
					<Description>{repo.description}</Description>
				</StyledRow>
				<StyledRow>
					<Col xs={24}>
					<h3>Contributors:</h3>
						{contributors.map((c, index) => (
							<Contributor
								key={index}
								avatar_url={c.avatar_url}
								html_url={c.html_url}
								login={c.login}
								contributions={c.contributions}
							/>
						))
						}
					</Col>
					<Col xs={24}>
						<Button
							disabled={this.state.noContributorsLeft}
							loading={this.state.contributors_loading}
							onClick={this._loadMoreContributors}
						>
							Load more
						</Button>
					</Col>
				</StyledRow>
			</Container>
		);
	}

	/**
	 * Fetches current repo's contributors
	 * by `repo id` & `page count id`.
	 */
	_loadMoreContributors = async () => {
		try {
			if (!this.state.noContributorsLeft) {
				const contributors = await GithubProvider
					.fetchRepoContributorsByRepoId(
						this.state.repo.id,
						this.state.contributors_page
					);
				await this.setState((prev) => ({
					contributors_page: prev.contributors_page + 1,
					contributors: [...prev.contributors, ...contributors],
					contributors_loading: false,
					// GitHub loads 30 contributors per page, therefore,
					// if the nb of contributors we got % 30 !== 0, it means
					// there are no more contributors to load => `noContributorsLeft`: true
					noContributorsLeft:
						contributors.length !== 0 && contributors.length % 30 === 0
						? false
						: true
				}));
			}
		} catch (err) {
			console.log('Something went wrong', err);
		}
	}
}

const Placeholder = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	background: #eee;
`;
const Emoticon = styled.h1`
	font-size: 4rem;
	margin: 0;
`;
const Container = styled.div`
	background-color: white;
	padding: 20px;
`;
const RepoName = styled.h1`
	font-weight: bold;
	margin: 0;
	line-height: 1;
`;
const StyledRow = styled(Row)`
	margin-bottom: 20px;
`;
const Description = styled.p`
	font-size: 15px;
`;

repo.propTypes = {
	repo: PropTypes.object,
}

export default repo;
