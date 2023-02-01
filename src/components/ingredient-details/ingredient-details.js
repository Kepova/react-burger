import Modal from "../modal/modal";
import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';

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
    ingridient: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']),
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }).isRequired,
    isOpenModal: PropTypes.bool.isRequired,
    handleClickClose: PropTypes.func.isRequired
};

export default IngredientDetails;