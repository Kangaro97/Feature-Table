import React from 'react';
import Row from './Row/Row';
import classes from './Table.module.css';

const table = ({ children, data, onRowClicked }) => {
	return (
		<table className={classes.table}>
			<thead>{children}</thead>
			<tbody>
				{data.map((item, i) => (
					<Row data={item} key={i} onRowClicked={onRowClicked} />
				))}
			</tbody>
		</table>
	);
};

export default table;
