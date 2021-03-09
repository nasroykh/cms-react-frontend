import React, {useEffect} from 'react';
import {withRouter} from 'react-router';
import Modal from '../../elements/Modal/Modal';
import classes from "./PrintPage.module.css";


const PrintPage = (props) => {

    useEffect(() => {
        window.print();

        if (localStorage.getItem('exam') === 'Analyses') {
            setTimeout(() => {
                if (window.confirm('Voulez vous imprimer la liste d\'analyses ?')) {
                    window.location.replace('/anprint');
                } 
                else {
                    window.close();
                }
            }, 1000)
        }
        else {
            setTimeout(() => {
                window.close();
            }, 2000)
        }

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
    

    
    return (
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
    )
}

export default withRouter(PrintPage)
