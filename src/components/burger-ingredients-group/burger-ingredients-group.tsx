import { FC } from 'react';
import style from './burger-ingredients-group.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { TGroupIngredients } from '../../services/types';
import { Element } from 'react-scroll';

const BurgerIngredientsGroup: FC<TGroupIngredients> = ({ name, title, dataCards }) => {

    return (
        <>
            <Element className={`${style.card__title} text text_type_main-medium pt-10 pb-6 pl-5`} name={name}>
                {title}
            </Element>
            <div className={`${style.cards__container}`} id='burger-ingredients-group'>
                {dataCards.map((card) =>
                    <BurgerIngredientsCard card={card} key={card._id} />)}
            </div>
        </>
    )
};

export default BurgerIngredientsGroup;