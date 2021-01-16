import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import classes from './ArchivePage.module.css';

class ArchivePage extends Component {

    state = {
        patientsAdh: [],
        patientsNonAdh: [],
        adh: true
    }

    componentDidMount() {

        axios.get('/fetchPatients')
            .then(res => {
                let {adh, non_adh} = res.data;
                this.setState({
                    ...this.state,
                    patientsAdh: adh,
                    patientsNonAdh: non_adh
                })
            })
            .catch(err => {
                console.log(err)
            })

    }
        
    
    
    
    render() {

        let list;

        switch (this.state.adh) {
            case true:
                list = this.state.patientsAdh.map((item: {id: any,ssid: any, nom: any,prenom: any,employeur: any,beneficiaire: any,examenmedical: any,spec: any,date: any,montant: any}) => (
                    <li key={item.id}>
                        <span>{item.id}</span>
                        <span>{item.ssid}</span>
                        <span>{item.nom}</span>
                        <span>{item.prenom}</span>
                        <span>{item.employeur}</span>
                        <span>{item.beneficiaire}</span>
                        <span>{item.examenmedical}</span>
                        <span>{item.spec}</span>
                        <span>{item.date}</span>
                        <span>{item.montant}</span>
                    </li>
                ))
                break;
            
            case false:
                list = this.state.patientsNonAdh.map((item: {id: any,ssid: any, nom: any,prenom: any,employeur: any,beneficiaire: any,examenmedical: any,spec: any,date: any,montant: any}) => (
                    <li key={item.id}>
                        <span>{item.id}</span>
                        <span>{item.ssid}</span>
                        <span>{item.nom}</span>
                        <span>{item.prenom}</span>
                        <span>{item.employeur}</span>
                        <span>{item.beneficiaire}</span>
                        <span>{item.examenmedical}</span>
                        <span>{item.spec}</span>
                        <span>{item.date}</span>
                        <span>{item.montant}</span>
                    </li>
                ))
                break
                    
            default:
                break;
        }

        return (
            <div className={classes.ArchivePage}>
                <div className={classes.Buttons}>
                    <SmallBtn>Adhérents M.I.P</SmallBtn>
                    <SmallBtn>Non Adhérents</SmallBtn>
                </div>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default ArchivePage;
