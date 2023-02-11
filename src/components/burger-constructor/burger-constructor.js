import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useEnableModal from '../../hooks/use-enable-modal';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import propTypesDataIngridient from '../../utils/prop-types';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor({ dataBurger }) {
    const { handleClickOpen, handleClickClose, isOpenModal } = useEnableModal(false);

    const fillingBurger = dataBurger.filter(item => item.type !== 'bun');

    return (
        <section className={`${style.burgerConstructor} pl-4 pb-13`}>
            <div className={`${fillingBurger.topBun} pl-8 pb-4 pr-4`}>
                <ConstructorElement type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
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
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </div>
            <div className={`${style.orderInfo} pt-10`}>
                <p className={`text text_type_digits-medium pr-2`}>610</p>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="ml-10 mr-4"
                    onClick={handleClickOpen}>
                    Оформить заказ
                </Button>
                {isOpenModal && <OrderDetails
                    isOpenModal={isOpenModal}
                    handleClickClose={handleClickClose} />}
            </div>
        </section>
    )
};

BurgerConstructor.propTypes = {
    dataBurger: PropTypes.arrayOf(propTypesDataIngridient).isRequired
};

export default BurgerConstructor;