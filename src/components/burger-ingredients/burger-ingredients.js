import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../redux/actions/actions';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import burgerIngridientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import ModalError from '../modal-error/modal-error';

function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');

    //redux
    const { dataIngridients, getRequest, getFailed } = useSelector(store => ({
        dataIngridients: store.dataIngridients,
        getRequest: store.getIngredientsRequest,
        getFailed: store.getIngredientsFailed
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [])

    const filterIngridients = (typeGroup) => {
        return dataIngridients.filter(item => item.type === typeGroup);
    };

    const filteredIngridientBun = useMemo(() => filterIngridients('bun'), [dataIngridients]);
    const filteredIngridientSauce = useMemo(() => filterIngridients('sauce'), [dataIngridients]);
    const filteredIngridientMain = useMemo(() => filterIngridients('main'), [dataIngridients]);

    return (<section className={`${burgerIngridientsStyle.ingredients}`}>
        {getFailed && <ModalError openError={getFailed} />}
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
            {getRequest ? <div>Загрузка...</div>
                :
                <div className={`${burgerIngridientsStyle.ingredients__list} pb-13 custom-scroll`} id='containerLinks'>
                    <BurgerIngredientsCard dataCards={filteredIngridientBun} title='Булки' name='bun' />
                    <BurgerIngredientsCard dataCards={filteredIngridientSauce} title='Соусы' name='sauce' />
                    <BurgerIngredientsCard dataCards={filteredIngridientMain} title='Начинки' name='main' />
                </div>}
        </div>
    </section>
    )
};

export default BurgerIngredients;