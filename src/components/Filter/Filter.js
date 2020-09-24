import React, { Component } from 'react';
import classes from './Filter.module.css';

export default class Filter extends Component {
	state = { filterStr: '' };

	inputChanged = (e) => {
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
			<form className={classes.form} onSubmit={this.applyFilter}>
				<input
					className={classes.text}
					type="text"
					name="filterInput"
					placeholder="Filter text"
					value={this.state.filterStr}
					onChange={this.inputChanged}
					required
				/>
				<div className={classes.buttonContainer}>
					<input
						className={classes.button}
						type="submit"
						name="filterSubmit"
						value="Найти"
					/>
					<input
						className={`${classes.button} ${classes.reset}`}
						type="button"
						name="filterCancel"
						value="Сбросить"
						onClick={this.resetFilter}
					/>
				</div>
			</form>
		);
	}
}
