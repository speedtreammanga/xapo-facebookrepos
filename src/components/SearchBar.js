import React, { Component } from 'react';
import { Input, Icon } from 'antd';

class SearchBar extends Component {
	state = {
		filter: ''
	}

	constructor() {
		super();
		this.triggerFilterSearch =
			this._debounce(this.triggerFilterSearch, 100);
	}

	_onTypingChange = async (e) => {
		const filter = e.target.value;
		await this.setState({ filter });
		this.triggerFilterSearch();
	}

	triggerFilterSearch = () => {
		this.props.onSearch(this.state.filter);
	}

	_debounce = (func, delay) => {
		let timer;
		return () => {
			clearTimeout(timer);
			timer = setTimeout(() => func.apply(this), delay);
		}
	}

	render() {
		const { filter } = this.state;

		return (
			<Input
        placeholder="Find a repo..."
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={filter}
        onChange={this._onTypingChange}
        ref={node => this.userNameInput = node}
      />
		);
	}
}

export default SearchBar;
