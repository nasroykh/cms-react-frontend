import React from 'react';
import classes from './MainHeader.module.css';
import logo from '../../../assets/logo.png';

const MainHeader = () => {
    return (
        <header className={classes.MainHeader}>
            <div className={classes.TopLeftHeader}>
                <img src={logo} alt=""/>
                <div>
                    <h1>Centre Médico Social</h1>
                    <h1>Bethioua</h1>
                </div>
            </div>
        </header>
    )
}

export default MainHeader;
