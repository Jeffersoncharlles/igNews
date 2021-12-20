import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './styles.module.scss';

interface SubsCribeProps {
    priceId: string;
}

//usar credencial secret
//getServiceProps (ssr)
//getStaticProps(SSG)
//API routes

export const SubscribeButton = ({ priceId }: SubsCribeProps) => {
    const { data: session } = useSession();

    const handleSubscribe = () => {
        if (!session) {
            signIn('github');
            return;
        }

        //created da checkout session
    }
    return (
        <button
            type='button'
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    );
}