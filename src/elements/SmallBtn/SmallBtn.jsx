import React from 'react';
import classes from './SmallBtn.module.css';

const SmallBtn = (props) => {
    return (
        <div onClick={props.click} className={classes.SmallBtn}>
            {props.children}
        </div>
    )
}

export default SmallBtn;
