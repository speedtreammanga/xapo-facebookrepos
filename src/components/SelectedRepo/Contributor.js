import React, { Component } from 'react';
import { Row, Col, Avatar, Popover } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RepoTag from './RepoTag';

class Contributor extends Component {

	render() {
		const {
			avatar_url,
			html_url,
			login,
			contributions,
		} = this.props;

		const content = (
			<div>
				<RepoTag color="green" title="Contributions" counter={contributions} />
				<a href={html_url} target="_blank">
					<RepoTag title="GitHub" icon="link"/>
				</a>
			</div>
		);

		return (
			<Popover
				title={(
					<Login>
						<a href={avatar_url}>
							{login}
						</a>
					</Login>
				)}
				content={content}
			>
				<Avatar
					style={{margin: 5}}
					size="large"
					shape="square"
					src={avatar_url}
				/>
			</Popover>
		);
	}
}

const Login = styled.h2`
	margin: 0;
`;

Contributor.propTypes = {
	avatar_url: PropTypes.string.isRequired,
	html_url: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	contributions: PropTypes.number,
}

export default Contributor;
