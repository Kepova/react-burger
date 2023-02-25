import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import mainStyle from './main.module.css';

function Main() {
    return (

        <main className={`${mainStyle.main} pb-10`}>
            <h1 className={`${mainStyle.title} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</h1>
            <BurgerIngredients />
            <BurgerConstructor />
        </main >
    )
};

export default Main;