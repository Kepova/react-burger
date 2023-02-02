import React, { useEffect, useState } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getBurgerIngridients } from '../../utils/api';

function App() {
  const [dataBurgerIngridients, setDataBurgerIngridients] = useState([]);
  const [errorGetDataIngridients, setErrorGetDataIngridients] = useState(null);

  // получить данные с ингридиентами
  useEffect(() => {
    getBurgerIngridients()
      .then((dataIngridients) => {
        setDataBurgerIngridients(dataIngridients.data);
        setErrorGetDataIngridients(null);
      })
      .catch(err => {
        setErrorGetDataIngridients(err);
        console.log(err);
      })
  }, [])

  return (
    <div className={`${style.page}`}>
      <AppHeader />
      {errorGetDataIngridients &&
        <p className={`${style.errMessage} text text_type_main-default`}>
          Возникла {errorGetDataIngridients}, попробуйте обновить страницу.
        </p>}
      <Main dataBurgerIngridients={dataBurgerIngridients} />
    </div>
  );
}

export default App;
