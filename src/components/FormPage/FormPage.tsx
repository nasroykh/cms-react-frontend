import React from 'react';
import BackBtn from '../../elements/BackBtn/BackBtn';
import Form from '../../elements/Form/Form';
import SmallBtn from '../../elements/SmallBtn/SmallBtn';
import PageTitle from '../PageTitle/PageTitle';
import classes from './FormPage.module.css';

const FormPage = (props: any) => {
    return (
        <div className={classes.FormPage}>
            <div className={classes.FormHeader}>
                <BackBtn/>
                <PageTitle/>
            </div>
            <div className={classes.Content}>
                <Form/>
                <div className={classes.Side}>
                    <div className={classes.SpecTable}>
                        <table>
                            <thead>
                                <th>
                                    Type d'Analyse
                                </th>
                                <th>
                                    Montant
                                </th>
                                <th>
                                    à cocher
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HIV</td>
                                    <td>500DA</td>
                                    <td><input type="checkbox" name="" id=""/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.Buttons}>
                        <SmallBtn>Réinitialiser</SmallBtn>
                        <SmallBtn>Imprimer</SmallBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPage;
