import { NextApiRequest, NextApiResponse } from "next"

// JWT (STORAGE)
// NEXT AUTH (SOCIAL)
//COGNITO..AWS , AUTH0

export default (req: NextApiRequest, res: NextApiResponse) => {
    const users = [
        { id: 1, name: 'jefferson' },
        { id: 2, name: 'pedro' },
        { id: 3, name: 'jenny' },
        { id: 4, name: 'fulaninho' },
    ]

    return res.json(users);
}

