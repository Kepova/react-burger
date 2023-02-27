import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import mainStyle from './main.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { draggedFilling, dropFilling } from '../redux/actions/actions';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {
//redux
const { dataIngredients, dataCurrentBurger } = useSelector(store => ({
    dataIngredients: store.dataIngredients,
    dataCurrentBurger: store.dataCurrentBurger
}));
const dispatch = useDispatch();

//DnD
    const handleDrop = (item) => {

        dispatch(draggedFilling(item));

        dispatch(dropFilling(item));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={`${mainStyle.main} pb-10`}>
                <h1 className={`${mainStyle.title} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</h1>
                <BurgerIngredients />
                <BurgerConstructor onDropHandler={handleDrop} />
            </main >
        </DndProvider>
    )
};

export default Main;