import Modal from "../modal/modal";
import style from './ingredient-details.module.css';

import { useSelector } from 'react-redux';

const IngredientDetails = ({ isOpenModal, handleClickClose }) => {

    //redux
    const { currentIngredient, openModalIngredients } = useSelector(store => ({
        currentIngredient: store.currentIngredient,
        openModalIngredients: store.openModalIngredients
    }));

    return (
        <Modal title={'Детали ингредиента'}
        isOpenModal={openModalIngredients}
        handleClickClose={handleClickClose} >
            <div className={`${style.ingridientDetail}`}>
                <img src={currentIngredient.image_large} alt={currentIngredient.name} className={`${style.ingridientImage} pl-5 pr-5 pb-4`} />
                <h2 className={`${style.ingridientTitle} text text_type_main-medium pb-8`}>{currentIngredient.name}</h2>
                <ul className={`${style.listNutrients}`}>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Калории,ккал</p>
                        <p className={`text text_type_digits-default`}>{currentIngredient.calories}</p>
                    </li>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Белки, г</p>
                        <p className={`text text_type_digits-default`}>{currentIngredient.proteins}</p>
                    </li>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Жиры, г</p>
                        <p className={`text text_type_digits-default`}>{currentIngredient.fat}</p>
                    </li>
                    <li className={`${style.nutrient}`}>
                        <p className={`text text_type_main-default pb-2`}>Углеводы, г</p>
                        <p className={`text text_type_digits-default`}>{currentIngredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </Modal>
    )
};

export default IngredientDetails;