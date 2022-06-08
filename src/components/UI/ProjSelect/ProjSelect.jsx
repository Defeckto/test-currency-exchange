import React from 'react';
import classes from './ProjSelect.module.css';

const MySelect = ({ options, value, onChange }) => {

    return (
        <select
            className={classes.ProjSelect}
            value={value}
            onChange={onChange}
        >
            {options.map(option =>
                <option key={option} value={option}>
                    {option}
                </option>
            )}
        </select>
    );
}
export default MySelect;
