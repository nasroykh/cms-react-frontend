import React from 'react';
import classes from './PageTitle.module.css';

const PageTitle = () => {
    return (
        <div className={classes.PageTitle}>
            <h1>Adhérents M.I.P</h1>
            <div className={classes.TitleLine}></div>
        </div>
    )
}

export default PageTitle;
