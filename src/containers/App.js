import React, { Component } from 'react';
import './App.css';
import Table from '../components/Table/Table';
import LoadButton from '../components/Button/LoadButton';
import Filter from '../components/Filter/Filter';
import UserInfo from '../components/UserInfo/UserInfo';
import THeader from '../components/Table/TableHeader/TableHeader';
import Pagination from '../components/Table/Pagination/Pagination';
import loadJSON from '../lib/load';
import getPaginated from '../lib/getPaginated';
import sort from '../lib/sort';
import filter from '../lib/filter';

export default class App extends Component {
	url = {
		small:
			'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		big:
			'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
	};
	numberPerPage = 50;
	data = [];
	state = {
		isFiltered: false,
		filtered: [],
		displaedData: [],
		sortParam: { key: null, order: null },
		currentPage: 1,
		isLoading: false,
		userInfo: {},
	};

	getJSON = (url) => {
		this.setState({ isLoading: true });
		loadJSON(url)
			.then((res) => {
				console.log(res);
				this.data = res;
				this.setState({
					displaedData: getPaginated(res, 1, this.numberPerPage),
					isLoading: false,
					sortParam: { key: null, order: null },
				});
			})
			.catch((err) => {
				console.error(err);
				this.setState({ isLoading: false });
			});
	};

	choosePage = (number) => {
		// присваиваем новое значение номера страницы
		this.setState({ currentPage: number });
		// на основе номера страницы и состояния фильтрации делаем выборку данных для отображения
		this.setState((state) => ({
			displaedData: getPaginated(
				state.isFiltered ? state.filtered : this.data,
				number,
				this.numberPerPage
			),
		}));
	};

	sortFunc = (key, order) => {
		// копируем отображаемые данные для сортировки
		const unsorted = [...this.state.displaedData];
		// сортируем
		const sorted = sort(unsorted, key, order);
		console.log('Sorted: ', sorted);
		//TODO: show process of reloading component? When 'sort' should be added?
		// присваеваем новое, сортированное значение данным и новое значение параметрам сортировки
		this.setState({ displaedData: sorted, sortParam: { key, order } });
	};

	filterFunc = (filterStr) => {
		console.log('filterStr from App: ', filterStr);
		//применяем фильтр ко всем данным
		const filtered = filter(this.data, filterStr);
		console.log('filtered from App: ', filtered);
		// получаем первую страницу отфильтрованных данных
		const paginated = getPaginated(filtered, 1, this.numberPerPage);
		// присваеваем отфильтрованным и отображаемым данным новое значение
		this.setState({ isFiltered: true, filtered, displaedData: paginated });
	};

	resetFilter = () => {
		// заменяем отфильтрованные данные на 1-ю страниу обычных и, если была применена сортировка, применяем её к нефильтрованным данным
		this.setState(
			{
				isFiltered: false,
				filtered: [],
				displaedData: getPaginated(this.data, 1, this.numberPerPage),
			},
			() => {
				this.sortFunc(this.state.sortParam.key, this.state.sortParam.order);
			}
		);
	};

	showInfo = (id) => {
		if (id) {
			const info = this.state.displaedData.find((item) => item.id === id);
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
		let pagination;
		if (Object.keys(this.data).length !== 0) {
			filter = (
				<Filter filterFunc={this.filterFunc} resetFilter={this.resetFilter} />
			);
			table = (
				<Table
					data={this.state.displaedData}
					sortParam={this.state.sortParam}
					onRowClicked={this.showInfo}
					sortFunc={this.sortFunc}>
					<THeader sortParam={this.state.sortParam} sortFunc={this.sortFunc} />
				</Table>
			);
			const pageCount = this.state.isFiltered
				? Math.ceil(this.state.filtered.length / this.numberPerPage)
				: Math.ceil(this.data.length / this.numberPerPage);
			pagination = (
				<Pagination
					pageСount={pageCount}
					currentPage={this.state.currentPage}
					choosePage={this.choosePage}
				/>
			);
		} else {
			filter = null;
			table = null;
			pagination = null;
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
					{pagination}
					{userInfo}
				</div>
			</div>
		);
	}
}
