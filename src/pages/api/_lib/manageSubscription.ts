import { fauna } from "../../../services/fauna";
import { query as q } from 'faunadb'
import { stripe } from "../../../services/stripe";


interface SubscriptionProps {
    subscriptionId: string;
    customerId: string;

}

const saveSubscription = async (subscriptionId: string, customerId: string) => {
    //buscar o usuario no banco do Faunadb com o ID {customerId}
    // console.log(subscriptionId, "sub");
    // console.log(customerId, "cus");

    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    //todos dados da subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,

    }

    //salvar os dados da subscription no FaunaDb
    await fauna.query(
        q.Create(
            q.Collection('subscritpions'),
            { data: subscriptionData }
        )
    )

}

export { saveSubscription }