import { render } from '@testing-library/react'
import { ActiveLink } from '.'


jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component', () => {
    //testar que esteja renderizando correto
    it('active link renders correctly', () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )

        //debug();
        //console.log do test

        expect(getByText('Home')).toBeInTheDocument()
    })
    //testar a classe active
    it('active link is receiving active class', () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
        expect(getByText('Home')).toHaveClass('active')
    })
})

