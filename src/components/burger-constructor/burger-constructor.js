import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useEffect, useMemo } from 'react';
import ModalError from '../modal-error/modal-error';

import { useSelector, useDispatch } from 'react-redux';
import { ingredientsConstructor, calculateSummOrder, getInfoOrder, deleteIngredient } from '../redux/actions/actions';

import { useDrop } from "react-dnd";

// Компонент BurgerConstructor
function BurgerConstructor({ onDropHandler }) {

    // DnD
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item);
        },
    });

    //redux
    const { dataIngredients, dataCurrentBurger, totalPrice, getOrderFailed, openModalOrder } = useSelector(store => ({
        dataIngredients: store.dataIngredients,
        dataCurrentBurger: store.dataCurrentBurger,
        totalPrice: store.totalPrice,
        getOrderFailed: store.getOrderFailed,
        openModalOrder: store.openModalOrder
    }));

    const dispatch = useDispatch();

    // обновить список ингредиентов конструктора
    useEffect(() => {
        dispatch(ingredientsConstructor(dataCurrentBurger))
    }, [dataCurrentBurger])

    const fillingBurger = useMemo(() => dataCurrentBurger.filter(item => item.type !== 'bun'), [dataCurrentBurger]);
    //выбранная булка
    const bunBurger = useMemo(() => dataCurrentBurger.filter(item => item.type === 'bun')[0], [dataCurrentBurger]);

    //подсчет стоимости бургера
    useEffect(() => {
        if (dataCurrentBurger.length !== 0) {
            const dataForSum = dataCurrentBurger.map((i) => i.type === 'bun' ? { ...i, price: i.price * 2 } : i);
            dispatch(calculateSummOrder(dataForSum));
        }
    }, [dataCurrentBurger])

    //оформить заказ
    const clickPlaceOrder = () => {
        const ingredients = Array.from(fillingBurger, obj => obj._id);
        dispatch(getInfoOrder(ingredients));
    };

    const handleClickDeleteFilling = (cardDelete) => {
        dispatch(deleteIngredient(cardDelete));
    };

    return (
        <section className={`${style.burgerConstructor} pl-4 pb-13`} ref={dropTarget}>
            {getOrderFailed && <ModalError openError={getOrderFailed} />}
            <div className={`pl-8 pb-4 pr-4`}>
                {bunBurger ?
                    <ConstructorElement type="top"
                        isLocked={true}
                        text={`${bunBurger.name} (верх)`}
                        price={bunBurger.price}
                        thumbnail={bunBurger.image}
                    />
                    : <p>Добавьте булку</p>
                }
            </div>
            <div className={`${style.burgerFillingsContainer}`}>
                <ul className={`${style.burgerFillings} custom-scroll pr-4`}>
                    {fillingBurger.length > 0 ?
                        fillingBurger.map((card, i) =>
                        (<li className={`${style.burgerFilling} pb-4 pr-2`} key={i}>
                            <DragIcon />
                            <ConstructorElement
                                text={card.name}
                                price={card.price}
                                thumbnail={card.image}
                                handleClose={() => handleClickDeleteFilling(card)}
                            />
                        </li>))
                        : <p>Добавьте начинку</p>}
                </ul>
            </div>
            <div className={`pt-4 pl-8 pr-4`}>
                {bunBurger ?
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunBurger.name} (низ)`}
                        price={bunBurger.price}
                        thumbnail={bunBurger.image}
                    />
                    : <p>Добавьте булку</p>}
            </div>
            <div className={`${style.orderInfo} pt-10`}>
                <p className={`text text_type_digits-medium pr-2`}>
                    {totalPrice}
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
                {openModalOrder && <OrderDetails />}
            </div>
        </section>
    )
};

export default BurgerConstructor;