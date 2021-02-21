import React from 'react';
import ButtonsGroup from '../../elements/ButtonsGroup/ButtonsGroup';
import classes from './LandingPage.module.css';
import MainHeader from './MainHeader/MainHeader';

const LandingPage = (props) => {
    return (
        <div className={classes.LandingPage}>
            <MainHeader/>
            <ButtonsGroup/>
        </div>
    )
}

export default LandingPage;