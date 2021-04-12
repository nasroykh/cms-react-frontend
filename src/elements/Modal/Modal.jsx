import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import classes from './Modal.module.css';
import SmallBtn from '../SmallBtn/SmallBtn';

const Modal = forwardRef((props, ref) => {
    let content;

    const [modalShow, setModalShow] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalType, setModalType] = useState('');
    const [modalRes, setModalRes] = useState(false);

    
    useImperativeHandle(ref, () => ({
        async modalShowHandler(text, type) {
            setModalShow(!modalShow);
            setModalText(text);
            setModalType(type);
        
            let promise = new Promise((resolve, reject) => {
                let int = setInterval(() => {
                    if (!modalShow) {
                        resolve(modalRes);
                        clearInterval(int);
                    }
                }, 500);
            });
        } 
    }));

    let modalShowHandler = (res) => {
        setModalRes(res);
        setModalShow(!modalShow);
    } 


    switch (modalType) {
        case 'confirm':
            content = ([
                    <h2>{modalText}</h2>,
                    <div>
                        <SmallBtn click={modalShowHandler.bind(this, false)}>NON</SmallBtn>
                        <SmallBtn click={modalShowHandler.bind(this, true)}>OUI</SmallBtn>
                    </div>
            ]);
            break;

        case 'prompt':
            content = ([
                    <h2>{modalText}</h2>,
                    <input type="text" name="" id=""/>
            ]);
        
            break;
    
        case 'alert':
            content = ([
                <h2>{modalText}</h2>,
                <SmallBtn click={modalShowHandler}>OK</SmallBtn>
            ]);
        
            break;

        default:
            break;
    }
    return (
        <div className={`${classes.ModalBox} ${modalShow ? classes.Show : ''}`}>
            {content}
        </div>
    )
})

export default Modal
