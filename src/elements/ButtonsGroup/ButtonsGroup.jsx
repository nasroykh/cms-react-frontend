import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './ButtonsGroup.module.css';

const ButtonsGroup = (props) => {

    return (
        <div className={classes.ButtonsGroup}>
            <NavLink to="/adh_mip">
                Social Member
            </NavLink>
            <span></span>
            <NavLink to="/non_adh">
                Public
            </NavLink>
            <span></span>
            <NavLink to="/situation" >
                Daily Status Print
            </NavLink>
            <span></span>
            <NavLink to="/archives" >
                Archive Table
            </NavLink>
        </div>
    )
};

export default ButtonsGroup
