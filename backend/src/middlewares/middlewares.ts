import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const accessSecret: string = process.env.ACCESS_TOKEN_SECRET!
const refreshSecret: string = process.env.REFRESH_TOKEN_SECRET!


export interface AuthRequest extends Request {
    user?: {
        _id: string,
        username: string,
        email: string,
        password: string,
        created_at: Date
    }
}

export async function AuthenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] //getting the authorization header
    // console.log(`authHeader: ${authHeader}`)
    const token = authHeader && authHeader.split(' ')[1]; //splitting the header from the bearer, to the actual token and getting the token
    console.log(`token: ${token}`)
    if (token == null) return res.status(401).json({ message: "No token found" });

    jwt.verify(token, accessSecret, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user as any
        next()
    })
}