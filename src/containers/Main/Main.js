import React, { Component, createRef } from 'react';
import classes from './Main.module.css';
import Spinner from '../../templates/spinner';
import LoadButton from '../../components/Button/LoadButton';
import NewRowContainer from '../NewRow/NewRowContainer';
import NewRowForm from '../../components/NewRowForm/NewRowForm';
import Filter from '../../components/Filter/Filter';
import Table from '../../components/Table/Table';
import THeader from '../../components/Table/TableHeader/TableHeader';
import Pagination from '../../components/Pagination/Pagination';
import UserInfo from '../../components/UserInfo/UserInfo';

import loadJSON from '../../lib/load';
import getPaginated from '../../lib/getPaginated';
import sort from '../../lib/sort';
import filter from '../../lib/filter';

export default class Main extends Component {
	url = {
		small:
			'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		big:
			'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
	};
	numberPerPage = 50;
	data = [];
	ref = createRef();
	state = {
		isFiltered: false,
		filtered: [],
		displayedData: [],
		sortParam: { key: null, order: null },
		currentPage: 1,
		isLoading: false,
		userInfo: {},
	};

	getJSON = (url) => {
		this.setState({ isLoading: true });
		loadJSON(url)
			.then((res) => {
				this.data = res.map((item) => {
					return {
						id: item.id ? item.id : '—',
						firstName: item.firstName ? item.firstName : '—',
						lastName: item.lastName ? item.lastName : '—',
						email: item.email ? item.email : '—',
						phone: item.phone ? item.phone : '—',
						description: item.description ? item.description : '—',
						address: item.address
							? {
									city: item.address.city ? item.address.city : '—',
									state: item.address.state ? item.address.state : '—',
									zip: item.address.zip ? item.address.zip : '—',
							  }
							: {
									city: '—',
									state: '—',
									zip: '—',
							  },
					};
				});
				this.setState({
					displayedData: getPaginated(res, 1, this.numberPerPage),
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
			displayedData: getPaginated(
				state.isFiltered ? state.filtered : this.data,
				number,
				this.numberPerPage
			),
		}));
	};

	sortFunc = (key, order) => {
		// копируем отображаемые данные для сортировки
		const unsorted = [...this.state.displayedData];
		// сортируем
		const sorted = sort(unsorted, key, order);
		// присваеваем новое, сортированное значение данным и новое значение параметрам сортировки
		this.setState({ displayedData: sorted, sortParam: { key, order } });
	};

	filterFunc = (filterStr) => {
		//применяем фильтр ко всем данным
		const filtered = filter(this.data, filterStr);
		// получаем первую страницу отфильтрованных данных
		const paginated = getPaginated(filtered, 1, this.numberPerPage);
		// присваеваем отфильтрованным и отображаемым данным новое значение
		this.setState({ isFiltered: true, filtered, displayedData: paginated });
	};

	resetFilter = () => {
		// заменяем отфильтрованные данные на 1-ю страниу обычных и, если была применена сортировка, применяем её к нефильтрованным данным
		this.setState(
			{
				isFiltered: false,
				filtered: [],
				displayedData: getPaginated(this.data, 1, this.numberPerPage),
				currentPage: 1,
			},
			() => {
				this.sortFunc(this.state.sortParam.key, this.state.sortParam.order);
			}
		);
	};

	addNewRow = (newRow) => {
		this.data.unshift(newRow);
		const displayedData = [...this.state.displayedData];
		displayedData.unshift(newRow);
		this.setState({ displayedData: displayedData });
	};

	showInfo = (id) => {
		if (id) {
			const info = this.state.displayedData.find((item) => item.id === id);
			this.setState({ userInfo: info }, () => {
				this.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		}
	};

	render() {
		let spinner;
		if (this.state.isLoading) {
			spinner = <Spinner />;
		} else {
			spinner = null;
		}

		let newRowContainer;
		let filter;
		let table;
		let pagination;
		if (!this.state.isLoading && Object.keys(this.data).length !== 0) {
			newRowContainer = (
				<NewRowContainer>
					<NewRowForm addNewRow={this.addNewRow} />
				</NewRowContainer>
			);
			filter = (
				<Filter filterFunc={this.filterFunc} resetFilter={this.resetFilter} />
			);
			table = (
				<Table data={this.state.displayedData} onRowClicked={this.showInfo}>
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
			newRowContainer = null;
			filter = null;
			table = null;
			pagination = null;
		}

		let userInfo;
		if (
			!this.state.isLoading &&
			Object.keys(this.state.userInfo).length !== 0
		) {
			userInfo = <UserInfo ref={this.ref} data={this.state.userInfo} />;
		} else {
			userInfo = null;
		}

		return (
			<div className={classes.main}>
				<div className={classes.buttonContainer}>
					<LoadButton
						type="small"
						buttonClicked={this.getJSON.bind(this, this.url.small)}
						isLoading={this.state.isLoading}
					/>
					<LoadButton
						type="big"
						buttonClicked={this.getJSON.bind(this, this.url.big)}
						isLoading={this.state.isLoading}
					/>
				</div>
				{spinner}
				<div>
					{filter}
					{newRowContainer}
					{table}
					{pagination}
					{userInfo}
				</div>
			</div>
		);
	}
}
