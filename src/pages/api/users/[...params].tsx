import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query;

    console.log(id);

    const users = [
        { id: 1, name: 'jefferson' },
        { id: 2, name: 'pedro' },
        { id: 3, name: 'jenny' },
        { id: 4, name: 'fulaninho' },
    ]

    return res.json(users);
}

