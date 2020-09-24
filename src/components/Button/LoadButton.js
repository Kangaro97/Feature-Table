import React from 'react';
import classes from './LoadButton.module.css';

const loadButton = ({ type, buttonClicked, isLoading }) => {
	return (
		<button
			className={classes.button}
			onClick={buttonClicked}
			disabled={isLoading}>
			Load {type} data
		</button>
	);
};

export default loadButton;
