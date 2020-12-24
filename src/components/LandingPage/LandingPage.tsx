import React from 'react'
import LargeBtn from '../../elements/LargeBtn/LargeBtn';
import classes from './LandingPage.module.css';
import MainHeader from './MainHeader/MainHeader';

const LandingPage = (props: any) => {
    return (
        <div className={classes.LandingPage}>
            <MainHeader/>
            <div className={classes.Buttons}>
                <LargeBtn>Adhérents M.I.P</LargeBtn>
                <div></div>
                <LargeBtn>Non-Adhérents M.I.P</LargeBtn>
                <LargeBtn>Archives</LargeBtn>
            </div>
        </div>
    )
}

export default LandingPage;