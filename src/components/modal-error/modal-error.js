import style from './modal-error.module.css';

const ModalError = ({ openError }) => {
    return (
        <>
            {(openError !== null) &&
                <p className={`${style.errMessage} text text_type_main-default`}>
                    Возникла {openError}.
                </p>}
        </>
    )
};

export default ModalError;