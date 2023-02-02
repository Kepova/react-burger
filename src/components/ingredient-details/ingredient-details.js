import Modal from "../modal/modal";
import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import propTypesDataIngridient from '../../utils/prop-types';

const IngredientDetails = ({ ingridient, isOpenModal, handleClickClose }) => {
    return (
        <Modal title={'Детали ингредиента'} isOpenModal={isOpenModal} handleClickClose={handleClickClose} >
            <div className={`${style.ingridientDetail}`}>
                <img src={ingridient.image_large} alt={ingridient.name} className={`${style.ingridientImage} pl-5 pr-5 pb-4`} />
                <h2 className={`${style.ingridientTitle} text text_type_main-medium pb-8`}>{ingridient.name}</h2>
                <ul className={`${style.listNutrients}`}>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Калории,ккал</p>
                        <p className={`text text_type_digits-default`}>{ingridient.calories}</p>
                    </li>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Белки, г</p>
                        <p className={`text text_type_digits-default`}>{ingridient.proteins}</p>
                    </li>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Жиры, г</p>
                        <p className={`text text_type_digits-default`}>{ingridient.fat}</p>
                    </li>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Углеводы, г</p>
                        <p className={`text text_type_digits-default`}>{ingridient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </Modal>
    )
};

IngredientDetails.propTypes = {
    ingridient: propTypesDataIngridient.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
    handleClickClose: PropTypes.func.isRequired
};

export default IngredientDetails;