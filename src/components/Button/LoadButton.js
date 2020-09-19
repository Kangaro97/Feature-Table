import React from 'react';

const loadButton = ({type, buttonClicked}) => {
    let volumeType = '';

    switch (type) {
        case 'small':
            volumeType = 'малый'
            break;
        case 'big':
            volumeType = 'большой'
            break;
        default:
            volumeType = 'малый'
    }

    return (
        <button onClick={buttonClicked}>Загрузить {volumeType} объём</button>
    );
};

export default loadButton;