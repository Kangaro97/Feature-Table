import React, { Component } from 'react';

export default class Filter extends Component {
	state = { filterStr: '' };

	inputChanged = (e) => {
		console.log('filterStr from Filter: ', this.state.filterStr);
		this.setState({ filterStr: e.target.value });
	};

	applyFilter = (e) => {
		this.props.filterFunc(this.state.filterStr);
		e.preventDefault();
	};

	resetFilter = () => {
		this.setState({ filterStr: '' });
		this.props.resetFilter();
	};

	render() {
		return (
			<form onSubmit={this.applyFilter}>
				<input
					type="text"
					name="filterInput"
					placeholder="Filter text"
					value={this.state.filterStr}
					onChange={this.inputChanged}
				/>
				<input type="submit" name="filterSubmit" value="Найти" />
				<input
					type="button"
					name="filterCancel"
					value="Сбросить"
					onClick={this.resetFilter}
				/>
			</form>
		);
	}
}
