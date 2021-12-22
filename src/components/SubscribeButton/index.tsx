import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripejs';
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

    const handleSubscribe = async () => {
        if (!session) {
            signIn('github');
            return;
        }
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message);
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