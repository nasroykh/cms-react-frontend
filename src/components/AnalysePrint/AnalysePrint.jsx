import React, {useEffect} from 'react';
import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom';
import classes from './AnalysePrint.module.css';

const AnalysePrint = (props) => {

    let history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            window.print();
            setTimeout(() => {
                localStorage.clear();
                history.goBack();
            }, 500);
        }, 500);
    }, [])

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
    let typePat = localStorage.getItem('adh');
    let selectedAnl = localStorage.getItem('anl').split(',');
    let fetchedAnl= [];
    for (let i = 0; i<selectedAnl.length; i++) {
        console.log(selectedAnl[i]);
        fetchedAnl.push(props.anl.filter(item => item.id === selectedAnl[i])[0]);
    }
    list = fetchedAnl.map(item => (
        <tr key={item.title}>
            <td>{item.title}</td>
            <td>{typePat==='true' ? montantFormatHandler(item.price_adh) : montantFormatHandler(item.price_nonadh)}</td>
        </tr>
    ));

        return (
        <div className={classes.AnalysePrint}>

            <div className={classes.BonAnl}>
                <div className={classes.Infos}>
                    <div><b>Ticket n°</b> {localStorage.getItem('bon')}</div>
                    <div><b>Date:</b> {`${day}/${month}/${year}`}</div>
                    <div><b>SS N°:</b> {localStorage.getItem('ssidgen')==='false' ? localStorage.getItem('ssid') : '--'}</div>
                    <div><b>First name:</b> {localStorage.getItem('nom')}</div>
                    <div><b>Last name:</b> {localStorage.getItem('pre')}</div>
                    <div><b>Status:</b> {localStorage.getItem('reg')}</div>
                    <div><b>Employer:</b> {localStorage.getItem('emp')}</div>
                    <div><b>Recipient:</b> {localStorage.getItem('ben')}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Analysis type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>{localStorage.getItem('mon')}</div>
                </div>
            </div>

            <div className={classes.Separator}></div>

            <div className={classes.BonAnl}>
                <div className={classes.Infos}>
                    <div><b>Ticket n°</b> {localStorage.getItem('bon')}</div>
                    <div><b>Date:</b> {`${day}/${month}/${year}`}</div>
                    <div><b>SS N°:</b> {localStorage.getItem('ssidgen')==='false' ? localStorage.getItem('ssid') : '--'}</div>
                    <div><b>First name:</b> {localStorage.getItem('nom')}</div>
                    <div><b>Last name:</b> {localStorage.getItem('pre')}</div>
                    <div><b>Status:</b> {localStorage.getItem('reg')}</div>
                    <div><b>Employer:</b> {localStorage.getItem('emp')}</div>
                    <div><b>Recipient:</b> {localStorage.getItem('ben')}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Analysis type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>{localStorage.getItem('mon')}</div>
                </div>
            </div>

           
        </div>
    )
}

export default withRouter(AnalysePrint);
