import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import burgerIngridientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import ModalError from '../modal-error/modal-error';

function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');

    //redux
    const { dataIngredients,
        getIngredientsRequest,
        getIngredientsFailed
    } = useSelector(store => store.ingredientsReducer);

    const filterIngridients = (typeGroup) => {
        return dataIngredients.filter(item => item.type === typeGroup);
    };

    const filteredIngridientBun = useMemo(() => filterIngridients('bun'), [dataIngredients]);
    const filteredIngridientSauce = useMemo(() => filterIngridients('sauce'), [dataIngredients]);
    const filteredIngridientMain = useMemo(() => filterIngridients('main'), [dataIngredients]);

    return (<section className={`${burgerIngridientsStyle.ingredients}`}>
        {getIngredientsFailed && <ModalError openError={getIngredientsFailed} />}
        <div className={`${burgerIngridientsStyle.burgerIngridients}`}>
            <Link to='bun' smooth={true} offset={30} duration={500}
                containerId="containerLinks" spy={true}
                onSetActive={() => setCurrent('bun')}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
            </Link>

            <Link to="sauce" smooth={true} offset={30} duration={500}
                containerId="containerLinks" spy={true}
                onSetActive={() => setCurrent('sauce')}>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
            </Link>

            <Link to="main" smooth={true} offset={30} duration={500}
                containerId="containerLinks" spy={true}
                onSetActive={() => setCurrent('main')}>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </Link>
        </div>
        <div className={`${burgerIngridientsStyle.ingredients__listContainer}`}>
            {getIngredientsRequest ? <div>Загрузка...</div>
                :
                <div className={`${burgerIngridientsStyle.ingredients__list} pb-13 custom-scroll`} id='containerLinks'>
                    <BurgerIngredientsGroup dataCards={filteredIngridientBun} title='Булки' name='bun' />
                    <BurgerIngredientsGroup dataCards={filteredIngridientSauce} title='Соусы' name='sauce' />
                    <BurgerIngredientsGroup dataCards={filteredIngridientMain} title='Начинки' name='main' />
                </div>}
        </div>
    </section>
    )
};

export default BurgerIngredients;