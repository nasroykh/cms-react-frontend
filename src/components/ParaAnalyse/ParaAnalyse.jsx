import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import classes from './ParaAnalyse.module.css';
import axios from '../../axios';

const ParaAnalyse = (props) => {

    const [fetchedAnl, setFetchedAnl] = useState([]);
    const [updatedAnl, setUpdatedAnl] = useState([]);

    let list;
    useEffect(() => {
        axios.get('/fetchAnalyses')
        .then(res => {
            // let arr = props.anl.filter(item => item.id === 'anl');
            setFetchedAnl(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);



    // for (let i = 0; i<fetchedAnl.length; i++) {
    //     let updatedAnlArr = []
    //     updatedAnlArr.push(props.anl.filter(item => item.id === selectedAnl[i])[0]);
    // }
    
    // list = fetchedAnl.map(item => {
    //     return (
    //     <tr>
    //         <td>{item.anl}</td>
    //         <td>{item.nombre}</td>
    //         <td>{item.date}</td>
    //         <td>1700da</td>
    //     </tr>
    // )});

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




    // window.print();

    // setTimeout(() => {
    //     localStorage.clear();
    //     window.close();
    // }, 2000);

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
                            <th>Montant</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className={classes.Total}>
                    <div>TOTAL</div>
                    <div>1700da</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ParaAnalyse);
