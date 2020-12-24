import React from 'react';
import classes from './LargeBtn.module.css'

const LargeBtn = (props: any) => {
    return (
        <div className={classes.LargeBtn}>
            {props.children}
        </div>
    )
}

export default LargeBtn
