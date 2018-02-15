import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Repo Item component.
 * Triggers `onClick` from props on click.
*/
class RepoListItem extends Component {
	state = {
		hover: false,
		click: false,
	}

	render() {
		const { repo } = this.props;
		return (
			<LayoutStyled onClick={this._handleOnClick}>
				{this._truncateRepoName(repo.name)}
			</LayoutStyled>
		);
	}

	// Handles on item click.
	_handleOnClick = () => {
		this.props.onClick(this.props.repo.id);
	}

	// Truncates the repo name to 25 characters.
	_truncateRepoName = (repo_name) => {
		if (repo_name.length > 25)
			return `${repo_name.slice(0, 25)}...`;
		return repo_name;
	}
}

const LayoutStyled = styled.div`
	padding: 8px 10px;
	cursor: pointer;
	font-size: 16px;
	background-color: #f9f9f9;
	transition: 0.15s linear;
	&:hover {
		background-color: #ddedf9;
	}
	&:active {
		background-color: #a2d0f2;
	}
`;

/**
 * PROPTYPES
 */
RepoListItem.propTypes = {
	repo: PropTypes.object.isRequired,
	onClick: PropTypes.func,
};

export default RepoListItem;
