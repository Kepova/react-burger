import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { useEffect, FC } from 'react';
import ModalError from '../modal-error/modal-error';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';

import { useSelector, useDispatch } from '../../redux/types/hooks';
import {
    ingredientsConstructor,
    calculateSumOrder,
    getInfoOrder,
    draggedFilling,
    dropFilling,
    informAddFilling
} from '../../redux/actions/actions';

import { useDrop } from "react-dnd";
import { useLocation, useNavigate } from 'react-router-dom';
import Preloader from '../preloader/preloader';
import { TCardConstructor, TCardIngredient } from '../../services/types';
import { getCookie } from '../../utils/cookies-auth';

// Компонент BurgerConstructor
const BurgerConstructor: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // DnD контейнер
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TCardConstructor) {
            dispatch(draggedFilling(item));
            dispatch(dropFilling(item));;
        },
    });

    //redux
    const dataCurrentBurger = useSelector(store => store.constructorReducer.dataCurrentBurger);
    const bunBurger = useSelector(store => store.constructorReducer.bunBurger);
    const totalPrice = useSelector(store => store.constructorReducer.totalPrice);
    const getOrderFailed = useSelector((store) => store.constructorReducer.getOrderFailed);
    const getOrderRequest = useSelector(store => store.constructorReducer.getOrderRequest);
    const openModalOrder = useSelector(store => store.constructorReducer.openModalOrder);
    const messageAddFilling = useSelector((store) => store.constructorReducer.messageAddFilling);
    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch();

    // обновить список ингредиентов конструктора
    useEffect(() => {
        dispatch(ingredientsConstructor(dataCurrentBurger, bunBurger))
    }, [dispatch])

    //подсчет стоимости бургера
    useEffect(() => {
        dispatch(calculateSumOrder());
    }, [dataCurrentBurger, bunBurger, dispatch])

    //оформить заказ
    const clickPlaceOrder = () => {

        if (!accessToken) {
            return navigate('/login', { state: { from: location } })
        }
        if ((dataCurrentBurger.length === 0) || (bunBurger === null)) {
            dispatch(informAddFilling());
        } else {
            const ingredients: string[] =
                Array.from(dataCurrentBurger.concat(bunBurger, bunBurger),
                    (obj: TCardIngredient): string => obj._id);
            dispatch(getInfoOrder({ ingredients, token: accessToken }));
        }
    };

    return (
        <section className={`${style.burgerConstructor} pl-4 pb-13`} ref={dropTarget} id='burger-constructor'>
            <>
                {getOrderFailed && <ModalError openError={getOrderFailed} />}
                {messageAddFilling && <ModalError openError={messageAddFilling} />}
                {getOrderRequest && <Preloader />}
                <div className={`pl-8 pb-4 pr-4`} id='bun-top'>
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
                <div className={`${style.burgerFillingsContainer}`} id='fillings'>
                    <ul className={`${style.burgerFillings} custom-scroll pr-4`}>
                        {dataCurrentBurger.length > 0 ?
                            dataCurrentBurger.map((card: TCardConstructor, i: number) =>
                                <BurgerConstructorItem
                                    card={card}
                                    key={card.idConstructor}
                                    index={i}
                                />)
                            : <p>Добавьте начинку</p>}
                    </ul>
                </div>
                <div className={`pt-4 pl-8 pr-4`} id='bun-bottom'>
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
                    <>
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
                    </>
                </div>
            </>
        </section>
    )
};

export default BurgerConstructor;