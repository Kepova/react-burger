import { useMemo, useState, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import burgerIngridientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { IngredientsContext } from '../../services/ingredients-context';

function BurgerIngredients() {
    const dataBurgerIngridients = useContext(IngredientsContext);
    const [current, setCurrent] = useState('bun');

    const filterIngridients = (typeGroup) => {
        return dataBurgerIngridients.filter(item => item.type === typeGroup);
    };

    const filteredIngridientBun = useMemo(() => filterIngridients('bun'), [dataBurgerIngridients]);
    const filteredIngridientSauce = useMemo(() => filterIngridients('sauce'), [dataBurgerIngridients]);
    const filteredIngridientMain = useMemo(() => filterIngridients('main'), [dataBurgerIngridients]);

    return (
        <section className={`${burgerIngridientsStyle.ingredients}`}>
            <div className={`${burgerIngridientsStyle.burgerIngridients}`}>
                <Link to='bun' smooth={true} offset={30} duration={500} containerId="containerLinks">
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </Link>

                <Link to="sauce" smooth={true} offset={30} duration={500} containerId="containerLinks">
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </Link>

                <Link to="main" smooth={true} offset={30} duration={500} containerId="containerLinks">
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </Link>
            </div>
            <div className={`${burgerIngridientsStyle.ingredients__listContainer}`}>
                <div className={`${burgerIngridientsStyle.ingredients__list} pb-13 custom-scroll`} id='containerLinks'>
                    <BurgerIngredientsCard dataCards={filteredIngridientBun} title='Булки' name='bun' />
                    <BurgerIngredientsCard dataCards={filteredIngridientSauce} title='Соусы' name='sauce' />
                    <BurgerIngredientsCard dataCards={filteredIngridientMain} title='Начинки' name='main' />
                </div>
            </div>
        </section>
    )
};

export default BurgerIngredients;