import axios from 'axios';
import React, { Component } from 'react';
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import BackBtn from '../../elements/BackBtn/BackBtn';
import classes from './ArchivePage.module.css';

class ArchivePage extends Component {

    state = {
        patients: [],
        type: 'all',
        min_date: 'null',
        max_date: 'null',
    }

    componentDidMount() {
        axios.get('/fetchPatients/all/null/null')
        .then(res => {
            this.setState({
                ...this.state,
                patients: res.data,
            });
        })
        .catch(err => {
            console.log(err)
        });
    }

    switchAdhHandler = () => {
        this.setState({...this.state, type: 'adh'})
        axios.get(`/fetchPatients/adh/${this.state.min_date}/${this.state.max_date}`)
        .then(res => {
            this.setState({
                ...this.state,
                patients: res.data,
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    switchNonAdhHandler = () => {
        this.setState({...this.state, type: 'non_adh'})
        axios.get(`/fetchPatients/non_adh/${this.state.min_date}/${this.state.max_date}`)
        .then(res => {
            this.setState({
                ...this.state,
                patients: res.data,
            });
        })
        .catch(err => {
            console.log(err)
        });
    };

    switchAllHandler = () => {
        this.setState({...this.state, type: 'all'})
        axios.get(`/fetchPatients/all/${this.state.min_date}/${this.state.max_date}`)
        .then(res => {
            this.setState({
                ...this.state,
                patients: res.data,
            });
        })
        .catch(err => {
            console.log(err)
        });
    };

    resetHandler = () => {
        window.location.reload();
    }

    dateHandler = (event) => {
        if (event.target.id === 'min') {
            let min_date = event.target.value;
            this.setState({
                ...this.state,
                min_date: min_date
            });
            axios.get(`/fetchPatients/${this.state.type}/${min_date}/${this.state.max_date}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    patients: res.data,
                });
            })
            .catch(err => {
                console.log(err)
            });    
        }
        else {
            let max_date = event.target.value;
            this.setState({
                ...this.state,
                max_date: max_date
            });
            axios.get(`/fetchPatients/${this.state.type}/${this.state.min_date}/${max_date}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    patients: res.data,
                });
            })
            .catch(err => {
                console.log(err)
            }); 
        }
    };

    render() {

        let list;

        if (this.state.patients) {
            switch (this.state.type) {
                case 'adh':
                    list = this.state.patients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.ssid}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.employeur}</td>
                            <td>{item.beneficiaire}</td>
                            <td>{item.examenmedical}</td>
                            <td>{item.spec}</td>
                            <td>{item.date}</td>
                            <td>{item.montant}</td>
                        </tr>
                    ))
                    break;
                
                case 'non_adh':
                    list = this.state.patients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.ssid}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.employeur}</td>
                            <td>{item.beneficiaire}</td>
                            <td>{item.examenmedical}</td>
                            <td>{item.spec}</td>
                            <td>{item.date}</td>
                            <td>{item.montant}</td>
                        </tr>
                    ))
                    break;
    
                case 'all':
                    list = this.state.patients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.adh_ssid || item.non_ssid}</td>
                            <td>{item.adh_nom || item.non_nom}</td>
                            <td>{item.adh_prenom || item.non_prenom}</td>
                            <td>{item.adh_employeur || item.non_employeur}</td>
                            <td>{item.beneficiaire}</td>
                            <td>{item.examenmedical}</td>
                            <td>{item.spec}</td>
                            <td>{item.date}</td>
                            <td>{item.montant}</td>
                        </tr>
                    ))
                    break;
    
                default:
                    break;
            }
        }   
        else {
            list = (<tr><td>NO ITEM</td></tr>)
        }
        

        return (
            <div className={classes.ArchivePage}>
                <div className={classes.Buttons}>
                    <BackBtn/>
                    <div>
                        <SmallBtn click={this.switchAdhHandler}>Adhérents M.I.P</SmallBtn>
                        <SmallBtn click={this.switchNonAdhHandler}>Non Adhérents</SmallBtn>
                        <SmallBtn click={this.switchAllHandler}>Tous</SmallBtn>
                    </div>
                    <input type="date" id="min" onChange={this.dateHandler} />
                    <input type="date" id="max" onChange={this.dateHandler} />
                    <SmallBtn click={this.resetHandler}>Réinitialiser</SmallBtn>
                </div>
                <div className={classes.TableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>BON</th>
                                <th>N° SS</th>
                                <th>NOM</th>
                                <th>PRENOM</th>
                                <th>EMPLOYEUR</th>
                                <th>BENEFICIAIRE</th>
                                <th>EXAMEN MEDICAL</th>
                                <th>SPECIALITE</th>
                                <th>DATE</th>
                                <th>MONTANT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ArchivePage;
