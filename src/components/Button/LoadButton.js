import React from 'react';

const loadButton = (props) => {
    let volumeType = '';

    switch (props.type) {
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
        <button onClick={props.clicked}>Загрузить {volumeType} объём</button>
    );
};

export default loadButton;