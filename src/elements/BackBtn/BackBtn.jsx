import React from 'react';
import classes from './BackBtn.module.css';
import back from '../../assets/previous.svg';
import { Link } from 'react-router-dom';

const BackBtn = () => {
    return (
        <Link to={"/"} className={classes.BackBtn}>
            <img src={back} alt=""/>
            <span>
                Back
            </span> 
        </Link>
    )
}

export default BackBtn;
