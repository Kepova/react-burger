import { FC } from 'react';
import styles from './orders-info.module.css';
import { useSelector } from '../../redux/types/hooks';
import { TOrder } from '../../redux/types/orders-types';

const OrdersInfo: FC<{ total: number, totalToday: number }> = ({ total, totalToday }) => {

    const orders = useSelector(state => state.ordersReducer.orders);
    function filterIngredient(data: null | TOrder[], type: string): TOrder[] | null {
        return (data as TOrder[]).filter(el => el.status === type);
    };

    const doneOrders = filterIngredient(orders, 'done');
    const inProgressOrders = filterIngredient(orders, 'pending');

    return (
        <section className={`${styles.container} custom-scroll`}>
            <div>
                <h3 className={`${styles.title} text text_type_main-medium pb-6`}>Готовы</h3>
                <div className={styles.numbersOrders}>
                    {doneOrders?.slice(0, 10).map((el, i) =>
                        <p key={i} className={`${styles.numberOrder} ${styles.doneOrders} text text_type_digits-default`}>{el.number}</p>
                    )}
                </div>
            </div>
            <div>
                <h3 className={`${styles.title} text text_type_main-medium pb-6`}>В работе</h3>
                <div className={styles.numbersOrders}>
                    {inProgressOrders?.slice(0, 10).map((el, i) =>
                        <p key={i} className={`${styles.numberOrder} text text_type_digits-default`}>{el.number}</p>
                    )}
                </div>
            </div>
            <div className={styles.allTotal}>
                <h3 className={`${styles.title} text text_type_main-medium`}>Выполнено за все время:</h3>
                <p className={`${styles.total} text text_type_digits-large`}>{total}</p>
            </div>
            <div className={styles.todayTotal}>
                <h3 className={`${styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h3>
                <p className={`${styles.total} text text_type_digits-large`}>{totalToday}</p>
            </div>
        </section>
    )
};

export default OrdersInfo;