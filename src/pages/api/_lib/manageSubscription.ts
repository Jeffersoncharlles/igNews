

interface SubscriptionProps {
    subscriptionId: string;
    customerId: string;

}

const saveSubscription = async ({ subscriptionId, customerId }: SubscriptionProps) => {
    //buscar o usuario no banco do Faunadb com o ID {customerId}

    //salvar os dados da subscription no FaunaDb

}

export { saveSubscription }