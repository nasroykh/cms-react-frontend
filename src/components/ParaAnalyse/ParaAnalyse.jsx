import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom';
import classes from './ParaAnalyse.module.css';
import axios from '../../axios';

const ParaAnalyse = (props) => {
    let history = useHistory();
    const [fetchedAnl, setFetchedAnl] = useState([]);

    let list;
    useEffect(() => {
        axios.get('/fetchAnalyses', { params: {
            type: localStorage.getItem('an_type'),
            min_date: localStorage.getItem('an_min'),
            max_date: localStorage.getItem('an_max')
        }})
        .then(res => {
            let arr = [];
            let fetched = res.data;
            let all = props.anl;
            for (let i = 0; i < fetched.length; i++) {
                for (let j = 0; j < all.length; j++) {
                    if (fetched[i].anl === all[j].id) {
                        let price;
                        switch (fetched[i].adh) {
                            case 'true':
                                price = all[j].price_adh;
                                break;
                        
                            case 'false':
                                price = all[j].price_nonadh;
                                break;

                            default:
                                break;
                        }
                        arr.push({
                            id: fetched[i].anl,
                            title: all[j].title,
                            nombre: fetched[i].nombre,
                            price: price*fetched[i].nombre,
                            type: fetched[i].adh
                        });
                    }
                }   
            }
            if (localStorage.getItem('an_type') === 'all') {
                for (let i = 1 ; i<arr.length ; i++) {
                    if (arr[i].id === arr[i-1].id) {
                        arr[i-1].price += arr[i].price;
                        arr[i-1].nombre += arr[i].nombre;
                        arr.splice(i,1);
                    }
                }
            }

            setFetchedAnl(arr);

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
        for (let i = 0; i < fetchedAnl.length; i++) {
            sum += fetchedAnl[i].price;
        }

        return sum;
    }

    let nombreTotal = () => {
        let num = 0;
        for (let i = 0; i < fetchedAnl.length; i++) {
                num += (fetchedAnl[i].nombre);
        }

        return num;
    }



    if (fetchedAnl.length) {
        list = fetchedAnl.map((item,index) => {
            return (
            <tr key={index}>
                <td>{item.title}</td>
                <td>{item.nombre}</td>
                <td>{montantFormatHandler(item.price)}</td>
            </tr>
        )});
    }
    else {
        list = (
            <tr key='noresult'>
                <td>No result</td>
            </tr>
        )
    }



    
        return (
        <div className={classes.ParaAnalyse}>

            <div className={classes.BonAnl}>
                <div className={classes.Infos}>Analysis parameters from {localStorage.getItem('an_min') || '--'} to {localStorage.getItem('an_max') || '--'}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Analysis type</th>
                            <th>Number</th>
                            <th>Daily amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>{nombreTotal()}</div>
                    <div>{montantFormatHandler(montantTotal())}</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ParaAnalyse);
