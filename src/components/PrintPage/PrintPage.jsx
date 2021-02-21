import React from 'react';
import classes from "./PrintPage.module.css";

const PrintPage = () => {


    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let year = new Date().getFullYear();



    window.print();

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
                    <div>{`${localStorage.getItem('mon')},00 DA`}</div>
                </div>
            </div>
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
                    <div>{`${localStorage.getItem('mon')},00 DA`}</div>
                </div>
            </div>
        </div>
    )
}

export default PrintPage
