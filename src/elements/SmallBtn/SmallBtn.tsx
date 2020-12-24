import React from 'react';
import classes from './SmallBtn.module.css';

const SmallBtn = (props:any) => {
    return (
        <div className={classes.SmallBtn}>
            {props.children}
        </div>
    )
}

export default SmallBtn;
