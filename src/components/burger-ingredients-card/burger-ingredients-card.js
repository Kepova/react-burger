import style from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import propTypesDataIngridient from '../../utils/prop-types';

import { useDispatch } from 'react-redux';
import { showCurrentIngredient } from '../redux/actions/actions';

import { useDrag } from "react-dnd";

function BurgerIngredientsCard({ card }) {
    //DnD
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: card,
    });

    //redux
    const dispatch = useDispatch();

    const openModalClick = (card) => {
        dispatch(showCurrentIngredient(card));
    };
    return (
        <div className={`${style.card__container}`}
            onClick={() => openModalClick(card)}
            ref={dragRef}>
            <img src={card.image} alt={card.name} className={`pl-4 pr-4`} />
            <Counter count={card.isInOrder} size="default" extraClass="m-1" />
            <div className={`${style.card__price} pt-1 pb-1`}>
                <p className={`pr-2 text text_type_digits-default`}>{card.price}</p>
                <CurrencyIcon />
            </div>
            <p className={`text text_type_main-default`}>{card.name}</p>
        </div>
    )
};

BurgerIngredientsCard.propTypes = {
    card: propTypesDataIngridient.isRequired,
};

export default BurgerIngredientsCard;