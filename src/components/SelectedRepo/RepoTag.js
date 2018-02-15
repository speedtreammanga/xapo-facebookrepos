import React, { Component } from 'react';
import { Tag, Icon } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class RepoTag extends Component {
	render() {
		const { color, title, icon, counter } = this.props;
		return (
			<Tag color={color}>
				<Title>
					{icon &&
						<Icon type={icon} />
					}
					{title}{counter && ' | '}
				</Title>
				{counter}
			</Tag>
		);
	}
}

const Title = styled.span`
	font-weight: bold;
`;

RepoTag.propTypes = {
	color: PropTypes.string,
	title: PropTypes.string.isRequired,
	counter: PropTypes.oneOfType(
		[PropTypes.string,
		PropTypes.number]
	)
};

export default RepoTag;
