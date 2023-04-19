import { FC, useEffect } from 'react';
import styles from './profile-orders.module.css';
import { useDispatch, useSelector } from '../../redux/types/hooks';
import OrderCard from '../../components/order-card/order-card';
import { wsConnectionClosedAction, wsConnectionStart } from '../../redux/actions/actionsWS';
import Preloader from '../../components/preloader/preloader';
import { allOrders } from '../../redux/actions/actionsOrder';

const ProfileOrders: FC = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.authReducer.accessToken);
    const messages = useSelector(state => state.wsReducer.messages);
    const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrl));
        return () => {
            const clear = async () => { dispatch(wsConnectionClosedAction()) }
            clear();
        }
    }, []);

    useEffect(() => {
        if (messages !== null) {
            dispatch(allOrders(messages.orders));
        }
    }, [messages, dispatch]);

    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                {messages ?
                    <div className={`${styles.ordersOverlay} custom-scroll`}>
                        {messages.orders?.length === 0 ?
                            <p className={`text text_type_main-default`}>У вас еще нет заказов</p>
                            : messages.orders?.map((card) =>
                                <OrderCard card={card} key={card._id} status={card.status} />)}
                    </div>
                    : <Preloader />
                }
            </div>
        </section>
    )
};

export default ProfileOrders;