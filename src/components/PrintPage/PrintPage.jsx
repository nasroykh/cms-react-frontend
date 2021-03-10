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
            if (localStorage.getItem('exam') === 'Analyses') {
                if (window.confirm('Voulez vous imprimer la liste d\'analyses ?')) {
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
                <div>Spécialité:</div>
                <div>{localStorage.getItem('spec')}</div>
            </div>
        );
    }
    
    let content;

    if (bon) {
        content = (
            <div className={classes.PrintPage}>
                <div className={classes.bon1}>
                    <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                    <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                    <div className={classes.zone}>03, zone de sieges Bethioua</div>
                    <div className={classes.numbon}>Bon n° {localStorage.getItem('bon')}</div>
                    <div className={classes.date}>Date: {`${day}/${month}/${year}`}</div>
                    <div className={classes.info}>
                        <div>N° de S/S:</div>
                        <div>{localStorage.getItem('ssid')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Nom:</div>
                        <div>{localStorage.getItem('nom')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Prénom:</div>
                        <div>{localStorage.getItem('pre')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Régime:</div>
                        <div>{localStorage.getItem('reg')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Employeur:</div>
                        <div>{localStorage.getItem('emp')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Bénéficiaire:</div>
                        <div>{localStorage.getItem('ben')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Examen médical:</div>
                        <div>{localStorage.getItem('exam')}</div>
                    </div>
                    {specialiste}
                    <div className={classes.info}>
                        <div>Total à payer :</div>
                        <div>{localStorage.getItem('mon')}</div>
                    </div>
                </div>
                <div className={classes.Separator}></div>
                <div className={classes.bon1}>
                    <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                    <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                    <div className={classes.zone}>03, zone de sieges Bethioua</div>
                    <div className={classes.numbon}>Bon n° {localStorage.getItem('bon')}</div>
                    <div className={classes.date}>Date: {`${day}/${month}/${year}`}</div>
                    <div className={classes.info}>
                        <div>N° de S/S:</div>
                        <div>{localStorage.getItem('ssid')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Nom:</div>
                        <div>{localStorage.getItem('nom')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Prénom:</div>
                        <div>{localStorage.getItem('pre')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Régime:</div>
                        <div>{localStorage.getItem('reg')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Employeur:</div>
                        <div>{localStorage.getItem('emp')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Bénéficiaire:</div>
                        <div>{localStorage.getItem('ben')}</div>
                    </div>
                    <div className={classes.info}>
                        <div>Examen médical:</div>
                        <div>{localStorage.getItem('exam')}</div>
                    </div>
                    {specialiste}
                    <div className={classes.info}>
                        <div>Total à payer :</div>
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
