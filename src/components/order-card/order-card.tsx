import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './order-card.module.css';
import calculateTimeIndicator from "../../utils/calculateTimeIndicator";
import { useSelector } from '../../redux/types/hooks';
import { TCardIngredient } from "../../services/types";
import calculateTotalPrice from "../../utils/calculateTotalPrice";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../redux/types/orders-types";
import { selectionIngredientsById } from "../../utils/selectionIngredientsBy";

const OrderCard: FC<{ card: TOrder, status?: string }> = ({ card, status }) => {
    const location = useLocation();
    const time = calculateTimeIndicator(card.createdAt);
    const ingredients = useSelector(state => state.ingredientsReducer.dataIngredients);

    const ingredientsOrder = selectionIngredientsById(ingredients, card.ingredients);
    const totalPrice = calculateTotalPrice(ingredientsOrder);
    const statusOrder = () => {
        if (status === 'created') return <p className={`${styles.status} text text_type_main-default pt-2`}>Создан</p>
        if (status === 'pending') return <p className={`${styles.status} text text_type_main-default pt-2`}>Готовится</p>
        if (status === 'done') return <p className={`${styles.status} text text_type_main-default pt-2`} style={{ color: '#00CCCC' }}>Выполнен</p >
    }

return (
    <Link to={`${location.pathname}/${card.number}`}
        state={{ background: location }}
        className={`${styles.cardLink}`}>
        <div className={styles.header}>
            <h3 className='text text_type_digits-default'>#{card.number}</h3>
            <p className='text text_type_main-default text_color_inactive'>{time}</p>
        </div>
        <div>
            <p className={`${styles.name} text text_type_main-medium`}>{card.name}</p>
            {status && statusOrder()}
        </div>
        <div className={styles.footer}>
            <div className={styles.images}>
                {ingredientsOrder.map((el: TCardIngredient, i: number) => {
                    if (i <= 4) {
                        return <div className={styles.imageContainer} style={{ zIndex: 6 - i }} key={i}>
                            <img src={el.image} alt={el.name} className={styles.image} />
                        </div>
                    }
                    if (i === 5) {
                        return <div className={styles.imageContainer} style={{ zIndex: 6 - i }} key={i}>
                            {ingredientsOrder.length > 6 && <div className={styles.overlay}>
                                <p className='text text_type_main-default'>+{ingredientsOrder.length - 5}</p>
                            </div>}
                            <img src={el.image} alt={el.name} className={styles.image} />
                        </div>
                    }
                }
                )}
            </div>
            <p className={`text text_type_digits-default ${styles.totalPrice}`}>
                {totalPrice}
                <span><CurrencyIcon type="primary" /></span>
            </p>
        </div>
    </Link>
)
};

export default OrderCard;