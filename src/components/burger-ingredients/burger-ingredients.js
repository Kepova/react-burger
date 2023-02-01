import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import burgerIngridientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import PropTypes from 'prop-types';

function BurgerIngredients({ dataBurgerIngridients }) {

    const [current, setCurrent] = useState('one');

    const filteredIngridient = (typeGroup) => {
        return dataBurgerIngridients.filter(item => item.type === typeGroup);
    };

    return (
        <section className={`${burgerIngridientsStyle.ingredients}`}>
            <div className={`${burgerIngridientsStyle.burgerIngridients}`}>
                <Link to='bun' smooth={true} offset={30} duration={500} containerId="containerLinks">
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </Link>

                <Link to="sauce" smooth={true} offset={30} duration={500} containerId="containerLinks">
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </Link>

                <Link to="main" smooth={true} offset={30} duration={500} containerId="containerLinks">
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </Link>
            </div>
            <div className={`${burgerIngridientsStyle.ingredients__listContainer}`}>
                <div className={`${burgerIngridientsStyle.ingredients__list} pb-13 custom-scroll`} id='containerLinks'>
                    <BurgerIngredientsCard dataCards={filteredIngridient('bun')} title='Булки' name='bun' />
                    <BurgerIngredientsCard dataCards={filteredIngridient('sauce')} title='Соусы' name='sauce' />
                    <BurgerIngredientsCard dataCards={filteredIngridient('main')} title='Начинки' name='main' />
                </div>
            </div>
        </section>
    )
};

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;