import React from 'react';

const tHeader = (props) => {
	const headers = ['id', 'firstName', 'lastName', 'email', 'phone'];
	const getClassName = (key) => {
		if (!props.sort) {
			return;
		}
		return key === props.sort.key ? props.sort.direction : null;
	};
	return (
		<tr>
			{headers.map((header, i) => {
				return (
					<th
						key={header}
						className={getClassName(header)}
						/*onClick={props.sortData(header)}*/
					>
						{header}
					</th>
				);
			})}
		</tr>
	);
};
export default tHeader;
