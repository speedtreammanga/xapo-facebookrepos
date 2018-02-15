import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import SideBar from './SideBar';
import SelectedRepo from '../components/SelectedRepo/SelectedRepo';

/**
 * Main Container component.
 * Sends new repoId to `SelectedRepo` on change.
 */
class App extends Component {
  render() {
		console.log(this.props);
    return (
			<Layout>
				<Layout>
					<SideBar />
					<Layout style={{marginLeft: 280}}>
						<SelectedRepo repoId={this.props.selectedRepo.id}/>
					</Layout>
				</Layout>
			</Layout>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		selectedRepo: state.selectedRepo
	}
}

export default connect(
	mapStateToProps,
	null
)(App);
