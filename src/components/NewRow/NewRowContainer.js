import React, { useState } from 'react';

const NewRowContainer = ({ children }) => {
	const [isVisible, setFormVisability] = useState(false);
	const switchVisability = () => {
		setFormVisability(!isVisible);
	};
	return (
		<div>
			<button onClick={switchVisability}>
				{isVisible ? 'Hide form' : 'Add new row'}
			</button>
			{isVisible ? children : null}
		</div>
	);
};

export default NewRowContainer;
