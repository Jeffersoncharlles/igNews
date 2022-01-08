import { render, screen } from "@testing-library/react"
import Home from "../../pages"
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react');

describe('Home page', () => {
    const useSessionMocked = mocked(useSession)

    it('renders correctly', () => {
        useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" })
        render(
            <Home product={{ priceId: 'fake-price-id', amount: 100 }} />
        )
        expect(screen.getByText(/100/i)).toBeInTheDocument()
    })
})