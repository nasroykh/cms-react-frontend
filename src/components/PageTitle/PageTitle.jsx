import React from 'react';
import classes from './PageTitle.module.css';

const PageTitle = (props) => {
    return (
        <div className={classes.PageTitle}>
            <h1>{props.adh ? 'Social member' : 'Public'}</h1>
        </div>
    )
}

export default PageTitle;
