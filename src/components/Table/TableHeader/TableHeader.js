import React from 'react';
import classes from './TableHeader.module.css';

const tHeader = ({ sort, sortData }) => {
	console.log('sort: ', sort);
	const headers = ['id', 'firstName', 'lastName', 'email', 'phone'];
	const getClassName = (key) => {
		if (!key) {
			return null;
		}
		if (key === sort.key) {
			if (sort.order === 'ascending') {
				return classes.ascending;
			}
			if (sort.order === 'descending') {
				return classes.descending;
			}
		}
	};
	const requestSortData = (header) => {
		console.log('order: ', sort.order);
		console.log('!sort.order', !sort.order);
		if (!sort.order || sort.order === 'descending') {
			sort.order = 'ascending';
		} else {
			sort.order = 'descending';
		}
		sort.key = header;
		console.log('Before sortData', sort);
		sortData(sort.key, sort.order);
	};

	return (
		<tr className={classes.TableHeader}>
			{headers.map((header) => {
				return (
					<th
						key={header}
						className={`${classes.HeaderCell} ${getClassName(header)}`}
						onClick={() => requestSortData(header)}>
						{header}
					</th>
				);
			})}
		</tr>
	);
};
export default tHeader;
