import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './ButtonsGroup.module.css';

const ButtonsGroup = (props) => {

    return (
        <div className={classes.ButtonsGroup}>
            <NavLink to="/adh_mip">
                Adhérents MIP
            </NavLink>
            <span></span>
            <NavLink to="/non_adh">
                Non-Adhérents MIP
            </NavLink>
            <span></span>
            <NavLink to="/archives" >
                Archives
            </NavLink>
        </div>
    )
};

export default ButtonsGroup
