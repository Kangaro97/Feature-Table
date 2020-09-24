import React, { Component } from 'react';
import classes from './NewRowContainer.module.css';

export default class NewRowContainer extends Component {
	state = {
		isVisible: false,
	};
	switchVisability = () => {
		this.setState((state) => ({ isVisible: !state.isVisible }));
	};
	render() {
		return (
			<div className={classes.container}>
				<button className={classes.button} onClick={this.switchVisability}>
					{this.state.isVisible ? 'Hide form' : 'Add new row'}
				</button>
				{this.state.isVisible ? this.props.children : null}
			</div>
		);
	}
}
