import React, { Component } from 'react';
import '../style/App.css';
import { Layout } from 'antd';

import ReposList from './ReposList';
import SideBar from './SideBar';

const { Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
			<Layout>
				<Layout>
					<SideBar />
					<Layout style={styles.contentLayout}>
						<Content style={styles.content}>
							<h1>The Content</h1>
						</Content>
					</Layout>
				</Layout>
			</Layout>
    );
  }
}

const styles = {
	contentLayout: {
		padding: '0 24px 24px',
		marginLeft: 280,
	},
	content: {
		margin: '16px 0',
	},
}

export default App;
