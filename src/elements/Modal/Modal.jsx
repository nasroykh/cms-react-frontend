import React from 'react';
import classes from './Modal.module.css';
import SmallBtn from '../SmallBtn/SmallBtn';

const Modal = (props) => {
    let content;
    let confirmHandler = (confirm) => {
        props.toggle();
        props.confirmRes(confirm);
    }
    switch (props.modalType) {
        case 'confirm':
            content = ([
                    <h2>{props.children}</h2>,
                    <div>
                        <SmallBtn click={confirmHandler.bind(this, false)}>NON</SmallBtn>
                        <SmallBtn click={confirmHandler.bind(this, true)}>OUI</SmallBtn>
                    </div>
            ]);
            break;

        case 'prompt':
            content = ([
                    <h2>{props.children}</h2>,
                    <input type="text" name="" id=""/>
            ]);
        
            break;
    
        case 'alert':
            content = ([
                <h2>{props.children}</h2>,
                <SmallBtn>OK</SmallBtn>
            ]);
        
            break;

        default:
            break;
    }
    return (
        <div className={`${classes.ModalBox} ${props.show ? classes.Show : ''}`}>
            {content}
        </div>
    )
}

export default Modal
