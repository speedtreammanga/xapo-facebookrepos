import React, { Component } from 'react';
import { Layout } from 'antd';
import ReposList from './ReposList';
import SearchBar from './SearchBar';
const { Content, Sider } = Layout;

class SideBar extends Component {
	render() {
		return (
			<Sider width={280} style={styles.sider}>
				<Layout style={styles.searchBar}>
					<h3 style={styles.title}>Repo search</h3>
					<div style={{}}>
						<SearchBar/>
					</div>
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
		backgroundColor: 'white',
	},
	searchBar: {
		position: 'fixed',
		width: 280,
	},
	reposListLayout: {
		marginTop: 65,
		backgroundColor: 'white',
	}
}

export default SideBar;
