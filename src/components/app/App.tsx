import React, { useEffect, useState } from 'react';
import { IngredientsContext } from '../../services/ingredients-context';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getBurgerIngridients } from '../../utils/api';
import useErrors from '../../hooks/use-errors';
import ModalError from '../modal-error/modal-error';

function App() {
  const [dataBurgerIngridients, setDataBurgerIngridients] = useState([]);
  const [isDataReceived, setIsDataReceived] = useState(false);
  const { error, handleErrorOpen, handleErrorClose } = useErrors(null);

  // получить данные с ингридиентами
  useEffect(() => {
    getBurgerIngridients()
      .then((dataIngridients) => {
        setDataBurgerIngridients(dataIngridients.data);
        setIsDataReceived(true);
        handleErrorClose();
      })
      .catch(err => {
        handleErrorOpen(err);
        console.log(err);
      })
  }, [])

  return (
    <div className={`${style.page}`}>
      <AppHeader />
      {error && <ModalError openError={error} />}
      <IngredientsContext.Provider value={dataBurgerIngridients}>
        {isDataReceived && <Main />}
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
