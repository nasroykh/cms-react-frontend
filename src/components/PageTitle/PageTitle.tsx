import React from 'react';
import classes from './PageTitle.module.css';

const PageTitle = (props:any) => {
    return (
        <div className={classes.PageTitle}>
            <h1>{props.adh ? 'Adhérents M.I.P' : 'Non-Adhérents M.I.P'}</h1>
            <div className={classes.TitleLine}></div>
        </div>
    )
}

export default PageTitle;
