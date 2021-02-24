import React from 'react';
import classes from './BackBtn.module.css';
import back from '../../assets/previous.svg';
import { NavLink } from 'react-router-dom';

const BackBtn = () => {
    return (
        <NavLink to={"/"} className={classes.BackBtn}>
            <input type="image" src={back} alt="" disabled/>
            <span>
                Retour
            </span> 
        </NavLink>
    )
}

export default BackBtn;
