import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/types/hooks';
import { wsConnectionStart, wsConnectionClosedAction } from '../../redux/actions/actionsWS';
import AllOrders from '../../components/all-orders/all-orders';
import OrdersInfo from '../../components/orders-info/orders-info';
import styles from './orders-list.module.css';
import Preloader from '../../components/preloader/preloader';
import { allOrders } from '../../redux/actions/actionsOrder';

const OrdersList: FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.wsReducer.messages);
    const orders = useSelector(state => state.ordersReducer.orders);
    const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrl));
        return () => {
            const clear = async () => dispatch(wsConnectionClosedAction());
            clear();
        }
    }, [dispatch]);

    useEffect(() => {
        if (messages !== null) {
            dispatch(allOrders(messages.orders));
        }
    }, [messages, dispatch]);

    return (
        <section className={styles.container}>
            <h1 className={`${styles.title} pt-10 pb-5 text text_type_main-large`}>Лента заказов</h1>
            {(orders === null) || (messages === null) ? <Preloader /> :
                <>
                    <AllOrders />
                    <OrdersInfo
                        total={messages.total}
                        totalToday={messages.totalToday} />
                </>
            }
            <Outlet />
        </section>
    )
};

export default OrdersList;