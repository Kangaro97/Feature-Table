import React from 'react';
import classes from './Row.module.css';

const row = ({ data, onRowClicked }) => {
	return (
		<tr className={classes.row} onClick={() => onRowClicked(data.id)}>
			<td>{data.id}</td>
			<td>{data.firstName}</td>
			<td>{data.lastName}</td>
			<td>{data.email}</td>
			<td>{data.phone}</td>
		</tr>
	);
};
export default row;