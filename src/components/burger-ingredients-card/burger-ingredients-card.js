import style from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { propTypesDataIngridients } from '../../utils/prop-types';

import { useDrag } from "react-dnd";

function BurgerIngredientsCard({ card }) {

    const location = useLocation();
    //DnD
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: card,
    });

    return (
        <Link to={`/ingredients/${card._id}`}
            state={{ background: location }}
            className={`${style.cardLink}`}>
            <div className={`${style.card__container}`}
                ref={dragRef}>
                <img src={card.image} alt={card.name} className={`pl-4 pr-4`} />
                <Counter count={card.isInOrder} size="default" extraClass="m-1" />
                <div className={`${style.card__price} pt-1 pb-1`}>
                    <p className={`pr-2 text text_type_digits-default`}>{card.price}</p>
                    <CurrencyIcon />
                </div>
                <p className={`text text_type_main-default`}>{card.name}</p>
            </div>

        </Link>
    )
};

BurgerIngredientsCard.propTypes = {
    card: propTypesDataIngridients.isRequired,
};

export default BurgerIngredientsCard;