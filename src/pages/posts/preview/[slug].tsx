import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import styles from '../post.module.scss';
import Head from "next/head";
import { getPrismicClient } from "../../../services/prismic";
import { RichText } from "prismic-dom";

import { formatDate } from "../../../utils/format";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostsPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updated_at: string;
    }
}

export default function PostsPreview({ post }: PostsPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

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
                        className={`${styles.postContainer} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a >Subscribe now 🤗</a>
                        </Link>

                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

//usar o serverSide para nao ser visto por todos
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('publication', String(slug), {});

    //splice vai pegar os 3 primeiros blocos de conteudo dentro do content
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 4)),
        updated_at: formatDate(response.last_publication_date)
    }
    return {
        props: { post }
    }
}