import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

import GithubProvider from '../../providers/github.provider';
import RepoTag from './RepoTag';
import Contributor from './Contributor';

import { aRepo } from './repo.js';

class repo extends Component {
	state = {
		repo: null,
		contributors: [],
		contributors_page: 1,
		contributors_loading: false,
	}

	async componentWillReceiveProps(props) {
		if (props.repoId) {
			const repo = GithubProvider.getRepoByRepoId(props.repoId);
			this._loadMoreContributors(repo);
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

	_loadMoreContributors = async (repo) => {
		if (!this.state.noContributorsLeft) {
			await this.setState({ contributors_loading: true });
			const contributors =
				await GithubProvider.fetchRepoContributorsByRepoId(repo.id, this.state.contributors_page);
			await this.setState((prev) => {
				prev.repo = {...repo};
				++prev.contributors_page;
				prev.contributors.push(...contributors);
				prev.contributors_loading = false;
				prev.noContributorsLeft = contributors.length ? false : true;
				return prev;
			});
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
