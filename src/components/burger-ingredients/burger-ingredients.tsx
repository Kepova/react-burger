import { useMemo, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import styles from './burger-ingredients.module.css';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import ModalError from '../modal-error/modal-error';
import { TCardIngredient } from '../../services/types';

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState<string>('bun');

    //redux
    const dataIngredients: any = useSelector<any>(store => store.ingredientsReducer.dataIngredients);
    const getIngredientsRequest = useSelector<any>(store => store.ingredientsReducer.getIngredientsRequest);
    const getIngredientsFailed: string | null = useSelector((store: any) => store.ingredientsReducer.getIngredientsFailed);

    const filterIngredients = (typeGroup: string): TCardIngredient[] => {
        return dataIngredients.filter((item: TCardIngredient) => item.type === typeGroup);
    };

    const filteredIngredientBun = useMemo(() => filterIngredients('bun'), [dataIngredients]);
    const filteredIngredientSauce = useMemo(() => filterIngredients('sauce'), [dataIngredients]);
    const filteredIngredientMain = useMemo(() => filterIngredients('main'), [dataIngredients]);

    return (<section className={`${styles.ingredients}`}>
        <>
            {getIngredientsFailed && <ModalError openError={getIngredientsFailed} />}
            <div className={`${styles.burgerIngridients}`}>
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
            <div className={`${styles.ingredients__listContainer}`}>
                {getIngredientsRequest ? <div>Загрузка...</div>
                    :
                    <div className={`${styles.ingredients__list} pb-13 custom-scroll`} id='containerLinks'>
                        <BurgerIngredientsGroup dataCards={filteredIngredientBun} title='Булки' name='bun' />
                        <BurgerIngredientsGroup dataCards={filteredIngredientSauce} title='Соусы' name='sauce' />
                        <BurgerIngredientsGroup dataCards={filteredIngredientMain} title='Начинки' name='main' />
                    </div>}
            </div>
        </>
    </section>
    )
};

export default BurgerIngredients;