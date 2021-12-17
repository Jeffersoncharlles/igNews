import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import { formatUSD } from '../utils/format';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

//Client-side
//Server-Side
//Static-side Generation

export default function Home({ product }: HomeProps) {



  return (
    <>
      <Head>
        <title>Home | ig.new</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications <br />
            <span>for {product.amount} month </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl codding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1K7RrlD1uMx7q7dmJ59vcYG7', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: formatUSD(price.unit_amount / 100),
  }
  return {
    props: {
      product
    }, revalidate: 60 * 60 * 24, //24 horas
  }
}