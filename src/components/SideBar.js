import React, { Component } from 'react';
import { Layout } from 'antd';
import ReposList from './ReposList';
import SearchBar from './SearchBar';
const { Sider } = Layout;

class SideBar extends Component {
	render() {
		return (
			<Sider width={280} style={styles.sider}>
				<Layout style={styles.searchBar}>
						<SearchBar/>
				</Layout>
				<Layout style={styles.reposListLayout}>
					<ReposList />
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
