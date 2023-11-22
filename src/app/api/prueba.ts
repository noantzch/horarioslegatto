import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>{
    console.log(req.method, req.url)
    res.json("tasksss")
}