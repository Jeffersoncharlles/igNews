import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';
import { formatDate } from '../../utils/format';


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updated_at: string;
}
interface PostProps {
    posts: Post[]
}

export default function ({ posts }: PostProps) {

    return (
        <>
            <Head>
                <title>Posts | Ignews </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(p => (
                        <a href={p.slug}>
                            <time>{p.updated_at}</time>
                            <strong>{p.title}</strong>
                            <p>{p.excerpt}</p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query(
        //quero buscar todos os documento tipo publication
        [Prismic.predicates.at('document.type', 'publication')],
        {
            //quais dados quero 
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100,
        }
    )
    // console.log(JSON.stringify(response, null, 2));
    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(c => c.type === 'paragraph')?.text ?? '',
            updated_at: formatDate(post.last_publication_date)
        }
    })


    return {
        props: { posts }
    }
}