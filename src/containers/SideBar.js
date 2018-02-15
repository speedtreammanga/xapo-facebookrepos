import React, { Component } from 'react';
import { Layout } from 'antd';

import VisibleReposList from '../containers/VisibleReposList';
import SearchBar from '../components/SearchBar';
const { Sider } = Layout;

class SideBar extends Component {

	_handleSearch = (text) => {
		// ...
	}

	render() {
		return (
			<Sider width={280} style={styles.sider}>
				<Layout style={styles.searchBar}>
						<SearchBar onSearch={this._handleSearch}/>
				</Layout>
				<Layout style={styles.reposListLayout}>
					<VisibleReposList />
				</Layout>
			</Sider>
		);
	}
}

const styles = {
	title: {
		margin: 0,
	},
	sider: {
		overflow: 'auto',
		height: '100vh',
		position: 'fixed',
		left: 0,
		backgroundColor: '#f9f9f9',
	},
	searchBar: {
		position: 'fixed',
		width: 280,
	},
	reposListLayout: {
		marginTop: 45,
	}
}

export default SideBar;
