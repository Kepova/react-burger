import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useEffect, useMemo } from 'react';
import ModalError from '../modal-error/modal-error';

import { useSelector, useDispatch } from 'react-redux';
import { ingredientsConstructor, calculateSummOrder, getInfoOrder } from '../redux/actions/actions';

// Компонент BurgerConstructor
function BurgerConstructor() {

    //redux
    const { dataIngridients, dataCurrentBurger, totalPrice, getOrderFailed, openModalOrder } = useSelector(store => ({
        dataIngridients: store.dataIngridients,
        dataCurrentBurger: store.dataCurrentBurger,
        totalPrice: store.totalPrice,
        getOrderFailed: store.getOrderFailed,
        openModalOrder: store.openModalOrder
    }));

    const dispatch = useDispatch();

    // обновить список ингредиентов конструктора
    useEffect(() => {
        dispatch(ingredientsConstructor(dataIngridients))
    }, [dataIngridients])

    const fillingBurger = useMemo(() => dataCurrentBurger.filter(item => item.type !== 'bun'), [dataCurrentBurger]);
    const bunsBurger = useMemo(() => dataCurrentBurger.filter(item => item.type === 'bun'), [dataCurrentBurger]);

    //выбранная булка
    const bunBurger = useMemo(() => bunsBurger[Math.floor(Math.random() * bunsBurger.length)], [bunsBurger]);

    //подсчет стоимости бургера
    useEffect(() => {
        if ((fillingBurger.length > 0) || (bunsBurger.length > 0)) {
            dispatch(calculateSummOrder(fillingBurger.concat(bunBurger, bunBurger)));
        }
    }, [fillingBurger, bunBurger]);

    //оформить заказ
    const clickPlaceOrder = () => {
        const ingredients = Array.from(fillingBurger, obj => obj._id);
        dispatch(getInfoOrder(ingredients));
        // handleClickOpen();
    };

    return (
        <section className={`${style.burgerConstructor} pl-4 pb-13`}>
            {getOrderFailed && <ModalError openError={getOrderFailed} />}
            <div className={`${fillingBurger.topBun} pl-8 pb-4 pr-4`}>
                {bunBurger &&
                    <ConstructorElement type="top"
                        isLocked={true}
                        text={`${bunBurger.name} (верх)`}
                        price={bunBurger.price}
                        thumbnail={bunBurger.image}
                    />
                }
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
                {bunBurger &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunBurger.name} (низ)`}
                        price={bunBurger.price}
                        thumbnail={bunBurger.image}
                    />}
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