import { render, screen } from "@testing-library/react"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe('Post page', () => {
    const useSessionMocked = mocked(useSession)
    const prismicMocked = mocked(getPrismicClient);

    const post = {
        slug: 'Itiprap',
        title: 'Itiprap',
        content: '<p>Post excerpt</p>',
        updated_at: '10 de abril'
    }

    it('renders correctly', () => {
        render(
            <Post post={post} />
        )
        expect(screen.getByText('Itiprap')).toBeInTheDocument()
        expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    })

    it('redirect user if no subscription is found', async () => {
        useSessionMocked.mockReturnValueOnce(null)

        const resp = await getServerSideProps({
            req: {
                cookies: {},
            },
            params: {
                slug: 'my-fake'
            }
        } as any);

        expect(resp).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining(
                    {
                        destination: '/',
                    }
                )
            })
        )
    });

    //tem que verificar depois
    // it('loads initial data', async () => {
    //     prismicMocked.mockReturnValueOnce({
    //         getByUID: jest.fn().mockResolvedValueOnce({
    //             data: {
    //                 title: [
    //                     { type: 'heading', text: 'Itiprap' }
    //                 ],
    //                 content: [
    //                     { type: 'paragraph', text: 'Post excerpt' }
    //                 ],
    //             },
    //             last_publication_date: '04-01-2021'
    //         })
    //     } as any)
    //     useSessionMocked.mockReturnValueOnce({
    //         data: {
    //             user: { name: 'John Doe', email: 'john.doe@example.com' },
    //             expires: 'fake-expires', activeSubscription: 'fake-active'
    //         },
    //         status: 'authenticated',
    //     } as any)

    //     const resp = await getServerSideProps({
    //         params: {
    //             slug: 'my-new-post'
    //         }
    //     } as any);

    //     expect(resp).toEqual(
    //         expect.objectContaining({
    //             props: {
    //                 post: {
    //                     slug: 'my-new-post',
    //                     title: 'Itiprap',
    //                     content: '<p>Post excerpt</p>',
    //                     updated_at: '10 de abril de 2021'
    //                 }
    //             }
    //         })
    //     )
    // })
})