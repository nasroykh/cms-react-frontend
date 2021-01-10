import React from 'react';
import classes from "./PrintPage.module.css";

const PrintPage = () => {

    window.print();

    return (
        <div className={classes.PrintPage}>
            <div className={classes.bon1}>
                <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                <div className={classes.zone}>03, zone de sieges Bethioua</div>
                <div className={classes.numbon}>Bon n° 01</div>
                <div className={classes.date}>Date: 1/7/2021</div>
                <div className={classes.info}>
                    <div>N° de S/S:</div>
                    <div>15486432121</div>
                </div>
                <div className={classes.info}>
                    <div>Nom:</div>
                    <div>Hafid</div>
                </div>
                <div className={classes.info}>
                    <div>Prénom:</div>
                    <div>Abdeka</div>
                </div>
                <div className={classes.info}>
                    <div>Régime:</div>
                    <div>GPLZ</div>
                </div>
                <div className={classes.info}>
                    <div>Employeur:</div>
                    <div>AZIZ</div>
                </div>
                <div className={classes.info}>
                    <div>Bénéficiaire:</div>
                    <div>Conjoint</div>
                </div>
                <div className={classes.info}>
                    <div>Examen médical:</div>
                    <div>Dentiste</div>
                </div>
                <div className={classes.info}>
                    <div>Spécialité:</div>
                    <div>Ophtalmologie</div>
                </div>
                <div className={classes.info}>
                    <div>Total à payer :</div>
                    <div>600.00 DA</div>
                </div>
            </div>
            <div className={classes.bon1}>
                <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                <div className={classes.zone}>03, zone de sieges Bethioua</div>
                <div className={classes.numbon}>Bon n° 01</div>
                <div className={classes.date}>Date: 1/7/2021</div>
                <div className={classes.info}>
                    <div>N° de S/S:</div>
                    <div>15486432121</div>
                </div>
                <div className={classes.info}>
                    <div>Nom:</div>
                    <div>Hafid</div>
                </div>
                <div className={classes.info}>
                    <div>Prénom:</div>
                    <div>Abdeka</div>
                </div>
                <div className={classes.info}>
                    <div>Régime:</div>
                    <div>GPLZ</div>
                </div>
                <div className={classes.info}>
                    <div>Employeur:</div>
                    <div>AZIZ</div>
                </div>
                <div className={classes.info}>
                    <div>Bénéficiaire:</div>
                    <div>Conjoint</div>
                </div>
                <div className={classes.info}>
                    <div>Examen médical:</div>
                    <div>Dentiste</div>
                </div>
                <div className={classes.info}>
                    <div>Spécialité:</div>
                    <div>Ophtalmologie</div>
                </div>
                <div className={classes.info}>
                    <div>Total à payer :</div>
                    <div>600.00 DA</div>
                </div>
            </div>
        </div>
    )
}

export default PrintPage
