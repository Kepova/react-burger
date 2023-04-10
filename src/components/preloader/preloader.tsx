import { FC } from 'react';
import styles from './preloader.module.css';

const Preloader: FC = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.container}>
                <span className={styles.round}></span>
            </div>
        </div>
    )
};

export default Preloader;