import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import VisibleReposList from '../containers/VisibleReposList';
import SearchBar from '../components/SearchBar';
import { filterRepos } from '../actions/actions';

const { Sider } = Layout;

/**
 * Container component displaying `VisibleReposList` and `SearchBar`.
 * Responsible for the `filterReposReducer` reducer.
 *
 * Dispatches a new `filter` on `SearchBar` change.
*/
class SideBar extends Component {
	render() {
		return (
			<Sider width={280} style={styles.sider}>
				<Layout style={styles.searchBar}>
						<SearchBar onSearch={this.props.onSearch}/>
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

const mapDispatchToProps = (dispatch) => {
	return {
		onSearch: (filter) => {
			dispatch(filterRepos(filter));
		}
	}
}

export default connect(
	null,
	mapDispatchToProps
)(SideBar);
