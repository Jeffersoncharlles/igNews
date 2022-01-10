import { render, screen } from "@testing-library/react"
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'
import { useRouter } from "next/router";

jest.mock('next-auth/react');
jest.mock('../../services/prismic');
jest.mock('next/router')


describe('Post page', () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMucked = mocked(useRouter);


    const post = {
        slug: 'my-new-post',
        title: 'My New Post',
        content: '<p>Post excerpt</p>',
        updated_at: '10 de abril'
    }

    it('renders correctly', () => {
        useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })

        render(
            <Post post={post} />
        )
        expect(screen.getByText('My New Post')).toBeInTheDocument()
        expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    })

    it('redirect user to full post when user is subscribe', async () => {
        const pushMock = jest.fn();

        useSessionMocked.mockReturnValueOnce({
            data: {
                user: { name: 'John Doe', email: 'john.doe@example.com' },
                expires: 'fake-expires', activeSubscription: 'fake-active'
            },
            status: 'authenticated',
        } as any)

        useRouterMucked.mockReturnValueOnce({
            push: pushMock,
        } as any)

        render(<Post post={post} />)
        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    });
})