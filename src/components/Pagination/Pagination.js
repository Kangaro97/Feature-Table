import React from 'react';
import classes from './Pagination.module.css';

const pagination = ({ pageСount, currentPage, choosePage }) => {
	const pages = [];
	const prevPage = () => {
		console.log(currentPage - 1 > 0 ? currentPage - 1 : 1);
		return currentPage - 1 > 0 ? currentPage - 1 : 1;
	};
	const nextPage = () => {
		console.log(currentPage + 1 <= pageСount ? currentPage + 1 : pageСount);
		return currentPage + 1 <= pageСount ? currentPage + 1 : pageСount;
	};
	// максимальное число отображаемых кнопок - 5
	if (pageСount <= 5 || currentPage <= 2) {
		// если количество всех страниц меньше 5 или номер текущей страницы меньше 2,
		// то просто присваиваем массиву pages все возможные значения, но не больше 5
		for (let i = 1; i <= 5 && i <= pageСount; i++) {
			pages.push(i);
		}
	} else if (currentPage >= pageСount - 2) {
		for (let i = pageСount; i > pageСount - 5; i--) {
			pages.push(i);
		}
		pages.reverse();
	} else {
		// если количество всех страниц больше 5, то берём два значения до текущей страницы и два значения после
		for (let i = currentPage - 2; i <= currentPage + 2; i++) {
			pages.push(i);
		}
	}

	return (
		<nav className={classes.menu}>
			<ul>
				<li>
					<button className={classes.button} onClick={() => choosePage(1)}>
						&#60;&#60;
					</button>
				</li>
				<li>
					<button
						className={classes.button}
						onClick={() => choosePage(prevPage())}>
						&#60;
					</button>
				</li>
				{pages.map((page) => (
					<li key={page}>
						<button
							className={`${classes.button} ${
								page === currentPage ? classes.current : null
							}`}
							onClick={() => choosePage(page)}>
							{page}
						</button>
					</li>
				))}
				<li>
					<button
						className={classes.button}
						onClick={() => choosePage(nextPage())}>
						&#62;
					</button>
				</li>
				<li>
					<button
						className={classes.button}
						onClick={() => choosePage(pageСount)}>
						&#62;&#62;
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default pagination;
