import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom';
import Modal from '../../elements/Modal/Modal';
import classes from "./PrintPage.module.css";
import AnalysePrint from '../AnalysePrint/AnalysePrint';


const PrintPage = (props) => {
    let history = useHistory();

    const [bon, setBon] = useState(true);
    

    useEffect(() => {

        let print = new Promise((resolve, reject) => {
            window.print();
            if (localStorage.getItem('exam') === 'Analysis') {
                if (window.confirm('Would you like to print analysis report ?')) {
                    resolve();
                }
                else {
                    reject();
                }
            }
            else {
                reject();
            }
        });

        print.then(res => {
            setBon(false);
        }).catch(err => {
            localStorage.clear();
            history.goBack();
        });

    }, []);

    let month = (new Date().getMonth() + 1).toString();
    let day = new Date().getDate().toString();
    let year = new Date().getFullYear().toString();
    
    if (month.length === 1) {
        month = `0${month}`;
    }
    
    if (day.length === 1) {
        day = `0${day}`;
    }
    
    
    let specialiste;
    
    if (localStorage.getItem('spec')) {
        specialiste = (
            <div className={classes.info}>
                <div>Specialist:</div>
                <div>{localStorage.getItem('spec')}</div>
            </div>
        );
    }
    
    let content;

    if (bon) {
        content = (
            <div className={classes.PrintPage}>
                <div className={classes.bon1}>
                    <div className={classes.numbon}>Ticket n° {localStorage.getItem('bon')}</div>
                    <div className={classes.date}>Date: {`${day}/${month}/${year}`}</div>
                    <div className={classes.info}>
                        <div>SS N°:</div>
                        {localStorage.getItem('ssidgen')==='false' ?
                        <div>{localStorage.getItem('ssid')}</div> : <div>--</div>
                        }
                    </div>
                    <div className={classes.info}>
                        <div>First name:</div>
                        <div>{localStorage.getItem('nom')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Last name:</div>
                        <div>{localStorage.getItem('pre')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Status:</div>
                        <div>{localStorage.getItem('reg')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Employer:</div>
                        <div>{localStorage.getItem('emp')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Recipient:</div>
                        <div>{localStorage.getItem('ben')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Medical exam:</div>
                        <div>{localStorage.getItem('exam')}</div>
                    </div>
                    {specialiste}
                    <div className={classes.info}>
                        <div>Total :</div>
                        <div>{localStorage.getItem('mon')}</div>
                    </div>
                </div>
                <div className={classes.Separator}></div>
                <div className={classes.bon1}>
                    <div className={classes.numbon}>Ticket n° {localStorage.getItem('bon')}</div>
                    <div className={classes.date}>Date: {`${day}/${month}/${year}`}</div>
                    <div className={classes.info}>
                        <div>SS N°:</div>
                        {localStorage.getItem('ssidgen')==='false' ?
                        <div>{localStorage.getItem('ssid')}</div> : <div>--</div>
                        }
                    </div>
                    <div className={classes.info}>
                        <div>First name:</div>
                        <div>{localStorage.getItem('nom')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Last name:</div>
                        <div>{localStorage.getItem('pre')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Status:</div>
                        <div>{localStorage.getItem('reg')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Employer:</div>
                        <div>{localStorage.getItem('emp')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Recipient:</div>
                        <div>{localStorage.getItem('ben')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Medical exam:</div>
                        <div>{localStorage.getItem('exam')}</div>
                    </div>
                    {specialiste}
                    <div className={classes.info}>
                        <div>Total :</div>
                        <div>{localStorage.getItem('mon')}</div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        content = (
            <AnalysePrint anl={props.anl}/>
        );
    }
    
    return (
        <div>
            {content}
        </div>
    )
}

export default withRouter(PrintPage)
