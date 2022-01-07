import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'
import { SubscribeButton } from '.'

// jest.mock('next-auth/react')

// describe('SignInButton component', () => {
//     const useSessionMocked = mocked(useSession)
//     //testar que esteja renderizando correto
//     it('renders correctly when user is not authenticated', () => {

//         useSessionMocked.mockReturnValueOnce({data = null,status= "unauthenticated"})

//         render(<SubscribeButton />)
//         expect(screen.getByText('Sign in With Github')).toBeInTheDocument()
//     })
//     it('render correctly when user is autheticated', () => {
//         useSessionMocked.mockReturnValueOnce([
//             {
//                 user: { name: 'John Doe', email: 'john.doe@example.com' },
//                 expires: 'fake-expires',
//             },
//             false,
//         ]);


//         render(<SubscribeButton />)
//         expect(screen.getByText('John Doe')).toBeInTheDocument;
//     })
// })

