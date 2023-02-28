import style from './burger-ingredients-group.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import IngredientDetails from '../ingredient-details/ingredient-details';

import PropTypes from 'prop-types';
import propTypesDataIngridient from '../../utils/prop-types';

import { useSelector } from 'react-redux';

function BurgerIngredientsGroup({ name, title, dataCards }) {

    //redux
    const { openModalIngredients } = useSelector(store => ({
        openModalIngredients: store.ingredientsReducer.openModalIngredients,
    }));

    return (
        <>
            <h2 className={`${style.card__title} text text_type_main-medium pt-10 pb-6 pl-5`} name={name}>
                {title}
            </h2>
            <div className={`${style.cards__container}`}>
                {dataCards.map((card) =>
                    <BurgerIngredientsCard card={card} key={card._id} />)}
            </div>
            {openModalIngredients && <IngredientDetails />}
        </>
    )
};

BurgerIngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dataCards: PropTypes.arrayOf(propTypesDataIngridient).isRequired
};

export default BurgerIngredientsGroup;