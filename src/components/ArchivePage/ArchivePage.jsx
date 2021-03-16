import axios from 'axios';
import React, { Component } from 'react';
import {withRouter} from 'react-router'
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import BackBtn from '../../elements/BackBtn/BackBtn';
import classes from './ArchivePage.module.css';
import reset from '../../assets/reset.png';
import close from '../../assets/close.svg';
import chevron from '../../assets/chevron.svg';

class ArchivePage extends Component {

    state = {
        patients: [],
        type: 'all',
        min_date: '',
        max_date: '',
        filtres: false,
        order: '',
        ascOrder: ''
    }

    componentDidMount() {
        axios.get(`/fetchPatients`, { params: {
            type: 'all',
            min_date: '',
            max_date: '',
            export: false,
            order: this.state.order,
            ascOrder: this.state.ascOrder
        }})
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
        axios.get(`/fetchPatients`, { params: {
            type: 'adh',
            min_date: this.state.min_date,
            max_date: this.state.max_date,
            export: false,
            order: this.state.order,
            ascOrder: this.state.ascOrder
        }})
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
        axios.get(`/fetchPatients`, { params: {
            type: 'non_adh',
            min_date: this.state.min_date,
            max_date: this.state.max_date,
            export: false,
            order: this.state.order,
            ascOrder: this.state.ascOrder
        }})
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
        axios.get(`/fetchPatients`, { params: {
            type: 'all',
            min_date: this.state.min_date,
            max_date: this.state.max_date,
            export: false,
            order: this.state.order,
            ascOrder: this.state.ascOrder
        }})
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
        axios.get(`/fetchPatients`, { params: {
            type: this.state.type,
            min_date: min_date,
            max_date: this.state.max_date,
            export: false,
            order: this.state.order,
            ascOrder: this.state.ascOrder
        }})
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
            axios.get(`/fetchPatients`, { params: {
                type: this.state.type,
                min_date: this.state.min_date,
                max_date: max_date,
                export: false,
                order: this.state.order,
                ascOrder: this.state.ascOrder
            }})
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

    dateResetHandler = (e) => {
        if (e.currentTarget.id === 'min_reset') {
            this.setState({
                ...this.state,
                min_date: ''
            });
            axios.get(`/fetchPatients`, { params: {
                type: this.state.type,
                min_date: '',
                max_date: this.state.max_date,
                export: false,
                order: this.state.order,
                ascOrder: this.state.ascOrder
            }})
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
            this.setState({
                ...this.state,
                max_date: ''
            });
            axios.get(`/fetchPatients`, { params: {
                type: this.state.type,
                min_date: this.state.min_date,
                max_date: '',
                export: false,
                order: this.state.order,
                ascOrder: this.state.ascOrder
            }})
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
    }

    exportHandler = () => {
        axios.get(`/fetchPatients`, { params: {
            type: this.state.type,
            min_date: this.state.min_date,
            max_date: this.state.max_date,
            export: true,
            order: this.state.order,
            ascOrder: this.state.ascOrder
        }})
        .then(res => {
            alert('Tableau exporté, ouverture du dossier contenant le fichier ...');
        })
        .catch(err => {
            console.log(err)
        }); 
    }

    orderHandler = (e) => {
        let orderBy = e.currentTarget.id;
        axios.get(`/fetchPatients`, { params: {
            type: this.state.type,
            min_date: this.state.min_date,
            max_date: this.state.max_date,
            export: false,
            order: orderBy,
            ascOrder: !this.state.ascOrder || false
        }})
        .then(res => {
            this.setState({
                ...this.state,
                patients: res.data,
                order: orderBy,
                ascOrder: !this.state.ascOrder
            });
        })
        .catch(err => {
            console.log(err)
        }); 
    }

    filtresToggleHandler = () => {
        let oldState = {...this.state.filtres};
        oldState = !this.state.filtres;
        this.setState({...this.state, filtres: oldState});
    }

    printHandler = () => {
        window.print();
    }

    paraAnlHandler = () => {
        localStorage.setItem('an_type', this.state.type);
        localStorage.setItem('an_min', this.state.min_date);
        localStorage.setItem('an_max', this.state.max_date);
        this.props.history.push('/paraprint');
    }

    montantFormatHandler = (num) => {
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

    render() {

        let list;

        if (this.state.patients) {
            switch (this.state.type) {
                case 'adh':
                    list = this.state.patients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.bon}</td>
                            <td>{item.ssid}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.employeur}</td>
                            <td>{item.beneficiaire}</td>
                            <td>{item.examenmedical}</td>
                            <td>{item.spec}</td>
                            <td>{item.date}</td>
                            <td>{this.montantFormatHandler(item.montant)}</td>
                        </tr>
                    ))
                    break;
                
                case 'non_adh':
                    list = this.state.patients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.bon}</td>
                            <td>{item.ssidGenerated==='false' ? item.ssid : '--'}</td>
                            <td>{item.nom}</td>
                            <td>{item.prenom}</td>
                            <td>{item.employeur}</td>
                            <td>{item.beneficiaire}</td>
                            <td>{item.examenmedical}</td>
                            <td>{item.spec}</td>
                            <td>{item.date}</td>
                            <td>{this.montantFormatHandler(item.montant)}</td>
                        </tr>
                    ))
                    break;
    
                case 'all':
                    list = this.state.patients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.bon}</td>
                            <td>{item.adh_ssid || (item.ssidGenerated==='false' ? item.non_ssid : '--')}</td>
                            <td>{item.adh_nom || item.non_nom}</td>
                            <td>{item.adh_prenom || item.non_prenom}</td>
                            <td>{item.adh_employeur || item.non_employeur}</td>
                            <td>{item.beneficiaire}</td>
                            <td>{item.examenmedical}</td>
                            <td>{item.spec}</td>
                            <td>{item.date}</td>
                            <td>{this.montantFormatHandler(item.montant)}</td>
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
                <div onClick={this.filtresToggleHandler} className={`${classes.BackDrop} ${this.state.filtres ? classes.ShowBD : ''}`}></div>
                <div 
                className={`${classes.Buttons} ${this.state.filtres ? classes.ButtonsCollapse : ''}`}>
                    <BackBtn/>
                    <SmallBtn click={this.paraAnlHandler}>Parametres Analyses</SmallBtn>
                    <SmallBtn click={this.exportHandler}>Exporter</SmallBtn>
                    <SmallBtn click={this.printHandler}>Imprimer</SmallBtn>
                    <SmallBtn click={this.resetHandler}>Réinitialiser Filtres</SmallBtn>
                    <SmallBtn click={this.filtresToggleHandler}>Filtres</SmallBtn>
                </div>
                <div 
                className={`${classes.SideDrawer} ${this.state.filtres ? classes.Show : null}`}>
                    <button onClick={this.filtresToggleHandler} className={classes.CloseBtn}>
                        <img src={close} alt=""/>
                    </button>
                    <div className={classes.ParType}>
                        <label htmlFor="">Par type de patient</label>
                        <SmallBtn click={this.switchAllHandler} isActive={this.state.type==='all' ? true : false}>Tous</SmallBtn>
                        <SmallBtn click={this.switchAdhHandler} isActive={this.state.type==='adh' ? true : false}>Adhérents M.I.P</SmallBtn>
                        <SmallBtn click={this.switchNonAdhHandler} isActive={this.state.type==='non_adh' ? true : false}>Non Adhérents</SmallBtn>
                    </div>
                    <div className={classes.DateFilter}>
                        <label htmlFor="">Par Date</label>
                        <div>
                            <label htmlFor="">Date de début</label>
                            <input type="date" id="min" onChange={this.dateHandler} value={this.state.min_date} />
                            <button onClick={this.dateResetHandler} id="min_reset"><img src={reset} alt="" srcset=""/></button>
                        </div>
                        <div>
                            <label htmlFor="">Date de fin</label>
                            <input type="date" id="max" onChange={this.dateHandler} value={this.state.max_date}/>
                            <button onClick={this.dateResetHandler} id="max_reset"><img src={reset} alt="" srcset=""/></button>
                        </div>
                    </div>
                </div>
                <div className={classes.TableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th id="id" onClick={this.orderHandler}>
                                    BON {this.state.order==='id' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="ssid" onClick={this.orderHandler}>
                                    N° SS {this.state.order==='ssid' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="nom" onClick={this.orderHandler}>
                                    NOM {this.state.order==='nom' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="prenom" onClick={this.orderHandler}>
                                    PRENOM {this.state.order==='prenom' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="employeur" onClick={this.orderHandler}>
                                    EMPLOYEUR {this.state.order==='employeur' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="beneficiaire" onClick={this.orderHandler}>
                                    BENEFICIAIRE {this.state.order==='beneficiaire' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="examenmedical" onClick={this.orderHandler}>
                                    EXAMEN MEDICAL {this.state.order==='examenmedical' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="spec" onClick={this.orderHandler}>
                                    SPECIALITE {this.state.order==='spec' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="date" onClick={this.orderHandler}>
                                    DATE {this.state.order==='date' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
                                <th id="montant" onClick={this.orderHandler}>
                                    MONTANT {this.state.order==='montant' ? <span className={!this.state.ascOrder ? null : classes.ReverseOrder }><img src={chevron} alt=""/></span> : null}
                                    </th>
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

export default withRouter(ArchivePage);
