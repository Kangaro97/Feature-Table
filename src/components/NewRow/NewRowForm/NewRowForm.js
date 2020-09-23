import React, { Component } from 'react';

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
		console.log('Input ' + e.target.name + ' has value ' + e.target.value);
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
			<form onSubmit={this.addRow} onReset={this.resetForm}>
				<label>
					ID:
					<input
						type="text"
						name="id"
						placeholder="ID"
						pattern="[0-9]"
						value={this.state.id}
						onChange={this.inputChanged}
					/>
				</label>
				<label>
					First name:
					<input
						type="text"
						name="firstName"
						placeholder="First name"
						pattern="[A-Za-z][A-Za-z-]{1,32}"
						value={this.state.firstName}
						onChange={this.inputChanged}
					/>
				</label>
				<label>
					Last name:
					<input
						type="text"
						name="lastName"
						placeholder="Last name"
						pattern="[A-Za-z][A-Za-z-]{1,32}"
						value={this.state.lastName}
						onChange={this.inputChanged}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.inputChanged}
					/>
				</label>
				<label>
					Phone:
					<input
						type="tel"
						name="phone"
						placeholder="Phone (999)123-46-78"
						pattern="[(]{0,1}[0-9]{3}[)]{0,1}[0-9]{3}[-]{0,1}[0-9]{4}"
						value={this.state.phone}
						onChange={this.inputChanged}
					/>
				</label>
				<input
					type="submit"
					name="submit"
					value="Add"
					disabled={this.isAnyEmpty()}
				/>
				<input type="reset" name="reset" value="Reset" />
			</form>
		);
	}
}
