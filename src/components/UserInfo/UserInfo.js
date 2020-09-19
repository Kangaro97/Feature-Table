import React from 'react';

const userInfo = ({ data }) => {
	return (
		<div className="UserInfo">
			<p>
				Выбран пользователь
				<b>{data.firstName + ' ' + data.lastName}</b>
			</p>
			<p>
				Описание:
				{data.description}
			</p>
			<p>
				Адрес проживания: <b>{data.address.streetAddress}</b>
			</p>
			<p>
				Город: <b>{data.address.city}</b>
			</p>
			<p>
				Провинция/штат: <b>{data.address.state}</b>
			</p>
			<p>
				Индекс: <b>{data.address.zip}</b>
			</p>
		</div>
	);
};
export default userInfo;
