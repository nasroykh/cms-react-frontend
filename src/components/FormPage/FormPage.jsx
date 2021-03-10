import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {useHistory} from 'react-router-dom';
import BackBtn from '../../elements/BackBtn/BackBtn';
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import Modal from '../../elements/Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import classes from './FormPage.module.css';
import axios from 'axios';

const FormPage = (props) => {

    const history = useHistory();

    let regimeAdh = [        
        {id: '0', title: 'Sélectionner'},
        {id: 'act', title: 'Actif'},
        {id: 'ina', title: 'Inactif'},
        {id: 'veu', title: 'Veuve'}
    ];


    const [ssid, setSsid] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [employeur, setEmployeur] = useState('');
    const [benef, setBenef] = useState(
        [
            {id: '0', title: 'Sélectionner'},
            {id: 'asr', title: 'Assuré'},
            {id: 'cjt', title: 'Conjoint'},
            {id: 'enf', title: 'Enfant'}
        ]);
        const [examen, setExamen] = useState(
        [
            {id: '0', title: 'Sélectionner'},
            {id: 'anl', title:'Analyses'},
            {id: 'cg', title:'Consultation généraliste', price_adh: 200, price_nonadh: 300},
            {id: 'spec', title:'Consultation spécialiste'},
            {id: 'den', title:'Dentiste'},
            {id: 'exi', title:'Infirmerie'}
        ]);
    const [selection, setSelection] = useState({
        adh_mip: props.adh,
        regime: '',
        benef: '',
        examen: '',
        type: []
    });
    
    if (!selection.adh_mip) {
        regimeAdh = [        
            {id: '0', title: 'Sélectionner'},
            {id: 'pub', title: 'Public'},
            {id: 'cnv', title: 'Convention'},
        ];
    }
    const [regime, setRegime] = useState(regimeAdh);
    const [montant, setMontant] = useState(0);
    const [spec, setSpec] = useState([
        {id: 'end', title:'Endocrinologie', price_adh: 600, price_nonadh: 800},
        {id: 'foe', title:'Fond d\'oeil (Ophtalmologie)', price_adh: 350, price_nonadh: 400},
        {id: 'gas', title:'Gastrologie', price_adh: 500, price_nonadh: 700},
        {id: 'gyn', title:'Gynécologie', price_adh: 600, price_nonadh: 800},
        {id: 'neu', title:'Neurologie', price_adh: 400, price_nonadh: 600},
        {id: 'orl', title:'O.R.L', price_adh: 400, price_nonadh: 600},
        {id: 'oph', title:'Ophtalmologie', price_adh: 600, price_nonadh: 800},
        {id: 'car', title:'Cardiologie', price_adh: 600, price_nonadh: 800},
        {id: 'ped', title:'Pédiatre', price_adh: 400, price_nonadh: 600},
        {id: 'pne', title:'Pneumologie', price_adh: 500, price_nonadh: 700},
        {id: 'tra', title:'Traumatologie', price_adh: 400, price_nonadh: 600},
        {id: 'uro', title:'Urologie', price_adh: 500, price_nonadh: 700},
        {id: 'dia', title:'Diabetologie', price_adh: 600, price_nonadh: 800},
    ]);
    const [exi, setExi] = useState([
        {id: 'abl', title:'Ablation', price_adh: 150, price_nonadh: 250},
        {id: 'ech', title:'Echographie', price_adh: 500, price_nonadh: 700},
        {id: 'ecg', title:'E C G', price_adh: 200, price_nonadh: 350},
        {id: 'efr', title:'E F R', price_adh: 500, price_nonadh: 700},
        {id: 'inj', title:'Injection', price_adh: 30, price_nonadh: 40},
        {id: 'pas', title:'Pansement simple', price_adh: 200, price_nonadh: 300},
        {id: 'pai', title:'Pansement infecté', price_adh: 350, price_nonadh: 500},
        {id: 'pdt', title:'Prise de Tension', price_adh: 20, price_nonadh: 30},
        {id: 'sut', title:'Suture', price_adh: 400, price_nonadh: 500},
    ]);
    const [den, setDen] = useState([
        {id: 'con', title:'Consultation', price_adh: 200, price_nonadh: 400},
        {id: 'det', title:'Détartrage', price_adh: 400, price_nonadh: 800},
        {id: 'ext', title:'Extraction', price_adh: 300, price_nonadh: 400},
        {id: 'luv', title:'Lampe UV', price_adh: 500, price_nonadh: 1000},
        {id: 'sde', title:'Soins dentaire', price_adh: 400, price_nonadh: 800},
    ]);

    const [addAdh, setAddAdh] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalType, setModalType] = useState('');
    
    let modalShowHandler = () => {
        setModalShow(!modalShow);
    } 
    
    let ssidChangeHandler = (event) => {
        setSsid(event.target.value)
    }

    let generateSsidHandler = (event) => {
        event.preventDefault();
        if (!selection.adh_mip) {
            setSsid(new Date().getTime());
        }
    }
    
    let nomChangeHandler = (event) => {
        setNom(event.target.value)
    }
    
    let prenomChangeHandler = (event) => {
        setPrenom(event.target.value)
    }

    let regimeChangeHandler = (event) => {
        event.preventDefault();
        setSelection({
            ...selection,
            regime: event.target.value
        })    
    }

    let employeurChangeHandler = (event) => {
        setEmployeur(event.target.value)
    }
    
    let benefChangeHandler = (event) => {
        event.preventDefault();
        setSelection({
            ...selection,
            benef: event.target.value
        })
    }
    
    let examenChangeHandler = (event) => {
        event.preventDefault();
        setSelection({
            ...selection,
            examen: event.target.value,
            type: []
        })
        if ( event.target.value=== 'cg') {
            if (selection.adh_mip) {
                setMontant(200);
            } else {
                setMontant(300);
            }
        } else {
            setMontant(0);
        }
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

    let checkBoxHandler = (item, event) => {
        let selectedType = selection.type;
        if (event.target.checked) {
            selectedType.push(item.id);
            setSelection({
                ...selection,
                type: selectedType
            })
            
            let sum = montant;

            if (selection.adh_mip) {
                if (item.price_adh === 0) {
                    let newPrice = window.prompt('Prix non disponible, Veuillez le saisir');
                    if (newPrice) {
                        let oldAn = [...props.anl];
                        for (let i = 0; i<oldAn.length; i++) {
                            if (oldAn[i].id === item.id) {
                                oldAn[i].price_adh = parseInt(newPrice);
                            }
                        }
                        setMontant(sum+=parseInt(newPrice));
                        props.setAnl(oldAn);                    
                    }
                }
                else {
                    setMontant(sum+=item.price_adh);
                }

            } else {
                if (item.price_nonadh === 0) {
                    let newPrice = window.prompt('Prix non disponible, Veuillez le saisir');
                    if (newPrice) {
                        let oldAn = [...props.anl];
                        for (let i = 0; i<oldAn.length; i++) {
                            if (oldAn[i].id === item.id) {
                                oldAn[i].price_nonadh = parseInt(newPrice);
                            }
                        }
                        setMontant(sum+=parseInt(newPrice));
                        props.setAnl(oldAn);    
                    }
                }
                else {
                    setMontant(sum+=item.price_nonadh);                
                }
            }
        }
        else {
            let newArr = selectedType.filter(one => one !== item.id)
            setSelection({
                ...selection,
                type: newArr
            })
            let sum = montant;

            if (selection.adh_mip) {
                setMontant(sum-=item.price_adh);

            } else {
                setMontant(sum-=item.price_nonadh);                
            }
        }
    }

    let radioHandler = (item, event) => {
        let selectedType = selection.type;
        if (event.target.checked) {
            selectedType[0] = item.id;
            setSelection({
                ...selection,
                type: selectedType
            })
            
            if (selection.adh_mip) {
                setMontant(item.price_adh);

            } else {
                setMontant(item.price_nonadh);                
            }
        }
        else {
            let newArr = selectedType.filter(one => one !== item.id)
            setSelection({
                ...selection,
                type: newArr
            })

            if (selection.adh_mip) {
                setMontant(0);

            } else {
                setMontant(0);                
            }
        }
    }
    
    let typeExamen;
    let typeExamenTitle = '';

    switch (selection.examen) {
        case 'spec': 
            typeExamenTitle = 'Spécialistes';
            typeExamen=(spec.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>{props.adh ? montantFormatHandler.bind(this, item.price_adh)() : montantFormatHandler.bind(this, item.price_nonadh)()}</span>
                    <span className={classes.Checkbox}><input onChange={radioHandler.bind(this, item)} type="radio" name="spec" id={item.id}/></span>
                </li> 
            )))
            break;
        
        case 'exi':
            typeExamenTitle = 'Infirmerie'
            typeExamen=(exi.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>{props.adh ? montantFormatHandler.bind(this, item.price_adh)() : montantFormatHandler.bind(this, item.price_nonadh)()}</span>
                    <span className={classes.Checkbox}><input onClick={checkBoxHandler.bind(this, item)} type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;
        
        case 'anl':
            typeExamenTitle = 'Analyses'
            typeExamen=(props.anl.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>{props.adh ? montantFormatHandler.bind(this, item.price_adh)() : montantFormatHandler.bind(this, item.price_nonadh)()}</span>
                    <span className={classes.Checkbox}><input onClick={checkBoxHandler.bind(this, item)} type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;

        case 'den':
            typeExamenTitle = 'Dentiste'
            typeExamen=(den.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>{props.adh ? montantFormatHandler.bind(this, item.price_adh)() : montantFormatHandler.bind(this, item.price_nonadh)()}</span>
                    <span className={classes.Checkbox}><input onClick={checkBoxHandler.bind(this, item)} type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;


        default:
            break;   
        }

        
    let adhFetchHandler = (event) => {
        if (selection.adh_mip) {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && ssid) {
                axios.post('/fetchAdh', {ssid})
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            if (res.data.contentieux) {
                                let cont = res.data.contAdh;
                                let switchToPub = window.confirm(`Cet Adhérant fait parti de la liste des contentieux,\nVoulez vous continuer en tant que adhérant M.I.P ?\n\nNom : "${cont.nom}"\nPrénom : "${cont.prenom}"\nRégion : "${cont.region}"\nDate de retraite : "${cont.date_retraite}"\nNuméro de décision : "${cont.num_decision}"\nCode Entreprise/Unité : "${cont.code_entreprise}/${cont.code_unite}" `)
                                if (!switchToPub) {
                                    props.history.push('/non_adh');
                                    setMontant(0);
                                    setSelection({...selection, adh_mip: false, examen: '', type: []});
                                }
                            }
                            let {nom: nomPat, prenom: prenomPat, emp: empPat, categorie: categoriePat} = res.data.adh;
                            setNom(nomPat);
                            setPrenom(prenomPat);
                            let [reg] = regime.filter(item => item.title === categoriePat);
                            setSelection({
                                ...selection,
                                regime: reg.id
                            });
                            setEmployeur(empPat);
                        }
                        else {
                            let isAddAdh = window.confirm('Adhérant introuvable, Voulez vous l\'ajouter ?');
                            setAddAdh(isAddAdh)
                        }
                    })
                    .catch(err => alert('ERREUR : VERIFIEZ VOS DONNEES'));
            } else if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !ssid) {
                alert('ERREUR : VERIFIEZ VOS DONNEES')
            }
        }
    }
        
    let printHandler = (event) => {
            event.preventDefault();

            if (montant === 0) {
                return alert('ERREUR : VERIFIEZ VOS DONNEES');
            }

            if (selection.examen === 'anl' && selection.type[0]) {
                localStorage.setItem('anl', selection.type);
                localStorage.setItem('adh', selection.adh_mip);
            }
            
            localStorage.setItem('ssid',ssid);
            localStorage.setItem('nom',nom);
            localStorage.setItem('pre',prenom);
            localStorage.setItem('emp',employeur);
            if (!employeur) {
                localStorage.setItem('emp',' ');
            }
            localStorage.setItem('mon',montantFormatHandler(montant));

            let benefTitle;
            let regTitle;
            let examTitle;
            let specTitle;
            let anls;

            if (selection.regime) {
                let [reg] = regime.filter(item => item.id === selection.regime);
                localStorage.setItem('reg',reg.title);
                regTitle = reg.title;
            }

            if (selection.benef) {
                let [ben] = benef.filter(item => item.id === selection.benef);
                localStorage.setItem('ben',ben.title);
                benefTitle = ben.title;
            }

            if (selection.examen) {
                const [exam] = examen.filter(item => item.id === selection.examen);
                localStorage.setItem('exam',exam.title);
                examTitle = exam.title;
            }

            if (selection.examen === 'spec' && selection.type.length) {
                const [spe] = spec.filter(item => item.id === selection.type[0]);
                localStorage.setItem('spec',spe.title);
                specTitle = spe.title;
            }

            if (selection.examen === 'anl' && selection.type[0]) {
                anls = selection.type;
            }

            let month = new Date().getMonth() + 1;
            let day = new Date().getDate();
            let year = new Date().getFullYear();

            let url = '/addPatientNonAdh';
            let data = {
                ssid,
                nom,
                prenom,
                employeur,
                montant,
                benefTitle,
                examTitle,
                categorie: regTitle,
                specTitle,
                date: `${year}-${month}-${day}`,
                addAdh,
                anls
            }

            if (selection.adh_mip) {
                url = '/addPatientAdh'
            }

            axios.post(url,data)
                .then(res => {
                    let {success, id} = res.data;

                    if (success) {
                        localStorage.setItem('bon',id);
                        history.push('/print');
                    } else {
                        alert('ERREUR : VERIFIEZ VOS DONNEES')
                    }
                    
                })
                .catch(err => {
                    alert('ERREUR : VERIFIEZ VOS DONNEES')
                });
    }

    let resetHandler = (event) => {
        event.preventDefault();
        window.location.reload();
    }

    return (
        <div className={classes.FormPage}>
            <div className={classes.FormHeader}>
                <BackBtn/>
                <PageTitle adh={props.adh}/>
            </div>
            <div className={classes.Form}>
                <form>
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">N°SS</label>
                            <input onChange={ssidChangeHandler} pattern="\d*" onKeyDown={adhFetchHandler} type="number" placeholder="" value={ssid}/>
                        </div>
                        {selection.adh_mip ? null : <SmallBtn click={generateSsidHandler}>Générer</SmallBtn>}
                    </div>
                    
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Nom</label>
                            <input onChange={nomChangeHandler} type="text" placeholder="" value={nom} disabled={props.adh&&!addAdh}/>
                        </div>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Prénom</label>
                            <input onChange={prenomChangeHandler} type="text" placeholder="" value={prenom} disabled={props.adh&&!addAdh}/>
                        </div>
                    </div>
                    
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Régime</label>
                            <select onChange={regimeChangeHandler} value={selection.regime} disabled={props.adh&&!addAdh}>
                                {regime.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))}
                            </select>
                        </div>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Employeur</label>
                            <input onChange={employeurChangeHandler} type="text" placeholder="" value={employeur} disabled={props.adh&&!addAdh}/>
                        </div>
                    </div>

                    <div className={classes.FormGroup}>
                        <div className={`${classes.FormInput} ${classes.BenefInput}`}>
                            <label htmlFor="">Bénéficiaire</label>
                            <select onChange={benefChangeHandler}>
                                {benef.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))}
                            </select>
                        </div>
                        <div className={`${classes.FormInput} ${classes.ExamInput}`}>
                            <label htmlFor="">Examen Médical</label>
                            <select onChange={examenChangeHandler}>
                                {examen.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))}
                            </select>                        
                        </div>
                    </div>

                    <div className={classes.FormInput}>
                        <label htmlFor="">Montant Total</label>
                        <input type="text" name="" id="" disabled value={montantFormatHandler.bind(this, montant)()} className={classes.SumInput}/>
                    </div>

                </form>

                <div className={classes.Side}>
                    <h2>{typeExamenTitle}</h2>
                    <ul className={classes.Specs}>
                        {typeExamen}                        
                    </ul>

                    <div className={classes.Buttons}>
                        <SmallBtn click={resetHandler}>Réinitialiser</SmallBtn>
                        <SmallBtn click={printHandler}>Imprimer</SmallBtn>
                    </div>
                </div>
            </div>
            
            <div onClick={modalShowHandler} className={`${classes.BackDrop} ${modalShow ? classes.ShowBD : ''}`}></div>

            <Modal 
                toggle={modalShowHandler} 
                show={modalShow} 
                modalType={modalType}>{modalText}</Modal>
        </div>
    )
}

export default withRouter(FormPage);
