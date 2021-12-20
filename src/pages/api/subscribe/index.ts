import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";
import { query as q } from 'faunadb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email
            // metadata
        })

        await fauna.query()

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,//id do stripe nao do fauna
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [{ price: 'price_1K7RrlD1uMx7q7dmJ59vcYG7', quantity: 1 }],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}