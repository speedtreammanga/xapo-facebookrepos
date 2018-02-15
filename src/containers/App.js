import React, { Component } from 'react';
import { Layout } from 'antd';

import SideBar from './SideBar';
import SelectedRepo from '../components/SelectedRepo/SelectedRepo';

class App extends Component {
  render() {
    return (
			<Layout>
				<Layout>
					<SideBar />
					<Layout style={{marginLeft: 280}}>
						<SelectedRepo />
					</Layout>
				</Layout>
			</Layout>
    );
  }
}

export default App;
