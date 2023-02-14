import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useEnableModal from '../../hooks/use-enable-modal';
import style from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useContext, useEffect, useReducer, useMemo, useState } from 'react';
import { IngredientsContext } from '../../services/ingredients-context';
import { createOrder } from '../../utils/api';
import useErrors from '../../hooks/use-errors';
import ModalError from '../modal-error/modal-error';

const initialState = { totalPrice: 0 };
function reducer(state, action) {
    const currentSumm = action.reduce((accumulator, currentObj) => {
        if (currentObj.type === 'bun') {
            return accumulator + (currentObj.price * 2)
        }
        return accumulator + currentObj.price
    }, 0);
    return { totalPrice: currentSumm };
};

// Компонент BurgerConstructor
function BurgerConstructor() {
    const dataBurgerIngridients = useContext(IngredientsContext);
    const { handleClickOpen, handleClickClose, isOpenModal } = useEnableModal(false);
    const [dataOrder, setDataOrder] = useState();
    const { handleErrorOpen, handleErrorClose, error } = useErrors(null);

    const [state, dispatch] = useReducer(reducer, initialState, undefined);

    const fillingBurger = useMemo(() => dataBurgerIngridients.filter(item => item.type !== 'bun'), [dataBurgerIngridients]);
    const bunsBurger = useMemo(() => dataBurgerIngridients.filter(item => item.type === 'bun'), [dataBurgerIngridients]);

    //выбранная булка
    const bunBurger = useMemo(() => bunsBurger[Math.floor(Math.random() * bunsBurger.length)], [bunsBurger]);

    //подсчет стоимости бургера
    useEffect(() => {
        dispatch(fillingBurger.concat(bunBurger));
    }, [fillingBurger, bunBurger]);

    //оформить заказ
    const clickPlaceOrder = () => {
        const ingredients = Array.from(fillingBurger, obj => obj._id);
        createOrder(ingredients)
            .then(res => {
                handleClickOpen();
                setDataOrder(res);
                handleErrorClose();
            })
            .catch(err => handleErrorOpen(err))
    };

    return (
        <section className={`${style.burgerConstructor} pl-4 pb-13`}>
            {error && <ModalError openError={error} />}
            <div className={`${fillingBurger.topBun} pl-8 pb-4 pr-4`}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text={`${bunBurger.name} (верх)`}
                    price={bunBurger.price}
                    thumbnail={bunBurger.image}
                />
            </div>
            <div className={`${style.burgerFillingsContainer}`}>
                <ul className={`${style.burgerFillings} custom-scroll pr-4`}>
                    {fillingBurger.map((card) =>
                    (<li className={`${style.burgerFilling} pb-4 pr-2`} key={card._id}>
                        <DragIcon />
                        <ConstructorElement
                            text={card.name}
                            price={card.price}
                            thumbnail={card.image}
                        />
                    </li>)
                    )}
                </ul>
            </div>
            <div className={`pt-4 pl-8 pr-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunBurger.name} (низ)`}
                    price={bunBurger.price}
                    thumbnail={bunBurger.image}
                />
            </div>
            <div className={`${style.orderInfo} pt-10`}>
                <p className={`text text_type_digits-medium pr-2`}>
                    {state.totalPrice}
                </p>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="ml-10 mr-4"
                    onClick={clickPlaceOrder}>
                    Оформить заказ
                </Button>
                {isOpenModal && <OrderDetails
                    isOpenModal={isOpenModal}
                    handleClickClose={handleClickClose}
                    dataOrder={dataOrder}
                />}
            </div>
        </section>
    )
};

export default BurgerConstructor;