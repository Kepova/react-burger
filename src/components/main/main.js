import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import mainStyle from './main.module.css';

function Main({ dataBurgerIngridients }) {
    return (
        <main className={`${mainStyle.main} pb-10`}>
            <h1 className={`${mainStyle.title} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</h1>
            <BurgerIngredients dataBurgerIngridients={dataBurgerIngridients} />
            <BurgerConstructor dataBurger={dataBurgerIngridients} />
        </main>
    )
};

Main.propTypes = {
    dataBurgerIngridients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']),
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })).isRequired
};

export default Main;