import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import styles from './post.module.scss';
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";

import { formatDate } from "../../utils/format";

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updated_at: string;
    }
}

export default function posts({ post }: PostProps) {

    return (
        <>
            <Head>
                <title>{post.title} | IgNews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updated_at}</time>
                    <div
                        className={styles.postContainer}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    );
}

//usar o serverSide para nao ser visto por todos
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req });
    const { slug } = params;

    //console.log(session);
    if (!session.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('publication', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updated_at: formatDate(response.last_publication_date)
    }

    return {
        props: { post }
    }
}