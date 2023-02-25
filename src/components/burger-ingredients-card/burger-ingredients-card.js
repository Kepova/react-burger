import burgerCardStyle from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';

import PropTypes from 'prop-types';
import propTypesDataIngridient from '../../utils/prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { showCurrentIngredient } from '../redux/actions/actions';

function BurgerIngredientsCard({ name, title, dataCards }) {

    //redux
    const { dataIngridients, openModalIngredients } = useSelector(store => ({
        dataIngridients: store.dataIngridients,
        openModalIngredients: store.openModalIngredients,
    }));
    const dispatch = useDispatch();

    const openModalClick = (card) => {
        dispatch(showCurrentIngredient(card));
    };

    return (
        <>
            <h2 className={`${burgerCardStyle.card__title} text text_type_main-medium pt-10 pb-6 pl-5`} name={name}>{title}</h2>
            <div className={`${burgerCardStyle.cards__container}`}>
                {dataIngridients.map((card) => (
                    <div className={`${burgerCardStyle.card__container}`} key={card._id} onClick={() => openModalClick(card)} >
                        <img src={card.image} alt={card.name} className={`pl-4 pr-4`} />
                        <Counter count={1} size="default" extraClass="m-1" />
                        <div className={`${burgerCardStyle.card__price} pt-1 pb-1`}>
                            <p className={`pr-2 text text_type_digits-default`}>{card.price}</p>
                            <CurrencyIcon />
                        </div>

                        <p className={`text text_type_main-default`}>{card.name}</p>
                    </div>
                ))}
            </div>
            {openModalIngredients && <IngredientDetails />}
        </>
    )
};

BurgerIngredientsCard.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dataCards: PropTypes.arrayOf(propTypesDataIngridient).isRequired
};

export default BurgerIngredientsCard;