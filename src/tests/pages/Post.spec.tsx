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

    // it('loads initial data', async () => {
    //     prismicMocked.mockReturnValueOnce({
    //         query: jest.fn().mockResolvedValueOnce({
    //             results: [
    //                 {
    //                     uui: 'Itiprap',
    //                     data: {
    //                         title: [
    //                             { type: 'heading', text: 'Itiprap' }
    //                         ],
    //                         content: [
    //                             { type: 'paragraph', text: 'Post excerpt' }
    //                         ],
    //                     },
    //                     last_publication_date: '04-01-2021'
    //                 }
    //             ]
    //         })
    //     } as any)

    //     const resp = await getServerSideProps({})

    //     expect(resp).toEqual(
    //         expect.objectContaining({
    //             props: {
    //                 posts: [{
    //                     slug: undefined,
    //                     title: 'Itiprap',
    //                     excerpt: 'Post excerpt',
    //                     updated_at: '01 de abril de 2021'
    //                 }]
    //             }
    //         })
    //     )
    // });
})