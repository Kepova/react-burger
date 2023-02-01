import { useState } from 'react';
import burgerCardStyle from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useEnableModal from '../../hooks/use-enable-modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';

function BurgerIngredientsCard({ name, title, dataCards }) {
    const { handleClickOpen, handleClickClose, isOpenModal } = useEnableModal(false);
    const [selectedCard, setSelectedCard] = useState({});

    const openModalClick = (card) => {
        setSelectedCard(card);
        handleClickOpen();
    };

    return (
        <>
            <h2 className={`${burgerCardStyle.card__title} text text_type_main-medium pt-10 pb-6 pl-5`} name={name}>{title}</h2>
            <div className={`${burgerCardStyle.cards__container}`}>
                {dataCards.map((card) => (
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
            {isOpenModal &&
                <IngredientDetails
                    ingridient={selectedCard}
                    handleClickClose={handleClickClose}
                    isOpenModal={isOpenModal}
                />}
        </>
    )
};

BurgerIngredientsCard.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dataCards: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
};

export default BurgerIngredientsCard;