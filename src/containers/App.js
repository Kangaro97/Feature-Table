import React from 'react';
import './App.css';
import Table from '../components/Table/Table';
import LoadButton from '../components/Button/LoadButton';
import UserInfo from '../components/UserInfo/UserInfo';

export default class App extends React.Component {
	url = {
		small:
			'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		big:
			'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
	};
	rowsOnPage = 50;
	state = {
		data: [],
		sort: { key: null, order: null },
		isLoading: false,
		userInfo: {},
	};

	getJSON = (url) => {
		this.setState({ isLoading: true });
		this.loadJSON(url)
			.then((res) => {
				console.log(res);
				this.setState({ data: res, isLoading: false });
				
			})
			.catch((err) => {
				console.error(err);
				this.setState({ isLoading: false });
			});
	};

	loadJSON = (url) => {
		return fetch(url)
			.then((res) => (res = res.json()))
			.then((data) => data)
			.catch((err) => console.error(err));
	};

	sortData = (key, order) => {
		this.setState();
		const unsorted = [...this.state.data];
		const sorted = unsorted.sort((a, b) => {
			if (a[key] < b[key]) {
				return order === 'ascending' ? -1 : 1;
			}
			if (a[key] > b[key]) {
				return order === 'ascending' ? 1 : -1;
			}
			return 0;
		});
		console.log(sorted);
		//TODO: show process of reloading component? When 'sort' should be added?
		this.setState({ data: sorted , sort: { key, order } });
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

		let table;
		if (Object.keys(this.state.data).length !== 0) {
			table = (
				<Table
					data={this.state.data}
					sort={this.state.sort}
					onRowClicked={this.showInfo}
					sortData={this.sortData}
				/>
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
				{table}
				{userInfo}
			</div>
		);
	}
}
