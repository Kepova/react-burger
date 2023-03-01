import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-item.module.css';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { propTypesDataConstructor } from '../../utils/prop-types';

import { useDispatch } from 'react-redux';
import { deleteIngredient, changPlaceInConstructor } from '../../redux/actions/actions';

import { useDrop, useDrag } from "react-dnd";

// Компонент BurgerConstructor
function BurgerConstructorItem({ card, index }) {

    // DnD перетаскивание внутри конструктора
    const dragDropRef = useRef(null);
    const [{ isDragging }, dragRef] = useDrag({
        type: "filling",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{ handlerId }, dropRef] = useDrop({
        accept: "filling",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(filling, monitor) {
            const dragIndex = filling.index;
            const hoverIndex = index;
            const hoverBoundingRect = dragDropRef.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
            if (!dragDropRef.current || dragIndex === hoverIndex) return

            dispatch(changPlaceInConstructor(dragIndex, hoverIndex));

            filling.index = hoverIndex;
        },
    });
    dragRef(dropRef(dragDropRef));

    //redux
    const dispatch = useDispatch();

    //удаление ингредиента из конструктора
    const handleClickDeleteFilling = (cardDelete) => {
        dispatch(deleteIngredient(cardDelete));
    };

    return (
        <li className={`${style.burgerFilling} ${isDragging ? style.fillingDragging : ''} pb-4 pr-2`}
            ref={dragDropRef}
            data-handler-id={handlerId}>
            <DragIcon />
            <ConstructorElement
                text={card.name}
                price={card.price}
                thumbnail={card.image}
                handleClose={() => handleClickDeleteFilling(card)}
            />
        </li>
    )
};

BurgerConstructorItem.propTypes = {
    card: propTypesDataConstructor.isRequired,
    index: PropTypes.number.isRequired
};



export default BurgerConstructorItem