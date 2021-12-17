import styles from './styles.module.scss';

interface SubsCribeProps {
    priceId: string;
}

export const SubscribeButton = ({ priceId }: SubsCribeProps) => {

    return (
        <button
            type='button'
            className={styles.subscribeButton}
        >
            Subscribe Now
        </button>
    );
}