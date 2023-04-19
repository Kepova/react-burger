import { useEffect, FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/types/hooks';
import { getIngredients } from '../../redux/actions/actions';
import { getDataUser, refreshTokenUser } from '../../redux/actions/actionsAuth';
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
import OrdersList from '../../pages/orders-list/orders-list';
import Order from '../../pages/order/order';

const App: FC = () => {
  const location = useLocation();
  const background = location.state && (location.state as LocationState)?.background;
  const dispatch = useDispatch();

  const getUserRequest = useSelector((store) => store.authReducer.getUserRequest);
  const refreshTokenRequest = useSelector((store) => store.authReducer.refreshTokenRequest);
  const accessToken = useSelector((store) => store.authReducer.accessToken);
  const getIngredientsRequest = useSelector((store) => store.ingredientsReducer.getIngredientsRequest);
  const wsConnected = useSelector(state => state.wsReducer.wsConnected);

  //получение всех ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  //получение данных пользователя 
  useEffect(() => {
    const token = getCookie('token');
    if (token && !accessToken) {
      dispatch(refreshTokenUser(token));
    }
    if (token && accessToken) {
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
          <Route path='/feed' element={<OrdersList />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='profile' element={(getUserRequest || refreshTokenRequest) ? <Preloader /> : <ProtectedRouteElement element={<PersonalAccount />} />}>
            <Route path='' element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
            {background ? <Route
              path='/profile/orders/:id'
              element={
                <Modal>
                  <Order wsConnect={wsConnected} />
                </Modal>}
            />
              : <Route path='/profile/orders/:id' element={<Order />} />}
          </Route>
          {background ? <Route
            path='/feed/:id'
            element={
              <Modal>
                <Order wsConnect={wsConnected} />
              </Modal>}
          />
            : <Route path='/feed/:id' element={<Order />} />}
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