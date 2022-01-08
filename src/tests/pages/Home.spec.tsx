import { render, screen } from "@testing-library/react"
import Home, { getStaticProps } from "../../pages"
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { stripe } from '../../services/stripe'

jest.mock('next-auth/react');
jest.mock('../../services/stripe');

describe('Home page', () => {
    const useSessionMocked = mocked(useSession)
    const stripeMocked = mocked(stripe.prices.retrieve);

    it('renders correctly', () => {
        useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })
        render(
            <Home product={{ priceId: 'fake-price-id', amount: 100 }} />
        )
        expect(screen.getByText(/100/i)).toBeInTheDocument()
    })

    it('loads initial data', async () => {
        stripeMocked.mockResolvedValueOnce({
            id: 'fake-price-id',
            unit_amount: 1000,
        } as any)

        const resp = await getStaticProps({})

        //vai ver se contem e nao se e totalmente igual
        expect(resp).toEqual(
            expect.objectContaining({
                props: {
                    product: {
                        priceId: 'fake-price-id',
                        amount: '$10.00'
                    }
                }
            })
        )
    });
})