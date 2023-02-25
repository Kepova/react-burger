import { initialState } from '../redux/reducers/reducer';
import { configureStore } from '../redux/store';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { Provider } from 'react-redux';

//инициализация redux store
const store = configureStore(initialState);

function App() {
  return (
    <div className={`${style.page}`}>
      <AppHeader />
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
