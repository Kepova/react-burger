import { useEffect, FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../redux/actions/actions';
import { getDataUser } from '../../redux/actions/actionsAuth';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import NotFoundPage from '../../pages/notFoundPage/notFoundPage';
import Modal from '../modal/modal';
import IngredientDetails from '../../pages/ingredient-details/ingredient-details';
import ProfileOrders from '../../pages/profile-orders/profile-orders';
import ProtectedRouteElement from '../protected-route-element';
import Preloader from '../preloader/preloader';
import PersonalAccount from '../../pages/personal-account/personal-account';
import { LocationState } from '../../services/types';
import { getCookie } from '../../utils/cookies-auth';

const App: FC = () => {
  const location = useLocation();
  const background = location.state && (location.state as LocationState)?.background;
  const dispatch = useDispatch() as any;

  const getUserRequest = useSelector((store: any) => store.authReducer.getUserRequest);
  const refrechTokenRequest = useSelector((store: any) => store.authReducer.refrechTokenRequest);
  const accessToken = useSelector((store: any) => store.authReducer.accessToken);
  const getIngredientsRequest = useSelector((store: any) => store.ingredientsReducer.getIngredientsRequest);

  //получение всех ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  //получение данных пользователя 
  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      dispatch(getDataUser(accessToken));
    }
  }, [dispatch, accessToken]);

  return (
    <div className={`${style.page}`}>
      <AppHeader />
      {getIngredientsRequest ? <Preloader />
        :
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='profile' element={(getUserRequest || refrechTokenRequest) ? <Preloader /> : <ProtectedRouteElement element={<PersonalAccount />} />}>
            <Route path='' element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
          {background ?
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'}>
                  <IngredientDetails />
                </Modal>
              }
            />
            : <Route path='/ingredients/:id' element={<IngredientDetails />} />
          }
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      }
    </div >
  );
}

export default App;