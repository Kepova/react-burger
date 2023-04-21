import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from '../../redux/types/hooks';
import { useParams } from "react-router-dom";
import { getOrderById, showCurrentOrder } from "../../redux/actions/actionsOrder";
import Preloader from "../../components/preloader/preloader";
import styles from './order.module.css';
import { selectionIngredientsByCount, selectionIngredientsById } from "../../utils/selectionIngredientsBy";
import calculateTimeIndicator from "../../utils/calculateTimeIndicator";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import calculateTotalPrice from "../../utils/calculateTotalPrice";
import { TCardIngredient } from "../../services/types";

const Order: FC<{ wsConnect?: boolean }> = ({ wsConnect }) => {
    const { id } = useParams();
    const [ingredientsOrder, setIngredientsOrder] = useState<null | TCardIngredient[]>(null);
    const dispatch = useDispatch();
    const currentOrder = useSelector(state => state.ordersReducer.currentOrder);
    const ingredients = useSelector(state => state.ingredientsReducer.dataIngredients);

    useEffect(() => {
        if (!wsConnect) {
            dispatch(getOrderById(id));
        }
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(showCurrentOrder(Number(id)));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentOrder !== null) {
            setIngredientsOrder(selectionIngredientsByCount(ingredients, currentOrder.ingredients));
        }
    }, [currentOrder]);

    return (
        <>{currentOrder && ingredientsOrder ?
            <section className={styles.container}>
                <h2 className={`${styles.title} text text_type_digits-default pb-10`}>
                    #{currentOrder.number}
                </h2>
                <p className='text text_type_main-medium pb-3'>{currentOrder.name}</p>
                <p className={`${styles.status} text text_type_main-default pb-15`}>
                    {currentOrder.status === 'done' ? 'Выполнен' : 'В работе'}
                </p>
                <h3 className='text text_type_main-medium pb-6'>Состав:</h3>
                <div className={`${styles.containerItems} pb-10`}>
                    <ul className={`${styles.items} custom-scroll`}>
                        {ingredientsOrder && ingredientsOrder.map((el, i) =>
                            <li className={`${styles.item} pr-6`} key={i}>
                                <div className={`${styles.imageContainer} mr-4`} >
                                    <img src={el.image} alt={el.name} className={`${styles.image}`} />
                                </div>
                                <p className={`${styles.itemName} text text_type_main-default pr-4`}>
                                    {el.name}
                                </p>
                                <p className={`${styles.itemPrice} text text_type_digits-default`}>
                                    <span>{el.isInOrder}</span>
                                    <span>&nbsp; x &nbsp;</span>
                                    <span>{el.price}</span>
                                    <CurrencyIcon type="primary" />
                                </p>
                            </li>)}
                    </ul>
                </div>
                <div className={`${styles.footer}`}>
                    <p className='text text_type_main-default text_color_inactive'>
                        {calculateTimeIndicator(currentOrder.createdAt)}
                    </p>
                    <p className={`text text_type_digits-default ${styles.totalPrice}`}>
                        {calculateTotalPrice(selectionIngredientsById(ingredients, currentOrder.ingredients))}
                        <span><CurrencyIcon type="primary" /></span>
                    </p>
                </div>
            </section>
            : <Preloader />}
        </>
    )
};

export default Order;