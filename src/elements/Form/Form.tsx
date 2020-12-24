import React from 'react';
import classes from './Form.module.css';

const Form = () => {
    return (
        <form action="" className={classes.Form}>

            <div>
                <label htmlFor="">N° SS</label>
                <input type="search" name="" id=""/>
            </div>

            <div>
                <label htmlFor="">Nom</label>
                <p>John</p>
            </div>

            <div>
                <label htmlFor="">Prénom</label>
                <p>Doe</p>
            </div>

            <div>
                <label htmlFor="">Régime</label>
                <p>Actif</p>
            </div>

            <div>
                <label htmlFor="">Employeur</label>
                <p>CMS</p>
            </div>

            <div>
                <label htmlFor="">Bénéficiaire</label>
                <select name="" id="">
                    <option value="Assuré">Assuré</option>
                </select>
            </div>

            <div>
                <label htmlFor="">Examen Médical</label>
                <select name="" id="">
                    <option value="Medecin Generaliste">Médecin Généraliste</option>
                </select>
            </div>

            <div>
                <label htmlFor="">Montant Total</label>
                <p>500,00 DA</p>
            </div>
			
        </form>
    )
}

export default Form;
