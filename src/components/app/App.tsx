import React, { useEffect, useState } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getBurgerIngridients } from '../../utils/api';

function App() {
  const [dataBurgerIngridients, setDataBurgerIngridients] = useState([]);

  // получить данные с ингридиентами
  useEffect(() => {
    getBurgerIngridients()
      .then((dataIngridients) => {
        setDataBurgerIngridients(dataIngridients.data);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={`${style.page}`}>
      <AppHeader />
      <Main dataBurgerIngridients={dataBurgerIngridients} />
    </div>
  );
}

export default App;
