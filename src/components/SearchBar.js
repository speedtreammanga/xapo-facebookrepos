import React, { Component } from 'react';
import { Input, Icon } from 'antd';

/**
 * Input component, triggering `onChange` function
 * if debouncing passes.
*/
class SearchBar extends Component {
	state = {
		filter: ''
	}

	constructor() {
		super();
		// debouncing input on change...
		this.triggerFilterSearch =
			this._debounce(this.triggerFilterSearch, 100);
	}

	// Trigger the debounced function.
	_onTypingChange = async (e) => {
		const filter = e.target.value;
		await this.setState({ filter });
		this.triggerFilterSearch();
	}

	// The function being debounced on input `typingChange`
	triggerFilterSearch = () => {
		this.props.onSearch(this.state.filter);
	}

	// Classic debounce function.
	// no need for `arguments` in `func.apply()` in this case.
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
      />
		);
	}
}

export default SearchBar;
