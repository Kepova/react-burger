import { FC } from 'react';
import styles from './all-orders.module.css';
import OrderCard from '../order-card/order-card';
import { useSelector } from '../../redux/types/hooks';

const AllOrders: FC = () => {
    const orders = useSelector(state => state.ordersReducer.orders);
    
    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <div className={`${styles.ordersOverlay} custom-scroll`}>
                {orders?.map((card) =>
                    <OrderCard card={card} key={card._id} />)}
                </div>
            </div>
        </section>
    )
};

export default AllOrders;