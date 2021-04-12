import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './SituationPrint.module.css';
import axios from '../../axios';

const SituationPrint = (props) => {
    let history = useHistory();


    let month = (new Date().getMonth() + 1).toString();
    let day = new Date().getDate().toString();
    let year = new Date().getFullYear().toString();
    
    if (month.length === 1) {
        month = `0${month}`;
    }
    
    if (day.length === 1) {
        day = `0${day}`;
    }
    
    let date = `${day}/${month}/${year}`;

    const [fetchedEx, setFetchedEx] = useState([]);
    
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

                case 6:
                    arr.splice(3,0,' ');
                break;

                case 7:
                    arr.splice(1,0,' ');
                    arr.splice(5,0,' ');
                break;

                case 8:
                    arr.splice(2,0,' ');
                    arr.splice(6,0,' ');
                break;

                default:
                    break;
            }
        }
        let newNum = `${arr.join('')},00 DA`;
        return newNum;
    }

    let montantTotal = () => {
        let sum = 0;
        if (!fetchedEx.length) {
            return sum;
        }
        for (let i = 0; i < fetchedEx[0].length; i++) {
            sum += fetchedEx[0][i].total;
        }

        for (let i = 0; i < fetchedEx[1].length; i++) {
            sum += fetchedEx[1][i].total;
        }

        return sum;
    }

    let nombreTotal = () => {
        let num = 0;
        if (!fetchedEx.length) {
            return num;
        }
        for (let i = 0; i < fetchedEx[0].length; i++) {
            num += fetchedEx[0][i].nombre;
        }

        for (let i = 0; i < fetchedEx[1].length; i++) {
            num += fetchedEx[1][i].nombre;
        }


        return num;
    }

    let listAdh;
    let listNonAdh;



    useEffect(() => {
        axios.get('/fetchSituation')
        .then(res => {
            setFetchedEx(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        setTimeout(() => {
            window.print();
            setTimeout(() => {
                localStorage.clear();
                history.goBack();
            }, 500);
        }, 500);
    }, []);

    if (fetchedEx.length) {
        if (fetchedEx[0].length) {
            listAdh = fetchedEx[0].map((item,index) => {
                return (
                <tr key={item.examenmedical}>
                    <td>{item.examenmedical}</td>
                    <td>{item.nombre}</td>
                    <td>{montantFormatHandler(item.total)}</td>
                    <td>{item.bons}</td>
                </tr>
            )});
        } 
        if (fetchedEx[1].length) {
            listNonAdh = fetchedEx[1].map((item,index) => {
                return (
                <tr key={item.examenmedical}>
                    <td>{item.examenmedical}</td>
                    <td>{item.nombre}</td>
                    <td>{montantFormatHandler(item.total)}</td>
                    <td>{item.bons}</td>
                </tr>
            )});
        }
    }
    else {
        listAdh = (
            <tr key='noresult'>
                <td>Aucun résultat</td>
            </tr>
        )
    }

    return (
        <div className={classes.SituationPrint}>
            <div className={classes.BonAnl}>
                <div className={classes.Infos}>Daily status of {date}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Medical exam</th>
                            <th>Number</th>
                            <th>Total amount</th>
                            <th>Tickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedEx.length && fetchedEx[0].length ? <div className={classes.Separator}>Social member</div> : null}
                        {listAdh}
                        {fetchedEx.length && fetchedEx[1].length ? <div className={classes.Separator}>Public</div> : null}
                        {listNonAdh}
                        {fetchedEx.length ? <div className={classes.Separator}>TOTAL</div> : null}
                        <tr key="total">
                            <td></td>
                            <td>{nombreTotal()}</td>
                            <td>{montantFormatHandler(montantTotal())}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SituationPrint;
