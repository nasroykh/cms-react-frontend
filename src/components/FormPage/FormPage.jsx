import React, {useState} from 'react';
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
        {id: '0', title: 'Select'},
        {id: 'act', title: 'Active'},
        {id: 'ina', title: 'Inactive'},
        {id: 'veu', title: 'Widow'}
    ];


    const [ssid, setSsid] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [employeur, setEmployeur] = useState('');
    const [benef, setBenef] = useState(
        [
            {id: '0', title: 'Select'},
            {id: 'asr', title: 'Social member'},
            {id: 'cjt', title: 'Spouse'},
            {id: 'enf', title: 'Child'}
    ]);
    const [examen, setExamen] = useState(
    [
        {id: '0', title: 'Select'},
        {id: 'anl', title:'Analysis'},
        {id: 'cg', title:'Generalist', price_adh: 200, price_nonadh: 300},
        {id: 'spec', title:'Specialist'},
        {id: 'den', title:'Dentist'},
        {id: 'abl', title:'Ablation', price_adh: 150, price_nonadh: 250},
        {id: 'ech', title:'Echography', price_adh: 500, price_nonadh: 700},
        {id: 'ecg', title:'E C G', price_adh: 200, price_nonadh: 350},
        {id: 'efr', title:'E F R', price_adh: 500, price_nonadh: 700},
        {id: 'inj', title:'Injection', price_adh: 30, price_nonadh: 40},
        {id: 'pas', title:'Simple dressing', price_adh: 200, price_nonadh: 300},
        {id: 'pai', title:'Infected dressing', price_adh: 350, price_nonadh: 500},
        {id: 'pdt', title:'Blood pressure', price_adh: 20, price_nonadh: 30},
        {id: 'sut', title:'Suture', price_adh: 400, price_nonadh: 500},
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
            {id: '0', title: 'Select'},
            {id: 'pub', title: 'Public'},
            {id: 'cnv', title: 'Convention'},
        ];
    }
    const [regime, setRegime] = useState(regimeAdh);
    const [montant, setMontant] = useState(0);
    const [spec, setSpec] = useState([
        {id: 'end', title:'Endocrinology', price_adh: 600, price_nonadh: 800},
        {id: 'gas', title:'Gastrology', price_adh: 500, price_nonadh: 700},
        {id: 'gyn', title:'Gynecologist', price_adh: 600, price_nonadh: 800},
        {id: 'neu', title:'Neurology', price_adh: 400, price_nonadh: 600},
        {id: 'ped', title:'Pediatrics', price_adh: 400, price_nonadh: 600},
        {id: 'uro', title:'Urology', price_adh: 500, price_nonadh: 700},
        {id: 'car', title:'Cardiology', price_adh: 600, price_nonadh: 800},
        {id: 'oph', title:'Ophtalmology', price_adh: 600, price_nonadh: 800},
        {id: 'orl', title:'O.R.L', price_adh: 400, price_nonadh: 600},
        {id: 'pne', title:'Pneumology', price_adh: 500, price_nonadh: 700},
        {id: 'foe', title:'Eye fundus (Ophtalmology)', price_adh: 350, price_nonadh: 400},
        {id: 'tra', title:'Traumatology', price_adh: 400, price_nonadh: 600},
        {id: 'dia', title:'Diabetology', price_adh: 600, price_nonadh: 800},
    ]);
    const [den, setDen] = useState([
        {id: 'con', title:'Consultation', price_adh: 200, price_nonadh: 400},
        {id: 'det', title:'Descaling', price_adh: 400, price_nonadh: 800},
        {id: 'ext', title:'Extraction', price_adh: 300, price_nonadh: 400},
        {id: 'luv', title:'UV Lamp', price_adh: 500, price_nonadh: 1000},
        {id: 'sde', title:'Dental care', price_adh: 400, price_nonadh: 800},
    ]);

    const [addAdh, setAddAdh] = useState(false);
    const [ssidGenerated, setSsidGenerated] = useState('false');

    

    
    let ssidChangeHandler = (event) => {
        setSsid(event.target.value)
    }

    let generateSsidHandler = (event) => {
        event.preventDefault();
        if (!selection.adh_mip) {
            if (ssidGenerated==='false') {
                setSsid(new Date().getTime());
                setSsidGenerated('true');
            }
            else {
                setSsid('');
                setSsidGenerated('false');
            }
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

        switch (event.target.value) {
            case 'anl':
            case 'spec':
            case 'den':
                setMontant(0);
                break;
                
            default:
                let selectedEx = examen.filter(item => item.id===event.target.value)[0];
                if (selection.adh_mip) {
                    setMontant(selectedEx.price_adh);
                } else {
                    setMontant(selectedEx.price_nonadh);
                }
                break;
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
                    let newPrice = window.prompt('Price not available, could you type it ?');
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
                    let newPrice = window.prompt('Price not available, could you type it ?');
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
            typeExamenTitle = 'Specialists';
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
        
        case 'anl':
            typeExamenTitle = 'Analysis'
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
            typeExamenTitle = 'Dentist'
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
                                let switchToPub = window.confirm(`This member is blacklisted,\nWould you confirm that ?\n\nFirst name : "${cont.nom}"\nLast name : "${cont.prenom}"\nRegion : "${cont.region}"\nRetirement date : "${cont.date_retraite}"\nDecision number : "${cont.num_decision}"\nCompany Code/Unity : "${cont.code_entreprise}/${cont.code_unite}" `)
                                if (switchToPub) {
                                    props.history.push('/non_adh');
                                    setMontant(0);
                                    setSelection({...selection, adh_mip: false, examen: '', type: []});
                                }
                            }
                            let {nom: nomPat, prenom: prenomPat, employeur: empPat, categorie: categoriePat} = res.data.adh;
                            setNom(nomPat);
                            setPrenom(prenomPat);
                            setEmployeur(empPat);
                            let [reg] = regime.filter(item => item.title === categoriePat);
                            setSelection({
                                ...selection,
                                regime: reg.id
                            });
                        }
                        else {
                            let isAddAdh = window.confirm('Cannot find this member, Would you like to add him ?');
                            setAddAdh(isAddAdh)
                        }
                    })
                    .catch(err => alert('Error : Verify entered data !'));
            } else if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !ssid) {
                alert('Error : Verify entered data !')
            }
        }
    }
        
    let printHandler = (event) => {
            event.preventDefault();

            if (montant === 0) {
                return alert('Error : Verify entered data !');
            }

            if (!selection.adh_mip) {
                localStorage.setItem('ssidgen', ssidGenerated);
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
                anls,
                ssidGenerated
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
                        alert('Error : Verify entered data !')
                    }
                    
                })
                .catch(err => {
                    alert('Error : Verify entered data !')
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
                            <label htmlFor="">SS N°</label>
                            <input onChange={ssidChangeHandler} pattern="\d*" disabled={ssidGenerated==='true'} onKeyDown={adhFetchHandler} type="number" placeholder="" value={ssid}/>
                        </div>
                        {selection.adh_mip ? null : <SmallBtn click={generateSsidHandler}>{ssidGenerated==='false' ? 'Generate' : 'Remove'}</SmallBtn>}
                    </div>
                    
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">First Name</label>
                            <input onChange={nomChangeHandler} type="text" placeholder="" value={nom} disabled={props.adh&&!addAdh}/>
                        </div>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Last Name</label>
                            <input onChange={prenomChangeHandler} type="text" placeholder="" value={prenom} disabled={props.adh&&!addAdh}/>
                        </div>
                    </div>
                    
                    <div className={classes.FormGroup}>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Status</label>
                            <select onChange={regimeChangeHandler} value={selection.regime} disabled={props.adh&&!addAdh}>
                                {regime.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))}
                            </select>
                        </div>
                        <div className={classes.FormInput}>
                            <label htmlFor="">Employer</label>
                            <input onChange={employeurChangeHandler} type="text" placeholder="" value={employeur} disabled={props.adh&&!addAdh}/>
                        </div>
                    </div>

                    <div className={classes.FormGroup}>
                        <div className={`${classes.FormInput} ${classes.BenefInput}`}>
                            <label htmlFor="">Recipient</label>
                            <select onChange={benefChangeHandler}>
                                {benef.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))}
                            </select>
                        </div>
                        <div className={`${classes.FormInput} ${classes.ExamInput}`}>
                            <label htmlFor="">Medical Exam</label>
                            <select onChange={examenChangeHandler}>
                                {examen.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))}
                            </select>                        
                        </div>
                    </div>

                    <div className={classes.FormInput}>
                        <label htmlFor="">Total</label>
                        <input type="text" name="" id="" disabled value={montantFormatHandler.bind(this, montant)()} className={classes.SumInput}/>
                    </div>

                </form>

                <div className={classes.Side}>
                    <h2>{typeExamenTitle}</h2>
                    <ul className={classes.Specs}>
                        {typeExamen}                        
                    </ul>

                    <div className={classes.Buttons}>
                        <SmallBtn click={resetHandler}>Reset</SmallBtn>
                        <SmallBtn click={printHandler}>Print</SmallBtn>
                    </div>
                </div>
            </div>
            
            {/* <div onClick={modalShowHandler} className={`${classes.BackDrop} ${modalShow ? classes.ShowBD : ''}`}></div> */}

            {/* <Modal/> */}
        </div>
    )
}

export default withRouter(FormPage);
