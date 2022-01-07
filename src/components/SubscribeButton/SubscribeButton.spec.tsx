import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'
import { useRouter } from "next/router";
import { SubscribeButton } from '.'

jest.mock('next-auth/react');

jest.mock('next/router')


describe('SignInButton component', () => {
    const singInMocked = mocked(signIn);
    const useRouterMucked = mocked(useRouter);
    const useSessionMocked = mocked(useSession)

    it('renders correctly', () => {
        useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })
        render(<SubscribeButton />)
        expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    })

    it('renders user to sign in when not authenticated', () => {
        useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })

        render(<SubscribeButton />)
        const subscribeButton = screen.getByText('Subscribe Now')
        fireEvent.click(subscribeButton)

        expect(singInMocked).toHaveBeenCalled();
        //espero que tenha sido chamado
    })

    it('redirects to posts when user already has a subscription', () => {

        const pushMock = jest.fn();
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: { name: 'John Doe', email: 'john.doe@example.com' },
                expires: 'fake-expires', activeSubscription: 'fake-active'
            },
            status: 'authenticated',
        });


        //mocando o router
        useRouterMucked.mockReturnValueOnce({
            push: pushMock,
        } as any)

        render(<SubscribeButton />)
        const subscribeButton = screen.getByText('Subscribe Now')
        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalled();
        //espero que tenha sido chamado
    })
})

