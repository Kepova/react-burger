import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useEffect } from 'react';
import ModalError from '../modal-error/modal-error';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';

import { useSelector, useDispatch } from 'react-redux';
import {
    ingredientsConstructor,
    calculateSummOrder,
    getInfoOrder,
    draggedFilling,
    dropFilling,
    informAddFilling
} from '../../redux/actions/actions';

import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import Preloader from '../preloader/preloader';

// Компонент BurgerConstructor
function BurgerConstructor() {
    const navigate = useNavigate();

    // DnD контейнер
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(draggedFilling(item));
            dispatch(dropFilling(item));;
        },
    });

    //redux
    const dataCurrentBurger = useSelector(store => store.constructorReducer.dataCurrentBurger);
    const bunBurger = useSelector(store => store.constructorReducer.bunBurger);
    const totalPrice = useSelector(store => store.constructorReducer.totalPrice);
    const getOrderFailed = useSelector(store => store.constructorReducer.getOrderFailed);
    const getOrderRequest = useSelector(store => store.constructorReducer.getOrderRequest);
    const openModalOrder = useSelector(store => store.constructorReducer.openModalOrder);
    const messageAddFilling = useSelector(store => store.constructorReducer.messageAddFilling);
    const accessToken = useSelector(store => store.authReducer.accessToken);
    const dispatch = useDispatch();

    // обновить список ингредиентов конструктора
    useEffect(() => {
        dispatch(ingredientsConstructor(dataCurrentBurger, bunBurger))
    }, [dispatch])

    //подсчет стоимости бургера
    useEffect(() => {
        dispatch(calculateSummOrder());
    }, [dataCurrentBurger, bunBurger, dispatch])

    //оформить заказ
    const clickPlaceOrder = () => {
        if (accessToken === null) {
            return navigate('/login')
        }
        if ((dataCurrentBurger.length === 0) || !bunBurger._id) {
            dispatch(informAddFilling());
        } else {
            const ingredients = Array.from(dataCurrentBurger.concat(bunBurger), obj => obj._id);
            dispatch(getInfoOrder(ingredients, accessToken));
        }
    };

    return (
        <section className={`${style.burgerConstructor} pl-4 pb-13`} ref={dropTarget}>
            {getOrderFailed && <ModalError openError={getOrderFailed} />}
            {messageAddFilling && <ModalError openError={messageAddFilling} />}
            {getOrderRequest && <Preloader />}
            <div className={`pl-8 pb-4 pr-4`}>
                {bunBurger?._id ?
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
                    {dataCurrentBurger.length > 0 ?
                        dataCurrentBurger.map((card, i) =>
                            <BurgerConstructorItem
                                card={card}
                                key={card.idConstructor}
                                index={i}
                            />)
                        : <p>Добавьте начинку</p>}
                </ul>
            </div>
            <div className={`pt-4 pl-8 pr-4`}>
                {bunBurger?._id ?
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
                {openModalOrder &&
                    <Modal>
                        <OrderDetails />
                    </Modal>
                }
            </div>
        </section>
    )
};

export default BurgerConstructor;