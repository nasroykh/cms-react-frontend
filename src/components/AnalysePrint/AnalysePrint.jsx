import React from 'react';
import {withRouter} from 'react-router';
import classes from './AnalysePrint.module.css';

const AnalysePrint = (props) => {

    let month = (new Date().getMonth() + 1).toString();
    let day = new Date().getDate().toString();
    let year = new Date().getFullYear().toString();

    if (month.length === 1) {
        month = `0${month}`;
    }

    if (day.length === 1) {
        day = `0${day}`;
    }
    
    let montantFormatHandler = (num) => {
        let oldMontant = num;
        let arr = oldMontant.toString().split('');
        if (arr.length >= 4) {
            switch (arr.length) {
                case 4:
                    arr.splice(1,0,' ');
                break;

                case 5:
                    arr.splice(2,0,' ');
                break;

                default:
                    break;
            }
        }
        let newNum = `${arr.join('')},00 DA`;
        return newNum;
    }

    let list;
    let typePat = sessionStorage.getItem('adh');
    let selectedAnl = sessionStorage.getItem('anl').split(',');
    let fetchedAnl= [];
    for (let i = 0; i<selectedAnl.length; i++) {
        console.log(selectedAnl[i]);
        fetchedAnl.push(props.anl.filter(item => item.id === selectedAnl[i])[0]);
    }
    list = fetchedAnl.map(item => (
        <tr>
            <td>{item.title}</td>
            <td>{typePat==='true' ? montantFormatHandler(item.price_adh) : montantFormatHandler(item.price_nonadh)}</td>
        </tr>
    ));

    setTimeout(() => {
        window.print();
        props.history.go(-2);
    }, 1000);

        return (
        <div className={classes.AnalysePrint}>

            <div className={classes.BonAnl}>
                <div className={classes.DateBon}>
                    <div>Bon n° {sessionStorage.getItem('bon')}</div>
                    <div>Date: {`${day}/${month}/${year}`}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Type d'analyse</th>
                            <th>Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>{sessionStorage.getItem('mon')}</div>
                </div>
            </div>

            <div className={classes.Separator}></div>

            <div className={classes.BonAnl}>
                <div className={classes.DateBon}>
                    <div>Bon n° {sessionStorage.getItem('bon')}</div>
                    <div>Date: {`${day}/${month}/${year}`}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Type d'analyse</th>
                            <th>Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>{sessionStorage.getItem('mon')}</div>
                </div>
            </div>

           
        </div>
    )
}

export default withRouter(AnalysePrint);
