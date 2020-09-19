import React from 'react';
import HeaderCell from './HeaderCell/HeaaderCell'

const tHeader = (props) => {
    const headers = [
        'id',
        'firstName',
        'lastName',
        'email',
        'phone'
    ];
    return (
        <tr>
            {headers.map((header, i) => <HeaderCell text={header} key={i} />)}
        </tr>
    );
}
export default tHeader;