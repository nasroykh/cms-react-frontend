import React from 'react';
import classes from './SmallBtn.module.css';

const SmallBtn = (props) => {
    return (
        <button 
        onClick={props.click} 
        className={`${classes.SmallBtn} ${props.isActive ? classes.Active : ''}`}>
            {props.children}
        </button>
    )
}

export default SmallBtn;
