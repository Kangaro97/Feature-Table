import React from 'react';

const row = (props) => {
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.firstName}</td>
            <td>{props.data.lastName}</td>
            <td>{props.data.email}</td>
            <td>{props.data.phone}</td>
        </tr>
    );
}
export default row;