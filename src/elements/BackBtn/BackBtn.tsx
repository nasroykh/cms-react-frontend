import React from 'react';
import classes from './BackBtn.module.css';
import back from '../../assets/previous.svg';

const BackBtn = () => {
    return (
        <div className={classes.BackBtn}>
            <input type="image" src={back} alt=""/>
        </div>
    )
}

export default BackBtn;
