import React from 'react';
import classes from './MainHeader.module.css';
import logo from '../../../assets/logo.svg';

const MainHeader = () => {
    return (
        <header className={classes.MainHeader}>
            <div className={classes.TopLeftHeader}>
                <img src={logo} alt="Logo"/>
                <div>
                    <h1>Bethania - Medical Center</h1>
                </div>
            </div>
        </header>
    )
}

export default MainHeader;
