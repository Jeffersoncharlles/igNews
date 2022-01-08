import { render, screen } from "@testing-library/react"
import Posts, { getStaticProps } from "../../pages/posts"
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe('Posts page', () => {
    const useSessionMocked = mocked(useSession)
    const prismicMocked = mocked(getPrismicClient);

    const posts = [{
        slug: 'Itiprap',
        title: 'Itiprap',
        excerpt: 'Post excerpt',
        updated_at: '14:36:06'
    }]

    it('renders correctly', () => {
        render(
            <Posts posts={posts} />
        )
        expect(screen.getByText('Itiprap')).toBeInTheDocument()
    })

    it('loads initial data', async () => {
        prismicMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uui: 'Itiprap',
                        data: {
                            title: [
                                { type: 'heading', text: 'Itiprap' }
                            ],
                            content: [
                                { type: 'paragraph', text: 'Post excerpt' }
                            ],
                        },
                        last_publication_date: '04-01-2021'
                    }
                ]
            })
        } as any)

        const resp = await getStaticProps({})

        expect(resp).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: undefined,
                        title: 'Itiprap',
                        excerpt: 'Post excerpt',
                        updated_at: '01 de abril de 2021'
                    }]
                }
            })
        )
    });
})