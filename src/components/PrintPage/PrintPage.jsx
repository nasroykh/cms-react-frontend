import React from 'react';
import {withRouter} from 'react-router';
import classes from "./PrintPage.module.css";

const PrintPage = (props) => {

    let month = (new Date().getMonth() + 1).toString();
    let day = new Date().getDate().toString();
    let year = new Date().getFullYear().toString();

    if (month.length === 1) {
        month = `0${month}`;
    }

    if (day.length === 1) {
        day = `0${day}`;
    }

    setTimeout(() => {
        window.print();
    }, 1000);

    setTimeout(() => {
        let printan = window.confirm('Voulez vous imprimer la liste d\'analyses ?');
        if (printan) {
            props.history.replace('/anprint');
        }
        else {
            props.history.goBack();
        }
    }, 2000);
    
    let specialiste;

    if (sessionStorage.getItem('spec')) {
        specialiste = (
            <div className={classes.info}>
                <div>Spécialité:</div>
                <div>{sessionStorage.getItem('spec')}</div>
            </div>
        );
    }




    return (
        <div className={classes.PrintPage}>
            <div className={classes.bon1}>
                <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                <div className={classes.zone}>03, zone de sieges Bethioua</div>
                <div className={classes.numbon}>Bon n° {sessionStorage.getItem('bon')}</div>
                <div className={classes.date}>Date: {`${day}/${month}/${year}`}</div>
                <div className={classes.info}>
                    <div>N° de S/S:</div>
                    <div>{sessionStorage.getItem('ssid')}</div>
                </div>
                <div className={classes.info}>
                    <div>Nom:</div>
                    <div>{sessionStorage.getItem('nom')}</div>
                </div>
                <div className={classes.info}>
                    <div>Prénom:</div>
                    <div>{sessionStorage.getItem('pre')}</div>
                </div>
                <div className={classes.info}>
                    <div>Régime:</div>
                    <div>{sessionStorage.getItem('reg')}</div>
                </div>
                <div className={classes.info}>
                    <div>Employeur:</div>
                    <div>{sessionStorage.getItem('emp')}</div>
                </div>
                <div className={classes.info}>
                    <div>Bénéficiaire:</div>
                    <div>{sessionStorage.getItem('ben')}</div>
                </div>
                <div className={classes.info}>
                    <div>Examen médical:</div>
                    <div>{sessionStorage.getItem('exam')}</div>
                </div>
                {specialiste}
                <div className={classes.info}>
                    <div>Total à payer :</div>
                    <div>{sessionStorage.getItem('mon')}</div>
                </div>
            </div>
            <div className={classes.Separator}></div>
            <div className={classes.bon1}>
                <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                <div className={classes.zone}>03, zone de sieges Bethioua</div>
                <div className={classes.numbon}>Bon n° {sessionStorage.getItem('bon')}</div>
                <div className={classes.date}>Date: {`${day}/${month}/${year}`}</div>
                <div className={classes.info}>
                    <div>N° de S/S:</div>
                    <div>{sessionStorage.getItem('ssid')}</div>
                </div>
                <div className={classes.info}>
                    <div>Nom:</div>
                    <div>{sessionStorage.getItem('nom')}</div>
                </div>
                <div className={classes.info}>
                    <div>Prénom:</div>
                    <div>{sessionStorage.getItem('pre')}</div>
                </div>
                <div className={classes.info}>
                    <div>Régime:</div>
                    <div>{sessionStorage.getItem('reg')}</div>
                </div>
                <div className={classes.info}>
                    <div>Employeur:</div>
                    <div>{sessionStorage.getItem('emp')}</div>
                </div>
                <div className={classes.info}>
                    <div>Bénéficiaire:</div>
                    <div>{sessionStorage.getItem('ben')}</div>
                </div>
                <div className={classes.info}>
                    <div>Examen médical:</div>
                    <div>{sessionStorage.getItem('exam')}</div>
                </div>
                {specialiste}
                <div className={classes.info}>
                    <div>Total à payer :</div>
                    <div>{sessionStorage.getItem('mon')}</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(PrintPage)
