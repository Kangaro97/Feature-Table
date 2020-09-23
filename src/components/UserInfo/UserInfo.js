import React from 'react';

const userInfo = ({ firstName, lastName, description, address }) => {
	return (
		<div className="UserInfo">
			<p>
				Выбран пользователь
				<b>{firstName + ' ' + lastName}</b>
			</p>
			<p>
				Описание:
				{description}
			</p>
			<p>
				Адрес проживания: <b>{address.streetAddress}</b>
			</p>
			<p>
				Город: <b>{address.city}</b>
			</p>
			<p>
				Провинция/штат: <b>{address.state}</b>
			</p>
			<p>
				Индекс: <b>{address.zip}</b>
			</p>
		</div>
	);
};
export default userInfo;
