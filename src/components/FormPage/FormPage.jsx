import React, {useState} from 'react';
import BackBtn from '../../elements/BackBtn/BackBtn';
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import PageTitle from '../PageTitle/PageTitle';
import classes from './FormPage.module.css';
import axios from 'axios';

const FormPage = (props) => {

    const [ssid, setSsid] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [regime, setRegime] = useState(
        [
        {id: '0', title: 'Sélectionner'},
        {id: 'act', title: 'Actif'},
        {id: 'inv', title: 'Inactif / Vivant'},
        {id: 'ind', title: 'Inactif / Décédé'},
        {id: 'veu', title: 'Veuve'}
        ]);
    const [employeur, setEmployeur] = useState(' ');
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
    const [montant, setMontant] = useState(0);
    const [spec, setSpec] = useState([
        {id: 'end', title:'Endocrinologie', price_adh: 600, price_nonadh: 800},
        {id: 'foe', title:'Fond d\'oeil (Ophtalmologie)', price_adh: 350, price_nonadh: 400},
        {id: 'gas', title:'Gastrologie', price_adh: 500, price_nonadh: 700},
        {id: 'gyn', title:'Gynécologie', price_adh: 600, price_nonadh: 800},
        {id: 'neu', title:'Neurologie', price_adh: 400, price_nonadh: 600},
        {id: 'orl', title:'O.R.L', price_adh: 400, price_nonadh: 600},
        {id: 'oph', title:'Ophtalmologie', price_adh: 600, price_nonadh: 800},
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
        {id: 'pan', title:'Pansement simple', price_adh: 200, price_nonadh: 300},
        {id: 'pan', title:'Pansement infecté', price_adh: 350, price_nonadh: 500},
        {id: 'pdt', title:'Prise de Tension', price_adh: 20, price_nonadh: 30},
        {id: 'sut', title:'Suture', price_adh: 400, price_nonadh: 500},
        {id: 'soi', title:'Soins', price_adh: 0, price_nonadh: 0},
    ]);
    const [den, setDen] = useState([
        {id: 'con', title:'Consultation', price_adh: 200, price_nonadh: 400},
        {id: 'det', title:'Détartrage', price_adh: 400, price_nonadh: 800},
        {id: 'ext', title:'Extraction', price_adh: 300, price_nonadh: 400},
        {id: 'luv', title:'Lampe UV', price_adh: 500, price_nonadh: 1000},
        {id: 'sde', title:'Soins dentaire', price_adh: 400, price_nonadh: 800},
    ]);
    const [anl, setAnl] = useState([
        {id: 'fns', title:'FORMULE NUMIRIQUE SANGUINE (FNS)', price_adh: 240, price_nonadh: 340},
        {id: 'vds', title:'VITESSE DE SEDIMENTATION  (VS)', price_adh: 60, price_nonadh: 90},
        {id: 'grp', title:'GROUPAGE', price_adh: 180, price_nonadh: 210},
        {id: 'gaj', title:'GLYCEMIE A JEU ', price_adh: 60, price_nonadh: 90},
        {id: 'gpp', title:'GLYCEMIE POSTE-PRANDIALE', price_adh: 60, price_nonadh: 90},
        {id: 'ure', title:'UREE ', price_adh: 60, price_nonadh: 90},
        {id: 'hgl', title:'HEMOGLOBINE GLYCOLYSEE', price_adh: 520, price_nonadh: 0},
        {id: 'cre', title:'CREATININE ', price_adh: 60, price_nonadh: 90},    
        {id: 'cho', title:'CHOLESTEROL', price_adh: 60, price_nonadh: 60},    
        {id: 'hdc', title:'HDL CHOLESTEROL', price_adh: 40, price_nonadh: 60},    
        {id: 'trg', title:'TRIGLYCERIDE', price_adh: 90, price_nonadh: 130},    
        {id: 'tgo', title:'TGO', price_adh: 120, price_nonadh: 170},    
        {id: 'tgp', title:'TGP', price_adh: 120, price_nonadh: 170},    
        {id: 'bdc', title:'BILIRUBINE DIRECT/CONJUGUE', price_adh: 60, price_nonadh: 90},    
        {id: 'bic', title:'BILIRUBINE INDIRECTE/NON CONJUGUE', price_adh: 60, price_nonadh: 90},    
        {id: 'aur', title:'ACIDE URIQUE ', price_adh: 60, price_nonadh: 90},    
        {id: 'pha', title:'PHOSPHATASE ALCALINE', price_adh: 150, price_nonadh: 210},    
        {id: 'cal', title:'CALICIUM', price_adh: 60, price_nonadh: 90},    
        {id: 'pho', title:'PHOSPHORE', price_adh: 60, price_nonadh: 90},    
        {id: 'tdp', title:'TAUX DE PROTHTROMBINE (TP)', price_adh: 120, price_nonadh: 0},    
        {id: 'cdu', title:'CHIMIE DES URINES', price_adh: 60, price_nonadh: 90},    
        {id: 'lat', title:'LATEX', price_adh: 150, price_nonadh: 210},    
        {id: 'waa', title:'WAALER', price_adh: 150, price_nonadh: 210},    
        {id: 'hbs', title:'ANTIGENE HBS HEPATITE B', price_adh: 600, price_nonadh: 860},    
        {id: 'hiv', title:'ANTIGENE HIV HEPATITE', price_adh: 600, price_nonadh: 860},    
        {id: 'hcv', title:'ANTIGENE HCV HEPATITE C', price_adh: 600, price_nonadh: 860},    
        {id: 'tox', title:'TOXOPLASMOSE igG', price_adh: 700, price_nonadh: 980},    
        {id: 'rub', title:'RUBEOLE igm', price_adh: 700, price_nonadh: 980},    
        {id: 'crp', title:'CRP', price_adh: 150, price_nonadh: 210},    
        {id: 'asl', title:'ASLO', price_adh: 150, price_nonadh: 210},    
    ])

    const [addAdh, setAddAdh] = useState(false);
    
    
    let ssidChangeHandler = (event) => {
        setSsid(event.target.value)
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
                setMontant(sum+=item.price_adh);

            } else {
                setMontant(sum+=item.price_nonadh);                
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
                    <span>{`${props.adh ? item.price_adh : item.price_nonadh},00 DA`}</span>
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
                    <span>{`${props.adh ? item.price_adh : item.price_nonadh},00 DA`}</span>
                    <span className={classes.Checkbox}><input onClick={checkBoxHandler.bind(this, item)} type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;
        
        case 'anl':
            typeExamenTitle = 'Analyses'
            typeExamen=(anl.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>{`${props.adh ? item.price_adh : item.price_nonadh},00 DA`}</span>
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
                    <span>{`${props.adh ? item.price_adh : item.price_nonadh},00 DA`}</span>
                    <span className={classes.Checkbox}><input onClick={checkBoxHandler.bind(this, item)} type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;


        default:
            break;   
        }

    let adhFetchHandler = (event) => {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && ssid) {
                axios.post('/fetchAdh', {ssid})
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            let {nom, prenom, employeur, categorie, etat_inactif} = res.data.adh;
                            if (selection.adh_mip) {
                                setNom(nom);
                                setPrenom(prenom);
                                if (etat_inactif) {
                                    let [reg] = regime.filter(item => item.title === `${categorie} / ${etat_inactif}`);
                                    setSelection({
                                        ...selection,
                                        regime: reg.id
                                    });
                                }
                                else {
                                    let [reg] = regime.filter(item => item.title === categorie);
                                    setSelection({
                                        ...selection,
                                        regime: reg.id
                                    });
                                }
                                if (!employeur) {
                                    employeur=" "
                                } else {
                                    setEmployeur(employeur);
                                }
                            }
                            else {
                                alert('Numéro de Sécurité Social déja éxistant !');
                            }
                        }
                        else {
                            let addAdh = window.confirm('Adhérant introuvable, Voulez vous l\'ajouter ?');
                            setAddAdh(addAdh);
                        }
                    })
                    .catch(err => alert('ERREUR : VERIFIEZ VOS DONNEES'));
            } else if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !ssid) {
                alert('ERREUR : VERIFIEZ VOS DONNEES')
            }
    }
        
    let printHandler = () => {

            localStorage.setItem('ssid',ssid);
            localStorage.setItem('nom',nom);
            localStorage.setItem('pre',prenom);
            localStorage.setItem('emp',employeur);
            localStorage.setItem('mon',montant.toString());

            let benefTitle;
            let regTitle;
            let examTitle;
            let specTitle;

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
                addAdh
            }

            if (selection.adh_mip) {
                url = '/addPatientAdh'
            }

            axios.post(url,data)
                .then(res => {
                    let {success, id} = res.data;

                    if (success) {
                        localStorage.setItem('bon',id);
                        window.open('/print');
                    } else {
                        alert('ERREUR : VERIFIEZ VOS DONNEES')
                    }
                    setTimeout(() => {
                        localStorage.clear();
                    }, 3000);
                })
                .catch(err => {
                    alert('ERREUR : VERIFIEZ VOS DONNEES')
                });
                
                


    }

    let resetHandler = () => {
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
                    <div className={classes.FormInput}>
                        <label htmlFor="">N°SS</label>
                        <input onChange={ssidChangeHandler} pattern="\d*" onKeyDown={adhFetchHandler} type="number" placeholder="" value={ssid}/>
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
                        <input type="text" name="" id="" value={`${montant},00 DA`} className={classes.SumInput}/>
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


        </div>
    )
}

export default FormPage;
