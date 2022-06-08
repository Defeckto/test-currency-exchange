import React from 'react'
import classes from './ProjInput.module.css';

export default function ProjInput(props) {
    return (
        <input
            className={classes.projInput}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

