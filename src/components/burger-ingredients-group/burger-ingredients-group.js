import style from './burger-ingredients-group.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import PropTypes from 'prop-types';
import { propTypesDataIngridients } from '../../utils/prop-types';

function BurgerIngredientsGroup({ name, title, dataCards }) {

    return (
        <>
            <h2 className={`${style.card__title} text text_type_main-medium pt-10 pb-6 pl-5`} name={name}>
                {title}
            </h2>
            <div className={`${style.cards__container}`}>
                {dataCards.map((card) =>
                    <BurgerIngredientsCard card={card} key={card._id} />)}
            </div>
        </>
    )
};

BurgerIngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dataCards: PropTypes.arrayOf(propTypesDataIngridients).isRequired
};

export default BurgerIngredientsGroup;