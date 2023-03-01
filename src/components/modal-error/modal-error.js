import style from './modal-error.module.css';
import PropTypes from 'prop-types';

const ModalError = ({ openError }) => {
    return (
        <>
            {(openError !== null) &&
                <p className={`${style.errMessage} text text_type_main-default`}>
                    {openError}
                </p>}
        </>
    )
};

export const propTypesIngredient = ({
    openError: PropTypes.bool.isRequired
})

export default ModalError;