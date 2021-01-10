import React, {ChangeEvent, ChangeEventHandler, SyntheticEvent, useState} from 'react';
import BackBtn from '../../elements/BackBtn/BackBtn';
import { NavLink } from 'react-router-dom';
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import PageTitle from '../PageTitle/PageTitle';
import classes from './FormPage.module.css';

const FormPage = (props: any) => {

    const [ssid, setSsid] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [regime, setRegime] = useState('');
    const [employeur, setEmployeur] = useState('');
    const [benef, setBenef] = useState(
        [
            {id: '0', title: '--'},
            {id: 'asr', title: 'Assuré'},
            {id: 'cjt', title: 'Conjoint'},
            {id: 'enf', title: 'Enfant'}
        ]);
    const [examen, setExamen] = useState(
        [
            {id: '0', title: '--'},
            {id: 'an', title:'Analyses'},
            {id: 'cg', title:'Consultation généraliste'},
            {id: 'cs', title:'Consultation spécialiste'},
            {id: 'dn', title:'Dentiste'},
            {id: 'in', title:'Infirmerie'}
        ]);
    const [selection, setSelection] = useState({
        adh_mip: props.adh,
        benef: '',
        examen: '',
        spec: '',
        exi: ''
    });
    const [montant, setMontant] = useState(0);
    const [spec, setSpec] = useState([
        {id: 'oph', title:'Ophtalmologie'},
        {id: 'gyn', title:'Gynécologie'},
        {id: 'end', title:'Endocrinologie'},
        {id: 'gas', title:'Gastrologie'},
        {id: 'pne', title:'Pneumologie'},
        {id: 'tra', title:'Traumatologie'},
        {id: 'neu', title:'Neurologie'},
        {id: 'ped', title:'Pédiatre'},
        {id: 'uro', title:'Urologie'},
        {id: 'orl', title:'O.R.L'},
    ]);
    const [exi, setExi] = useState([
        {id: 'pan', title:'Pansement'},
        {id: 'abl', title:'Ablation'},
        {id: 'soi', title:'Soins'},
        {id: 'pdt', title:'Prise de Tension'},
        {id: 'inj', title:'Injection'},
        {id: 'ecg', title:'E C G'},
        {id: 'efr', title:'E F R'},
        {id: 'ech', title:'Echographie'},
    ]);
    const [anl, setAnl] = useState([
        {id: 'fns', title:'FORMULE NUMIRIQUE SANGUINE (FNS)'},
        {id: 'vds', title:'VITESSE DE SEDIMENTATION  (VS)'},
        {id: 'grp', title:'GROUPAGE'},
        {id: 'gaj', title:'GLYCEMIE A JEU '},
        {id: 'gpp', title:'GLYCEMIE POSTE-PRANDIALE'},
        {id: 'ure', title:'UREE '},
        {id: 'hgl', title:'HEMOGLOBINE GLYCOLYSEE'},
        {id: 'cre', title:'CREATININE '},    
        {id: 'cho', title:'CHOLESTEROL'},    
        {id: 'hdc', title:'HDL CHOLESTEROL'},    
        {id: 'trg', title:'TRIGLYCERIDEc'},    
        {id: 'tgo', title:'TGO'},    
        {id: 'tgp', title:'TGP'},    
        {id: 'tp', title:'TP'},    
        {id: 'bdc', title:'BILIRUBINE DIRECT/CONJUGUE'},    
        {id: 'bic', title:'BILIRUBINE INDIRECTE/NON CONJUGUE'},    
        {id: 'aur', title:'ACIDE URIQUE '},    
        {id: 'pha', title:'PHOSPHATASE ALCALINE'},    
        {id: 'cal', title:'CALICIUM'},    
        {id: 'pho', title:'PHOSPHORE'},    
        {id: 'tdp', title:'TAUX DE PROTHTROMBINE (TP)'},    
        {id: 'cdu', title:'CHIMIE DES URINES'},    
        {id: 'lat', title:'LATEX'},    
        {id: 'waa', title:'WAALER'},    
        {id: 'hbs', title:'ANTIGENE HBS HEPATITE B'},    
        {id: 'hiv', title:'ANTIGENE HIV HEPATITE'},    
        {id: 'hcv', title:'ANTIGENE HCV HEPATITE C'},    
        {id: 'tox', title:'TOXOPLASMOSE igG'},    
        {id: 'rub', title:'RUBEOLE igm'},    
        {id: 'crp', title:'CRP'},    
        {id: 'asl', title:'ASLO'},    
    ])

    let ssidChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSsid(event.target.value)
    }

    let nomChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value)
    }
    
    let prenomChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPrenom(event.target.value)
    }

    let regimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRegime(event.target.value)
    }

    let employeurChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmployeur(event.target.value)
    }
    
    let benefChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setSelection({
            ...selection,
            benef: event.target.value
        })
    }
    
    let examenChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelection({
            ...selection,
            examen: event.target.value
        })
    }
    
    let typeExamen;
    let typeExamenTitle = '';

    switch (selection.examen) {
        case 'cs': 
            typeExamenTitle = 'Spécialistes';
            typeExamen=(spec.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>100DA</span>
                    <span className={classes.Checkbox}><input type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;
        
        case 'in':
            typeExamenTitle = 'Infirmerie'
            typeExamen=(exi.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>100DA</span>
                    <span className={classes.Checkbox}><input type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;
        
        case 'an':
            typeExamenTitle = 'Analyses'
            typeExamen=(anl.map((item) => ( 
                <li key={item.id}>
                    <span>
                        {item.title}
                    </span>
                    <span>100DA</span>
                    <span className={classes.Checkbox}><input type="checkbox" name="" id={item.id}/></span>
                </li> 
            )))
            break;


        default:
            break;   
        }
        
        let printHandler = () => {
            window.open('/print');
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
                        <input onChange={ssidChangeHandler} type="text" name="" id="" value={ssid}/>
                    </div>
                    
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Nom</label>
                            <input onChange={nomChangeHandler} type="text" name="" id="" value={nom} className={props.adh ? classes.DisabledInput : ''}/>
                        </div>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Prénom</label>
                            <input onChange={prenomChangeHandler} type="text" name="" id="" value={prenom} className={props.adh ? classes.DisabledInput : ''}/>
                        </div>
                    </div>
                    
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Régime</label>
                            <input onChange={regimeChangeHandler} type="text" name="" id="" value={regime} className={props.adh ? classes.DisabledInput : ''}/>
                        </div>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Employeur</label>
                            <input onChange={employeurChangeHandler} type="text" name="" id="" value={employeur} className={props.adh ? classes.DisabledInput : ''}/>
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
                        <input type="text" name="" id="" value="100DA" className={classes.SumInput}/>
                    </div>

                </form>

                <div className={classes.Side}>
                    <h2>{typeExamenTitle}</h2>
                    <ul className={classes.Specs}>
                        {typeExamen}                        
                    </ul>

                    <div className={classes.Buttons}>
                        <SmallBtn>Réinitialiser</SmallBtn>
                        <SmallBtn click={printHandler}>Imprimer</SmallBtn>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FormPage;
