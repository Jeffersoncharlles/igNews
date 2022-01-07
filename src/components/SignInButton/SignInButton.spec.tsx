import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'
import { SignInButton } from '.'

jest.mock('next-auth/react')

describe('SignInButton component', () => {
    const useSessionMocked = mocked(useSession)
    //testar que esteja renderizando correto
    it('renders correctly when user is not authenticated', () => {

        useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })

        render(<SignInButton />)
        expect(screen.getByText('Sign in With Github')).toBeInTheDocument()
    })
    it('render correctly when user is autheticated', () => {
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: { name: 'John Doe', email: 'john.doe@example.com' },
                expires: 'fake-expires',
            },
            status: 'authenticated',
        });
        render(<SignInButton />)
        expect(screen.getByText('John Doe')).toBeInTheDocument;
    })
})

