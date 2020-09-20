import React from 'react';

const row = ({ data, onRowClicked }) => {
	return (
		<tr onClick={() => onRowClicked(data.id)}>
			<td>{data.id}</td>
			<td>{data.firstName}</td>
			<td>{data.lastName}</td>
			<td>{data.email}</td>
			<td>{data.phone}</td>
		</tr>
	);
};
export default row;