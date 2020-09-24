import React, { Component } from 'react';
import classes from './NewRowForm.module.css';

export default class NewRowForm extends Component {
	state = {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		description: '—',
		address: {
			city: '—',
			state: '—',
			zip: '—',
		},
	};

	isAnyEmpty = () => {
		const { id, firstName, lastName, email, phone } = this.state;
		return (
			id.length < 1 ||
			firstName.length < 1 ||
			lastName.length < 1 ||
			email.length < 1 ||
			phone.length < 1
		);
	};

	inputChanged = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			console.log('State', this.state);
		});
	};

	addRow = (e) => {
		this.props.addNewRow(this.state);
		e.preventDefault();
	};

	resetForm = (e) => {
		this.setState({
			id: '',
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		});
		e.preventDefault();
	};

	render() {
		return (
			<form
				className={classes.form}
				onSubmit={this.addRow}
				onReset={this.resetForm}>
				<label className={`${classes.label} ${classes.left}`}>
					ID
					<input
						className={classes.text}
						type="text"
						name="id"
						placeholder="ID"
						pattern="[0-9]"
						value={this.state.id}
						onChange={this.inputChanged}
						required
					/>
				</label>
				<label className={`${classes.label} ${classes.right}`}>
					First name
					<input
						className={classes.text}
						type="text"
						name="firstName"
						placeholder="First name"
						pattern="[A-Za-z][A-Za-z-]{1,32}"
						value={this.state.firstName}
						onChange={this.inputChanged}
						required
					/>
				</label>
				<label className={`${classes.label} ${classes.left}`}>
					Last name
					<input
						className={classes.text}
						type="text"
						name="lastName"
						placeholder="Last name"
						pattern="[A-Za-z][A-Za-z-]{1,32}"
						value={this.state.lastName}
						onChange={this.inputChanged}
						required
					/>
				</label>
				<label className={`${classes.label} ${classes.right}`}>
					Email
					<input
						className={classes.text}
						type="email"
						name="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.inputChanged}
						required
					/>
				</label>
				<label className={`${classes.label} ${classes.left}`}>
					Phone
					<input
						className={classes.text}
						type="tel"
						name="phone"
						placeholder="Phone (999)123-46-78"
						pattern="[(]{0,1}[0-9]{3}[)]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}"
						value={this.state.phone}
						onChange={this.inputChanged}
						required
					/>
				</label>
				<div className={classes.buttonContainer}>
					<input
						className={classes.button}
						type="submit"
						name="submit"
						value="Add"
						disabled={this.isAnyEmpty()}
					/>
					<input
						className={`${classes.button} ${classes.reset}`}
						type="reset"
						name="reset"
						value="Reset"
					/>
				</div>
			</form>
		);
	}
}
