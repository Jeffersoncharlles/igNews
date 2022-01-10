import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { Async } from "."


// test('its render correctly', async () => {
//     render(<Async />)

//     expect(screen.getByText('Hello World')).toBeInTheDocument()
//     expect(await screen.findByText('Button')).toBeInTheDocument()
//     //como passar quando tem async
// })

test('its render correctly', async () => {
    render(<Async />)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
    await waitFor(() => {
        //espera ate executar
        return expect(screen.getByText('Button')).toBeInTheDocument()
    })
    //como passar quando tem async
})

// test('its render correctly', async () => {
//     render(<Async />)

//     await waitForElementToBeRemoved(screen.queryByText('Button'))
//     //quando quero verificar se saiu da tela
//     //como passar quando tem async
// })