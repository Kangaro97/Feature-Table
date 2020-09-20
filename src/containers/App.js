import React, { Component } from 'react';
import './App.css';
import Table from '../components/Table/Table';
import LoadButton from '../components/Button/LoadButton';
import Filter from '../components/Filter/Filter';
import UserInfo from '../components/UserInfo/UserInfo';
import THeader from '../components/Table/TableHeader/TableHeader';
import loadJSON from '../lib/load';
import sort from '../lib/sort';
import filter from '../lib/filter';

export default class App extends Component {
	url = {
		small:
			'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		big:
			'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
	};
	rowsOnPage = 50;
	state = {
		data: [],
		isFiltered: false,
		filtered: [],
		sortParam: { key: null, order: null },
		isLoading: false,
		userInfo: {},
	};

	getJSON = (url) => {
		this.setState({ isLoading: true });
		loadJSON(url)
			.then((res) => {
				console.log(res);
				this.setState({ data: res, isLoading: false });
			})
			.catch((err) => {
				console.error(err);
				this.setState({ isLoading: false });
			});
	};

	sortFunc = (key, order) => {
		const unsorted = this.state.isFiltered
			? [...this.state.filtered]
			: [...this.state.data];
		const sorted = sort(unsorted, key, order);
		console.log(sorted);
		//TODO: show process of reloading component? When 'sort' should be added?
		this.setState({ sortParam: { key, order } });
		this.state.isFiltered
			? this.setState({ filtered: sorted })
			: this.setState({ data: sorted });
	};

	filterFunc = (filterStr) => {
		console.log('filterStr from App: ', filterStr);
		const filtered = filter(this.state.data, filterStr);
		console.log('filtered from App: ', filtered);
		this.setState({ filtered, isFiltered: true });
	};

	resetFilter = () => {
		this.setState({ isFiltered: false, sortParam: { key: null, order: null } });
	};

	showInfo = (id) => {
		if (id) {
			const info = this.state.data.find((item) => item.id === id);
			this.setState({ userInfo: info });
		}
	};

	render() {
		let loginStatus;
		if (this.state.isLoading) {
			loginStatus = <p>Loading...</p>;
		} else {
			loginStatus = <p>Not loading.</p>;
		}

		let userInfo;
		if (Object.keys(this.state.userInfo).length !== 0) {
			userInfo = <UserInfo data={this.state.userInfo} />;
		} else {
			userInfo = null;
		}

		let filter;
		let table;
		if (Object.keys(this.state.data).length !== 0) {
			filter = (
				<Filter filterFunc={this.filterFunc} resetFilter={this.resetFilter} />
			);
			table = (
				<Table
					data={this.state.isFiltered ? this.state.filtered : this.state.data}
					sortParam={this.state.sortParam}
					onRowClicked={this.showInfo}
					sortFunc={this.sortFunc}>
					<THeader sortParam={this.state.sortParam} sortFunc={this.sortFunc} />
				</Table>
			);
		} else {
			table = null;
		}

		return (
			<div className="App">
				<LoadButton
					type="small"
					buttonClicked={this.getJSON.bind(this, this.url.small)}
				/>
				<LoadButton
					type="big"
					buttonClicked={this.getJSON.bind(this, this.url.big)}
				/>
				{loginStatus}
				<div>
					{filter}
					{table}
					{userInfo}
				</div>
			</div>
		);
	}
}
