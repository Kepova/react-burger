import ikonOrderFirst from '../../images/order-details-ikon_1.svg';
import ikonOrderSecond from '../../images/order-details-ikon_2.svg';
import ikonOrderThird from '../../images/order-details-ikon_3.svg';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import style from './order-details.module.css';

import { useSelector } from 'react-redux';

const OrderDetails = () => {
    //redux
    const { dataOrder, openModalOrder } = useSelector(store => ({
        dataOrder: store.dataOrder,
        openModalOrder: store.openModalOrder
    }));

    return (
        <Modal isOpenModal={openModalOrder}>
            <div className={`${style.orderContainer} pb-15`}>
                <h3 className={`${style.orderTitle} text text_type_digits-large pb-8`}>{
                    (dataOrder.order !== undefined) &&
                    dataOrder.order.number
                }</h3>
                <p className={`text text_type_main-medium`}>идентификатор заказа</p>
                <div className={`${style.ikonContainer} pt-15 pb-15`}>
                    <div className={`${style.ikonOrderGroup} ${style.ikonOrderCheck}`} >
                        <CheckMarkIcon type="primary" />
                    </div>
                    <img src={ikonOrderFirst} alt="иконка готовности заказа" className={`${style.ikonOrderGroup} ${style.rotation}`} />
                    <img src={ikonOrderSecond} alt="иконка готовности заказа" className={`${style.ikonOrderGroup} ${style.rotationReturn}`} />
                    <img src={ikonOrderThird} alt="иконка готовности заказа" className={`${style.ikonOrderGroup} ${style.rotation}`} />
                </div>
                <p className={`text text_type_main-default pb-2`}>Ваш заказ начали готовить</p>
                <p className={`${style.orderInfo} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
};

export default OrderDetails;