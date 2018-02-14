import React, { Component } from 'react';
import { Input, Icon } from 'antd';

class SearchBar extends Component {
	state = {
		search: ''
	}

	_onTypingChange = (e) => {
		this.setState({ search: e.target.value });
	}

	render() {
		const { search } = this.state;

		return (
			<Input
        placeholder="Find a repo..."
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={search}
        onChange={this._onTypingChange}
        ref={node => this.userNameInput = node}
      />
		);
	}
}

export default SearchBar;
