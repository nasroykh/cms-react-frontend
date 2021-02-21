import React from 'react';
import classes from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <header className={classes.MainHeader}>
            <div className={classes.TopLeftHeader}>
                <h1>Centre Médico Social</h1>
                <h1>Bethioua</h1>
            </div>
            <div className={classes.TopRightHeader}>
                <h1>Examens Médicaux</h1>
            </div>
        </header>
    )
}

export default MainHeader;
