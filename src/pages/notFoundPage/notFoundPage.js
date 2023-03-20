import { useNavigate } from "react-router-dom";
import styles from './notFoundPage.module.css';
import ikon from '../../images/not-found-page.png';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.notFoundPage}>
            <img src={ikon} alt='тут должна быть иконка' className={styles.ikon} />
            <p className={styles.description}>Страница не найдена</p>
            <button type="button" onClick={() => navigate(-1)} className={styles.linkToBack}>Назад</button>
        </div>
    )
}

export default NotFoundPage;