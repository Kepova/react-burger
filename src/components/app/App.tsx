import { store } from '../redux/store';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { Provider } from 'react-redux';

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
