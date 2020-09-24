import React, { forwardRef } from 'react';
import classes from './UserInfo.module.css';

const userInfo = forwardRef(({ data}, ref ) => {
	return (
		<div className={classes.info} ref={ref}>
			<p className={classes.label}>
				<span>Выбран пользователь</span>
				<b>{data.firstName + ' ' + data.lastName}</b>
			</p>
			<p className={classes.label}>
				<span>Описание:</span>

				<br />
				{data.description}
			</p>
			<p className={classes.label}>
				<span>Адрес проживания:</span>
				<b>{data.address.streetAddress}</b>
			</p>
			<p className={classes.label}>
				<span>Город:</span>
				<b>{data.address.city}</b>
			</p>
			<p className={classes.label}>
				<span>Провинция/штат:</span>
				<b>{data.address.state}</b>
			</p>
			<p className={classes.label}>
				<span>Индекс:</span>
				<b>{data.address.zip}</b>
			</p>
		</div>
	);
});
export default userInfo;
