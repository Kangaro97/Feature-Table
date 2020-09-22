import React from 'react';
import Row from './Row/Row';

const table = ({ children, data, onRowClicked }) => {
	let rows = data.map(({ id, firstName, lastName, email, phone }) => {
		return {
			id,
			firstName,
			lastName,
			email,
			phone,
		};
	});
	return (
		<table className="Table">
			<thead>{children}</thead>
			<tbody>
				{rows.map((row, i) => (
					<Row data={row} key={i} onRowClicked={onRowClicked} />
				))}
			</tbody>
		</table>

	);
};

export default table;
