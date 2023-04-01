import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-item.module.css';
import { useRef, FC } from 'react';

import { useDispatch } from 'react-redux';
import { deleteIngredient, changPlaceInConstructor } from '../../redux/actions/actions';

import { useDrop, useDrag, XYCoord } from "react-dnd";
import { TCardConstructorProps, TCardConstructor, TIndex } from '../../services/types';

// Компонент BurgerConstructor
const BurgerConstructorItem: FC<TCardConstructorProps> = ({ card, index }) => {

    // DnD перетаскивание внутри конструктора
    const dragDropRef = useRef<HTMLLIElement>(null);
    const [{ isDragging }, dragRef] = useDrag({
        type: "filling",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{ handlerId }, dropRef] = useDrop<{ index: TIndex }, void, { handlerId: unknown }>({
        accept: "filling",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(filling, monitor) {
            const dragIndex = filling.index;
            const hoverIndex = index;
            const hoverBoundingRect = dragDropRef.current?.getBoundingClientRect() || { bottom: 0, top: 0 };
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
    const handleClickDeleteFilling = (cardDelete: TCardConstructor) => {
        dispatch(deleteIngredient(cardDelete));
    };

    return (
        <li className={`${style.burgerFilling} ${isDragging ? style.fillingDragging : ''} pb-4 pr-2`}
            ref={dragDropRef}
            data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={card.name}
                price={card.price}
                thumbnail={card.image}
                handleClose={() => handleClickDeleteFilling(card)}
            />
        </li>
    )
};

export default BurgerConstructorItem