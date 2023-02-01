import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

const ModalOverlay = ({ handleClickClose }) => {

    return (
        <div className={style.modalOverlay} onClick={handleClickClose}>
        </div>
    )
};

ModalOverlay.propTypes = {
    handleClickClose: PropTypes.func.isRequired
};

export default ModalOverlay;