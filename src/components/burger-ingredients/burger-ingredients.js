import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../redux/actions/actions';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import burgerIngridientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import ModalError from '../modal-error/modal-error';

function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');

    //redux
    const { dataIngredients,
        getRequest,
        getFailed
    } = useSelector(store => store.ingredientsReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [])

    const filterIngridients = (typeGroup) => {
        return dataIngredients.filter(item => item.type === typeGroup);
    };

    const filteredIngridientBun = useMemo(() => filterIngridients('bun'), [dataIngredients]);
    const filteredIngridientSauce = useMemo(() => filterIngridients('sauce'), [dataIngredients]);
    const filteredIngridientMain = useMemo(() => filterIngridients('main'), [dataIngredients]);

    return (<section className={`${burgerIngridientsStyle.ingredients}`}>
        {getFailed && <ModalError openError={getFailed} />}
        <div className={`${burgerIngridientsStyle.burgerIngridients}`}>
            <Link to='bun' smooth={true} offset={30} duration={500} containerId="containerLinks" spy={true} onSetActive={() => setCurrent('bun')}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
            </Link>

            <Link to="sauce" smooth={true} offset={30} duration={500} containerId="containerLinks" spy={true} onSetActive={() => setCurrent('sauce')}>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
            </Link>

            <Link to="main" smooth={true} offset={30} duration={500} containerId="containerLinks" spy={true} onSetActive={() => setCurrent('main')}>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </Link>
        </div>
        <div className={`${burgerIngridientsStyle.ingredients__listContainer}`}>
            {getRequest ? <div>Загрузка...</div>
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