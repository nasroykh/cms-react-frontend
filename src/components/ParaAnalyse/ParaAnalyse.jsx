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
                        arr.push({
                            id: fetched[i].anl,
                            title: all[j].title,
                            nombre: fetched[i].nombre,
                            date: fetched[i].date,
                            price_adh: all[j].price_adh,
                            price_nonadh: all[j].price_nonadh
                        });
                    }
                }   
            }
            console.log(arr);
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
            if (localStorage.getItem('an_type')==='adh') {
                sum += (fetchedAnl[i].price_adh*fetchedAnl[i].nombre);
            }
            else {
                sum += (fetchedAnl[i].price_nonadh*fetchedAnl[i].nombre);
            }
        }

        return sum;
    }



    if (fetchedAnl.length) {
        list = fetchedAnl.map((item,index) => {
            return (
            <tr key={index}>
                <td>{item.title}</td>
                <td>{item.nombre}</td>
                <td>{item.date}</td>
                <td>{localStorage.getItem('an_type')==='adh' ? montantFormatHandler(item.price_adh*item.nombre) : montantFormatHandler(item.price_nonadh*item.nombre)}</td>
            </tr>
        )});
        console.log(list)
        if (list.length > 18) {
            for (let i = 18; i < list.length; i+=20) {
                list.splice(i,0,(<tr className={classes.PageSep}><td></td><td></td><td></td><td></td></tr>));
            }
        }
    }
    else {
        list = (
            <tr>
                <td>Aucun résultat</td>
            </tr>
        )
    }


    
    
        return (
        <div className={classes.ParaAnalyse}>

            <div className={classes.BonAnl}>
                <div className={classes.Head}>
                    <div className={classes.titre1}>MUTUELLE DE L'INDUSTRIE DU PETROLE</div>
                    <div className={classes.titre2}>CENTRE MEDICO-SOCIAL</div>
                    <div className={classes.zone}>03, zone de sieges Bethioua</div>
                </div>
                <div className={classes.Infos}>Statistiques Parametres Analyses</div>
                <table>
                    <thead>
                        <tr>
                            <th>Type d'analyse</th>
                            <th>Nombre</th>
                            <th>Date</th>
                            <th>Montant Journalier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>{montantFormatHandler(montantTotal())}</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ParaAnalyse);
