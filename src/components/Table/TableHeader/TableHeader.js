import React from 'react';
import classes from './TableHeader.module.css';

const tHeader = ({ sortParam, sortFunc }) => {
	console.log('sort: ', sortParam);
	const headers = ['id', 'firstName', 'lastName', 'email', 'phone'];
	const getClassName = (key) => {
		if (!key) {
			return null;
		}
		if (key === sortParam.key) {
			if (sortParam.order === 'ascending') {
				return classes.ascending;
			}
			if (sortParam.order === 'descending') {
				return classes.descending;
			}
		}
	};
	const requestSortData = (header) => {
		console.log('order: ', sortParam.order);
		console.log('!sort.order', !sortParam.order);
		if (!sortParam.order || sortParam.order === 'descending') {
			sortParam.order = 'ascending';
		} else {
			sortParam.order = 'descending';
		}
		sortParam.key = header;
		console.log('Before sortData', sortParam);
		sortFunc(sortParam.key, sortParam.order);
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
