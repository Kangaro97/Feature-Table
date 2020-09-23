import React from 'react';
import Row from './Row/Row';

const table = ({ children, data, onRowClicked }) => {
	let rows = data.map((item) => {
		return {
			id: item.id ? item.id : '—',
			firstName: item.firstName ? item.firstName : '—',
			lastName: item.lastName ? item.lastName : '—',
			email: item.email ? item.email : '—',
			phone: item.phone ? item.phone : '—',
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
